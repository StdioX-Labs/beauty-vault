import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlendBg from '@/lib/BlendBg';
import SiteShell from '@/lib/old-site/SiteShell';
import { BOOKING_URL, SITE_URL } from '@/lib/old-site/pages';
import { Breadcrumbs, JsonLd, ORG_ID, SAME_AS } from '@/lib/seo';
import { TECHS } from '@/lib/techs';

// One page per branch, for "lashes Nairobi" and "lash tech near me" searches.
// TODO(Lloyd): replace MAP_QUERY with the exact Google Maps pin once you send the links,
// and add geo coordinates to the schema below.

type Branch = {
  slug: 'hurlingham' | 'cbd';
  area: string;
  name: string;
  phone: string;
  tel: string;
  street: string;
  address: string;
  mapQuery: string;
  ldId: string;
  techBranch: number;
  title: string;
  description: string;
  h1: string;
  intro: string;
  directions: string[];
};

const BRANCHES: Record<string, Branch> = {
  hurlingham: {
    slug: 'hurlingham',
    area: 'Hurlingham',
    name: 'Lashes by Shazz – Hurlingham Branch',
    phone: '+254 769 781 771',
    tel: '+254769781771',
    street: 'Silverpool Suite, Jabavu Lane',
    address: 'Silverpool Suite, Jabavu Lane, Nairobi',
    mapQuery: 'Silverpool Suites Jabavu Lane Nairobi',
    ldId: `${SITE_URL}/#hurlingham`,
    techBranch: 2,
    title: 'Lashes in Hurlingham, Nairobi – UV Lash Techs Near You | Lashes by Shazz',
    description:
      'Lash extensions and UV lashes in Hurlingham, Nairobi. Silverpool Suite, Jabavu Lane. Open 8am to 8pm Monday to Saturday. UV sets from KES 4,060, classic from KES 2,900. Call +254 769 781 771.',
    h1: 'Lashes in Hurlingham, Nairobi',
    intro:
      'Our Hurlingham branch is at Silverpool Suite on Jabavu Lane. Come in for UV lashes, classic, hybrid, volume and mega volume lash extensions, refills and removals from trained lash technicians, then book online in a minute.',
    directions: [
      'Find Jabavu Lane in Hurlingham, Nairobi, and look for Silverpool Suite.',
      'Revive Aesthetics is in the same building (B12), so you can pair a lash set with a skin treatment.',
      'Call +254 769 781 771 if you need help finding us on the day.',
    ],
  },
  cbd: {
    slug: 'cbd',
    area: 'Nairobi CBD',
    name: 'Lashes by Shazz – CBD Branch',
    phone: '+254 792 066 140',
    tel: '+254792066140',
    street: 'Absa Towers, Lower Ground, Loita Street',
    address: 'Absa Towers, Lower Ground (Loita Street), Nairobi',
    mapQuery: 'Absa Towers Loita Street Nairobi',
    ldId: `${SITE_URL}/#cbd`,
    techBranch: 1,
    title: 'Lashes in Nairobi CBD – UV Lash Techs Near You | Lashes by Shazz',
    description:
      'Lash extensions and UV lashes in Nairobi CBD. Absa Towers, Lower Ground, Loita Street. Open 8am to 8pm Monday to Saturday. UV sets from KES 4,060, classic from KES 2,900. Call +254 792 066 140.',
    h1: 'Lashes in Nairobi CBD',
    intro:
      'Our CBD branch is on the Lower Ground floor of Absa Towers on Loita Street, close to the city centre. Book UV lashes, classic, hybrid, volume or mega volume lash extensions, refills and removals before work, at lunch or after.',
    directions: [
      'Head to Absa Towers on Loita Street in Nairobi CBD.',
      'Take the stairs or lift down to the Lower Ground floor.',
      'Call +254 792 066 140 if you need help finding us on the day.',
    ],
  },
};

