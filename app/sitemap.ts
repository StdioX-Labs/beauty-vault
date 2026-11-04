import type { MetadataRoute } from 'next';
import { OLD_PAGES, SITE_URL } from '@/lib/old-site/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const main = ['', '/lashes', '/about', '/hair', '/aesthetics'].map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.9,
  }));
  const old = OLD_PAGES.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: p.kind === 'service' ? 0.8 : p.kind === 'post' ? 0.6 : 0.7,
    ...(p.date ? { lastModified: p.date } : {}),
  }));
  return [...main, ...old];
}
