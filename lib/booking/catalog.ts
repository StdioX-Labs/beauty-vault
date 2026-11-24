// What can be booked at lashesbyshazz.com/book: branches, services and techs.
// Prices come from the lash price list in app/lashes/LashMenu.tsx (newest prices, VAT included), so the
// /lashes page and /book can never disagree. Once the booking database is connected, its
// lashesbyshazz.services table wins (see supabase/lashesbyshazz-booking.sql) and the page updates itself.
import { LASH_SETS, LASH_REMOVAL } from '@/app/lashes/LashMenu';
import { TECHS } from '@/lib/techs';

export type Category = 'uv' | 'normal' | 'refill' | 'brows' | 'removal';

export type Service = {
  slug: string; // /book?service=<slug>
  name: string;
  category: Category;
  text: string;
  price: number; // KES, VAT included
  duration: number; // minutes (estimates until the team confirms them)
  fee: number; // booking fee paid up front
  image?: string;
  refillOf?: string; // for a refill: the set it refills
  setKey?: string;
};

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'uv', label: 'UV Lashes' },
  { key: 'normal', label: 'Normal Lashes' },
  { key: 'refill', label: 'Refill' },
  { key: 'brows', label: 'Brows' },
  { key: 'removal', label: 'Removal' },
];

export const DEFAULT_FEE = 500;

// Set durations in minutes: full set, refill. Odoo shows 1.5h for everything, which is wrong; confirm with the team.
const DURATION: Record<string, [number, number]> = {
  classic: [120, 90],
  hybrid: [150, 90],
  volume: [150, 120],
  'mega-volume': [180, 120],
};

const UV_TEXT = 'Cured in seconds under a gentle UV light. No fumes, no sting, 4 to 6 weeks retention.';

export const SERVICES: Service[] = [
  ...LASH_SETS.map((s) => ({
    slug: `uv-${s.key}`,
    name: `UV ${s.name}`,
    category: 'uv' as const,
    text: `${s.text} ${UV_TEXT}`,
    price: s.uv.set,
    duration: DURATION[s.key][0],
    fee: DEFAULT_FEE,
    image: s.image,
    setKey: s.key,
  })),
  ...LASH_SETS.map((s) => ({
    slug: s.key,
    name: s.name,
    category: 'normal' as const,
    text: s.text,
    price: s.normal.set,
    duration: DURATION[s.key][0],
    fee: DEFAULT_FEE,
    image: s.image,
    setKey: s.key,
  })),
  ...LASH_SETS.map((s) => ({
    slug: `uv-${s.key}-refill`,
    name: `UV ${s.name.replace(' Set', '')} Refill`,
    category: 'refill' as const,
    text: 'For a UV set done within the last 21 days, with 30% coverage or more.',
    price: s.uv.refill,
    duration: DURATION[s.key][1],
    fee: DEFAULT_FEE,
    image: s.image,
    refillOf: `uv-${s.key}`,
    setKey: s.key,
  })),
  ...LASH_SETS.map((s) => ({
    slug: `${s.key}-refill`,
    name: `${s.name.replace(' Set', '')} Refill`,
    category: 'refill' as const,
    text: 'For a normal set done within the last 21 days, with 30% coverage or more.',
    price: s.normal.refill,
    duration: DURATION[s.key][1],
    fee: DEFAULT_FEE,
    image: s.image,
    refillOf: s.key,
    setKey: s.key,
  })),
  {
    slug: 'microshading',
    name: 'Microshading / Microblading',
    category: 'brows',
    text: 'Soft, natural semi-permanent brows, shaped to your face.',
    price: 15000,
    duration: 120,
    fee: 2500,
  },
  {
    slug: 'lash-removal',
    name: 'Lash Removal',
    category: 'removal',
    text: 'Safe, gentle removal of any lash set, ours or another salon’s.',
    price: LASH_REMOVAL,
    duration: 30,
    fee: DEFAULT_FEE,
  },
];

export const LASH_CATEGORIES: Category[] = ['uv', 'normal', 'refill'];
export const isLash = (s: Service) => LASH_CATEGORIES.includes(s.category);
export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

// Old names people may type or link with, mapped to today's slugs.
export const SERVICE_ALIASES: Record<string, string> = {
  'infinity-glow-classic': 'uv-classic',
  'infinity-glow-hybrid': 'uv-hybrid',
  'infinity-glow-volume': 'uv-volume',
  'infinity-glow-mega-volume': 'uv-mega-volume',
  removal: 'lash-removal',
  microblading: 'microshading',
  brows: 'microshading',
};

export type Branch = {
  id: number;
  slug: 'cbd' | 'hurlingham';
  name: string;
  address: string;
  phone: string;
  whatsapp: string; // digits for wa.me
  maps: string;
  days: number[]; // 0 = Sunday
  opens: string; // HH:MM, Nairobi time
  closes: string;
};

// Mon to Sat, 8am to 8pm (as on the booking site and the footer). Change here and in lashesbyshazz.branches.
export const BRANCHES: Branch[] = [
  {
    id: 1,
    slug: 'cbd',
    name: 'CBD',
    address: 'Absa Towers, Lower Ground (Loita Street)',
    phone: '+254 792 066 140',
    whatsapp: '254792066140',
    maps: 'https://www.google.com/maps/search/?api=1&query=Absa+Towers+Loita+Street+Nairobi',
    days: [1, 2, 3, 4, 5, 6],
    opens: '08:00',
    closes: '20:00',
  },
  {
    id: 2,
    slug: 'hurlingham',
    name: 'Hurlingham',
    address: 'Silverpool Suite, Jabavu Lane',
    phone: '+254 769 781 771',
    whatsapp: '254769781771',
    maps: 'https://www.google.com/maps/search/?api=1&query=Silverpool+Suite+Jabavu+Lane+Nairobi',
    days: [1, 2, 3, 4, 5, 6],
    opens: '08:00',
    closes: '20:00',
  },
];

export const branchById = (id: number | null | undefined) => BRANCHES.find((b) => b.id === id);

export type Tech = {
  slug: string;
  name: string;
  first: string;
  branch: number;
  photo: string;
  specialty: string;
};

const photoName = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, '-');

export const BOOK_TECHS: Tech[] = TECHS.map((t) => ({
  slug: t.slug,
  name: t.name,
  first: t.name.split(' ')[0],
  branch: t.branch,
  photo: `/team/${photoName(t.name)}.webp`,
  specialty: 'UV lash tech',
}));

export const techBySlug = (slug: string | null | undefined) => BOOK_TECHS.find((t) => t.slug === slug);

export const ksh = (n: number) => `KES ${Math.round(n).toLocaleString('en-KE')}`;

export const formatDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h}h ${m}min` : `${h}h`;
};

// Refills count within 21 days of the last set (LashMenu refill note).
export const REFILL_DAYS = 21;
