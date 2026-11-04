import Image from 'next/image';
import Link from 'next/link';

// Lash price list (Lashes by Shazz price list, November 2026). Prices include VAT.
// UV lashes come first because they are the studio's lead service.
export const LASH_SETS = [
  {
    key: 'classic',
    name: 'Classic Set',
    text: 'One extension per natural lash for a soft, mascara-like look.',
    image: '/lashes/set-classic.webp',
    uv: { set: 4060, refill: 2900 },
    normal: { set: 2900, refill: 2320 },
  },
  {
    key: 'hybrid',
    name: 'Hybrid Set',
    text: 'A mix of classic lashes and light volume fans for added texture and fluff.',
    image: '/lashes/set-hybrid.webp',
    uv: { set: 5220, refill: 4060 },
    normal: { set: 4060, refill: 3480 },
  },
  {
    key: 'volume',
    name: 'Volume Set',
    text: 'Several ultra-light lashes per natural lash for a full, fluffy finish.',
    image: '/lashes/set-volume.webp',
    uv: { set: 6380, refill: 5220 },
    normal: { set: 5220, refill: 4640 },
  },
  {
    key: 'mega-volume',
    name: 'Mega Volume Set',
    text: 'Dense fans for the darkest, most dramatic lash line.',
    image: '/lashes/set-mega-volume.webp',
    uv: { set: 7540, refill: 6380 },
    normal: { set: 6380, refill: 5800 },
  },
] as const;

export const LASH_REMOVAL = 1160;

const ksh = (n: number) => `KES ${n.toLocaleString('en-KE')}`;

const UV_BENEFITS = [
  { title: 'Instant curing', text: 'The adhesive sets in seconds under a UV light, so every lash bonds firmly from the start.' },
  { title: 'No irritation', text: 'The bond cures instantly, so there is no lingering adhesive to sting your eyes.' },
  { title: 'No fumes', text: 'No glue vapours during your appointment. Keep your eyes relaxed and comfortable.' },
  { title: 'The simplest aftercare', text: 'Your lashes are fully set when you leave. No waiting before you wash your face.' },
  { title: '4 to 6 weeks retention', text: 'A stronger bond means your set stays full for longer between refills.' },
];

function SetCard({
  set,
  kind,
  bookingUrl,
}: {
  set: (typeof LASH_SETS)[number];
  kind: 'uv' | 'normal';
  bookingUrl: string;
}) {
  const price = set[kind];
  const uv = kind === 'uv';
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-7 sm:p-8 transition-all duration-500 ${
        uv
          ? 'border-pink-300/25 bg-gradient-to-br from-pink-300/10 via-white/[0.04] to-transparent hover:border-pink-300/50'
          : 'border-white/10 bg-white/[0.04] hover:border-white/25'
      }`}
    >
      {/* Subtle photo of the set, so clients can tell the styles apart */}
      <Image
        src={set.image}
        alt=""
        aria-hidden
        width={480}
        height={480}
        className={`pointer-events-none absolute -right-10 -top-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover transition-opacity duration-500 ${
          uv ? 'opacity-35 group-hover:opacity-55' : 'opacity-25 group-hover:opacity-45'
        }`}
        style={{ maskImage: 'radial-gradient(circle, black 45%, transparent 72%)', WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 72%)' }}
      />
      <div className="relative">
        {uv && (
          <p className="inline-block mb-4 px-3 py-1 rounded-full bg-pink-300/15 text-pink-200 text-[10px] tracking-[0.25em] uppercase">
            UV Lashes
          </p>
        )}
        <h3 className="text-2xl font-light text-white tracking-wide">{set.name}</h3>
        <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-[16rem]">{set.text}</p>

        <dl className="mt-6 border-t border-white/10 pt-5 space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-white/70 text-sm">Full set</dt>
            <dd className={`text-2xl font-light ${uv ? 'text-pink-200' : 'text-white'}`}>{ksh(price.set)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-white/70 text-sm">Refill</dt>
            <dd className="text-lg font-light text-white/85">{ksh(price.refill)}</dd>
          </div>
        </dl>

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-pink-300 hover:text-pink-200 tracking-wider uppercase text-xs"
        >
          Book this set <span aria-hidden>→</span>
        </a>
      </div>
      <p className="absolute bottom-3 right-5 text-[10px] tracking-wide text-white/35">incl. VAT</p>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-pink-300" />
      <div className="w-2 h-2 bg-pink-300 rounded-full" />
      <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-pink-200 font-light">{children}</p>
      <div className="w-2 h-2 bg-pink-300 rounded-full" />
      <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-pink-300" />
    </div>
  );
}

export default function LashMenu({ bookingUrl }: { bookingUrl: string }) {
  return (
    <>
      {/* UV benefits */}
      <section id="uv-lashes" className="relative py-24 sm:py-32 overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('/bg/page-service.webp')",
              maskImage: 'linear-gradient(to left, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/10 via-transparent to-rose-300/5" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Why UV Lashes</Eyebrow>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-italianno)] text-white mb-5">
              Lashes that cure in an instant
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed">
              UV lash extensions use an adhesive that bonds under a gentle UV light. The result is a cleaner, more
              comfortable appointment and lashes that last.
            </p>
          </div>

          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {UV_BENEFITS.map((b, i) => (
              <li key={b.title} className="flex gap-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 text-gray-900 font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-light text-white">{b.title}</h3>
                  <p className="mt-1 text-white/60 leading-relaxed">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* UV sets and prices */}
      <section id="services" className="relative py-24 sm:py-28 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <Eyebrow>UV Lash Sets</Eyebrow>
            <h2 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">UV Lashes &amp; Prices</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {LASH_SETS.map((s) => (
              <SetCard key={s.key} set={s} kind="uv" bookingUrl={bookingUrl} />
            ))}
          </div>
        </div>
      </section>

      {/* Normal sets and prices */}
      <section id="normal-lashes" className="relative py-24 sm:py-28 overflow-hidden border-t border-white/5">
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-14">
            <Eyebrow>Classic Bonding</Eyebrow>
            <h2 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">Normal Lash Extensions</h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Our traditional lash extensions, applied with the same care and premium lashes.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {LASH_SETS.map((s) => (
              <SetCard key={s.key} set={s} kind="normal" bookingUrl={bookingUrl} />
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 flex items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-light text-white">Lash Removal</h3>
                <p className="text-sm text-white/60 mt-1">Safe, gentle removal of any lash set.</p>
              </div>
              <p className="text-2xl font-light text-white whitespace-nowrap text-right">
                {ksh(LASH_REMOVAL)}
                <span className="block text-[10px] tracking-wide text-white/35">incl. VAT</span>
              </p>
            </div>
            <div className="rounded-3xl border border-pink-300/20 bg-pink-300/[0.06] p-7">
              <h3 className="text-sm uppercase tracking-[0.25em] text-pink-200">Refill note</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Refill rates apply to sets done within 21 days (3 weeks). After that, the set is considered new.
                Refills apply to sets with 30% coverage and above.
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-white/40">
            All prices include VAT. See our <Link href="/lash-refill-services" className="underline hover:text-white/70">refill guide</Link> and{' '}
            <Link href="/faq-page" className="underline hover:text-white/70">FAQ</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
