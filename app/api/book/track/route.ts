// Saves how far someone got in /book (and her phone once typed), for follow-up and the /admin funnel.
import { rpc, json, BookingDbMissing } from '@/lib/booking/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  try {
    const data = await rpc<Record<string, unknown>>('lbs_book_track', { p: body });
    return json({ ok: true, ...data });
  } catch (e) {
    if (!(e instanceof BookingDbMissing)) console.error('[book] track', e);
    return json({ ok: false });
  }
}
