// Safaricom calls this when the client approves (or cancels) the booking-fee prompt.
import { rpc, serverSecret } from '@/lib/booking/server';

export const dynamic = 'force-dynamic';

type Callback = {
  Body?: {
    stkCallback?: {
      CheckoutRequestID?: string;
      ResultCode?: number;
      ResultDesc?: string;
      CallbackMetadata?: { Item?: { Name: string; Value?: string | number }[] };
    };
  };
};

export async function POST(request: Request) {
  const secret = serverSecret();
  if (!secret || new URL(request.url).searchParams.get('k') !== secret) return new Response('forbidden', { status: 403 });
  const cb = ((await request.json().catch(() => ({}))) as Callback).Body?.stkCallback;
  if (cb?.CheckoutRequestID) {
    const meta = Object.fromEntries((cb.CallbackMetadata?.Item || []).map((i) => [i.Name, i.Value]));
    await rpc('lbs_book_payment', {
      p:
        cb.ResultCode === 0
          ? { secret, action: 'paid', checkout_id: cb.CheckoutRequestID, amount: meta.Amount, receipt: meta.MpesaReceiptNumber }
          : { secret, action: 'failed', checkout_id: cb.CheckoutRequestID, reason: cb.ResultDesc },
    }).catch((e) => console.error('[book] mpesa callback', e));
  }
  return Response.json({ ResultCode: 0, ResultDesc: 'Accepted' });
}
