// Lash technicians, from the Lashes by Shazz booking site.
// slug  = the clean share link, lashesbyshazz.com/book/<slug>
// staffId = the booking system's id for that technician
// branch  = booking branch id (1 = CBD, 2 = Hurlingham)
// To add or change a tech, edit this list and add a photo at public/team/<name>.webp.
export const BOOKING_BASE = 'https://booking.lashesbyshazz.com';

export const TECHS = [
  { slug: 'ann', name: 'Ann Njoroge', staffId: 1, branch: 1 },
  { slug: 'dan', name: 'Dan Osiya', staffId: 56, branch: 1 },
  { slug: 'elizabeth', name: 'Elizabeth Nyakio', staffId: 2, branch: 1 },
  { slug: 'linda', name: 'Linda Makena', staffId: 3, branch: 1 },
  { slug: 'nereah', name: 'Nereah Adhiambo', staffId: 57, branch: 1 },
  { slug: 'oscar', name: 'Oscar Otieno', staffId: 72, branch: 1 },
  { slug: 'ritah', name: 'Ritah Wainaina', staffId: 4, branch: 1 },
  { slug: 'sarah', name: 'Sarah Kemunto', staffId: 6, branch: 1 },
  { slug: 'anelka', name: 'Anelka Munyeshaka', staffId: 8, branch: 2 },
  { slug: 'ashley', name: 'Ashley Moraa', staffId: 9, branch: 2 },
  { slug: 'bridget', name: 'Bridget Nyatichi', staffId: 10, branch: 2 },
  { slug: 'caroline', name: 'Caroline Juma', staffId: 12, branch: 2 },
  { slug: 'dorothy', name: 'Dorothy Savai', staffId: 13, branch: 2 },
  { slug: 'evelyne', name: 'Evelyne Kaulio', staffId: 187, branch: 2 },
  { slug: 'harriet', name: 'Harriet Akinyi', staffId: 68, branch: 2 },
  { slug: 'mercy', name: 'Mercy Nyanchama', staffId: 15, branch: 2 },
  { slug: 'paulette', name: 'Paulette Otieno', staffId: 16, branch: 2 },
  { slug: 'ronald', name: 'Ronald Ochieng', staffId: 17, branch: 2 },
  { slug: 'ruth', name: 'Ruth Wairimu', staffId: 5, branch: 2 },
  { slug: 'sharon-nyambura', name: 'Sharon Nyambura', staffId: 18, branch: 2 },
] as const;

export const BRANCH_SLUGS = { cbd: 1, hurlingham: 2 } as const;

export const techBookingUrl = (staffId: number) => `${BOOKING_BASE}/appointments/services?staff_id=${staffId}`;
export const branchBookingUrl = (branchId: number) => `${BOOKING_BASE}/appointments?branch_id=${branchId}`;
