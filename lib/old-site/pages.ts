// Pages carried over from the old Lashes by Shazz WordPress site.
// Each entry keeps the old URL slug so links and rankings carry over.
// The page copy lives in content/old-site/<file>.md.

export const SITE_URL = 'https://lashesbyshazz.com';
export const BOOKING_URL = 'https://booking.lashesbyshazz.com/';

export type OldPage = {
  slug: string; // URL path without slashes, e.g. "lash-extensions" or "category/lashes"
  file: string; // markdown file in content/old-site
  title: string; // <title>, kept close to the old site's title
  description: string; // meta description
  image: string; // hero / Open Graph image in /public
  kind: 'page' | 'service' | 'package' | 'post' | 'category';
  date?: string; // posts only, ISO date
};

export const OLD_PAGES: OldPage[] = [
  {
    slug: 'services',
    file: 'services',
    title: 'Our Services – Lashes by Shazz',
    description:
      'Lash extensions, lash refills, microshading, Peruvian wigs, IV drips and house calls in Nairobi. See the Lashes by Shazz services and price list.',
    image: '/old-site/services.webp',
    kind: 'page',
  },
  {
    slug: 'our-team',
    file: 'our-team',
    title: 'Our Team – Lashes by Shazz',
    description:
      'Meet the Lashes by Shazz team of certified lash technicians, brow specialists and lash educators in Nairobi.',
    image: '/old-site/our-team.webp',
    kind: 'page',
  },
  {
    slug: 'faq-page',
    file: 'faq-page',
    title: 'UV Lashes & Lash Extension FAQ – Lashes by Shazz, Nairobi',
    description:
      'Are UV lashes safe? How much do UV lashes cost in Kenya, and how long do they last? Answers from Lashes by Shazz, the #1 UV lash parlour and trainers in Kenya.',
    image: '/old-site/faq-page.webp',
    kind: 'page',
  },
  {
    slug: 'contact-us',
    file: 'contact-us',
    title: 'Contact Us – Lashes by Shazz',
    description:
      'Contact Lashes by Shazz. Hurlingham branch: Silverpool Suite, Jabavu Lane, +254 769 781 771. CBD branch: Absa Towers, Lower Ground (Loita Street), +254 792 066 140.',
    image: '/old-site/contact-us.webp',
    kind: 'page',
  },
  {
    slug: 'training',
    file: 'training',
    title: 'Training – Lashes by Shazz',
    description:
      'Lash extension training in Nairobi. Hands-on classic and volume courses, live model practice and Lashes by Shazz certification.',
    image: '/old-site/training.webp',
    kind: 'page',
  },
  {
    slug: 'lashes-by-shazz-investment-opporunities',
    file: 'lashes-by-shazz-investment-opporunities',
    title: 'Lashes by Shazz Investment Opportunities – Lashes by Shazz',
    description:
      'Invest in East Africa’s fast-growing lash brand. Franchise and partnership packages to own a Lashes by Shazz branch.',
    image: '/old-site/lashes-by-shazz-investment-opporunities.webp',
    kind: 'page',
  },
  // Services
  {
    slug: 'lash-extensions',
    file: 'lash-extensions',
    title: 'Lash Extensions in Nairobi, Kenya – Classic to Mega Volume | Lashes by Shazz',
    description:
      'Classic, hybrid, volume and mega volume lash extensions in Nairobi from KES 2,900 (VAT included), applied by trained technicians at our Hurlingham and CBD branches.',
    image: '/old-site/lash-extensions.webp',
    kind: 'service',
  },
  {
    slug: 'lash-refill-services',
    file: 'lash-refill-services',
    title: 'Lash Refill Services – Lashes by Shazz',
    description:
      'Keep your lash extensions full with a professional refill within 21 days. Classic, hybrid, volume and mega volume refills in Nairobi.',
    image: '/old-site/lash-refill-services.webp',
    kind: 'service',
  },
  {
    slug: 'microshading',
    file: 'microshading',
    title: 'Microshading – Lashes by Shazz',
    description:
      'Semi-permanent microshading for fuller, softly powdered brows that last 1 to 2 years. Brow microshading in Nairobi.',
    image: '/old-site/services.webp',
    kind: 'service',
  },
  {
    slug: 'peruvian-wigs',
    file: 'peruvian-wigs',
    title: 'Peruvian Wigs – Lashes by Shazz',
    description:
      '100% premium Peruvian human hair wigs with pre-plucked hairlines and undetectable HD lace, ready to wear. Available in Nairobi.',
    image: '/old-site/peruvian-wigs.webp',
    kind: 'service',
  },
  {
    slug: 'beauty-wellness',
    file: 'beauty-wellness',
    title: 'Beauty & Wellness – Lashes by Shazz',
    description:
      'Beauty and wellness IV drips for hydration, skin brightening and anti-ageing. Nourish your body from the inside out in Nairobi.',
    image: '/old-site/about.webp',
    kind: 'service',
  },
  {
    slug: 'house-calls',
    file: 'house-calls',
    title: 'House Calls – Lashes by Shazz',
    description:
      'Luxury mobile beauty in Nairobi. Lash extensions and glam at your home, hotel or event with Lashes by Shazz house calls.',
    image: '/old-site/contact-us.webp',
    kind: 'service',
  },
  // Packages
  {
    slug: 'luxury-lash-brow-package',
    file: 'luxury-lash-brow-package',
    title: 'Student Slay Pass – Lashes by Shazz',
    description:
      'The Student Slay Pass: premium lash services at student-friendly prices for university and college students in Nairobi.',
    image: '/old-site/luxury-lash-brow-package.webp',
    kind: 'package',
  },
  {
    slug: 'executive-glow-plan',
    file: 'executive-glow-plan',
    title: 'Executive Glow Plan – Lashes by Shazz',
    description:
      'Beauty for busy professionals: early, late and express lash sessions with the Lashes by Shazz Executive Glow Plan.',
    image: '/old-site/executive-glow-plan.webp',
    kind: 'package',
  },
  {
    slug: 'party-bridal-squad-glam',
    file: 'party-bridal-squad-glam',
    title: 'Party & Bridal Squad Glam – Lashes by Shazz',
    description:
      'Group lash and glam sessions for weddings, birthdays and graduations. The Party & Bridal Squad Glam package brings the studio to you.',
    image: '/old-site/party-bridal-squad-glam.webp',
    kind: 'package',
  },
  {
    slug: 'luxe-bridal-beauty-bundle',
    file: 'luxe-bridal-beauty-bundle',
    title: 'Luxe Bridal Beauty Bundle – Lashes by Shazz',
    description:
      'Bridal lashes, brows and glam for your wedding day. The Luxe Bridal Beauty Bundle from Lashes by Shazz in Nairobi.',
    image: '/old-site/luxe-bridal-beauty-bundle.webp',
    kind: 'package',
  },
  {
    slug: 'lash-loyalty-luxe-plan',
    file: 'lash-loyalty-luxe-plan',
    title: 'Lash Loyalty Luxe Plan – Lashes by Shazz',
    description:
      'Refill rewards, exclusive gifts and VIP perks for regular lash clients with the Lash Loyalty Luxe Plan.',
    image: '/old-site/lash-loyalty-luxe-plan.webp',
    kind: 'package',
  },
  // Blog
  {
    slug: 'uv-lashes-in-kenya-complete-guide',
    file: 'uv-lashes-in-kenya-complete-guide',
    title: 'UV Lashes in Kenya: The Complete Guide (Prices, Safety & Aftercare) – Lashes by Shazz',
    description:
      'What are UV lashes, are they safe, and how much do UV lashes cost in Kenya? Prices from KES 4,060, who can wear them, and where to get UV lashes in Nairobi.',
    image: '/old-site/lash-extensions.webp',
    kind: 'post',
    date: '2026-11-04',
  },
  {
    slug: 'uv-lashes-vs-regular-lashes',
    file: 'uv-lashes-vs-regular-lashes',
    title: 'UV Lashes vs Regular Lashes: Which Is Better? – Lashes by Shazz',
    description:
      'Are UV lashes better than regular lashes? Comfort, safety, retention and Kenya prices compared side by side by Lashes by Shazz in Nairobi.',
    image: '/old-site/lash-refill-services.webp',
    kind: 'post',
    date: '2026-11-04',
  },
  {
    slug: 'how-to-become-a-uv-lash-tech-in-kenya',
    file: 'how-to-become-a-uv-lash-tech-in-kenya',
    title: 'How to Become a UV Lash Tech in Kenya – Lashes by Shazz Academy',
    description:
      'Is it hard to be a UV lash tech? UV Lash Training in Nairobi for KES 30,000 with a full UV lamp kit, certificate and mentorship, from the #1 UV lash trainers in Kenya.',
    image: '/old-site/training.webp',
    kind: 'post',
    date: '2026-11-04',
  },
  {
    slug: 'are-lash-extensions-dangerous-the-truth-your-salon-isnt-telling-you',
    file: 'are-lash-extensions-dangerous-the-truth-your-salon-isnt-telling-you',
    title: 'Are Lash Extensions Dangerous? The Truth Your Salon Isn’t Telling You – Lashes by Shazz',
    description:
      'Are lash extensions safe? What really causes lash damage and allergic reactions, and how to choose a salon that protects your natural lashes.',
    image: '/old-site/are-lash-extensions-dangerous-the-truth-your-salon-isnt-telling-you.webp',
    kind: 'post',
    date: '2025-04-16',
  },
  {
    slug: 'budget-vs-luxury-lash-salons-what-you-really-need-to-know-before-booking',
    file: 'budget-vs-luxury-lash-salons-what-you-really-need-to-know-before-booking',
    title: 'Budget vs. Luxury Lash Salons: What You Really Need to Know Before Booking – Lashes by Shazz',
    description:
      'Budget or luxury lash salon? The real differences in safety, products, skill and results to know before you book your next set.',
    image: '/old-site/budget-vs-luxury-lash-salons-what-you-really-need-to-know-before-booking.webp',
    kind: 'post',
    date: '2025-04-16',
  },
  {
    slug: '7-everyday-habits-that-are-secretly-killing-your-lash-extensions-and-how-to-stop-them',
    file: '7-everyday-habits-that-are-secretly-killing-your-lash-extensions-and-how-to-stop-them',
    title: '7 Everyday Habits That Are Secretly Killing Your Lash Extensions (And How to Stop Them) – Lashes by Shazz',
    description:
      'Lash fallout, clumping or gaps? Seven everyday habits that shorten the life of your lash extensions, and how to stop them.',
    image: '/old-site/7-everyday-habits-that-are-secretly-killing-your-lash-extensions-and-how-to-stop-them.webp',
    kind: 'post',
    date: '2025-04-16',
  },
  {
    slug: 'category/lashes',
    file: 'category-lashes',
    title: 'Lashes – Lashes by Shazz',
    description:
      'Lash care tips, aftercare advice and honest guides from the Lashes by Shazz blog.',
    image: '/old-site/category-lashes.webp',
    kind: 'category',
  },
];

export function getOldPage(slug: string) {
  return OLD_PAGES.find((p) => p.slug === slug);
}
