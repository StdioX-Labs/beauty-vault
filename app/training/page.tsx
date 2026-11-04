import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BlendBg from '@/lib/BlendBg';
import { SiteFooter, SiteNav } from '@/lib/old-site/SiteShell';
import { SITE_URL } from '@/lib/old-site/pages';

// Lashes by Shazz Academy. Kept at /training, the old site's training URL.
// Course details: Lloyd's UV training flyers and the old shop's training products.

const TITLE = 'Lashes by Shazz Academy – Lash Technician Training in Nairobi';
const DESCRIPTION =
  'Become a certified lash technician with Lashes by Shazz Academy. Beginner Individual Lashes Course (KES 65,000) and UV Lash Training (KES 30,000, full UV lamp kit included), with live model practice and certification in Nairobi.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/training` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/training`,
    siteName: 'Lashes by Shazz',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/old-site/training.webp' }],
  },
};

const ENQUIRE_TEL = 'tel:+254792066140';
const ENQUIRE_WHATSAPP = 'https://wa.me/254792066140';
const SELF_PACED_URL = 'https://lashtribeafrica.com/';

type Course = {
  name: string;
  price: string;
  was?: string;
  tag: string;
  featured?: boolean;
  summary: string;
  groups: { heading: string; items: string[] }[];
  meta: string;
};

const COURSES: Course[] = [
  {
    name: 'Beginner Individual Lashes Course',
    price: 'KES 65,000',
    tag: 'Start here',
    summary:
      'Everything you need to start lashing professionally, even with no experience. Learn individual lash application step by step and finish ready to take your first clients.',
    groups: [
      {
        heading: 'What you will learn',
        items: [
          'Individual lash application, from isolation to a clean finish',
          'Lash mapping and styling for different eye shapes',
          'Sanitation, safety and client consultations',
          'Practice on live models under supervision',
          '1-month course: Fridays and Saturdays, 8am to 2pm',
          'Certificate of completion',
          'Access to our community and alumni benefits',
        ],
      },
      {
        heading: 'Why start a lash career',
        items: [
          'Low start-up cost compared with most beauty businesses',
          'Flexible hours: work from a studio, at home or on house calls',
          'Repeat clients, with refills every 2 to 3 weeks',
          'A skill you can grow into your own brand or training business',
        ],
      },
    ],
    meta: '1 month · For complete beginners',
  },
  {
    name: 'UV Lash Training',
    price: 'KES 30,000',
    was: 'KES 60,000',
    tag: 'Runs weekly',
    featured: true,
    summary:
      'Learn the UV lash technique and start offering it right away. Your full UV lamp kit is included, so you leave ready to work.',
    groups: [
      {
        heading: 'What you get',
        items: [
          '5-day intensive training',
          'Full UV lamp kit',
          'Certificate on completion',
          'Continuous mentorship',
        ],
      },
      {
        heading: 'Why offer UV lashes',
        items: [
          'Instant curing',
          'No irritation and no fumes',
          'The simplest aftercare',
          '4 to 6 weeks retention',
        ],
      },
    ],
    meta: 'For advanced students · A new class every week',
  },
];

const JOURNEY = [
  { title: 'Enrol', text: 'Choose your course, get your kit and book your in-person class.' },
  { title: 'On-site class', text: 'Hands-on training with our certified educators, who are invested in your success.' },
  { title: 'Model practice', text: 'Build real-world experience lashing live models.' },
  { title: 'Certification', text: 'Our master educator reviews your live model work and unlocks your Lashes by Shazz certificate.' },
  { title: 'Keep learning', text: 'Keep growing on Lash Tribe Africa with unlimited self-paced courses on lash techniques and building a profitable lash business.', href: SELF_PACED_URL },
];

