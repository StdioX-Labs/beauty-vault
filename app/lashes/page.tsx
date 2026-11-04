import type { Metadata } from 'next';
import LashesClient from './LashesClient';
import { SITE_URL } from '@/lib/old-site/pages';

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
  return <LashesClient />;
}
