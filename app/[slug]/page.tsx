import { notFound } from 'next/navigation';
import OldPageView, { oldPageMetadata } from '@/lib/old-site/OldPageView';
import { OLD_PAGES, getOldPage } from '@/lib/old-site/pages';

// Pages migrated from the old lashesbyshazz.com, served at their old URLs.
export const dynamicParams = false;

export function generateStaticParams() {
  // /training has its own Academy page (app/training).
  return OLD_PAGES.filter((p) => !p.slug.includes('/') && p.slug !== 'training' && p.slug !== 'our-team').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const page = getOldPage((await params).slug);
  return page ? oldPageMetadata(page) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = getOldPage((await params).slug);
  if (!page) notFound();
  return <OldPageView page={page} />;
}
