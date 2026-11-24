// Visit info for analytics (public/scripts/lbs-track.js asks once per visit). Same as Lash Tribe's /api/visit.
// Returns the visitor's approximate town and country and a "net" code: a one-way hash of their internet
// address that changes every day. The address itself is never returned or stored. With the device type it
// lets Admin -> Analytics count one person once, even when they open the site in several apps on one day.
//
// lashesbyshazz.com reaches Netlify through a proxy server. When that happens Netlify's own town lookup is
// the proxy's town, not the visitor's, so it is left blank and the dashboard falls back to the time zone.
export const dynamic = 'force-dynamic';

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

type Geo = { city?: string; subdivision?: { name?: string }; country?: { name?: string; code?: string } };

export async function GET(request: Request) {
  let geo: Geo | null = null;
  try {
    const raw = request.headers.get('x-nf-geo');
    if (raw) geo = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  } catch {
    geo = null;
  }
  const edgeIp = (request.headers.get('x-nf-client-connection-ip') || '').trim();
  const forwarded = (request.headers.get('x-forwarded-for') || '').split(',').map((s) => s.trim()).filter(Boolean);
  // The first forwarded address is the visitor's own when a proxy sits in front of Netlify.
  const ip = forwarded[0] || edgeIp;
  const viaProxy = Boolean(edgeIp && forwarded[0] && forwarded[0] !== edgeIp);
  if (viaProxy) geo = null;

  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.ANALYTICS_SALT || 'lashesbyshazz-analytics';
  const net = ip ? (await sha256(`${salt}|${day}|${ip}`)).slice(0, 32) : '';
  const body = {
    city: geo?.city || '',
    region: geo?.subdivision?.name || '',
    country: geo?.country?.name || '',
    country_code: geo?.country?.code || '',
    net,
  };
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store',
      'Netlify-CDN-Cache-Control': 'no-store',
    },
  });
}
