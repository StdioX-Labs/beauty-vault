'use client';

// An explainer on /book ("First time getting lashes?", "Why UV?") as a modal.
// Plays the motion graphic when one is set in lib/booking/looks.ts, with the text as its transcript.
// Until the video exists, the modal shows the text alone.
import { useEffect, useRef } from 'react';
import type { Explainer } from '@/lib/booking/looks';

export default function ExplainerModal({
  explainer,
  onClose,
  onEvent,
  footer,
}: {
  explainer: Explainer;
  onClose: () => void;
  onEvent: (event: 'play' | 'complete') => void; // for tracking who watched
  footer?: React.ReactNode;
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const played = useRef(false);

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

  const { video, poster, title, intro, steps, note } = explainer;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="explainer-title">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" tabIndex={-1} />

      <div className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#111] text-white">
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white/90 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {video && (
          <video
            src={video}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="w-full max-h-[70vh] bg-black object-contain"
            onPlay={() => {
              if (!played.current) {
                played.current = true;
                onEvent('play');
              }
            }}
            onEnded={() => onEvent('complete')}
          />
        )}

        <div className="p-5 sm:p-6">
          <h2 id="explainer-title" className="text-4xl font-[family-name:var(--font-italianno)] pr-10">
            {title}
          </h2>
          {intro && <p className="mt-1 text-sm text-white/55">{intro}</p>}

          {video && <p className="mt-5 text-[11px] tracking-[0.25em] uppercase text-white/40">In short</p>}
          <dl className={`${video ? 'mt-2' : 'mt-5'} space-y-3 text-sm`}>
            {steps.map((x) => (
              <div key={x.k} className="grid grid-cols-[6.5rem_1fr] gap-3">
                <dt className="text-pink-200/80">{x.k}</dt>
                <dd className="text-white/80 leading-snug">{x.v}</dd>
              </div>
            ))}
          </dl>
          {note && <p className="mt-4 text-xs text-white/50">{note}</p>}
          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
