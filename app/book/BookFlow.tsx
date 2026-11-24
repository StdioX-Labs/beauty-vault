'use client';

// lashesbyshazz.com/book: service first, then branch and tech, then date and time, then details and payment.
// Deep links: /book?service=uv-classic  /book?tech=linda  /book?branch=cbd  /book?campaign=<code>
// For ads: /book?look=uv-hybrid (or ?service=uv-hybrid&look=1) opens that set's "See the look" sheet first.
// (several services: ?service=uv-volume,lash-removal). UTM tags and ad click ids are kept on the booking.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BOOK_TECHS,
  BRANCHES,
  CATEGORIES,
  REFILL_DAYS,
  SERVICES,
  SERVICE_ALIASES,
  branchById,
  formatDuration,
  isLash,
  ksh,
  techBySlug,
  type Category,
  type Service,
} from '@/lib/booking/catalog';
import { BOOKING_POLICY } from '@/lib/booking/config';
import { EXPLAINERS, FEW_LEFT, livePromises } from '@/lib/booking/looks';
import ExplainerModal from './ExplainerModal';
import SetSheet from './SetSheet';
import {
  addDays,
  dayLabel,
  dayNum,
  earliestSlot,
  formatTime,
  longDate,
  monthShort,
  nairobiDate,
  partOfDay,
  slotsForDay,
  type Busy,
  type Slot,
} from '@/lib/booking/slots';

type Offer = {
  code: string;
  name: string;
  ends_at: string;
  services: string[];
  prices: Record<string, number>;
  extra?: string | null;
  theme?: string | null;
  banner?: string | null;
  public: boolean;
};

type Avail = {
  ok: boolean;
  setup?: boolean;
  payment?: 'mpesa' | 'request';
  busy?: { staff: string; start: string; end: string }[];
  staff?: { slug: string; branch: number }[];
  branches?: { id: number; days: number[]; opens: string; closes: string }[];
  services?: { slug: string; price: number; duration: number; fee: number; active: boolean }[];
  offers?: Offer[];
  otp?: boolean; // phone verification code can be sent
  media?: { set: string; category: 'uv' | 'normal' | null; kind: 'video' | 'image'; url: string; poster?: string | null; caption?: string | null }[];
};

type Me = { phone: string; name?: string | null; email?: string | null; returning: boolean; last_staff?: string | null; last_staff_name?: string; last_branch?: number | null };

type Returning = { returning: boolean; first_name?: string; last_staff?: string; last_staff_name?: string; last_branch?: number; asked_heard?: boolean };

type Done = {
  ok: boolean;
  ref?: string;
  status?: string;
  staff?: string;
  staff_name?: string;
  branch?: number;
  starts_at?: string;
  ends_at?: string;
  items?: { slug: string; name: string; price: number }[];
  total?: number;
  fee?: number;
  balance?: number;
  payment?: 'sent' | 'failed' | 'off';
  whatsapp?: boolean; // finished on WhatsApp (booking database not set up yet)
};

const STEPS = ['Service', 'Where', 'When', 'You'] as const;
const DAYS_SHOWN = 14;
const DAYS_MORE = 42;
const HEARD = ['Instagram', 'TikTok', 'Friend', 'Google', 'Walked past', 'Other'];
const HEALTH = ['Allergies (glue, latex or similar)', 'Sensitive eyes or recent eye surgery', 'Eye infection right now', 'Pregnant', 'Contact lenses'];
const SOURCE_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'ttclid'];

const store = {
  get(k: string, s = false) {
    try {
      return (s ? sessionStorage : localStorage).getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string, s = false) {
    try {
      (s ? sessionStorage : localStorage).setItem(k, v);
    } catch {
      /* private mode */
    }
  },
};

function gtm(event: string, data: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: `lbs_${event}`, ...data });
  } catch {
    /* ignore */
  }
}

