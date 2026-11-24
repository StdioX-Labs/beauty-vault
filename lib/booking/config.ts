import { ANALYTICS_URL, ANALYTICS_ANON_KEY } from '@/lib/analytics';

// Settings for the /book flow. Server secrets (M-Pesa, Odoo, the payment secret) are NOT here: they are
// read from the server's environment, see lib/booking/mpesa.ts and lib/booking/odoo.ts.

// Switch the whole site over to /book: every "Book" button and every /book/<tech> link goes to the new flow.
// Leave false until the booking database is set up and reception is ready to handle /book bookings.
export const NEW_BOOKING_LIVE = false;

// The Supabase project that holds clients and bookings (schema "lashesbyshazz",
// supabase/lashesbyshazz-booking.sql). The anon key is public by design: it can only call the
// public.lbs_book_* functions, which check everything and never return client lists.
export const BOOKING_DB = { url: ANALYTICS_URL, key: ANALYTICS_ANON_KEY }; // Lash Tribe project, same as analytics

// One line shown above the pay button. Set the real no-show / late-cancel rule here once it is decided.
export const BOOKING_POLICY = 'The booking fee holds your slot and comes off your total. The balance is paid at the appointment.';

// Where the Book buttons point.
export const BOOK_URL = NEW_BOOKING_LIVE ? '/book' : 'https://booking.lashesbyshazz.com/';
export const bookServiceUrl = (slug: string) => (NEW_BOOKING_LIVE ? `/book?service=${slug}` : 'https://booking.lashesbyshazz.com/');
