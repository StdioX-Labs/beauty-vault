import Link from 'next/link';
import type { ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';

export const BRANCHES = [
  { name: 'Hurlingham Branch', phone: '+254 769 781 771', tel: '+254769781771', address: 'Silverpool Suite, Jabavu Lane, Nairobi' },
  { name: 'CBD Branch', phone: '+254 792 066 140', tel: '+254792066140', address: 'Absa Towers, Lower Ground (Loita Street)' },
];

export const REVIVE = {
  name: 'Revive Aesthetics',
  phone: '+254 799 715 196',
  tel: '+254799715196',
  address: 'B12, Silverpool Suite, Jabavu Lane, Nairobi',
};

const ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9a7.3 7.3 0 0 0 4.2 1.3V7.2a4.3 4.3 0 0 1-3.1-1.4z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.7c0-.9.3-1.5 1.6-1.5h1.6V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.5V21h3z" />
    </svg>
  ),
};

const SOCIALS = [
  {
    brand: 'Lashes by Shazz',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/lashesbyshazz/' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@lashesbyshazz' },
      { label: 'Facebook', href: 'https://www.facebook.com/lashesbyshazz' },
    ],
  },
  {
    brand: 'Lashes by Shazz Academy',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/lashesbyshazzacademy/' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@lashesbyshazzacademy' },
    ],
  },
  {
    brand: 'Revive Aesthetics',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/reviveaesthetics_ke/' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61592063733678' },
    ],
  },
  {
    brand: 'Shasha Hair',
    links: [{ label: 'Instagram', href: 'https://www.instagram.com/shashahair_ke/' }],
  },
];

const FOOTER = [
  {
    title: 'Services',
    links: [
      { href: '/lash-extensions', label: 'Lash Extensions' },
      { href: '/lash-refill-services', label: 'Lash Refills' },
      { href: '/microshading', label: 'Microshading' },
      { href: '/peruvian-wigs', label: 'Peruvian Wigs' },
      { href: '/beauty-wellness', label: 'Beauty & Wellness' },
      { href: '/house-calls', label: 'House Calls' },
    ],
  },
  {
    title: 'Packages',
    links: [
      { href: '/luxury-lash-brow-package', label: 'Student Slay Pass' },
      { href: '/executive-glow-plan', label: 'Executive Glow Plan' },
      { href: '/party-bridal-squad-glam', label: 'Party & Bridal Squad Glam' },
      { href: '/luxe-bridal-beauty-bundle', label: 'Luxe Bridal Beauty Bundle' },
      { href: '/lash-loyalty-luxe-plan', label: 'Lash Loyalty Luxe Plan' },
    ],
  },
  {
    title: 'Lashes by Shazz',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/our-team', label: 'Our Team' },
      { href: '/faq-page', label: 'FAQ' },
      { href: '/category/lashes', label: 'Blog' },
      { href: '/training', label: 'Lashes by Shazz Academy' },
      { href: '/lashes-by-shazz-investment-opporunities', label: 'Investment Opportunities' },
      { href: 'https://lashtribeafrica.com/', label: 'Shop (Lash Tribe Africa)' },
    ],
  },
];

export function SiteNav() {
  return <Navbar />;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-[family-name:var(--font-italianno)] text-4xl text-white">Lashes by Shazz</p>
          <p className="mt-4 text-xs uppercase tracking-wider text-white/50">Call / Text</p>
          {BRANCHES.map((br) => (
            <div key={br.name} className="mt-4 text-sm">
              <p className="text-white">{br.name}</p>
              <a href={`tel:${br.tel}`} className="text-pink-300 hover:text-pink-200">{br.phone}</a>
              <p className="text-white/60">{br.address}</p>
            </div>
          ))}
          <div className="mt-4 text-sm">
            <p className="text-white">{REVIVE.name}</p>
            <a href={`tel:${REVIVE.tel}`} className="text-pink-300 hover:text-pink-200">{REVIVE.phone}</a>
            <p className="text-white/60">{REVIVE.address}</p>
          </div>
          <p className="mt-4 text-sm text-white/60">Lashes by Shazz is open 8am to 8pm, Monday to Saturday.</p>
        </div>
        {FOOTER.map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-3">{col.title}</p>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="border-t border-white/10 pt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIALS.map((b) => (
            <div key={b.brand}>
              <p className="text-xs uppercase tracking-wider text-white/50 mb-2">{b.brand}</p>
              <div className="flex gap-3">
                {b.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${b.brand} on ${l.label}`}
                    title={l.label}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-pink-300/60 transition"
                  >
                    {ICONS[l.label]}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-white/40 pb-8">
        © {new Date().getFullYear()} The Beauty Vault
      </p>
    </footer>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}
