// Busy times, techs, live prices and offers for the /book page. Never returns client details.
import { rpc, json, BookingDbMissing } from '@/lib/booking/server';
import { mpesaConfigured } from '@/lib/booking/mpesa';
import { otpConfigured } from '@/lib/booking/otp';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const branch = Number(url.searchParams.get('branch')) || null;
  const days = Math.min(Math.max(Number(url.searchParams.get('days')) || 21, 1), 62);
  try {
    const data = await rpc<Record<string, unknown>>('lbs_book_availability', { p_branch: branch, p_from: null, p_days: days });
    return json({ ok: true, payment: mpesaConfigured() ? 'mpesa' : 'request', otp: otpConfigured(), ...data });
  } catch (e) {
    if (e instanceof BookingDbMissing) return json({ ok: false, setup: false });
    console.error('[book] availability', e);
    return json({ ok: false }, 502);
  }
}
