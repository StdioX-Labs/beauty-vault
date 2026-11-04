import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/old-site/pages';
import { Breadcrumbs } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Shasha Hair – Wigs in Nairobi | The Beauty Vault',
  description:
    'Ready-to-wear wigs in Nairobi from Shasha Hair: sleek bobs, straight units, soft curls, body wave and glam statement wigs, quality-checked with honest pricing.',
  icons: {
    icon: [{ url: '/icons/shasha-round.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/icons/shasha-round.png',
    apple: '/icons/shasha-round.png',
  },
  alternates: { canonical: `${SITE_URL}/hair` },
  openGraph: {
    title: 'Shasha Hair – Wigs in Nairobi | The Beauty Vault',
    description: 'Ready-to-wear wigs in Nairobi from Shasha Hair: sleek bobs, straight units, soft curls, body wave and glam statement wigs, quality-checked with honest pricing.',
    url: `${SITE_URL}/hair`,
    siteName: 'Lashes by Shazz',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/bg/home-hair.webp' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Shasha Hair', path: '/hair' }]} />
      {children}
    </>
  );
}
