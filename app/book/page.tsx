import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/lib/old-site/SiteShell';
import { Breadcrumbs } from '@/lib/seo';
import BookFlow from './BookFlow';

export const metadata: Metadata = {
  title: 'Book UV Lashes & Lash Extensions in Nairobi | Lashes by Shazz',
  description:
    'Book UV lash extensions, refills, normal lash sets, removal or microshading at Lashes by Shazz CBD or Hurlingham, Nairobi. See prices, pick your lash tech and time in under two minutes.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Book your lashes | Lashes by Shazz',
    description: 'UV lashes from KES 4,060. Pick your set, your lash tech and your time online.',
    url: '/book',
    images: [{ url: '/bg/home-lashes.webp' }],
  },
};

// A focused page: small header, the four booking steps, the usual footer.
export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Breadcrumbs trail={[{ name: 'Book', path: '/book' }]} />
      <header className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/icons/lashesbyshazz-round.png" alt="" width={40} height={40} className="w-10 h-10 rounded-full" />
          <span className="font-[family-name:var(--font-italianno)] text-3xl text-white">Lashes by Shazz</span>
        </Link>
        <Link href="/lashes" className="text-xs tracking-wider uppercase text-white/50 hover:text-white">
          Prices
        </Link>
      </header>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <BookFlow />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
