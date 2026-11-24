// Clean, shareable booking links, e.g. lashesbyshazz.com/book/linda or /book/cbd.
// Each open is counted for Admin -> Analytics (which tech's link, where it was shared from), then the visitor
// is sent on to the booking site, or to /book with that tech or branch already picked once NEW_BOOKING_LIVE
// is on (lib/booking/config.ts). Temporary (307) redirects, so a staff id can change at any time.
import { NextResponse } from 'next/server';
import { TECHS, BRANCH_SLUGS, BOOKING_BASE, techBookingUrl, branchBookingUrl } from '@/lib/techs';
import { ANALYTICS_URL, ANALYTICS_ANON_KEY } from '@/lib/analytics';
import { NEW_BOOKING_LIVE } from '@/lib/booking/config';

export const dynamic = 'force-dynamic';

const BOTS = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|skype|discord|slack|headless/i;
const BRANCH_NAME: Record<number, string> = { 1: 'CBD', 2: 'Hurlingham' };

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await params;
  const slug = raw.toLowerCase();
  const tech = TECHS.find((t) => t.slug === slug);
  const branchId = (BRANCH_SLUGS as Record<string, number>)[slug];
  const url = new URL(request.url);
  let destination = tech ? techBookingUrl(tech.staffId) : branchId ? branchBookingUrl(branchId) : `${BOOKING_BASE}/appointments`;
  if (NEW_BOOKING_LIVE) {
    // Same host the visitor used (the site sits behind a proxy), with ad tags carried over.
    const host = request.headers.get('x-forwarded-host') || url.host;
    const proto = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
    const to = new URL('/book', `${proto}://${host}`);
    if (tech) to.searchParams.set('tech', tech.slug);
    else if (branchId) to.searchParams.set('branch', slug);
    url.searchParams.forEach((v, k) => {
      if (/^(utm_|gclid|fbclid|ttclid|service|campaign)/.test(k)) to.searchParams.set(k, v);
    });
    destination = to.toString();
  }
  const ua = request.headers.get('user-agent') || '';
  // One random id per browser (a cookie on this site only), so the same person opening links twice counts once.
  const cookieId = /(?:^|;\s*)lbs_lid=([\w-]{8,64})/.exec(request.headers.get('cookie') || '')?.[1];
  const visitorId = cookieId || crypto.randomUUID();
  if (!BOTS.test(ua)) {
    let referrer = '';
    try {
      const ref = request.headers.get('referer');
      if (ref) referrer = new URL(ref).hostname.replace(/^www\./, '');
    } catch {
      referrer = '';
    }
    const payload = {
      name: 'book_link_open',
      visitor_id: visitorId,
      session_id: crypto.randomUUID(),
      path: `/book/${slug}`,
      referrer,
      utm_source: url.searchParams.get('utm_source') || (url.searchParams.get('fbclid') ? 'facebook' : ''),
      utm_medium: url.searchParams.get('utm_medium') || '',
      utm_campaign: url.searchParams.get('utm_campaign') || '',
      brand: 'Lashes by Shazz',
      label: tech ? `Booking link: ${tech.name}` : `Booking link: ${slug}`,
      tech: tech?.name || '',
      branch: BRANCH_NAME[tech?.branch ?? branchId ?? 0] || '',
      device: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'mobile' : 'desktop',
    };
    // Wait briefly so the count is saved, but never hold the visitor up for long.
    await Promise.race([
      fetch(`${ANALYTICS_URL}/rest/v1/rpc/lbs_track_event`, {
        method: 'POST',
        headers: {
          apikey: ANALYTICS_ANON_KEY,
          Authorization: `Bearer ${ANALYTICS_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ p: payload }),
      }).catch(() => null),
      new Promise((r) => setTimeout(r, 1500)),
    ]);
  }
  const res = NextResponse.redirect(destination, { status: 307, headers: { 'Cache-Control': 'no-store' } });
  if (!cookieId) res.cookies.set('lbs_lid', visitorId, { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', secure: true, httpOnly: true, path: '/book' });
  return res;
}
