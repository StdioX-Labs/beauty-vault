// Odoo sync: STUB. Nothing is sent to Odoo yet.
//
// The plan: Supabase is the source of truth, and Odoo receives a copy of each client and booking over its
// external API (contact + booking + payment), so accounting and the front desk keep working.
// Before this can be switched on, decide (open questions in the booking plan):
//   * what Odoo needs: contacts only, or bookings, payments and invoices too
//   * the Odoo edition/version (Odoo Online needs the Custom plan for external API access)
//   * whether Odoo still takes bookings itself (then bookings must also sync back, or slots will clash)
// Then set ODOO_URL, ODOO_DB, ODOO_USER and ODOO_API_KEY on the server and fill in syncBookingToOdoo.

export type OdooBooking = {
  ref: string;
  phone: string;
  name: string;
  email?: string | null;
  branch: number;
  staffSlug: string;
  startsAt: string;
  endsAt: string;
  items: { slug: string; name: string; price: number }[];
  total: number;
  fee: number;
};

export const odooConfigured = () =>
  Boolean(process.env.ODOO_URL && process.env.ODOO_DB && process.env.ODOO_USER && process.env.ODOO_API_KEY);

export async function syncBookingToOdoo(b: OdooBooking): Promise<{ synced: boolean; reason?: string }> {
  if (!odooConfigured()) return { synced: false, reason: 'Odoo not configured' };
  // TODO: res.partner upsert by phone, then create the appointment (calendar.event) for the tech's
  // Odoo staff id (lib/techs.ts staffId), with the booking ref, then save the ids back on the booking.
  console.info('[odoo] sync not implemented yet, booking', b.ref);
  return { synced: false, reason: 'Odoo sync not implemented yet' };
}
