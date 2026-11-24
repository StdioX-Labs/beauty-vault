// Server-side booking data layer. Only the /api/book routes call this; the page never talks to the
// database directly. Every call goes through a public.lbs_book_* function (supabase/lashesbyshazz-booking.sql).
import { BOOKING_DB } from './config';

export class BookingDbMissing extends Error {}

// LBS_BOOKING_DB_URL can point a local copy at a test database.
const dbUrl = () => process.env.LBS_BOOKING_DB_URL || BOOKING_DB.url;

export async function rpc<T = unknown>(fn: string, body: Record<string, unknown>): Promise<T> {
  if (!dbUrl() || !BOOKING_DB.key) throw new BookingDbMissing('no booking database configured');
  const res = await fetch(`${dbUrl()}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: BOOKING_DB.key,
      Authorization: `Bearer ${BOOKING_DB.key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  if (res.status === 404) throw new BookingDbMissing(`${fn} not found: run supabase/lashesbyshazz-booking.sql`);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    if (/PGRST202|does not exist/.test(text)) throw new BookingDbMissing(text);
    throw new Error(`${fn} failed (${res.status}): ${text.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

// Shared with the database (lashesbyshazz.settings 'server_secret'); proves a payment update came from this server.
export const serverSecret = () => process.env.LBS_BOOKING_SECRET || '';

export const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
