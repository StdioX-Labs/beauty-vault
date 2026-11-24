// What sells a lash set to someone who has never had lashes: real photos, who it suits, what happens in
// the chair, what it costs over time, and what we promise. Shown in the "See the look" sheet on /book
// (app/book/SetSheet.tsx) and on the first step for first-timers.
//
// PHOTOS: put up to 5 photos per set in public/lashes/<set>/ (1.webp ... 5.webp) and list them below.
// Use real clients (with their OK), different eye shapes and skin tones, shot close and in daylight.
// Until a set has its own photos, the sheet shows the set's main photo from the price list.
//
// Everything here is plain text the team can change. Keep it true: nothing goes live that the salon
// would not stand behind at the chair.
import { LASH_SETS } from '@/app/lashes/LashMenu';

export type SetKey = (typeof LASH_SETS)[number]['key'];

export type Look = {
  key: SetKey;
  tagline: string; // one line under the name
  gallery: string[]; // up to 5 photos of this set on real clients
  suits: string[]; // who it's for
  notFor: string; // who should pick something else, and what
  feel: string; // what it looks like day to day
};

export const LOOKS: Record<SetKey, Look> = {
  classic: {
    key: 'classic',
    tagline: 'Your own lashes, only better.',
    gallery: [],
    suits: ['First-timers', 'Offices and everyday wear', 'Anyone who wants "are those real?"'],
    notFor: 'If you want a full, dark lash line, look at Hybrid or Volume.',
    feel: 'Like a good coat of mascara that never smudges, with nothing to take off at night.',
  },
  hybrid: {
    key: 'hybrid',
    tagline: 'Soft fullness with natural texture.',
    gallery: [],
    suits: ['A step up from Classic', 'Natural lashes that are sparse in places', 'Day-to-night wear'],
    notFor: 'If you want the most natural look, Classic is softer. For drama, go Volume.',
    feel: 'Noticeably fuller and fluffier than mascara, still soft enough for every day.',
  },
  volume: {
    key: 'volume',
    tagline: 'Full, fluffy and finished.',
    gallery: [],
    suits: ['Anyone who wants lashes people notice', 'Thin or fine natural lashes', 'Events and photos'],
    notFor: 'If you have never had lashes before and want to start gently, try Classic or Hybrid first.',
    feel: 'A full, dark, fluffy lash line, the made-up look without any make-up.',
  },
  'mega-volume': {
    key: 'mega-volume',
    tagline: 'The boldest, darkest lash line we do.',
    gallery: [],
    suits: ['Glam every day', 'Brides, shoots and big events', 'Anyone who loves a dramatic look'],
    notFor: 'If you want people to wonder whether they are real, pick Classic or Hybrid.',
    feel: 'Dense, dark and dramatic. The lash line looks lined even with no eyeliner.',
  },
};

export const lookFor = (key: string | undefined) => (key && key in LOOKS ? LOOKS[key as SetKey] : null);

// Photos to show: the set's own gallery, or its main price-list photo until the gallery is filled.
export function galleryFor(key: string | undefined): string[] {
  const look = lookFor(key);
  if (look && look.gallery.length) return look.gallery.slice(0, 5);
  const set = LASH_SETS.find((s) => s.key === key);
  return set ? [set.image] : [];
}

// ---------- explainers (modals on /book) ----------
// Each opens as a modal. When its motion graphic is ready, drop the file in public/explainers/ and set
// `video` (and a `poster` still): the modal then plays the video, and the text below becomes its
// transcript under the player. Until then the modal shows the text.
// Watching is tracked (GTM lbs_explainer_*, and "watched" on the booking's source), so /admin can compare
// bookings from clients who watched with those who didn't.
export type Explainer = {
  key: 'first-time' | 'why-uv';
  title: string;
  intro?: string;
  video?: string; // e.g. '/explainers/first-time.mp4' (9:16 or 4:5, under ~8 MB)
  poster?: string;
  steps: { k: string; v: string }[];
  note?: string;
};

// Why UV, for UV sets (same points as the /lashes page).
export const UV_POINTS = [
  'Cured in seconds under a gentle UV light, so every lash bonds firmly from the start.',
  'No glue fumes and no sting during your appointment.',
  'Fully set when you leave: no waiting before you wash your face.',
  '4 to 6 weeks retention, so your set stays fuller between refills.',
];

// "First time getting lashes?" on the first step.
export const FIRST_TIMER: Explainer = {
  key: 'first-time',
  title: 'Your first lash appointment',
  intro: 'What actually happens, from walking in to walking out.',
  video: undefined,
  poster: undefined,
  steps: [
    { k: 'Before', v: 'Come with clean lashes: no mascara, eyeliner or oily make-up remover on the day.' },
    { k: 'In the chair', v: 'You lie back with your eyes closed the whole time. It does not hurt, and many clients fall asleep.' },
    { k: 'How long', v: 'About 2 to 3 hours for a full set, depending on the set. Refills are shorter.' },
    { k: 'After', v: 'Brush them daily with the spoolie we give you, keep oil-based cleansers away from your eyes, and come back for a refill in 2 to 3 weeks.' },
  ],
  note: 'Tell your lash tech straight away if anything stings or feels uncomfortable. She will stop and check.',
};

export const WHY_UV: Explainer = {
  key: 'why-uv',
  title: 'Why UV lashes?',
  intro: 'The same lash sets, bonded a better way.',
  video: undefined,
  poster: undefined,
  steps: [
    { k: 'Instant bond', v: UV_POINTS[0] },
    { k: 'Comfort', v: UV_POINTS[1] },
    { k: 'Easy aftercare', v: UV_POINTS[2] },
    { k: 'Lasts longer', v: UV_POINTS[3] },
  ],
};

export const EXPLAINERS = { 'first-time': FIRST_TIMER, 'why-uv': WHY_UV } as const;

// Promises shown beside the price. Only switch on (on: true) what the salon has agreed to stand behind.
export const PROMISES: { title: string; text: string; on: boolean }[] = [
  { title: 'Booking fee comes off your total', text: 'The fee holds your slot and is taken off your bill. You pay the rest at the chair.', on: true },
  { title: 'Refill price for 3 weeks', text: 'Come back within 21 days and you pay the refill price, not a new set.', on: true },
  // Waiting for a decision from management (see the plan's "Decisions needed"):
  { title: 'Love it, or we adjust it', text: 'Not happy with the shape or fullness? Come back within 72 hours and we adjust it free.', on: false },
  { title: 'Sensitive eyes? Free patch test', text: 'Book a free patch test a day or two before your set.', on: false },
  { title: 'Free rescheduling', text: 'Move your appointment for free up to 24 hours before.', on: false },
];

export const livePromises = () => PROMISES.filter((p) => p.on);

// Days with this many start times or fewer left show "N left" on the date picker.
export const FEW_LEFT = 3;
