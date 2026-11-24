// Tiny Supabase client for the admin: sign in with email + password, keep the session, call functions.
// Plain fetch, so the site needs no extra package. Uses the Lash Tribe project (lib/analytics.ts).
import { ANALYTICS_URL, ANALYTICS_ANON_KEY } from "@/lib/analytics";

const KEY = "lbs_admin_session";
const headers = (token) => ({
  apikey: ANALYTICS_ANON_KEY,
  Authorization: `Bearer ${token || ANALYTICS_ANON_KEY}`,
  "Content-Type": "application/json",
});

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
function save(s) {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch { /* private mode */ }
}

async function auth(grant, body) {
  const r = await fetch(`${ANALYTICS_URL}/auth/v1/token?grant_type=${grant}`, { method: "POST", headers: headers(), body: JSON.stringify(body) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error_description || d.msg || "Sign-in failed");
  const s = { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: Date.now() + (d.expires_in || 3600) * 1000 };
  save(s);
  return s;
}

export async function signIn(email, password) {
  return auth("password", { email, password });
}

export async function getSession() {
  const s = load();
  if (!s?.refresh_token) return null;
  if (Date.now() < s.expires_at - 60_000) return s;
  try { return await auth("refresh_token", { refresh_token: s.refresh_token }); } catch { save(null); return null; }
}

export async function signOut() {
  const s = load();
  save(null);
  if (s?.access_token) {
    fetch(`${ANALYTICS_URL}/auth/v1/logout`, { method: "POST", headers: headers(s.access_token) }).catch(() => {});
  }
}

/** Calls a database function. Returns { data, error } like supabase-js. */
export async function rpc(name, args = {}) {
  const s = await getSession();
  try {
    const r = await fetch(`${ANALYTICS_URL}/rest/v1/rpc/${name}`, { method: "POST", headers: headers(s?.access_token), body: JSON.stringify(args) });
    const text = await r.text();
    const d = text ? JSON.parse(text) : null;
    if (!r.ok) return { data: null, error: { message: d?.message || `Request failed (${r.status})`, code: d?.code } };
    return { data: d, error: null };
  } catch (e) {
    return { data: null, error: { message: e?.message || "Network error" } };
  }
}
