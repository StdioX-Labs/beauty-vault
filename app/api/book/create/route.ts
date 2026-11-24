// Creates a booking: checks and prices it in the database, then asks M-Pesa for the booking fee
// (when M-Pesa is set up) and passes it on to Odoo (stub for now).
import { rpc, json, serverSecret, BookingDbMissing } from '@/lib/booking/server';
import { mpesaConfigured, stkPush } from '@/lib/booking/mpesa';
import { syncBookingToOdoo } from '@/lib/booking/odoo';

export const dynamic = 'force-dynamic';

type Created = {
  ok: boolean;
  error?: string;
  ref?: string;
  status?: string;
  staff?: string;
  branch?: number;
  starts_at?: string;
  ends_at?: string;
  items?: { slug: string; name: string; price: number }[];
  total?: number;
  fee?: number;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'input' }, 400);
  }
  const pay = mpesaConfigured();
  let created: Created;
  try {
    created = await rpc<Created>('lbs_book_create', { p: { ...body, payment: pay ? 'mpesa' : 'request' } });
  } catch (e) {
    if (e instanceof BookingDbMissing) return json({ ok: false, error: 'setup' });
    console.error('[book] create', e);
    return json({ ok: false, error: 'server' }, 502);
  }
  if (!created.ok) return json(created);

  let payment: 'sent' | 'failed' | 'off' = 'off';
  if (pay && created.ref && created.fee) {
    try {
      const phone = String(body.phone || '').replace(/\D/g, '').replace(/^0/, '254');
      const checkoutId = await stkPush({ phone, amount: created.fee, ref: created.ref });
      await rpc('lbs_book_payment', { p: { secret: serverSecret(), action: 'checkout', ref: created.ref, checkout_id: checkoutId } });
      payment = 'sent';
    } catch (e) {
      console.error('[book] mpesa', e);
      payment = 'failed';
    }
  }

  // Odoo copy: never holds up the client.
  syncBookingToOdoo({
    ref: created.ref!,
    phone: String(body.phone || ''),
    name: String(body.name || ''),
    email: (body.email as string) || null,
    branch: created.branch!,
    staffSlug: created.staff!,
    startsAt: created.starts_at!,
    endsAt: created.ends_at!,
    items: created.items || [],
    total: created.total!,
    fee: created.fee!,
  }).catch((e) => console.error('[book] odoo', e));

  return json({ ...created, payment });
}
