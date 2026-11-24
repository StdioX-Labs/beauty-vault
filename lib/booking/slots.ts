// Open time slots, worked out from branch hours and the techs' booked times.
// Nairobi is UTC+3 all year (no daylight saving), so times are handled as fixed +03:00.
import type { Branch } from './catalog';

export type Busy = { staff: string; start: number; end: number };
export type Slot = { time: string; iso: string; free: string[] };

export const SLOT_STEP = 30; // minutes between start times
export const LEAD_MINUTES = 60; // earliest start from now

const pad = (n: number) => String(n).padStart(2, '0');

// 'YYYY-MM-DD' of a moment, in Nairobi
export function nairobiDate(d: Date): string {
  const t = new Date(d.getTime() + 3 * 3600 * 1000);
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}

export function addDays(dateKey: string, n: number): string {
  const t = new Date(`${dateKey}T12:00:00+03:00`);
  t.setUTCDate(t.getUTCDate() + n);
  return nairobiDate(t);
}

export const dayOfWeek = (dateKey: string) => new Date(`${dateKey}T12:00:00+03:00`).getUTCDay();
export const instant = (dateKey: string, hm: string) => new Date(`${dateKey}T${hm}:00+03:00`);

const toMin = (hm: string) => {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
};
const toHm = (min: number) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

export function isOpen(branch: Pick<Branch, 'days'>, dateKey: string) {
  return branch.days.includes(dayOfWeek(dateKey));
}

export function slotsForDay(opts: {
  dateKey: string;
  branch: Pick<Branch, 'days' | 'opens' | 'closes'>;
  duration: number;
  candidates: string[]; // tech slugs who could do it
  busy: Busy[];
  now?: number;
}): Slot[] {
  const { dateKey, branch, duration, candidates, busy } = opts;
  if (!isOpen(branch, dateKey) || !candidates.length || duration <= 0) return [];
  const earliest = (opts.now ?? Date.now()) + LEAD_MINUTES * 60 * 1000;
  const out: Slot[] = [];
  for (let m = toMin(branch.opens); m + duration <= toMin(branch.closes); m += SLOT_STEP) {
    const start = instant(dateKey, toHm(m)).getTime();
    if (start < earliest) continue;
    const end = start + duration * 60 * 1000;
    const free = candidates.filter((s) => !busy.some((b) => b.staff === s && b.start < end && b.end > start));
    if (free.length) out.push({ time: toHm(m), iso: new Date(start).toISOString(), free });
  }
  return out;
}

export function earliestSlot(opts: {
  from: string;
  days: number;
  branch: Pick<Branch, 'days' | 'opens' | 'closes'>;
  duration: number;
  candidates: string[];
  busy: Busy[];
  now?: number;
}): { dateKey: string; slot: Slot } | null {
  for (let i = 0; i < opts.days; i++) {
    const dateKey = addDays(opts.from, i);
    const s = slotsForDay({ ...opts, dateKey });
    if (s.length) return { dateKey, slot: s[0] };
  }
  return null;
}

export function partOfDay(time: string): 'Morning' | 'Afternoon' | 'Evening' {
  const m = toMin(time);
  return m < 12 * 60 ? 'Morning' : m < 16 * 60 ? 'Afternoon' : 'Evening';
}

export function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  const hh = h % 12 || 12;
  return `${hh}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function dayLabel(dateKey: string, today: string) {
  if (dateKey === today) return 'Today';
  if (dateKey === addDays(today, 1)) return 'Tomorrow';
  return DAYS[dayOfWeek(dateKey)];
}

export function longDate(dateKey: string) {
  const [, mo, d] = dateKey.split('-').map(Number);
  return `${DAYS[dayOfWeek(dateKey)]} ${d} ${MONTHS[mo - 1]}`;
}

export const dayNum = (dateKey: string) => Number(dateKey.slice(8));
export const monthShort = (dateKey: string) => MONTHS[Number(dateKey.slice(5, 7)) - 1];