const FOR_WHO = [
  'Beginners with no lash experience',
  'Beauty professionals adding lashes to their services',
  'Entrepreneurs preparing to open a lash business',
];

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

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg/training-hands.webp')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/20 via-transparent to-rose-300/20 mix-blend-overlay" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 text-center">
          <Image
            src="/logos/lashes.png"
            alt="Lashes by Shazz Academy"
            width={500}
            height={150}
            className="h-16 sm:h-20 md:h-24 w-auto mx-auto mb-8 drop-shadow-2xl"
            style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(290deg)' }}
            priority
          />
          <Eyebrow>Lashes by Shazz Academy</Eyebrow>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-italianno)] text-white leading-tight drop-shadow-2xl">
            Become a Certified<br />Lash Technician
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-3xl mx-auto font-light leading-relaxed">
            Learn internationally acclaimed lash techniques from Kenya&rsquo;s leading lash studio. Gain a skill you can
            earn from and join a community of lash artists.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#courses"
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold hover:shadow-2xl hover:shadow-pink-300/40 transition"
            >
              View Courses
            </a>
            <a
              href={ENQUIRE_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border border-white/30 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition"
            >
              Enquire on WhatsApp
            </a>
          </div>
          <p className="mt-8 text-sm text-white/60">Classes run 8am to 2pm, Friday to Saturday · Absa Towers, Nairobi CBD. Learn UV lashes with the No. 1 UV lash trainers in Kenya.</p>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="relative py-24 sm:py-28 overflow-hidden">
        <BlendBg src="/old-site/lash-extensions.webp" side="right" opacity={0.25} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <Eyebrow>Our Courses</Eyebrow>
            <h2 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">Training Packages</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {COURSES.map((c) => (
              <div
                key={c.name}
                className={`group relative overflow-hidden rounded-3xl border p-8 sm:p-10 transition-all duration-500 ${
                  c.featured
                    ? 'border-pink-300/30 bg-gradient-to-br from-pink-300/10 via-white/[0.04] to-transparent hover:border-pink-300/50'
                    : 'border-white/10 bg-white/[0.04] hover:border-white/25'
                }`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    backgroundImage: "url('/academy/studio.webp')",
                    maskImage: 'linear-gradient(to left, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
                  }}
                />
                <div className="relative flex h-full flex-col">
                  <p className="inline-block self-start mb-4 px-3 py-1 rounded-full bg-pink-300/15 text-pink-200 text-[10px] tracking-[0.25em] uppercase">
                    {c.tag}
                  </p>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-3xl font-light text-white">{c.name}</h3>
                    <p className="text-3xl font-light text-pink-200">
                      {c.was && <span className="mr-3 text-lg text-white/40 line-through">{c.was}</span>}
                      {c.price}
                    </p>
                  </div>
                  <p className="mt-4 text-white/70 leading-relaxed">{c.summary}</p>
                  {c.groups.map((g) => (
                    <div key={g.heading} className="mt-6">
                      <p className="text-xs tracking-[0.25em] uppercase text-pink-200/80 mb-3">{g.heading}</p>
                      <ul className="space-y-2.5">
                        {g.items.map((pt) => (
                          <li key={pt} className="flex gap-3 text-white/75">
                            <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-pink-300 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p className="mt-6 text-xs tracking-wider uppercase text-white/45">{c.meta}</p>
                  <div className="mt-auto pt-8 flex flex-wrap gap-3">
                    <a
                      href={ENQUIRE_WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 text-xs tracking-[0.2em] uppercase font-semibold"
                    >
                      Enrol now
                    </a>
                    <a href={ENQUIRE_TEL} className="px-6 py-3 rounded-full border border-white/25 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition">
                      Call 0792 066 140
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Self-paced learning on Lash Tribe Africa */}
          <div className="relative mt-6 overflow-hidden rounded-3xl border border-pink-300/25 bg-gradient-to-br from-pink-300/[0.12] via-white/[0.03] to-rose-300/[0.08] p-8 sm:p-10">
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="min-w-0">
                <p className="text-xs tracking-[0.3em] uppercase text-pink-200/80 mb-3">Lash Tribe Africa</p>
                <h3 className="text-3xl sm:text-4xl font-light text-white">Introducing Self-Paced Learning</h3>
                <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
                  We introduce <span className="text-pink-200">lashtribeafrica.com</span>, where you can sign up and learn
                  unlimited courses about lashes, lash business and more. This is where you really master how to turn your
                  skill into a profitable and thriving business.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {['Unlimited courses', 'Lash techniques', 'Lash business', 'Learn at your own pace'].map((t) => (
                    <li key={t} className="px-4 py-1.5 rounded-full border border-white/15 text-sm text-white/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={SELF_PACED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto text-center px-8 py-4 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 text-xs tracking-[0.2em] uppercase font-semibold hover:shadow-xl hover:shadow-pink-300/30 transition lg:whitespace-nowrap"
              >
                Sign up on Lash Tribe Africa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certification journey */}
      <section className="relative py-24 sm:py-28 overflow-hidden border-t border-white/5">
        <BlendBg src="/bg/page-default.webp" side="left" opacity={0.25} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">Your Certification Journey</h2>
          </div>
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((j, i) => (
              <li key={j.title} className="flex gap-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 text-gray-900 font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-light text-white">{j.title}</h3>
                  <p className="mt-1 text-white/60 leading-relaxed">{j.text}</p>
                  {'href' in j && j.href && (
                    <a href={j.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs tracking-wider uppercase text-pink-300 hover:text-pink-200">
                      Visit Lash Tribe Africa →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for + CTA */}
      <section className="relative py-24 sm:py-28 overflow-hidden border-t border-white/5">
        <BlendBg src="/bg/home-hero.webp" side="right" opacity={0.3} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-pink-200/80 mb-4">Who it&rsquo;s for</p>
            <h2 className="text-4xl sm:text-5xl font-light text-white leading-tight">Start or grow your lash career</h2>
            <ul className="mt-8 space-y-4">
              {FOR_WHO.map((w) => (
                <li key={w} className="flex gap-3 text-lg text-white/80">
                  <span aria-hidden className="text-pink-300">✓</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-8 sm:p-10 text-center">
            <p className="text-4xl sm:text-5xl font-[family-name:var(--font-italianno)] text-white">Ready to train with us?</p>
            <p className="mt-4 text-white/70">
              Talk to us about the next class, kits and payment. Training takes place at our CBD studio, Absa Towers,
              Lower Ground (Loita Street).
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={ENQUIRE_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 text-xs tracking-[0.2em] uppercase font-semibold"
              >
                WhatsApp us
              </a>
              <Link href="/lashes" className="px-8 py-4 rounded-full border border-white/25 text-white text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition">
                See our UV lashes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
