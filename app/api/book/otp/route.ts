// Phone verification for /book: { action: 'send', phone, session_id } then { action: 'verify', phone, session_id, code }.
// The code is made and checked in the database; this route only sends it (lib/booking/otp.ts).
import { rpc, json, serverSecret, BookingDbMissing } from '@/lib/booking/server';
import { otpConfigured, sendCode } from '@/lib/booking/otp';

export const dynamic = 'force-dynamic';

type Started = { ok: boolean; error?: string; phone?: string; code?: string };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'input' }, 400);
  }
  const phone = String(body.phone || '');
  const session_id = String(body.session_id || '');

  try {
    if (body.action === 'send') {
      if (!otpConfigured()) return json({ ok: false, error: 'off' });
      const started = await rpc<Started>('lbs_book_otp_start', { p: { secret: serverSecret(), phone, session_id } });
      if (!started.ok || !started.code || !started.phone) return json({ ok: false, error: started.error || 'server' });
      try {
        await sendCode(started.phone, started.code);
      } catch (e) {
        console.error('[book] otp send', e);
        return json({ ok: false, error: 'send' });
      }
      return json({ ok: true });
    }

    if (body.action === 'verify') {
      const result = await rpc<Record<string, unknown>>('lbs_book_otp_verify', { p: { phone, session_id, code: String(body.code || '') } });
      return json(result);
    }
  } catch (e) {
    if (e instanceof BookingDbMissing) return json({ ok: false, error: 'setup' });
    console.error('[book] otp', e);
    return json({ ok: false, error: 'server' }, 502);
  }
  return json({ ok: false, error: 'input' }, 400);
}
