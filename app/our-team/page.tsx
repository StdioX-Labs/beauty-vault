import type { Metadata } from 'next';
import Image from 'next/image';
import BlendBg from '@/lib/BlendBg';
import { SiteFooter, SiteNav, BRANCHES } from '@/lib/old-site/SiteShell';
import { SITE_URL } from '@/lib/old-site/pages';
import { TECHS } from '@/lib/techs';

const description =
  'Meet the Lashes by Shazz team: founders Sharon and Evans, and the lash technicians at our Hurlingham and CBD branches in Nairobi.';

export const metadata: Metadata = {
  title: 'Our Team – Lashes by Shazz',
  description,
  alternates: { canonical: `${SITE_URL}/our-team` },
  openGraph: {
    title: 'Our Team – Lashes by Shazz',
    description,
    url: `${SITE_URL}/our-team`,
    type: 'website',
    images: [{ url: '/old-site/our-team.webp' }],
  },
};

const FOUNDERS = [
  {
    name: 'Sharon',
    role: 'Creative founder',
    image: '/old-site/team-sharon.webp',
    text: 'A master of lash installation and permanent make-up. She has hacked beauty enhancement and loves the fun, friendly working environment she has created for the other beauty babes to work from.',
  },
  {
    name: 'Evans',
    role: 'Founder · Lash tutor and technician',
    image: '/old-site/team-evans.webp',
    text: 'Talented and passionate about everything beauty. A wizard in individual lash installation, and an eloquent, understanding lash tutor and technician. For a magical experience, he is your go-to person.',
  },
];

const BRANCH_TEAMS = [
  { branch: BRANCHES[1], id: 1, techs: TECHS.filter((t) => t.branch === 1) },
  { branch: BRANCHES[0], id: 2, techs: TECHS.filter((t) => t.branch === 2) },
];

const slugify = (n: string) => n.toLowerCase().replace(/[^a-z]+/g, '-');

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
      <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-pink-300" />
      <div className="w-2 h-2 bg-pink-300 rounded-full" />
      <p className="text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.4em] uppercase text-pink-200 font-light">{children}</p>
      <div className="w-2 h-2 bg-pink-300 rounded-full" />
      <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-pink-300" />
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-20 overflow-hidden">
        <BlendBg src="/bg/about-hero.webp" side="right" opacity={0.35} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Eyebrow>Our Team</Eyebrow>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-[family-name:var(--font-italianno)] text-white leading-tight">
            The hands behind your lashes
          </h1>
          <p className="mt-6 text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            Founded by Sharon and Evans, and powered by a team of lash technicians across our Hurlingham and CBD
            branches. Tap a lash technician to book with them.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <Eyebrow>Founders</Eyebrow>
          </div>
          <div className="grid gap-14 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="text-center">
                <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60">
                  <Image
                    src={f.image}
                    alt={`${f.name}, ${f.role}, Lashes by Shazz`}
                    fill
                    sizes="240px"
                    className="rounded-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                  <div aria-hidden className="absolute inset-0 rounded-full ring-1 ring-pink-300/40" />
                </div>
                <h2 className="mt-6 text-5xl font-[family-name:var(--font-italianno)] text-white">{f.name}</h2>
                <p className="mt-1 text-xs tracking-[0.25em] uppercase text-pink-200">{f.role}</p>
                <p className="mt-4 text-white/65 leading-relaxed max-w-md mx-auto">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lash technicians by branch */}
      {BRANCH_TEAMS.map((b, idx) => (
        <section key={b.branch.name} className="relative py-20 sm:py-24 overflow-hidden border-t border-white/5">
          <BlendBg src={idx === 0 ? '/bg/about-lashes.webp' : '/bg/page-service.webp'} side={idx === 0 ? 'left' : 'right'} opacity={0.22} />
          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-12">
              <Eyebrow>{b.branch.name}</Eyebrow>
              <h2 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">Lash technicians</h2>
              <p className="mt-4 text-white/60">
                {b.branch.address} ·{' '}
                <a href={`tel:${b.branch.tel}`} className="text-pink-300 hover:text-pink-200">{b.branch.phone}</a>
              </p>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {b.techs.map(({ name: n, slug }) => (
                <li key={n}>
                  <a
                    href={`/book/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Book with ${n}`}
                    className="group block text-center"
                  >
                  <div className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36">
                    <Image
                      src={`/team/${slugify(n)}.webp`}
                      alt={`${n}, lash technician at the ${b.branch.name}`}
                      fill
                      sizes="144px"
                      className="rounded-full object-cover"
                      style={{ objectPosition: 'center top' }}
                    />
                    <div aria-hidden className="absolute inset-0 rounded-full ring-1 ring-white/15 group-hover:ring-pink-300/70 transition" />
                  </div>
                  <p className="mt-4 text-lg font-light text-white">{n}</p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 group-hover:text-pink-300 transition-colors">Book with {n.split(' ')[0]} →</p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <a
                href={`/book/${b.id === 1 ? 'cbd' : 'hurlingham'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 text-xs tracking-[0.2em] uppercase font-semibold"
              >
                Book at {b.branch.name}
              </a>
            </div>
          </div>
        </section>
      ))}

      <SiteFooter />
    </div>
  );
}
