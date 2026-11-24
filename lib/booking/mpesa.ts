// M-Pesa booking fee via Safaricom Daraja STK push ("Lipa na M-Pesa Online").
// Switched off until these are set on the server (from the Daraja portal, sandbox first):
//   MPESA_ENV=sandbox|production, MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET,
//   MPESA_SHORTCODE (paybill or store number), MPESA_PASSKEY,
//   MPESA_TILL (only for a Buy Goods till: the till number), LBS_BOOKING_SECRET (same value as
//   lashesbyshazz.settings 'server_secret'), SITE_URL (e.g. https://lashesbyshazz.com).
// While off, /book takes bookings as requests and reception sends the fee request on WhatsApp.

export const mpesaConfigured = () =>
  Boolean(
    process.env.MPESA_CONSUMER_KEY &&
      process.env.MPESA_CONSUMER_SECRET &&
      process.env.MPESA_SHORTCODE &&
      process.env.MPESA_PASSKEY &&
      process.env.LBS_BOOKING_SECRET &&
      process.env.SITE_URL,
  );

const base = () =>
  process.env.MPESA_ENV === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';

async function token() {
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await fetch(`${base()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`M-Pesa auth failed (${res.status})`);
  return ((await res.json()) as { access_token: string }).access_token;
}

function timestamp() {
  // yyyyMMddHHmmss in Nairobi time
  const t = new Date(Date.now() + 3 * 3600 * 1000).toISOString();
  return t.slice(0, 19).replace(/[-T:]/g, '');
}

export async function stkPush(opts: { phone: string; amount: number; ref: string }) {
  const shortcode = process.env.MPESA_SHORTCODE!;
  const till = process.env.MPESA_TILL;
  const ts = timestamp();
  const password = Buffer.from(`${shortcode}${process.env.MPESA_PASSKEY}${ts}`).toString('base64');
  const callback = `${process.env.SITE_URL!.replace(/\/$/, '')}/api/book/mpesa?k=${encodeURIComponent(process.env.LBS_BOOKING_SECRET!)}`;
  const res = await fetch(`${base()}/mpesa/stkpush/v1/processrequest`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: ts,
      TransactionType: till ? 'CustomerBuyGoodsOnline' : 'CustomerPayBillOnline',
      Amount: Math.round(opts.amount),
      PartyA: opts.phone,
      PartyB: till || shortcode,
      PhoneNumber: opts.phone,
      CallBackURL: callback,
      AccountReference: opts.ref,
      TransactionDesc: 'Booking fee',
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  const data = (await res.json().catch(() => ({}))) as { CheckoutRequestID?: string; ResponseCode?: string; errorMessage?: string };
  if (!res.ok || data.ResponseCode !== '0' || !data.CheckoutRequestID) {
    throw new Error(`M-Pesa STK push failed: ${data.errorMessage || res.status}`);
  }
  return data.CheckoutRequestID;
}
