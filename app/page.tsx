import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import BlendBg from '@/lib/BlendBg';
import { SiteFooter } from '@/lib/old-site/SiteShell';
import { BOOKING_URL as lashesBookingUrl, SITE_URL } from '@/lib/old-site/pages';
import { ORG_ID, SAME_AS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Lashes by Shazz | UV Lashes & Lash Extensions in Nairobi, Kenya',
  description:
    'Lashes by Shazz, the #1 UV lash parlour and trainers in Kenya. UV lashes from KES 4,060 and classic, hybrid, volume and mega volume lash extensions from KES 2,900, plus refills and lash training in Hurlingham and Nairobi CBD.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Lashes by Shazz | UV Lashes & Lash Extensions in Nairobi, Kenya',
    description:
      'UV lashes, classic to mega volume lash extensions, refills and lash training in Hurlingham and Nairobi CBD.',
    url: SITE_URL,
    siteName: 'Lashes by Shazz',
    locale: 'en_KE',
    type: 'website',
    images: [{ url: '/old-site/lash-extensions.webp' }],
  },
};

// Copy carried over from the old lashesbyshazz.com homepage.
const lashServices = [
  {
    href: '/lashes#uv-lashes',
    title: 'UV Lash Extensions',
    badge: 'The No. 1 parlour for UV lashes in Nairobi',
    text: 'Instant curing, no irritation, no fumes and 4 to 6 weeks retention. Sets from KES 4,060.',
  },
  { href: '/lash-extensions', title: 'Lash Extensions', text: 'Classic to mega volume sets, customised to your eye shape and style.' },
  { href: '/lash-refill-services', title: 'Lash Refills', text: 'Keep your set full with a refill within 21 days of your last appointment.' },
  { href: '/microshading', title: 'Microshading', text: 'Soft, shaded semi-permanent brows for a naturally fuller look.' },
  { href: '/peruvian-wigs', title: 'Peruvian Wigs', text: '100% premium Peruvian hair with undetectable HD lace, pre-plucked and ready to wear.' },
  { href: '/beauty-wellness', title: 'Beauty & Wellness IV Drips', text: 'Hydration, brightening and anti-ageing drips that work from the inside out.' },
  { href: '/house-calls', title: 'House Calls', text: 'The full salon experience at your home, hotel or event.' },
];

const lashPackages = [
  { href: '/luxury-lash-brow-package', title: 'Student Slay Pass' },
  { href: '/executive-glow-plan', title: 'Executive Glow Plan' },
  { href: '/party-bridal-squad-glam', title: 'Party & Bridal Squad Glam' },
  { href: '/luxe-bridal-beauty-bundle', title: 'Luxe Bridal Beauty Bundle' },
  { href: '/lash-loyalty-luxe-plan', title: 'Lash Loyalty Luxe Plan' },
];

const reviews = [
  {
    name: 'Lyndsae’ Peele',
    quote: 'Amazing house call experience all the way around. This was the best lash job we’ve had. Very light, very neat, and very natural.',
  },
  {
    name: 'Salma Hassern',
    quote: 'It was my first time doing lash extensions. I felt so comfortable and really happy with my lashes. Thanks to Ruth.',
  },
  {
    name: 'Happy client',
    quote: 'Convenient online booking, slippers, blankets, wifi. Caro removed my old lashes so gently and gave me a new set even more gently. I found my new lash place.',
  },
];

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Lashes by Shazz',
      alternateName: ['Lashes by Shazz Academy', 'The Beauty Vault'],
      url: SITE_URL,
      logo: `${SITE_URL}/logos/lashes.png`,
      description: 'The #1 UV lash parlour and trainers in Kenya, with branches in Hurlingham and Nairobi CBD.',
      sameAs: SAME_AS,
    },
    {
      '@type': 'BeautySalon',
      '@id': `${SITE_URL}/#hurlingham`,
      parentOrganization: { '@id': ORG_ID },
      sameAs: SAME_AS,
      name: 'Lashes by Shazz – Hurlingham Branch',
      url: SITE_URL,
      telephone: '+254769781771',
      image: `${SITE_URL}/bg/home-hero.webp`,
      priceRange: 'KES',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Silverpool Suite, Jabavu Lane',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
    },
    {
      '@type': 'BeautySalon',
      '@id': `${SITE_URL}/#cbd`,
      parentOrganization: { '@id': ORG_ID },
      sameAs: SAME_AS,
      name: 'Lashes by Shazz – CBD Branch',
      url: SITE_URL,
      telephone: '+254792066140',
      image: `${SITE_URL}/bg/home-hero.webp`,
      priceRange: 'KES',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Absa Towers, Lower Ground, Loita Street',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
    },
  ],
};

