import type { Metadata } from 'next';
import LashesClient from './LashesClient';
import { SITE_URL } from '@/lib/old-site/pages';
import { LASH_SETS, LASH_REMOVAL } from './LashMenu';
import { Breadcrumbs, JsonLd } from '@/lib/seo';

// Every set and refill with its price (KES, VAT included), so search engines can show prices.
const offer = (name: string, price: number, branch: '#hurlingham' | '#cbd' | null = null) => ({
  '@type': 'Offer',
  price,
  priceCurrency: 'KES',
  itemOffered: { '@type': 'Service', name, provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'Nairobi, Kenya' },
  ...(branch ? { seller: { '@id': `${SITE_URL}/${branch}` } } : {}),
});
const priceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Lashes by Shazz lash extension prices (KES, VAT included)',
  url: `${SITE_URL}/lashes`,
  itemListElement: [
    ...LASH_SETS.flatMap((s) => [
      offer(`UV ${s.name}`, s.uv.set),
      offer(`UV ${s.name.replace('Set', 'Refill')}`, s.uv.refill),
    ]),
    ...LASH_SETS.flatMap((s) => [offer(s.name, s.normal.set), offer(s.name.replace('Set', 'Refill'), s.normal.refill)]),
    offer('Lash Removal', LASH_REMOVAL),
  ],
};

export const metadata: Metadata = {
  title: 'UV Lash Extensions in Nairobi – Lashes by Shazz',
  description:
    'The #1 UV lash parlour and trainers in Kenya. UV lash extensions with instant curing, no fumes and 4 to 6 weeks retention. Classic, hybrid, volume and mega volume sets from KES 2,900.',
  alternates: { canonical: `${SITE_URL}/lashes` },
  openGraph: {
    title: 'UV Lash Extensions in Nairobi – Lashes by Shazz',
    description: 'UV lash extensions in Nairobi: instant curing, no irritation, no fumes and 4 to 6 weeks retention.',
    url: `${SITE_URL}/lashes`,
    siteName: 'Lashes by Shazz',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/old-site/lash-extensions.webp' }],
  },
};

export default function LashesPage() {
  return (
    <>
      <JsonLd data={priceJsonLd} />
      <Breadcrumbs trail={[{ name: 'UV Lashes', path: '/lashes' }]} />
      <LashesClient />
    </>
  );
}
