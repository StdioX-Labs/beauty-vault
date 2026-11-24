// A remembered device on /book: { token } returns who is booking ("Booking as Amina"), { token, forget: true }
// forgets the device ("Not you?"). Nothing is returned without a valid token from a verified phone.
import { rpc, json, BookingDbMissing } from '@/lib/booking/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  const token = String(body.token || '').slice(0, 100);
  if (!token) return json({ ok: false });
  try {
    return json(await rpc(body.forget ? 'lbs_book_forget' : 'lbs_book_me', { p: { token } }));
  } catch (e) {
    if (!(e instanceof BookingDbMissing)) console.error('[book] me', e);
    return json({ ok: false });
  }
}