export default function Home() {
  const bookingUrl = 'https://booking.revive.co.ke/';

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/bg/home-hero.webp')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/20 via-transparent to-rose-300/20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:py-32 text-center">
          <div className="mb-8 sm:mb-10 flex justify-center">
            <Image
              src="/logos/lashes.png"
              alt="Lashes by Shazz"
              width={500}
              height={150}
              className="h-16 sm:h-20 md:h-28 lg:h-32 w-auto drop-shadow-2xl"
              style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(290deg)' }}
              priority
            />
          </div>

          <p className="text-sm sm:text-base tracking-[0.35em] uppercase text-white/80 font-light mb-2">Welcome to</p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-[family-name:var(--font-italianno)] text-white drop-shadow-2xl leading-tight">
            Lashes by Shazz
          </h1>

          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 mb-8 sm:mb-10">
            <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-pink-300" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full" />
            <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-pink-200 font-light px-2">
              A product of The Beauty Vault
            </p>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full" />
            <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-pink-300" />
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12 font-light px-4">
            Luxury lash extensions, premium wigs and advanced aesthetic treatments under one roof in Nairobi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <a
              href={lashesBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-pink-300/50 hover:scale-105"
            >
              Book Appointment
            </a>
            <a
              href="#lashes"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border border-white/30 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-all duration-500 hover:bg-white/10 hover:border-white/50"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* Lashes By Shazz Section */}
      <section id="lashes" className="relative bg-black py-20 sm:py-28 overflow-hidden">
        <BlendBg src="/bg/home-lashes.webp" side="left" opacity={0.45} />
        <BlendBg src="/bg/page-service.webp" side="right" opacity={0.3} className="hidden md:block lg:w-[40%]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2 text-center lg:text-left lg:sticky lg:top-28">
              <div className="mb-8 flex justify-center lg:justify-start">
                <Image
                  src="/logos/lashes.png"
                  alt="Lashes By Shazz"
                  width={300}
                  height={100}
                  className="h-16 sm:h-20 md:h-24 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-pink-200/80 font-light mb-4">
                Lash Extensions in Nairobi
              </p>
              <h2 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white mb-6">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-8">
                We are passionate about enhancing beauty through luxury and precision. Our studio is a haven for Queens
                who deserve the very best in lash extensions and beauty treatments, using modern lashing techniques
                and the highest standards of quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={lashesBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 rounded-full text-sm tracking-wider uppercase font-semibold hover:shadow-xl hover:shadow-pink-300/30 transition"
                >
                  Book Lashes
                </a>
                <Link
                  href="/lashes"
                  className="px-7 py-3.5 border border-white/30 text-white rounded-full text-sm tracking-wider uppercase font-medium hover:bg-white/10 transition"
                >
                  Discover Lashes
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {lashServices.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="group flex items-start justify-between gap-6 py-5">
                      <div>
                        {'badge' in s && s.badge && (
                          <p className="mb-1 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-pink-300">{s.badge}</p>
                        )}
                        <h3 className="text-xl sm:text-2xl font-serif text-white group-hover:text-pink-200 transition-colors">{s.title}</h3>
                        <p className="mt-1 text-sm sm:text-base text-white/55 leading-relaxed">{s.text}</p>
                      </div>
                      <span aria-hidden className="mt-2 text-white/40 group-hover:text-pink-200 group-hover:translate-x-1 transition">→</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-xs tracking-[0.3em] uppercase text-white/50">Our packages</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lashPackages.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/80 hover:border-pink-200 hover:text-pink-100 transition"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-24 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <blockquote className="text-white/75 leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-pink-200">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Academy */}
      <section id="academy" className="relative bg-black py-20 sm:py-28 overflow-hidden border-t border-white/5">
        <BlendBg src="/bg/training-hands.webp" side="left" opacity={0.4} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:pl-[50%]">
          <Image
            src="/logos/lashes.png"
            alt="Lashes by Shazz Academy"
            width={500}
            height={218}
            className="h-14 sm:h-16 w-auto mb-6"
            style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(290deg)' }}
          />
          <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-pink-200 font-light">Lashes by Shazz Academy</p>
          <h2 className="mt-4 text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">Become a lash tech</h2>
          <p className="mt-5 text-white/70 font-light leading-relaxed max-w-xl">
            Train with the No. 1 UV lash parlour and trainers in Kenya. Start with the Beginner Individual Lashes Course,
            or learn UV lashes in a 5-day intensive that runs every week.
          </p>
          <p className="mt-3 text-sm text-white/50">Classes run 8am to 2pm, Friday to Saturday · Absa Towers, Nairobi CBD</p>
          <Link href="/training" className="mt-8 inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 text-xs tracking-[0.2em] uppercase font-semibold">
            Explore the Academy
          </Link>
        </div>
      </section>

      {/* Lash Tribe Africa */}
      <section id="lash-tribe" className="relative bg-black py-20 sm:py-28 overflow-hidden border-t border-white/5">
        <BlendBg src="/bg/lashtribe-supplies.webp" side="right" opacity={0.6} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-2xl">
            <Image
              src="/logos/lashtribe.png"
              alt="Lash Tribe Africa"
              width={256}
              height={256}
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
            <p className="mt-6 text-[10px] sm:text-xs tracking-[0.4em] uppercase text-pink-200 font-light">For lash technicians</p>
            <h2 className="mt-4 text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">Lash Tribe Africa</h2>
            <p className="mt-5 text-white/70 font-light leading-relaxed">
              Everything a lash tech needs to grow, in one place.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-4xl">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <p className="text-xs tracking-[0.3em] uppercase text-pink-200">Wholesale</p>
              <h3 className="mt-3 text-2xl font-light text-white">Lash supplies, direct from source</h3>
              <p className="mt-3 text-white/65 leading-relaxed">
                Get your lashes and tools at ridiculously low prices, far below market rates, with unbeatable quality
                because we buy direct from the source.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <p className="text-xs tracking-[0.3em] uppercase text-pink-200">Self-paced academy</p>
              <h3 className="mt-3 text-2xl font-light text-white">Turn your skill into a business</h3>
              <p className="mt-3 text-white/65 leading-relaxed">
                Learn at your own pace with courses on lash techniques and the lash business, and grow your skill into
                a profitable, thriving business.
              </p>
            </div>
          </div>

          <a
            href="https://lashtribeafrica.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block px-8 py-4 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 text-gray-900 text-xs tracking-[0.2em] uppercase font-semibold"
          >
            Visit Lash Tribe Africa
          </a>
        </div>
      </section>

      {/* Shasha Hair Wigs Section */}
      <section id="hair-wigs" className="relative bg-[#f6f1ec] py-24 sm:py-32 overflow-hidden">
        <BlendBg src="/bg/home-hair.webp" side="right" tone="light" opacity={0.85} className="hidden sm:block lg:w-[55%]" />
        <BlendBg src="/bg/home-hair.webp" side="right" tone="light" opacity={0.25} className="sm:hidden" />
        <BlendBg src="/bg/home-hair-2.webp" side="left" tone="light" opacity={0.3} className="hidden md:block lg:w-[40%]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-xl">
            <Image
              src="/logos/shash-logo.png"
              alt="Shasha Hair Wigs"
              width={3500}
              height={1200}
              className="h-16 sm:h-20 w-auto mb-8"
            />
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-800/70 mb-4">
              Premium Peruvian Wigs
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-black mb-6">
              Your crown, ready to wear
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed">
              100% Peruvian human hair with a natural lustre, pre-plucked hairlines and undetectable HD lace that
              blends seamlessly with your scalp, without glue or extra styling.
            </p>
            <p className="mt-6 text-sm text-zinc-600">
              <span className="text-black font-medium">From Ksh 10,000</span>
              <span className="mx-2 text-zinc-400">·</span>Expert styling
              <span className="mx-2 text-zinc-400">·</span>Wig hire for brides
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/peruvian-wigs"
                className="px-8 py-4 bg-black text-white rounded-full text-sm tracking-wider uppercase font-medium text-center hover:bg-zinc-800 transition"
              >
                View Wigs
              </Link>
              <Link
                href="/hair"
                className="px-8 py-4 border border-black/30 text-black rounded-full text-sm tracking-wider uppercase font-medium text-center hover:border-black transition"
              >
                Shasha Hair
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Revive Aesthetics Section */}
      <section id="aesthetics" className="relative bg-black py-24 sm:py-32 overflow-hidden">
        <BlendBg src="/bg/home-aesthetics.webp" side="right" opacity={0.3} />
        <BlendBg src="/bg/page-default.webp" side="left" opacity={0.25} className="hidden md:block lg:w-[40%]" />
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">

          {/* Header */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <Image
                src="/logos/revive.png"
                alt="Revive Aesthetics"
                width={450}
                height={150}
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto mx-auto"
                priority
              />
            </div>

            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-light mb-6">
              Advanced Aesthetic Treatments
            </p>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-8">
              Revive Aesthetics
            </h2>

            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Experience the future of beauty with cutting-edge aesthetic treatments designed to rejuvenate, restore, and reveal your most radiant self.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Skin Rejuvenation</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Advanced facials and treatments for glowing, youthful skin
                </p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Anti-Aging</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Turn back time with innovative wrinkle reduction techniques
                </p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Body Contouring</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Sculpt and shape your body with non-invasive treatments
                </p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/5 backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-white mb-3">Skin Therapy</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  Medical-grade treatments for complexion and texture
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href={bookingUrl}
              className="group relative inline-block px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10 text-sm tracking-wider uppercase font-medium">
                Book Treatment
              </span>
              <div className="absolute inset-0 bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </a>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
