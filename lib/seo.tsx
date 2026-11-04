import { SITE_URL } from './old-site/pages';

// Shared structured data (JSON-LD) helpers. Search engines read these; visitors don't see them.

export const ORG_ID = `${SITE_URL}/#organization`;

// Official social profiles, so search engines tie them to the brand.
export const SAME_AS = [
  'https://www.instagram.com/lashesbyshazz/',
  'https://www.tiktok.com/@lashesbyshazz',
  'https://www.facebook.com/lashesbyshazz',
  'https://www.instagram.com/lashesbyshazzacademy/',
  'https://www.tiktok.com/@lashesbyshazzacademy',
];

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Breadcrumb trail for search results, e.g. Home › Blog › Post. Home is added automatically.
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: 'Home', path: '' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return <JsonLd data={breadcrumbJsonLd(trail)} />;
}
