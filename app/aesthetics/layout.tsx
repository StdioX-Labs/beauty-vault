import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/old-site/pages';
import { Breadcrumbs } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Revive Aesthetics – Skin Treatments in Nairobi | The Beauty Vault',
  description:
    'Revive Aesthetics in Nairobi: facials, skin tightening, laser hair removal, acne, scar and pigmentation treatments, and more, by The Beauty Vault.',
  icons: {
    icon: [{ url: '/icons/revive-round.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/icons/revive-round.png',
    apple: '/icons/revive-round.png',
  },
  alternates: { canonical: `${SITE_URL}/aesthetics` },
  openGraph: {
    title: 'Revive Aesthetics – Skin Treatments in Nairobi | The Beauty Vault',
    description: 'Revive Aesthetics in Nairobi: facials, skin tightening, laser hair removal, acne, scar and pigmentation treatments, and more, by The Beauty Vault.',
    url: `${SITE_URL}/aesthetics`,
    siteName: 'Lashes by Shazz',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/bg/home-aesthetics.webp' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: 'Revive Aesthetics', path: '/aesthetics' }]} />
      {children}
    </>
  );
}
