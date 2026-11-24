// Polled by the confirmation screen while she approves the M-Pesa prompt.
import { rpc, json } from '@/lib/booking/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ref = (url.searchParams.get('ref') || '').slice(0, 20);
  const phone = (url.searchParams.get('phone') || '').slice(0, 20);
  if (!ref || !phone) return json({}, 400);
  try {
    return json(await rpc('lbs_book_status', { p_ref: ref, p_phone: phone }));
  } catch {
    return json({}, 502);
  }
}
