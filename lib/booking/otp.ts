// Sends the 6-digit phone verification code for /book. The code itself is made and checked in the
// database (public.lbs_book_otp_start / lbs_book_otp_verify); this file only delivers it.
//
// Pick a sender with OTP_PROVIDER on the server:
//   heysasa        WhatsApp through HeySasa. HEYSASA_OTP_URL (an endpoint that sends one WhatsApp message)
//                  and HEYSASA_OTP_KEY (sent as a Bearer token). Body: { to: "2547…", message: "…" }.
//   africastalking SMS. AT_USERNAME, AT_API_KEY, optional AT_SENDER_ID. AT_USERNAME=sandbox uses the sandbox.
//   log            Development only: prints the code in the server log instead of sending it.
// Also needs LBS_BOOKING_SECRET (same value as lashesbyshazz.settings 'server_secret').
// With no sender set, /book skips verification and works as before.

type Provider = 'heysasa' | 'africastalking' | 'log';

const provider = (): Provider | null => {
  const p = (process.env.OTP_PROVIDER || '').toLowerCase();
  if (p === 'heysasa' && process.env.HEYSASA_OTP_URL && process.env.HEYSASA_OTP_KEY) return 'heysasa';
  if (p === 'africastalking' && process.env.AT_USERNAME && process.env.AT_API_KEY) return 'africastalking';
  if (p === 'log' && process.env.NODE_ENV !== 'production') return 'log';
  return null;
};

export const otpConfigured = () => Boolean(provider() && process.env.LBS_BOOKING_SECRET);

function message(code: string) {
  // The last line lets Android Chrome fill the code in by itself (WebOTP) when it arrives by SMS.
  const site = (process.env.SITE_URL || 'https://lashesbyshazz.com').replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return `Your Lashes by Shazz code is ${code}. It expires in 10 minutes. Never share it.\n\n@${site} #${code}`;
}

export async function sendCode(phone254: string, code: string) {
  const p = provider();
  if (!p) throw new Error('No OTP sender configured');
  const text = message(code);

  if (p === 'log') {
    console.log(`[book] OTP for ${phone254}: ${code}`);
    return;
  }

  if (p === 'heysasa') {
    const res = await fetch(process.env.HEYSASA_OTP_URL!, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.HEYSASA_OTP_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: phone254, message: text }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`HeySasa OTP failed (${res.status})`);
    return;
  }

  const sandbox = process.env.AT_USERNAME === 'sandbox';
  const form = new URLSearchParams({ username: process.env.AT_USERNAME!, to: `+${phone254}`, message: text });
  if (process.env.AT_SENDER_ID) form.set('from', process.env.AT_SENDER_ID);
  const res = await fetch(`https://api.${sandbox ? 'sandbox.' : ''}africastalking.com/version1/messaging`, {
    method: 'POST',
    headers: { apiKey: process.env.AT_API_KEY!, Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  const data = (await res.json().catch(() => ({}))) as { SMSMessageData?: { Recipients?: { status?: string }[] } };
  const status = data.SMSMessageData?.Recipients?.[0]?.status;
  if (!res.ok || (status && status !== 'Success')) throw new Error(`SMS failed: ${status || res.status}`);
}