const PRICES = [
  ['UV Classic', 'KES 4,060', 'Refill KES 2,900'],
  ['UV Hybrid', 'KES 5,220', 'Refill KES 4,060'],
  ['UV Volume', 'KES 6,380', 'Refill KES 5,220'],
  ['UV Mega Volume', 'KES 7,540', 'Refill KES 6,380'],
  ['Classic', 'KES 2,900', 'Refill KES 2,320'],
  ['Hybrid', 'KES 4,060', 'Refill KES 3,480'],
  ['Volume', 'KES 5,220', 'Refill KES 4,640'],
  ['Mega Volume', 'KES 6,380', 'Refill KES 5,800'],
];

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(BRANCHES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = BRANCHES[(await params).slug];
  if (!b) return {};
  const url = `${SITE_URL}/branches/${b.slug}`;
  return {
    title: b.title,
    description: b.description,
    alternates: { canonical: url },
    openGraph: {
      title: b.title,
      description: b.description,
      url,
      siteName: 'Lashes by Shazz',
      locale: 'en_KE',
      type: 'website',
      images: [{ url: '/old-site/lash-extensions.webp' }],
    },
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = BRANCHES[(await params).slug];
  if (!b) notFound();
  const other = b.slug === 'cbd' ? BRANCHES.hurlingham : BRANCHES.cbd;
  const techs = TECHS.filter((t) => t.branch === b.techBranch);
  const url = `${SITE_URL}/branches/${b.slug}`;
  const q = encodeURIComponent(b.mapQuery);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': b.ldId,
    name: b.name,
    url,
    parentOrganization: { '@id': ORG_ID },
    description: `UV lashes and classic, hybrid, volume and mega volume lash extensions in ${b.area}, Nairobi, Kenya.`,
    telephone: b.tel,
    image: `${SITE_URL}/bg/home-hero.webp`,
    priceRange: 'KES 2,900 - KES 7,540',
    currenciesAccepted: 'KES',
    sameAs: SAME_AS,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${q}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.street,
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
    potentialAction: { '@type': 'ReserveAction', target: `${SITE_URL}/book` },
  };

  return (
    <SiteShell>
      <JsonLd data={ld} />
      <Breadcrumbs trail={[{ name: 'Branches', path: '/branches/hurlingham' }, { name: b.area, path: `/branches/${b.slug}` }]} />
      <header className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/old-site/lash-extensions.webp')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0a0a0a]" />
        <div className="relative z-10 max-w-3xl mx-auto w-full px-4 sm:px-6 pt-32 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-200/90 mb-4">Lashes by Shazz</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">{b.h1}</h1>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <BlendBg src="/bg/page-service.webp" side="right" opacity={0.32} className="lg:w-[40%]" />
        <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-12">
          <p className="text-lg text-white/75 leading-relaxed">{b.intro}</p>

          <section className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-light text-white mb-3">Find us</h2>
              <p className="text-white/80">{b.name.replace('Lashes by Shazz – ', '')}</p>
              <p className="text-white/60">{b.address}</p>
              <p className="mt-3">
                <a href={`tel:${b.tel}`} className="text-pink-300 hover:text-pink-200">{b.phone}</a>
              </p>
              <p className="mt-3 text-white/60">Open 8am to 8pm, Monday to Saturday.</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-pink-300 hover:text-pink-200"
              >
                Get directions
              </a>
            </div>
            <div>
              <h2 className="text-2xl font-light text-white mb-3">How to get here</h2>
              <ul className="space-y-2 text-white/70 text-sm list-disc pl-5">
                {b.directions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <iframe
              title={`Map of Lashes by Shazz ${b.area}`}
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              className="w-full h-72 rounded-2xl border border-white/10"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

          <section>
            <h2 className="text-2xl font-light text-white mb-2">Lash extension prices in {b.area}, Nairobi</h2>
            <p className="text-white/60 mb-4 text-sm">Prices include VAT. Refill within 21 days of your last appointment.</p>
            <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {PRICES.map(([n, p, r]) => (
                <div key={n} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                  <span className="text-white">{n}</span>
                  <span className="text-white/70">{p} <span className="text-white/40">· {r}</span></span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/60">
              See the full <Link href="/lashes" className="text-pink-300 hover:text-pink-200">lash menu</Link> or the{' '}
              <Link href="/lash-extensions" className="text-pink-300 hover:text-pink-200">lash extensions page</Link>.
            </p>
          </section>

          {techs.length > 0 && (
            <section>
              <h2 className="text-2xl font-light text-white mb-3">Lash techs at this branch</h2>
              <p className="text-white/70">
                {techs.map((t) => t.name).join(', ')}. Looking for a lash tech near you? Every technician here is trained in UV lashes.{' '}
                <Link href="/our-team" className="text-pink-300 hover:text-pink-200">Meet the team</Link>.
              </p>
            </section>
          )}

          <section className="text-center border-t border-white/10 pt-12">
            <p className="text-3xl font-light text-white">Book your lashes in {b.area}</p>
            <a
              href={BOOKING_URL}
              className="inline-block mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 font-semibold tracking-wide"
            >
              Book an appointment
            </a>
            <p className="mt-6 text-sm text-white/50">
              Also at our <Link href={`/branches/${other.slug}`} className="text-pink-300 hover:text-pink-200">{other.area} branch</Link>.
            </p>
          </section>
        </main>
      </div>
    </SiteShell>
  );
}
