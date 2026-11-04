import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Markdown from './Markdown';
import BlendBg from '../BlendBg';
import SiteShell from './SiteShell';
import { BOOKING_URL, SITE_URL, type OldPage } from './pages';

export function readCopy(file: string) {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'old-site', `${file}.md`), 'utf8');
}

function h1Of(md: string, fallback: string) {
  const m = /^#\s+(.+)$/m.exec(md);
  return (m ? m[1] : fallback).replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
}

export function oldPageMetadata(page: OldPage): Metadata {
  const url = `${SITE_URL}/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: 'Lashes by Shazz',
      locale: 'en_KE',
      type: page.kind === 'post' ? 'article' : 'website',
      images: [{ url: page.image }],
      ...(page.date ? { publishedTime: page.date } : {}),
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [page.image] },
  };
}

const SIDE_IMAGE: Record<OldPage['kind'], string> = {
  page: '/bg/page-default.webp',
  service: '/bg/page-service.webp',
  package: '/bg/page-package.webp',
  post: '/bg/page-post.webp',
  category: '/bg/page-post.webp',
};

const EYEBROW: Record<OldPage['kind'], string> = {
  page: 'Lashes by Shazz',
  service: 'Our Services',
  package: 'Our Packages',
  post: 'Lashes Blog',
  category: 'Lashes Blog',
};

export default function OldPageView({ page }: { page: OldPage }) {
  const md = readCopy(page.file);
  const h1 = h1Of(md, page.title);

  const jsonLd =
    page.kind === 'post'
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: h1,
          description: page.description,
          image: `${SITE_URL}${page.image}`,
          datePublished: page.date,
          author: { '@type': 'Organization', name: 'Lashes by Shazz' },
          publisher: { '@type': 'Organization', name: 'Lashes by Shazz' },
          mainEntityOfPage: `${SITE_URL}/${page.slug}`,
        }
      : null;

  return (
    <SiteShell>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <header className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${page.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0a0a0a]" />
        <div className="relative z-10 max-w-3xl mx-auto w-full px-4 sm:px-6 pt-32 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-200/90 mb-4">
            {EYEBROW[page.kind]}
            {page.date && ` · ${new Date(page.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">{h1}</h1>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <BlendBg src={SIDE_IMAGE[page.kind]} side="right" opacity={0.32} className="lg:w-[40%]" />
        <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <Markdown source={md} skipFirstH1 />
        </main>
      </div>

      <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-pink-300/10 via-transparent to-rose-300/10">
        <BlendBg src="/bg/home-lashes.webp" side="left" opacity={0.25} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-3xl sm:text-4xl font-light text-white">Ready for your next set?</p>
          <p className="mt-3 text-white/60">Book online, or call 0769 781 771 to schedule a treatment.</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 font-semibold tracking-wide"
          >
            Book an appointment
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