const phoneOk = (p: string) => /^(?:\+?254|0)?[17]\d{8}$/.test(p.replace(/[\s-]/g, ''));
const waLink = (digits: string, text: string) => `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;

export default function BookFlow() {
  const params = useSearchParams();

  // ---------- catalogue, with live prices from the database once loaded ----------
  const [avail, setAvail] = useState<Avail | null>(null);
  const campaignParam = params.get('campaign') || '';
  const offer: Offer | null = useMemo(() => {
    const list = avail?.offers || [];
    return list.find((o) => o.code === campaignParam) || list.find((o) => o.public) || null;
  }, [avail, campaignParam]);

  const services: Service[] = useMemo(() => {
    const live = new Map((avail?.services || []).map((s) => [s.slug, s]));
    return SERVICES.flatMap((s) => {
      const l = live.get(s.slug);
      if (l && !l.active) return [];
      return [l ? { ...s, price: l.price, duration: l.duration, fee: l.fee } : s];
    });
  }, [avail]);
  const svc = useCallback((slug: string) => services.find((s) => s.slug === slug), [services]);
  const offerPrice = useCallback(
    (s: Service) => {
      if (!offer) return s.price;
      const applies = offer.services.length === 0 || offer.services.includes(s.slug);
      const p = applies ? offer.prices?.[s.slug] : undefined;
      return typeof p === 'number' && p < s.price ? p : s.price;
    },
    [offer],
  );

  // ---------- choices ----------
  const initial = useMemo(() => {
    const raw = (params.get('service') || '').toLowerCase().split(',').map((x) => SERVICE_ALIASES[x.trim()] || x.trim());
    const cart: string[] = [];
    for (const slug of raw) {
      const s = SERVICES.find((x) => x.slug === slug);
      if (!s || cart.includes(slug)) continue;
      if (isLash(s) && cart.some((c) => isLash(SERVICES.find((x) => x.slug === c)!))) continue;
      cart.push(slug);
    }
    const tech = techBySlug((params.get('tech') || '').toLowerCase());
    const branchSlug = (params.get('branch') || '').toLowerCase();
    const branch = tech?.branch || BRANCHES.find((b) => b.slug === branchSlug)?.id || null;
    // ?look=<slug>, or ?look=1 with ?service=<slug>: open that set's sheet first, nothing added yet
    const lookRaw = (params.get('look') || '').toLowerCase();
    const lookSlug = SERVICE_ALIASES[lookRaw] || lookRaw;
    const look = SERVICES.find((s) => s.setKey && s.slug === (lookSlug === '1' || lookSlug === 'true' ? cart[0] : lookSlug))?.slug || null;
    if (look) cart.length = 0;
    const firstSlug = look || cart[0];
    const firstCat = firstSlug ? SERVICES.find((s) => s.slug === firstSlug)!.category : 'uv';
    return { cart, tech: tech?.slug || '', branch, cat: firstCat as Category, look };
  }, [params]);

  const [step, setStep] = useState(initial.cart.length ? 1 : 0);
  const [sheet, setSheet] = useState<string | null>(initial.look); // service slug shown in "See the look"
  const [explainer, setExplainer] = useState<keyof typeof EXPLAINERS | null>(null); // open explainer modal
  const [cat, setCat] = useState<Category>(initial.cat);
  const [cart, setCart] = useState<string[]>(initial.cart);
  const [refillAsk, setRefillAsk] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [otherSalon, setOtherSalon] = useState(false);
  const [branch, setBranch] = useState<number | null>(initial.branch);
  const [tech, setTech] = useState<string>(initial.tech); // '' = next available
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [slotIso, setSlotIso] = useState<string | null>(null);
  const [moreDates, setMoreDates] = useState(false);
  const [pickBranch, setPickBranch] = useState(false); // re-open the branch question after one is chosen
  const techHead = useRef<HTMLParagraphElement>(null);

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [heard, setHeard] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [health, setHealth] = useState<string[]>([]);
  const [healthNone, setHealthNone] = useState(false);
  const [look, setLook] = useState('');
  const [consent, setConsent] = useState(false);
  const [optIn, setOptIn] = useState(false);
  const [lockRefill, setLockRefill] = useState(false);
  const [returning, setReturning] = useState<Returning | null>(null);
  // phone verification and the remembered device ("Booking as Amina")
  const [me, setMe] = useState<Me | null>(null);
  const [verified, setVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [otpBusy, setOtpBusy] = useState(false);
  const [otpMsg, setOtpMsg] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const [editDetails, setEditDetails] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const [paid, setPaid] = useState<'waiting' | 'paid' | 'failed' | null>(null);

  // ---------- session, source, availability ----------
  const session = useRef('');
  const source = useRef<Record<string, string>>({});
  useEffect(() => {
    let sid = store.get('lbs_book_sid', true);
    if (!sid) {
      sid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `b${Date.now()}${Math.random().toString(36).slice(2)}`;
      store.set('lbs_book_sid', sid, true);
    }
    session.current = sid;
    // keep the first source seen in this visit (an ad click survives moving between pages)
    const saved = store.get('lbs_book_src', true);
    const src: Record<string, string> = saved ? JSON.parse(saved) : {};
    for (const k of SOURCE_KEYS) {
      const v = params.get(k);
      if (v && !src[k]) src[k] = v.slice(0, 200);
    }
    if (!src.landing) src.landing = `${location.pathname}${location.search}`.slice(0, 200);
    if (!src.referrer && document.referrer) {
      try {
        const host = new URL(document.referrer).hostname;
        if (host !== location.hostname) src.referrer = host;
      } catch {
        /* ignore */
      }
    }
    if (params.get('tech')) src.tech_link = params.get('tech')!;
    if (campaignParam) src.campaign = campaignParam;
    if (initial.look) src.looked = initial.look;
    const vid = store.get('lbs_vid');
    if (vid) src.visitor_id = vid;
    source.current = src;
    store.set('lbs_book_src', JSON.stringify(src), true);
    if (!initial.branch) {
      const last = Number(store.get('lbs_book_branch'));
      if (branchById(last)) setBranch(last);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let live = true;
    fetch(`/api/book/availability?days=${DAYS_MORE}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: Avail) => live && setAvail(d))
      .catch(() => live && setAvail({ ok: false }));
    return () => {
      live = false;
    };
  }, []);

  const dbReady = avail?.ok === true;
  const payByMpesa = dbReady && avail?.payment === 'mpesa';
  const otpOn = dbReady && avail?.otp === true; // phone verification code available

  // what she looked at before booking (kept on the booking's source, for /admin and ad reports)
  const noteSource = (k: string, v: string) => {
    source.current = { ...source.current, [k]: v };
    store.set('lbs_book_src', JSON.stringify(source.current), true);
  };
  function openExplainer(key: keyof typeof EXPLAINERS) {
    setExplainer(key);
    if (key === 'first-time') noteSource('first_time', 'yes');
    gtm('explainer_open', { lbs_explainer: key });
  }

  function openLook(slug: string) {
    setSheet(slug);
    noteSource('looked', slug);
    gtm('book_look_open', { lbs_service: svc(slug)?.name });
  }

  // save progress (step, cart, phone) so unfinished bookings can be followed up
  const track = useCallback(
    (stepName: string, extra: Record<string, unknown> = {}) => {
      if (!session.current) return Promise.resolve(null);
      return fetch('/api/book/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: session.current,
          step: stepName,
          cart,
          branch,
          staff: tech || null,
          starts_at: slotIso,
          source: source.current,
          ...extra,
        }),
        keepalive: true,
      })
        .then((r) => r.json())
        .catch(() => null);
    },
    [cart, branch, tech, slotIso],
  );

  useEffect(() => {
    if (done) return;
    const name = ['service', 'where', 'when', 'details'][step];
    gtm('book_step', { lbs_step: name, lbs_step_number: step + 1 });
    if (step > 0) track(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ---------- derived ----------
  const items = cart.map((s) => svc(s)).filter(Boolean) as Service[];
  const duration = items.reduce((a, s) => a + s.duration, 0);
  const total = items.reduce((a, s) => a + offerPrice(s), 0);
  const listTotal = items.reduce((a, s) => a + s.price, 0);
  const fee = items.length ? Math.max(...items.map((s) => s.fee)) : 0;
  const lashItem = items.find(isLash);
  const isNewSet = lashItem && lashItem.category !== 'refill';

  const busy: Busy[] = useMemo(
    () => (avail?.busy || []).map((b) => ({ staff: b.staff, start: Date.parse(b.start), end: Date.parse(b.end) })),
    [avail],
  );
  const branchInfo = (id: number) => {
    const base = branchById(id)!;
    const live = avail?.branches?.find((b) => b.id === id);
    return live ? { ...base, days: live.days, opens: live.opens, closes: live.closes } : base;
  };
  const techsAt = (id: number) => {
    const active = avail?.staff ? new Set(avail.staff.map((s) => s.slug)) : null;
    return BOOK_TECHS.filter((t) => t.branch === id && (!active || active.has(t.slug)));
  };
  const candidates = branch ? (tech ? [tech] : techsAt(branch).map((t) => t.slug)) : [];
  const today = nairobiDate(new Date());

  const earliestFor = (techSlugs: string[], id: number) =>
    duration ? earliestSlot({ from: today, days: DAYS_MORE, branch: branchInfo(id), duration, candidates: techSlugs, busy }) : null;

  const earliest = branch ? earliestFor(candidates, branch) : null;
  const daySlots: Slot[] =
    branch && dateKey ? slotsForDay({ dateKey, branch: branchInfo(branch), duration, candidates, busy }) : [];

  // keep the chosen time valid when service, branch or tech change
  useEffect(() => {
    if (slotIso && !daySlots.some((s) => s.iso === slotIso)) setSlotIso(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, branch, tech, dateKey, avail]);

  // ---------- service picking ----------
  function toggle(s: Service) {
    setNote(null);
    if (cart.includes(s.slug)) {
      setCart(cart.filter((c) => c !== s.slug));
      if (refillAsk === s.slug) setRefillAsk(null);
      return;
    }
    let next = cart;
    if (isLash(s)) next = next.filter((c) => !isLash(svc(c)!)); // one lash service per visit
    next = [...next, s.slug];
    setCart(next);
    setRefillAsk(s.category === 'refill' ? s.slug : null);
    gtm('book_service', { lbs_service: s.name });
  }

  function answerRefill(answer: 'recent' | 'old' | 'elsewhere') {
    const r = refillAsk && svc(refillAsk);
    setRefillAsk(null);
    if (!r || !r.refillOf) return;
    if (answer === 'recent') return;
    const set = svc(r.refillOf)!;
    let next = cart.filter((c) => c !== r.slug).concat(set.slug);
    if (answer === 'elsewhere') {
      if (!next.includes('lash-removal')) next = next.concat('lash-removal');
      setNote(
        `Refills are for sets we did ourselves, so we have switched you to a fresh ${set.name} (${ksh(offerPrice(set))}) and added a gentle removal of your current lashes first. That is exactly what happens at the chair, so there are no surprises.`,
      );
    } else {
      setNote(
        `After ${REFILL_DAYS} days a refill counts as a new set, so we have switched you to the ${set.name} at ${ksh(offerPrice(set))}. That is the price you will pay at the chair, no surprises.`,
      );
    }
    setCart(next);
    setCat(set.category);
  }

  // ---------- step checks ----------
  const healthAnswered = returning?.returning || healthNone || health.length > 0;
  const canContinue = [
    items.length > 0 && !refillAsk,
    !!branch && !pickBranch && (!!earliest || !avail),
    !!slotIso,
    phoneOk(phone) &&
      name.trim().length >= 2 &&
      emailOk(email) &&
      (!otpOn || verified) &&
      healthAnswered &&
      (returning?.returning || healthNone || consent),
  ][step];

  function next() {
    setError(null);
    if (step === 1 && branch) store.set('lbs_book_branch', String(branch));
    if (step === 2 && !slotIso) return;
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else submit();
  }

  function back() {
    setError(null);
    if (step > 0) setStep(step - 1);
  }

  // jump straight to the earliest slot's day when arriving at step 3
  useEffect(() => {
    if (step === 2 && !dateKey && earliest) setDateKey(earliest.dateKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, earliest?.dateKey]);

  // ---------- phone: remembered device, verification code, returning client ----------
  const applyMe = useCallback((m: Me) => {
    setMe(m);
    setPhone(localPhone(m.phone));
    if (m.name) setName(m.name);
    if (m.email) setEmail(m.email);
    setVerified(true);
    setReturning({
      returning: m.returning,
      first_name: (m.name || '').split(' ')[0] || undefined,
      last_staff: m.last_staff || undefined,
      last_staff_name: m.last_staff_name,
      last_branch: m.last_branch || undefined,
    });
    // her usual studio, unless this visit already chose one (tech link, ?branch=)
    if (m.last_branch && branchById(m.last_branch)) setBranch((b) => b ?? m.last_branch!);
  }, []);

  // A device that verified before: "Booking as Amina", no code needed. Also gives step 2 "Book again with".
  useEffect(() => {
    const token = store.get('lbs_book_token');
    if (!token) return;
    fetch('/api/book/me', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
      .then((r) => r.json())
      .then((m: Me & { ok?: boolean }) => {
        if (m.ok && m.phone) applyMe(m);
        else store.set('lbs_book_token', '');
      })
      .catch(() => null);
  }, [applyMe]);

  async function forgetMe() {
    const token = store.get('lbs_book_token');
    store.set('lbs_book_token', '');
    if (token) fetch('/api/book/me', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, forget: true }) }).catch(() => null);
    setMe(null);
    setVerified(false);
    setCodeSent(false);
    setCode('');
    setPhone('');
    setName('');
    setEmail('');
    setReturning(null);
    setEditDetails(false);
  }

  // a changed number needs a new code
  const verifiedPhone = useRef('');
  useEffect(() => {
    const p = normPhone(phone);
    if (verified && verifiedPhone.current && p !== verifiedPhone.current) {
      setVerified(false);
      setMe(null);
      setCodeSent(false);
      setCode('');
    }
    if (verified && !verifiedPhone.current) verifiedPhone.current = p;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone, verified]);

  // Without verification (no code sender yet): returning check once a full number is typed.
  const lastPhone = useRef('');
  useEffect(() => {
    if (otpOn || verified) return;
    const p = phone.replace(/[\s-]/g, '');
    if (!phoneOk(p) || p === lastPhone.current) return;
    lastPhone.current = p;
    track('phone', { phone: p, name: name || undefined }).then((r: (Returning & { ok?: boolean }) | null) => {
      if (r && r.returning) {
        setReturning(r);
        if (!name && r.first_name) setName(r.first_name);
      } else setReturning({ returning: false });
    });
    gtm('book_phone');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone, otpOn]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn(resendIn - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  async function sendCode() {
    const p = phone.replace(/[\s-]/g, '');
    if (!phoneOk(p) || otpBusy) return;
    setOtpBusy(true);
    setOtpMsg(null);
    track('phone', { phone: p, name: name || undefined });
    gtm('book_phone');
    try {
      const r = await fetch('/api/book/otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'send', phone: p, session_id: session.current }) });
      const d: { ok: boolean; error?: string } = await r.json();
      if (!d.ok) {
        setOtpMsg(
          d.error === 'wait'
            ? 'Too many codes for this number. Please try again in a few minutes.'
            : 'We could not send the code. Check the number and try again, or finish on WhatsApp.',
        );
        return;
      }
      setCodeSent(true);
      setCode('');
      setResendIn(30);
      gtm('book_code_sent');
      // Android Chrome can read the code from the SMS by itself
      try {
        const nav = navigator as Navigator & { credentials: { get: (o: unknown) => Promise<{ code?: string } | null> } };
        if ('OTPCredential' in window) {
          nav.credentials.get({ otp: { transport: ['sms'] }, signal: AbortSignal.timeout(120000) }).then((c) => {
            if (c?.code) {
              setCode(c.code);
              verifyCode(c.code);
            }
          }).catch(() => null);
        }
      } catch {
        /* not supported */
      }
    } catch {
      setOtpMsg('We could not send the code. Please try again.');
    } finally {
      setOtpBusy(false);
    }
  }

  async function verifyCode(value = code) {
    const c = value.replace(/\D/g, '');
    if (c.length !== 6 || otpBusy) return;
    setOtpBusy(true);
    setOtpMsg(null);
    try {
      const r = await fetch('/api/book/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', phone: phone.replace(/[\s-]/g, ''), session_id: session.current, code: c }),
      });
      const d: Me & { ok: boolean; token?: string; error?: string; left?: number } = await r.json();
      if (!d.ok || !d.token) {
        setOtpMsg(
          d.error === 'code'
            ? `That code is not right.${d.left ? ` ${d.left} ${d.left === 1 ? 'try' : 'tries'} left.` : ''}`
            : 'That code has expired. Tap "Send a new code".',
        );
        return;
      }
      store.set('lbs_book_token', d.token);
      verifiedPhone.current = normPhone(phone);
      applyMe(d);
      setCodeSent(false);
      gtm('book_phone_verified', { lbs_returning: d.returning });
    } catch {
      setOtpMsg('Something went wrong. Please try again.');
    } finally {
      setOtpBusy(false);
    }
  }

  // ---------- submit ----------
  const startLocal = slotIso ? new Date(slotIso) : null;
  const timeLabel = startLocal && dateKey ? `${longDate(dateKey)}, ${formatTime(slotTime(slotIso!))}` : '';
  const techName = tech ? techBySlug(tech)?.name : null;

  function whatsappText(ref?: string) {
    const b = branch ? branchById(branch) : null;
    return [
      `Hi Lashes by Shazz, I'd like to book${ref ? ` (ref ${ref})` : ''}:`,
      ...items.map((s) => `- ${s.name}, ${ksh(offerPrice(s))}`),
      b ? `Branch: ${b.name}` : '',
      `Tech: ${techName || 'next available'}`,
      timeLabel ? `Time: ${timeLabel}` : '',
      `Name: ${name}`,
      `Phone: ${phone}`,
    ]
      .filter(Boolean)
      .join('\n');
  }

  async function submit() {
    if (!branch || !slotIso) return;
    setSubmitting(true);
    setError(null);
    const healthAnswers = returning?.returning
      ? null
      : { conditions: healthNone ? ['None'] : health, look: look.trim() || undefined };
    const payload = {
      session_id: session.current,
      phone: phone.replace(/[\s-]/g, ''),
      name: name.trim(),
      email: email.trim(),
      verify_token: store.get('lbs_book_token') || null,
      branch,
      staff: tech || null,
      rebook: !!(tech && returning?.last_staff === tech),
      starts_at: slotIso,
      cart,
      campaign: offer?.code || campaignParam || null,
      channel: params.get('tech') ? 'tech_link' : 'website',
      source: source.current,
      heard_from: !returning?.returning ? heard || null : null,
      referred_by: heard === 'Friend' ? referredBy.trim() || null : null,
      health: healthAnswers,
      health_consent: !!healthAnswers && (healthNone || consent),
      marketing_opt_in: optIn,
      lock_refill: !!(isNewSet && lockRefill),
    };
    try {
      if (!dbReady) throw new Error('setup');
      const r = await fetch('/api/book/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const d: Done & { error?: string } = await r.json();
      if (d.error === 'setup') throw new Error('setup');
      if (!d.ok) {
        const msg: Record<string, string> = {
          taken: 'That time was just taken. Please pick another one.',
          hours: 'That time is outside opening hours. Please pick another one.',
          time: 'That time is too close or too far ahead. Please pick another one.',
          phone: 'Please check your phone number.',
          name: 'Please add your name.',
          email: 'Please check your email address.',
          verify: 'Please confirm your phone number with the code we send you.',
        };
        setError(msg[d.error || ''] || 'Something went wrong. Please try again, or finish on WhatsApp.');
        if (d.error === 'verify') {
          setVerified(false);
          setMe(null);
          store.set('lbs_book_token', '');
        }
        if (d.error === 'taken' || d.error === 'hours' || d.error === 'time') {
          setSlotIso(null);
          setStep(2);
          fetch(`/api/book/availability?days=${DAYS_MORE}`, { cache: 'no-store' })
            .then((x) => x.json())
            .then(setAvail)
            .catch(() => null);
        }
        return;
      }
      gtm('book_submitted', { lbs_ref: d.ref, lbs_value: d.total, lbs_fee: d.fee, lbs_branch: branchById(branch)?.name, lbs_tech: d.staff_name });
      setDone(d);
      if (d.payment === 'sent') setPaid('waiting');
      window.scrollTo({ top: 0 });
    } catch {
      // No booking database yet (or it is down): finish on WhatsApp with everything filled in.
      const b = branchById(branch)!;
      gtm('book_submitted', { lbs_ref: 'whatsapp', lbs_value: total, lbs_branch: b.name });
      window.open(waLink(b.whatsapp, whatsappText()), '_blank', 'noopener');
      setDone({ ok: true, whatsapp: true, branch, starts_at: slotIso, total, fee, staff_name: techName || undefined });
      window.scrollTo({ top: 0 });
    } finally {
      setSubmitting(false);
    }
  }

  // poll for the M-Pesa result
  useEffect(() => {
    if (paid !== 'waiting' || !done?.ref) return;
    let n = 0;
    const id = setInterval(async () => {
      n++;
      try {
        const r = await fetch(`/api/book/status?ref=${done.ref}&phone=${encodeURIComponent(phone)}`, { cache: 'no-store' });
        const s = await r.json();
        if (s.status === 'confirmed') {
          setPaid('paid');
          gtm('book_paid', { lbs_ref: done.ref, lbs_fee: done.fee });
        } else if (s.failed) setPaid('failed');
      } catch {
        /* keep waiting */
      }
      if (n > 40) setPaid('failed');
    }, 4000);
    return () => clearInterval(id);
  }, [paid, done, phone]);

  // ---------- render ----------
  if (done) return <Confirmation done={done} paid={paid} phone={phone} whatsappText={whatsappText} lockRefill={!!(isNewSet && lockRefill)} />;

  const shownDays = Array.from({ length: moreDates ? DAYS_MORE : DAYS_SHOWN }, (_, i) => addDays(today, i));
  const isMidnight = offer?.theme === 'midnight';

  return (
    <div className="pb-40">
      {offer && <OfferBanner offer={offer} />}

      {/* progress */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              disabled={i > step}
              onClick={() => i < step && setStep(i)}
              className={`flex-1 pb-2 border-b-2 text-left transition-colors ${
                i === step ? 'border-pink-300 text-pink-200' : i < step ? 'border-pink-300/40 text-white/60' : 'border-white/10 text-white/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-8">
        {/* ---------- 1. service ---------- */}
        {step === 0 && (
          <section>
            <h1 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">What are you coming in for?</h1>
            <p className="mt-2 text-sm text-white/55">Prices include VAT. Pick a lash set and add a removal or brows if you need them.</p>

            <button
              type="button"
              onClick={() => openExplainer('first-time')}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-pink-300/40 bg-pink-300/[0.06] px-4 py-2 text-sm text-pink-100 hover:border-pink-300/70"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l10.5-6.5z" />
              </svg>
              First time getting lashes? See what happens
            </button>

            <div className="mt-6 -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2 w-max">
                {CATEGORIES.map((c) => {
                  const n = cart.filter((s) => svc(s)?.category === c.key).length;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setCat(c.key)}
                      className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase whitespace-nowrap border transition ${
                        cat === c.key ? 'bg-pink-300 text-gray-900 border-pink-300' : 'border-white/15 text-white/70 hover:border-white/40'
                      }`}
                    >
                      {c.label}
                      {n > 0 && <span className={`ml-1.5 ${cat === c.key ? 'text-gray-900/60' : 'text-pink-300'}`}>· {n}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {note && <p className="mt-5 rounded-2xl border border-pink-300/25 bg-pink-300/[0.05] p-4 text-sm text-white/80 leading-relaxed">{note}</p>}

            <ul className="mt-6 space-y-3">
              {services
                .filter((s) => s.category === cat)
                .sort((a, b) => Number(offerApplies(offer, b)) - Number(offerApplies(offer, a)))
                .map((s) => {
                  const on = cart.includes(s.slug);
                  const price = offerPrice(s);
                  return (
                    <li key={s.slug}>
                      <div
                        className={`relative overflow-hidden rounded-2xl border transition ${
                          on ? 'border-pink-300/70 bg-pink-300/[0.08]' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                        }`}
                      >
                        {/* the whole card adds the service; the Add and eye buttons sit on top */}
                        <button type="button" onClick={() => toggle(s)} tabIndex={-1} aria-hidden className="absolute inset-0" />
                        {s.image && (
                          <Image
                            src={s.image}
                            alt=""
                            aria-hidden
                            width={240}
                            height={240}
                            className={`pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full object-cover ${on ? 'opacity-45' : 'opacity-25'}`}
                            style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
                          />
                        )}
                        <div className="relative pointer-events-none p-5 pr-32">
                          <span className="block text-lg font-light text-white">{s.name}</span>
                          <span className="block mt-1 text-sm text-white/55 leading-snug">{s.text}</span>
                          <span className="mt-3 flex items-baseline gap-3 text-sm">
                            {price < s.price && <span className="text-white/35 line-through">{ksh(s.price)}</span>}
                            <span className={`text-base ${s.category === 'uv' || price < s.price ? 'text-pink-200' : 'text-white'}`}>{ksh(price)}</span>
                            <span className="text-white/40">{formatDuration(s.duration)}</span>
                          </span>
                        </div>
                        <div className="absolute right-3 top-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggle(s)}
                            aria-pressed={on}
                            aria-label={`${on ? 'Remove' : 'Add'} ${s.name}`}
                            className={`h-8 px-3 rounded-full text-[10px] tracking-[0.2em] uppercase transition ${
                              on ? 'bg-pink-300 text-gray-900' : 'border border-white/20 text-white/70 hover:border-white/50'
                            }`}
                          >
                            {on ? 'Added' : 'Add'}
                          </button>
                          {s.setKey && (s.category === 'uv' || s.category === 'normal') && (
                            <button
                              type="button"
                              onClick={() => openLook(s.slug)}
                              aria-label={`See the look: ${s.name}`}
                              title="See the look"
                              className="w-8 h-8 rounded-full border border-pink-300/40 bg-black/30 text-pink-200 hover:border-pink-300 flex items-center justify-center"
                            >
                              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      {refillAsk === s.slug && (
                        <div className="mt-2 rounded-2xl border border-pink-300/25 bg-pink-300/[0.05] p-4">
                          <p className="text-sm text-white">When was your last set done?</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Chip onClick={() => answerRefill('recent')}>Here, within 3 weeks</Chip>
                            <Chip onClick={() => answerRefill('old')}>More than 3 weeks ago</Chip>
                            <Chip onClick={() => answerRefill('elsewhere')}>At another salon</Chip>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>


            {isNewSet && !cart.includes('lash-removal') && (
              <label className="mt-4 flex items-start gap-3 text-sm text-white/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={otherSalon}
                  onChange={(e) => {
                    setOtherSalon(e.target.checked);
                    if (e.target.checked) {
                      setCart((c) => (c.includes('lash-removal') ? c : [...c, 'lash-removal']));
                      setNote(`We have added a gentle removal (${ksh(svc('lash-removal')!.price)}) so your new set starts on clean, healthy lashes.`);
                    }
                  }}
                  className="mt-1 accent-pink-300"
                />
                I am wearing lash extensions from another salon right now
              </label>
            )}

            {livePromises().length > 0 && (
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {livePromises().map((p) => (
                  <li key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <span className="block text-sm text-white">{p.title}</span>
                    <span className="block text-xs text-white/50 mt-0.5">{p.text}</span>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-8 text-xs text-white/40">
              Also at The Beauty Vault: <a href="https://booking.revive.co.ke/" className="underline hover:text-white/70">aesthetics by Revive</a> and{' '}
              <Link href="/hair" className="underline hover:text-white/70">wigs by Shasha Hair</Link>.
            </p>
          </section>
        )}

        {/* ---------- 2. branch and tech ---------- */}
        {step === 1 && (
          <section>
            <h1 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">
              {branch && !pickBranch ? 'With whom?' : 'Which studio?'}
            </h1>

            {/* one question at a time: the branch first, then the techs at that branch */}
            {!branch || pickBranch ? (
              <div className="mt-6 grid grid-cols-2 gap-2">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setBranch(b.id);
                      setPickBranch(false);
                      if (tech && techBySlug(tech)?.branch !== b.id) setTech('');
                      setTimeout(() => techHead.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                    }}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      branch === b.id ? 'border-pink-300/70 bg-pink-300/[0.08]' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                    }`}
                  >
                    <span className="block text-white text-lg">{b.name}</span>
                    <span className="block text-xs text-white/45 mt-0.5 leading-snug">{b.address}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="min-w-0">
                  <span className="block text-white">{branchById(branch)!.name}</span>
                  <span className="block text-xs text-white/45 truncate">{branchById(branch)!.address}</span>
                </span>
                <button type="button" onClick={() => setPickBranch(true)} className="shrink-0 text-xs tracking-wider uppercase text-pink-300 hover:text-pink-200">
                  Change
                </button>
              </div>
            )}

            {branch && !pickBranch && (
              <>
                <p ref={techHead} className="mt-8 scroll-mt-6 text-[11px] tracking-[0.25em] uppercase text-white/45">Your lash tech</p>
                <ul className="mt-3 space-y-2">
                  {returning?.last_staff && techBySlug(returning.last_staff)?.branch === branch && (
                    <TechRow
                      selected={tech === returning.last_staff}
                      onClick={() => setTech(returning.last_staff!)}
                      title={`Book again with ${returning.last_staff_name || techBySlug(returning.last_staff)!.first}`}
                      sub="Your last lash tech"
                      photo={techBySlug(returning.last_staff)!.photo}
                      earliest={earliestFor([returning.last_staff], branch)}
                      today={today}
                    />
                  )}
                  <TechRow
                    selected={tech === ''}
                    onClick={() => setTech('')}
                    title="Next available tech"
                    sub="The soonest time with any of our UV-trained techs"
                    earliest={earliestFor(techsAt(branch).map((t) => t.slug), branch)}
                    today={today}
                  />
                  {techsAt(branch).map((t) => (
                    <TechRow
                      key={t.slug}
                      selected={tech === t.slug}
                      onClick={() => setTech(t.slug)}
                      title={t.name}
                      sub={t.specialty}
                      photo={t.photo}
                      earliest={earliestFor([t.slug], branch)}
                      today={today}
                    />
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* ---------- 3. date and time ---------- */}
        {step === 2 && branch && (
          <section>
            <h1 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">When suits you?</h1>
            <p className="mt-2 text-sm text-white/55">
              {branchById(branch)!.name} · {techName || 'Next available tech'} · {formatDuration(duration)}
            </p>

            {earliest ? (
              <button
                type="button"
                onClick={() => {
                  setDateKey(earliest.dateKey);
                  setSlotIso(earliest.slot.iso);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-pink-300/50 bg-pink-300/10 px-4 py-2 text-sm text-pink-100"
              >
                Earliest: {dayLabel(earliest.dateKey, today)} {formatTime(earliest.slot.time)}
              </button>
            ) : (
              <p className="mt-5 text-sm text-white/60">No free times in the next few weeks with this choice. Try another tech or branch.</p>
            )}

            <div className={`mt-6 ${moreDates ? 'grid grid-cols-7 gap-1.5' : '-mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'}`}>
              <div className={moreDates ? 'contents' : 'flex gap-2 w-max'}>
                {shownDays.map((d) => {
                  const left = slotsForDay({ dateKey: d, branch: branchInfo(branch), duration, candidates, busy }).length;
                  const open = left > 0;
                  const few = open && left <= FEW_LEFT;
                  const on = d === dateKey;
                  return (
                    <button
                      key={d}
                      type="button"
                      disabled={!open}
                      onClick={() => {
                        setDateKey(d);
                        setSlotIso(null);
                      }}
                      className={`rounded-2xl border text-center transition ${moreDates ? 'py-2' : 'w-16 py-3'} ${
                        on
                          ? 'bg-pink-300 border-pink-300 text-gray-900'
                          : open
                            ? 'border-white/15 text-white hover:border-white/40'
                            : 'border-white/5 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider">{moreDates ? monthShort(d) : dayLabel(d, today).slice(0, 3)}</span>
                      <span className="block text-lg leading-tight">{dayNum(d)}</span>
                      {few && !moreDates && <span className={`block text-[9px] uppercase tracking-wider ${on ? 'text-gray-900/70' : 'text-amber-200'}`}>{left} left</span>}
                    </button>
                  );
                })}
              </div>
            </div>
            <button type="button" onClick={() => setMoreDates(!moreDates)} className="mt-3 text-xs tracking-wider uppercase text-pink-300 hover:text-pink-200">
              {moreDates ? 'Fewer dates' : 'More dates'}
            </button>

            {dateKey && (
              <div className="mt-6 space-y-5">
                <p className="text-white">{longDate(dateKey)}</p>
                {daySlots.length === 0 && <p className="text-sm text-white/55">No free times on this day.</p>}
                {(['Morning', 'Afternoon', 'Evening'] as const).map((part) => {
                  const list = daySlots.filter((s) => partOfDay(s.time) === part);
                  if (!list.length) return null;
                  return (
                    <div key={part}>
                      <p className="text-[11px] tracking-[0.25em] uppercase text-white/45">{part}</p>
                      <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {list.map((s) => (
                          <button
                            key={s.iso}
                            type="button"
                            onClick={() => setSlotIso(s.iso)}
                            className={`rounded-xl border py-2.5 text-sm transition ${
                              slotIso === s.iso ? 'bg-pink-300 border-pink-300 text-gray-900' : 'border-white/15 text-white hover:border-white/40'
                            }`}
                          >
                            {formatTime(s.time)}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ---------- 4. details and payment ---------- */}
        {step === 3 && (
          <section>
            <h1 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">Almost done</h1>
            <p className="mt-2 text-sm text-white/55">{timeLabel} · {branch && branchById(branch)!.name} · {techName || 'Next available tech'}</p>

            <div className="mt-6 space-y-5">
              {verified && me && me.name && me.email && !editDetails ? (
                // a known, verified client: nothing to type, just confirm and carry on
                <div className="rounded-2xl border border-pink-300/30 bg-pink-300/[0.05] p-4">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-pink-200">Booking as</p>
                  <p className="mt-1 text-lg text-white">{me.name}</p>
                  <p className="mt-0.5 text-sm text-white/60">
                    {maskPhone(me.phone)} · {maskEmail(me.email)}
                  </p>
                  <div className="mt-3 flex gap-5 text-xs tracking-wider uppercase">
                    <button type="button" onClick={() => setEditDetails(true)} className="text-pink-300 hover:text-pink-200">
                      Edit details
                    </button>
                    <button type="button" onClick={forgetMe} className="text-white/50 hover:text-white">
                      Not you?
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Field label="Phone number">
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="07..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`${inputCls} flex-1 min-w-0`}
                      />
                      {otpOn && !verified && (
                        <button
                          type="button"
                          onClick={sendCode}
                          disabled={!phoneOk(phone) || otpBusy || resendIn > 0}
                          className="shrink-0 rounded-xl border border-pink-300/60 px-4 text-xs tracking-wider uppercase text-pink-100 disabled:opacity-35"
                        >
                          {codeSent ? (resendIn > 0 ? `${resendIn}s` : 'Resend') : 'Send code'}
                        </button>
                      )}
                      {verified && (
                        <span className="shrink-0 self-center inline-flex items-center gap-1 text-xs text-emerald-300">
                          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                            <path d="M5 12l5 5 9-10" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                  </Field>
                  {otpOn && codeSent && !verified && (
                    <Field label="Enter the 6-digit code we sent you">
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="••••••"
                        value={code}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setCode(v);
                          if (v.length === 6) verifyCode(v);
                        }}
                        className={`${inputCls} tracking-[0.5em] text-center text-lg`}
                      />
                    </Field>
                  )}
                  {otpMsg && <p className="text-sm text-rose-300">{otpMsg}</p>}
                  {returning?.returning && (
                    <p className="text-sm text-pink-200">Welcome back{returning.first_name ? `, ${returning.first_name}` : ''}.</p>
                  )}
                  <Field label="Your name">
                    <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Email" hint="Your confirmation, reminders and aftercare guide come here.">
                    <input type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
                  </Field>
                </>
              )}

              {returning && !returning.returning && (
                <>
                  <div>
                    <p className="text-sm text-white">How did you hear about us?</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {HEARD.map((h) => (
                        <Chip key={h} on={heard === h} onClick={() => setHeard(heard === h ? '' : h)}>
                          {h}
                        </Chip>
                      ))}
                    </div>
                    {heard === 'Friend' && (
                      <input
                        type="text"
                        placeholder="Who referred you? (so we can thank them)"
                        value={referredBy}
                        onChange={(e) => setReferredBy(e.target.value)}
                        className={`${inputCls} mt-3`}
                      />
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-white">Before your first visit: anything we should know?</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Chip
                        on={healthNone}
                        onClick={() => {
                          setHealthNone(!healthNone);
                          setHealth([]);
                        }}
                      >
                        None of these
                      </Chip>
                      {HEALTH.map((h) => (
                        <Chip
                          key={h}
                          on={health.includes(h)}
                          onClick={() => {
                            setHealthNone(false);
                            setHealth(health.includes(h) ? health.filter((x) => x !== h) : [...health, h]);
                          }}
                        >
                          {h}
                        </Chip>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="The look you want (optional)"
                      value={look}
                      onChange={(e) => setLook(e.target.value)}
                      className={`${inputCls} mt-3`}
                    />
                    {!healthNone && (
                      <label className="mt-3 flex items-start gap-3 text-xs text-white/60 cursor-pointer">
                        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-pink-300" />
                        I agree that Lashes by Shazz keeps these answers with this appointment, seen only by my lash tech and the managers.
                      </label>
                    )}
                  </div>
                </>
              )}

              {isNewSet && startLocal && (
                <label className="flex items-start gap-3 rounded-2xl border border-pink-300/25 bg-pink-300/[0.05] p-4 cursor-pointer">
                  <input type="checkbox" checked={lockRefill} onChange={(e) => setLockRefill(e.target.checked)} className="mt-1 accent-pink-300" />
                  <span>
                    <span className="block text-sm text-white">Lock in your refill</span>
                    <span className="block text-xs text-white/55 mt-0.5">
                      We hold a refill slot around {longDate(addDays(dateKey!, 16))} at the same time. No extra fee, and we confirm it with you first.
                    </span>
                  </span>
                </label>
              )}

              <label className="flex items-start gap-3 text-xs text-white/60 cursor-pointer">
                <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="mt-0.5 accent-pink-300" />
                Send me refill reminders from my lash tech (two at most per set) and the odd note about new looks, on WhatsApp or email.
              </label>
            </div>

            {error && <p className="mt-5 text-sm text-rose-300">{error}</p>}
          </section>
        )}

        {step === 2 && error && <p className="mt-5 text-sm text-rose-300">{error}</p>}
        {avail && !dbReady && step === 3 && (
          <p className="mt-6 text-xs text-white/45">We finish this booking with you on WhatsApp: the button opens a message with everything filled in.</p>
        )}
      </div>

      {/* ---------- sticky bottom bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3">
          {step === 3 && fee > 0 && (
            <p className="mb-2 text-[11px] text-white/50 leading-snug">
              {payByMpesa ? `Pay the ${ksh(fee)} booking fee now by M-Pesa. ` : `A ${ksh(fee)} booking fee is paid by M-Pesa to confirm. `}
              {BOOKING_POLICY}
            </p>
          )}
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button type="button" onClick={back} className="shrink-0 w-11 h-11 rounded-full border border-white/15 text-white/70 hover:text-white" aria-label="Back">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
            )}
            <div className="flex-1 min-w-0">
              {items.length ? (
                <>
                  <p className="flex items-baseline gap-2 text-sm">
                    <span className={`shrink-0 ${isMidnight ? 'text-amber-200' : 'text-pink-200'}`}>{ksh(total)}</span>
                    {total < listTotal && <span className="shrink-0 text-xs text-white/35 line-through">{ksh(listTotal)}</span>}
                    <span className="min-w-0 truncate text-white/80">{items.length === 1 ? items[0].name : `${items.length} services`}</span>
                  </p>
                  <p className="text-[11px] text-white/45 truncate">
                    {ksh(fee)} now, rest at your visit · incl. VAT
                  </p>
                </>
              ) : (
                <p className="text-sm text-white/45">Pick a service to start</p>
              )}
            </div>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue || submitting}
              className="shrink-0 rounded-full bg-gradient-to-r from-pink-300 to-rose-300 px-6 h-11 text-xs font-semibold tracking-wider uppercase text-gray-900 disabled:opacity-35 disabled:cursor-not-allowed"
            >
              {submitting ? 'Booking…' : step < 3 ? 'Continue' : !dbReady ? 'Send on WhatsApp' : payByMpesa ? `Pay ${ksh(fee)}` : 'Request booking'}
            </button>
          </div>
        </div>
      </div>

      <HelpLink
        branch={branch}
        text={
          items.length
            ? `Hi Lashes by Shazz, I'm booking ${items.map((s) => s.name).join(' + ')}${branch ? ` at ${branchById(branch)!.name}` : ''} and have a question.`
            : undefined
        }
      />

      {sheet && svc(sheet) && (() => {
        const s = svc(sheet)!;
        const b = branchById(branch) || BRANCHES[1];
        return (
          <SetSheet
            service={s}
            siblings={services.filter((x) => x.category === s.category && x.setKey)}
            media={(avail?.media || []).filter((m) => m.set === s.setKey && (!m.category || m.category === s.category))}
            refill={services.find((x) => x.refillOf === s.slug)}
            price={offerPrice}
            added={cart.includes(s.slug)}
            onChoose={() => {
              if (!cart.includes(s.slug)) toggle(s);
              setCat(s.category);
              setSheet(null);
              gtm('book_look_choose', { lbs_service: s.name });
            }}
            onSwitch={(slug) => openLook(slug)}
            onWhyUV={() => openExplainer('why-uv')}
            onClose={() => setSheet(null)}
            askHref={waLink(b.whatsapp, `Hi Lashes by Shazz, I'm looking at the ${s.name} (${ksh(offerPrice(s))}). Can I ask a few questions before I book?`)}
          />
        );
      })()}

      {explainer && (
        <ExplainerModal
          explainer={EXPLAINERS[explainer]}
          onClose={() => setExplainer(null)}
          onEvent={(e) => {
            noteSource('watched', e === 'complete' ? `${explainer}:full` : explainer);
            gtm(`explainer_${e}`, { lbs_explainer: explainer });
          }}
          footer={
            explainer === 'first-time' ? (
              <p className="text-xs text-white/50">
                Not sure which set? Tap <span className="text-pink-200">See the look</span> on any set. Most first-timers start with Classic or Hybrid.
              </p>
            ) : undefined
          }
        />
      )}
    </div>
  );
}

// ---------- pieces ----------

const normPhone = (p: string) => p.replace(/\D/g, '').replace(/^0/, '254').replace(/^(?=[17]\d{8}$)/, '254');
const localPhone = (p254: string) => (p254.startsWith('254') ? `0${p254.slice(3)}` : p254);
const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.trim());
function maskPhone(p254: string) {
  const l = localPhone(p254);
  return `${l.slice(0, 4)} ••• ${l.slice(-3)}`;
}
function maskEmail(e?: string | null) {
  if (!e) return '';
  const [u, d] = e.split('@');
  return `${u.slice(0, 1)}•••${u.length > 1 ? u.slice(-1) : ''}@${d}`;
}

const inputCls =
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-300/70';

function slotTime(iso: string) {
  const t = new Date(Date.parse(iso) + 3 * 3600 * 1000);
  return `${String(t.getUTCHours()).padStart(2, '0')}:${String(t.getUTCMinutes()).padStart(2, '0')}`;
}

function offerApplies(offer: Offer | null, s: Service) {
  return !!offer && (offer.services.length === 0 || offer.services.includes(s.slug)) && typeof offer.prices?.[s.slug] === 'number';
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm text-white mb-1.5">{label}</span>
      {children}
      {hint && <span className="block mt-1.5 text-[11px] text-white/40">{hint}</span>}
    </label>
  );
}

function Chip({ on, onClick, children }: { on?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
        on ? 'bg-pink-300 border-pink-300 text-gray-900' : 'border-white/15 text-white/75 hover:border-white/40'
      }`}
    >
      {children}
    </button>
  );
}

function TechRow({
  selected,
  onClick,
  title,
  sub,
  photo,
  earliest,
  today,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  photo?: string;
  earliest: { dateKey: string; slot: Slot } | null;
  today: string;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={`w-full flex items-center gap-4 rounded-2xl border p-3 text-left transition ${
          selected ? 'border-pink-300/70 bg-pink-300/[0.08]' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
        }`}
      >
        {photo ? (
          <Image src={photo} alt={title} width={96} height={96} className="w-12 h-12 rounded-full object-cover object-top shrink-0" />
        ) : (
          <span className="w-12 h-12 rounded-full shrink-0 bg-gradient-to-br from-pink-300/40 to-rose-300/10" aria-hidden />
        )}
        <span className="flex-1 min-w-0">
          <span className="block text-white truncate">{title}</span>
          <span className="block text-xs text-white/45 truncate">{sub}</span>
        </span>
        <span className="shrink-0 text-right text-[11px] text-white/55">
          {earliest ? (
            <>
              <span className="block text-white/35 uppercase tracking-wider text-[9px]">Open slot</span>
              {dayLabel(earliest.dateKey, today)} {formatTime(earliest.slot.time)}
            </>
          ) : (
            <span className="text-white/30">Fully booked</span>
          )}
        </span>
      </button>
    </li>
  );
}

function OfferBanner({ offer }: { offer: Offer }) {
  const [left, setLeft] = useState('');
  useEffect(() => {
    const tick = () => {
      const ms = Date.parse(offer.ends_at) - Date.now();
      if (ms <= 0) return setLeft('ended');
      const h = Math.floor(ms / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setLeft(h > 47 ? `${Math.floor(h / 24)} days left` : `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s left`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [offer.ends_at]);
  const gold = offer.theme === 'midnight';
  if (left === 'ended') return null;
  return (
    <div className={`mb-8 border-y ${gold ? 'border-amber-300/30 bg-amber-300/10' : 'border-pink-300/25 bg-pink-300/10'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-sm">
        <span className={gold ? 'text-amber-100' : 'text-pink-100'}>
          {offer.banner || offer.name}
          {offer.extra ? ` · ${offer.extra}` : ''}
        </span>
        <span className={`shrink-0 tabular-nums text-xs ${gold ? 'text-amber-200' : 'text-pink-200'}`}>{left}</span>
      </div>
    </div>
  );
}

function HelpLink({ branch, text }: { branch: number | null; text?: string }) {
  const b = branchById(branch) || BRANCHES[1];
  return (
    <p className="max-w-2xl mx-auto px-4 sm:px-6 mt-12 text-sm text-white/50">
      Need help?{' '}
      <a href={waLink(b.whatsapp, text || 'Hi Lashes by Shazz, I need help with a booking.')} target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200">
        Chat with us on WhatsApp
      </a>{' '}
      or call <a href={`tel:+${b.whatsapp}`} className="text-pink-300 hover:text-pink-200">{b.phone}</a>.
    </p>
  );
}

function icsHref(opts: { title: string; start: string; end: string; location: string; details: string }) {
  const f = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lashes by Shazz//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${f(opts.start)}-${Math.random().toString(36).slice(2)}@lashesbyshazz.com`,
    `DTSTAMP:${f(new Date().toISOString())}`,
    `DTSTART:${f(opts.start)}`,
    `DTEND:${f(opts.end)}`,
    `SUMMARY:${opts.title}`,
    `LOCATION:${opts.location}`,
    `DESCRIPTION:${opts.details}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function Confirmation({
  done,
  paid,
  phone,
  whatsappText,
  lockRefill,
}: {
  done: Done;
  paid: 'waiting' | 'paid' | 'failed' | null;
  phone: string;
  whatsappText: (ref?: string) => string;
  lockRefill: boolean;
}) {
  const b = branchById(done.branch)!;
  const tech = techBySlug(done.staff);
  const start = done.starts_at!;
  const end = done.ends_at || start;
  const dateKey = nairobiDate(new Date(start));
  const when = `${longDate(dateKey)}, ${formatTime(slotTime(start))}`;
  const confirmed = paid === 'paid' || done.status === 'confirmed';
  const title = done.whatsapp
    ? 'Finish on WhatsApp'
    : confirmed
      ? `You're booked${tech ? ` with ${tech.first}` : ''}`
      : paid === 'waiting'
        ? 'Check your phone'
        : 'Request received';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex items-center gap-4">
        {tech && <Image src={tech.photo} alt={tech.name} width={128} height={128} className="w-16 h-16 rounded-full object-cover object-top" />}
        <h1 className="text-5xl sm:text-6xl font-[family-name:var(--font-italianno)] text-white">{title}</h1>
      </div>

      <p className="mt-4 text-white/75 leading-relaxed">
        {done.whatsapp
          ? 'A WhatsApp message with your booking has opened. Send it and our team will confirm your time and send the booking fee request.'
          : paid === 'waiting'
            ? `Enter your M-Pesa PIN on ${phone} to pay the ${ksh(done.fee || 0)} booking fee. This page updates by itself.`
            : paid === 'failed'
              ? 'The M-Pesa payment did not go through. Your time is held for now: message us on WhatsApp and we will send the request again.'
              : confirmed
                ? 'Your booking fee is paid and your time is confirmed. We will remind you the day before.'
                : 'We have your booking. Our team will confirm it on WhatsApp shortly and send the booking fee request by M-Pesa.'}
      </p>

      <dl className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] divide-y divide-white/10 text-sm">
        {done.ref && <Row k="Reference" v={done.ref} />}
        <Row k="When" v={when} />
        <Row k="Where" v={`${b.name}, ${b.address}`} />
        <Row k="Lash tech" v={tech?.name || done.staff_name || 'Next available tech'} />
        {done.items?.map((i) => <Row key={i.slug} k={i.name} v={ksh(i.price)} />)}
        {done.total != null && <Row k="Total (incl. VAT)" v={ksh(done.total)} />}
        {done.fee != null && done.total != null && <Row k="At the appointment" v={ksh(done.total - (confirmed ? done.fee : 0))} />}
        {lockRefill && <Row k="Refill" v={`We will hold a slot around ${longDate(nairobiDate(new Date(Date.parse(start) + 16 * 86400000)))}`} />}
      </dl>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <a
          href={waLink(b.whatsapp, done.whatsapp ? whatsappText() : `Hi Lashes by Shazz, about my booking ${done.ref}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gradient-to-r from-pink-300 to-rose-300 px-5 py-3 text-center text-xs font-semibold tracking-wider uppercase text-gray-900"
        >
          WhatsApp us
        </a>
        <a
          href={icsHref({
            title: `Lashes by Shazz${tech ? ` with ${tech.first}` : ''}`,
            start,
            end,
            location: `Lashes by Shazz ${b.name}, ${b.address}, Nairobi`,
            details: `${(done.items || []).map((i) => i.name).join(', ')}. Ref ${done.ref || ''}. Come with clean, makeup-free lashes.`,
          })}
          download="lashes-by-shazz.ics"
          className="rounded-full border border-white/20 px-5 py-3 text-center text-xs tracking-wider uppercase text-white hover:border-white/50"
        >
          Add to calendar
        </a>
        <a
          href={b.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/20 px-5 py-3 text-center text-xs tracking-wider uppercase text-white hover:border-white/50"
        >
          Directions
        </a>
      </div>

      <div className="mt-10">
        <p className="text-[11px] tracking-[0.25em] uppercase text-pink-200">Before you come</p>
        <ul className="mt-3 space-y-2 text-sm text-white/70 leading-relaxed">
          <li>Come with clean, makeup-free lashes: no mascara, oils or lash serums on the day.</li>
          <li>Arrive a few minutes early. Running late? Message us on WhatsApp.</li>
        </ul>
      </div>

      <p className="mt-10 text-sm text-white/50">
        While you are here: <Link href="/aesthetics" className="text-pink-300 hover:text-pink-200">Revive Aesthetics</Link> is at Silverpool Suite, Jabavu Lane, for facials and skin treatments.
      </p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-3">
      <dt className="text-white/50">{k}</dt>
      <dd className="text-white text-right">{v}</dd>
    </div>
  );
}
