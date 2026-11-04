import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { SITE_URL } from '@/lib/old-site/pages';
import { Breadcrumbs } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us – Lashes by Shazz',
  description:
    'About Lashes by Shazz and The Beauty Vault in Nairobi: luxury lash extensions, Peruvian wigs, microshading and aesthetics, plus our lash aftercare tips and price list.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About Us – Lashes by Shazz',
    description: 'Luxury lash extensions, wigs and beauty treatments in Nairobi. Because every Queen deserves to shine.',
    url: `${SITE_URL}/about`,
    siteName: 'Lashes by Shazz',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/old-site/about.webp' }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'About Us', path: '/about' }]} />
      <AboutClient />
    </>
  );
}
