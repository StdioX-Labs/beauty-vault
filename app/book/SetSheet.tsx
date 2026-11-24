'use client';

// "See the look": the sheet that sells a lash set to someone who has never had one.
// Photos of the set on real clients, who it suits, time in the chair, how long it lasts, refill price,
// why UV (for UV sets) and the other sets side by side. Opened from a service card on /book, or straight
// from an ad with /book?service=uv-hybrid&look=1.
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatDuration, ksh, REFILL_DAYS, type Service } from '@/lib/booking/catalog';
import { galleryFor, livePromises, lookFor, WHY_UV } from '@/lib/booking/looks';

export default function SetSheet({
  service,
  siblings,
  media,
  refill,
  price,
  added,
  onChoose,
  onSwitch,
  onClose,
  onWhyUV,
  askHref,
}: {
  service: Service;
  siblings: Service[]; // the other sets in the same category, for the compare strip
  media: Media[]; // this set's videos/photos from Supabase (lashesbyshazz.set_media)
  refill?: Service; // the matching refill, for the "keeping it full" line
  price: (s: Service) => number; // campaign price when an offer is live
  added: boolean;
  onChoose: () => void;
  onSwitch: (slug: string) => void;
  onClose: () => void;
  onWhyUV: () => void; // opens the "Why UV?" explainer
  askHref: string; // WhatsApp link, pre-filled with this set
}) {
  const look = lookFor(service.setKey);
  // Supabase videos first; the set's photos from lib/booking/looks.ts until there are any.
  const slides: Media[] = media.length
    ? media.slice(0, 6)
    : galleryFor(service.setKey).map((url) => ({ kind: 'image' as const, url }));
  const isUV = service.category === 'uv';
  const [shown, setShown] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // close on Escape, lock the page behind, focus the close button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  // back to the first photo when switching sets
  useEffect(() => {
    setShown(0);
    track.current?.scrollTo({ left: 0 });
  }, [service.slug]);

  const onScroll = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (el && first) setShown(Math.round(el.scrollLeft / (first.offsetWidth + 12)));
  };
  const goTo = (i: number) => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (el && first) el.scrollTo({ left: i * (first.offsetWidth + 12), behavior: 'smooth' });
  };

  const now = price(service);
  const promises = livePromises();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="set-sheet-title">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" tabIndex={-1} />

      <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#111] text-white">
        {/* square videos of this set on real clients, swiped sideways */}
        <div className="relative pt-14">
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 w-9 h-9 rounded-full bg-white/10 text-white/90 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div
            ref={track}
            onScroll={onScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((m, i) => (
              <Slide key={m.url} media={m} index={i} count={slides.length} name={service.name} active={i === shown} single={slides.length === 1} />
            ))}
          </div>
          {slides.length > 1 && (
            <div className="mt-3 flex justify-center gap-1.5">
              {slides.map((m, i) => (
                <button
                  key={m.url}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Example ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === shown ? 'w-5 bg-pink-200' : 'w-1.5 bg-white/30'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 pb-28">
          <h2 id="set-sheet-title" className="text-4xl font-[family-name:var(--font-italianno)]">
            {service.name}
          </h2>
          {look && <p className="mt-1 text-pink-200">{look.tagline}</p>}

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
            {now < service.price && <span className="text-white/35 line-through">{ksh(service.price)}</span>}
            <span className="text-lg text-pink-200">{ksh(now)}</span>
            <span className="text-white/45">incl. VAT</span>
          </div>

          {/* the facts */}
          <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Fact k="In the chair" v={`About ${formatDuration(service.duration)}`} />
            <Fact k="Lasts" v={isUV ? '4 to 6 weeks' : '2 to 3 weeks'} />
            <Fact k="Refill" v={refill ? `${ksh(price(refill))}` : `Within ${REFILL_DAYS} days`} sub={refill ? `within ${REFILL_DAYS} days` : undefined} />
          </dl>

          {look && (
            <>
              <p className="mt-6 text-white/80 leading-relaxed">{look.feel}</p>
              <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-white/45">Perfect for</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {look.suits.map((s) => (
                  <li key={s} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/55 leading-relaxed">
                <span className="text-white/75">Not sure? </span>
                {look.notFor}
              </p>
            </>
          )}

          {isUV && (
            <button
              type="button"
              onClick={onWhyUV}
              className="mt-6 w-full flex items-center gap-3 rounded-2xl border border-pink-300/30 bg-pink-300/[0.05] px-4 py-3 text-left hover:border-pink-300/60"
            >
              <span className="w-9 h-9 shrink-0 rounded-full bg-pink-300/15 text-pink-200 flex items-center justify-center" aria-hidden>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M8 5.5v13l10.5-6.5z" />
                </svg>
              </span>
              <span>
                <span className="block text-sm text-white">{WHY_UV.title}</span>
                <span className="block text-xs text-white/50">{WHY_UV.intro}</span>
              </span>
            </button>
          )}

          {promises.length > 0 && (
            <ul className="mt-6 space-y-2">
              {promises.map((p) => (
                <li key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="block text-sm text-white">{p.title}</span>
                  <span className="block text-xs text-white/50 mt-0.5">{p.text}</span>
                </li>
              ))}
            </ul>
          )}

          {siblings.length > 1 && (
            <>
              <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-white/45">Compare</p>
              <div className="mt-2 -mx-5 px-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-2 w-max">
                  {siblings.map((s) => {
                    const on = s.slug === service.slug;
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => onSwitch(s.slug)}
                        aria-pressed={on}
                        className={`w-28 rounded-2xl border p-2 text-left transition ${on ? 'border-pink-300/70 bg-pink-300/[0.08]' : 'border-white/10 hover:border-white/30'}`}
                      >
                        {galleryFor(s.setKey)[0] && (
                          <Image src={galleryFor(s.setKey)[0]} alt="" width={160} height={120} className="w-full aspect-[4/3] rounded-xl object-cover" />
                        )}
                        <span className="block mt-1.5 text-xs text-white truncate">{s.name.replace(/^UV /, '').replace(/ Set$/, '')}</span>
                        <span className="block text-[11px] text-white/50">{ksh(price(s))}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <p className="mt-6 text-sm text-white/50">
            Still deciding?{' '}
            <a href={askHref} target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200">
              Ask us about this set on WhatsApp
            </a>
          </p>
        </div>

        {/* choose */}
        <div className="sticky bottom-0 border-t border-white/10 bg-[#111]/95 backdrop-blur px-5 sm:px-6 py-3">
          <button
            type="button"
            onClick={onChoose}
            className="w-full rounded-full bg-gradient-to-r from-pink-300 to-rose-300 h-12 text-xs font-semibold tracking-wider uppercase text-gray-900"
          >
            {added ? 'Chosen · back to booking' : `Choose ${service.name.replace(/ Set$/, '')}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export type Media = { kind: 'video' | 'image'; url: string; poster?: string | null; caption?: string | null };

// One square example. Videos play muted and looped while in view (saves data on the others); tap to pause.
function Slide({ media, index, count, name, active, single }: { media: Media; index: number; count: number; name: string; active: boolean; single: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active && !paused) v.play().catch(() => null);
    else v.pause();
  }, [active, paused]);
  const label = `${name} on a client${count > 1 ? `, example ${index + 1} of ${count}` : ''}`;
  return (
    <div className={`relative shrink-0 aspect-square snap-center overflow-hidden rounded-2xl bg-white/5 ${single ? 'w-full' : 'w-[82%]'}`}>
      {media.kind === 'video' ? (
        <>
          <video
            ref={video}
            src={media.url}
            poster={media.poster || undefined}
            muted
            loop
            playsInline
            preload={index === 0 ? 'auto' : 'metadata'}
            aria-label={label}
            onClick={() => setPaused(!paused)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {paused && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <span className="w-12 h-12 rounded-full bg-black/55 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M8 5.5v13l10.5-6.5z" />
                </svg>
              </span>
            </span>
          )}
        </>
      ) : (
        <Image src={media.url} alt={label} fill sizes="(max-width: 640px) 82vw, 420px" className="object-cover" unoptimized={/^https?:/.test(media.url)} priority={index === 0} />
      )}
      {media.caption && (
        <span className="pointer-events-none absolute left-3 bottom-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white/90">{media.caption}</span>
      )}
    </div>
  );
}

function Fact({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-3">
      <dt className="text-[10px] tracking-[0.15em] uppercase text-white/40">{k}</dt>
      <dd className="mt-1 text-sm text-white leading-tight">
        {v}
        {sub && <span className="block text-[10px] text-white/40 mt-0.5">{sub}</span>}
      </dd>
    </div>
  );
}
