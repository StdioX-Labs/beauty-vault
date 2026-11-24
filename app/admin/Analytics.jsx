import { useEffect, useMemo, useState } from "react";
import { rpc } from "./supa";
import { Change, Spark, AreaChart, Donut, BarList, Funnel, HourBars, PALETTE, num, pct } from "./charts.jsx";
import "./analytics.css";

// Admin -> Analytics for lashesbyshazz.com, in the same format as the Lash Tribe admin.
// Data: public.lbs_admin_analytics(from, to) in the Lash Tribe Supabase project
// (supabase/lashesbyshazz-analytics.sql). Visits and clicks come from public/scripts/lbs-track.js and
// app/book/[slug]/route.ts (shared booking links). Visitors are counted as people: someone opening the site
// in several apps on the same day counts once.

export const PERIODS = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7", label: "7 days" },
  { key: "30", label: "30 days" },
  { key: "90", label: "90 days" },
  { key: "365", label: "12 months" },
];
const TABS = [
  { key: "overview", label: "Overview" },
  { key: "bookings", label: "Bookings & team" },
  { key: "academy", label: "Academy" },
  { key: "marketing", label: "Brands & marketing" },
];
const BUTTON_NAMES = {
  book_click: "Book (on the site)", book_link_open: "Shared booking link", whatsapp_click: "WhatsApp", phone_click: "Call",
  enrol_click: "Enrol", shop_click: "Lash Tribe shop", directions_click: "Directions", social_click: "Social link",
  email_link_click: "Email link",
};
const EVENT_TEXT = {
  page_view: "Viewed", book_click: "Pressed Book", book_link_open: "Opened a booking link", whatsapp_click: "WhatsApp chat",
  phone_click: "Call", enrol_click: "Pressed Enrol", shop_click: "Went to Lash Tribe", directions_click: "Directions",
  social_click: "Social link", email_link_click: "Email link",
};

const NAIROBI_MS = 3 * 3600 * 1000;

/** Period -> { from, to } as ISO strings. "Today" starts at midnight Nairobi time. */
export function rangeFor(key) {
  const now = Date.now();
  const midnight = Math.floor((now + NAIROBI_MS) / 86400000) * 86400000 - NAIROBI_MS;
  if (key === "today") return { from: new Date(midnight).toISOString(), to: new Date(now).toISOString() };
  if (key === "yesterday") return { from: new Date(midnight - 86400000).toISOString(), to: new Date(midnight).toISOString() };
  const days = Number(key) || 30;
  return { from: new Date(midnight - (days - 1) * 86400000).toISOString(), to: new Date(now).toISOString() };
}

export function ago(d) {
  const s = Math.max(0, (Date.now() - new Date(d).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return `${Math.floor(s / 86400)} d ago`;
}

const people = (n) => `${num(n)} ${Number(n) === 1 ? "person" : "people"}`;

export function Bar({ value, max, tone }) {
  const v = Number(value || 0);
  const w = max && v > 0 ? Math.max(2, Math.round((v / max) * 100)) : 0;
  return <span className={`an-bar ${tone || ""}`}><i style={{ width: `${w}%` }} /></span>;
}

export function Card({ title, hint, children, action, className = "" }) {
  return (
    <section className={`admin-card an-card ${className}`}>
      <div className="an-card-head">
        <div>
          <h3>{title}</h3>
          {hint && <p className="an-hint">{hint}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Empty({ children }) {
  return <p className="an-empty">{children || "Nothing yet in this period."}</p>;
}

export function Seg({ options, value, onChange, small }) {
  return (
    <div className={`an-seg${small ? " small" : ""}`}>
      {options.map(([k, label]) => (
        <button key={k} type="button" className={value === k ? "on" : ""} onClick={() => onChange(k)}>{label}</button>
      ))}
    </div>
  );
}

function buildInsights(d) {
  const good = [];
  const watch = [];
  if (!d) return { good, watch };
  const s = d.summary || {};
  const p = d.previous || {};

  if (p.visitors && s.visitors) {
    const ch = Math.round(((s.visitors - p.visitors) / p.visitors) * 100);
    if (ch >= 10) good.push(`Visitors are up ${ch}% on the previous ${d.days} days (${people(s.visitors)}).`);
    if (ch <= -10) watch.push(`Visitors are down ${Math.abs(ch)}% on the previous ${d.days} days. Post on Instagram or TikTok with a link to the site.`);
  }
  if (p.book_clicks && s.book_clicks) {
    const ch = Math.round(((s.book_clicks - p.book_clicks) / p.book_clicks) * 100);
    if (ch >= 10) good.push(`Booking presses are up ${ch}% (${num(s.book_clicks)} this period).`);
    if (ch <= -10) watch.push(`Booking presses are down ${Math.abs(ch)}% on the previous period.`);
  }

  const tech = (d.techs || [])[0];
  if (tech) good.push(`Most booked lash tech: ${tech.tech}${tech.branch ? ` (${tech.branch})` : ""}, ${num(tech.clicks)} booking press${tech.clicks === 1 ? "" : "es"}${tech.from_links ? `, ${num(tech.from_links)} from their shared link` : ""}.`);
  const set = (d.services || []).filter((x) => x.kind === "lash set")[0];
  if (set) good.push(`Most booked lash set: ${set.service} (${num(set.clicks)} press${set.clicks === 1 ? "" : "es"}).`);

  const funnel = d.funnel || [];
  let worst = null;
  for (let i = 1; i < funnel.length; i++) {
    const from = funnel[i - 1].count;
    const to = funnel[i].count;
    if (from >= 5) {
      const keep = pct(to, from);
      if (!worst || keep < worst.keep) worst = { keep, from: funnel[i - 1].step, to: funnel[i].step };
    }
  }
  if (worst && worst.keep < 40) watch.push(`Biggest drop: of visits that "${worst.from.toLowerCase()}", only ${worst.keep}% go on to "${worst.to.toLowerCase()}".`);
  if (s.price_views >= 20 && s.book_clicks + s.whatsapp_clicks + s.call_clicks === 0)
    watch.push(`Prices were viewed ${num(s.price_views)} times but nobody pressed Book, WhatsApp or Call. Check the booking buttons work.`);

  const sources = (d.sources || []).filter((x) => x.visits >= 3);
  const topSource = sources[0];
  if (topSource) good.push(`Most visits come from ${topSource.source} (${num(topSource.visits)} visits).`);
  const bestSource = [...sources].sort((a, b) => pct(b.contacted, b.visits) - pct(a.contacted, a.visits))[0];
  if (bestSource && bestSource.contacted > 0 && bestSource !== topSource)
    good.push(`${bestSource.source} visitors are the most ready to book: ${pct(bestSource.contacted, bestSource.visits)}% of their visits press Book, WhatsApp or Call.`);

  (d.pages || [])
    .filter((x) => x.views >= 25 && x.contacts === 0 && x.path !== "/")
    .slice(0, 2)
    .forEach((x) => watch.push(`${x.label} was viewed ${num(x.views)} times with no Book, WhatsApp or Call press from it. Add a clear Book button there.`));

  const branches = d.branches || [];
  if (branches.length === 2) {
    const [a, b] = branches;
    const ta = a.bookings + a.calls + a.whatsapp;
    const tb = b.bookings + b.calls + b.whatsapp;
    if (ta >= 10 && tb * 3 < ta) watch.push(`${b.branch} gets far fewer bookings and calls than ${a.branch} (${num(tb)} vs ${num(ta)}). Push ${b.branch} in posts.`);
  }

  const ac = d.academy || {};
  if (ac.enrol_clicks > 0) good.push(`${num(ac.enrol_clicks)} academy enquir${ac.enrol_clicks === 1 ? "y" : "ies"} (Enrol, WhatsApp or Call from the training pages).`);
  else if (ac.page_views >= 20) watch.push(`The training pages were viewed ${num(ac.page_views)} times with no enrol enquiry.`);

  if (s.whatsapp_clicks > 0) good.push(`${num(s.whatsapp_clicks)} WhatsApp chat${s.whatsapp_clicks === 1 ? " was" : "s were"} started from the site.`);
  return { good, watch };
}

// ---------------------------------------------------------------------
export default function Analytics() {
  const [period, setPeriod] = useState("7");
  const [tab, setTab] = useState("overview");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError("");
    const { from, to } = rangeFor(period);
    (async () => {
      const { data: d, error: e } = await rpc("lbs_admin_analytics", { p_from: from, p_to: to });
      if (!live) return;
      setLoading(false);
      if (e) {
        setError(/lbs_admin_analytics|function|schema cache/i.test(e.message || "") && !/Admins only/.test(e.message)
          ? "Analytics starts once supabase/lashesbyshazz-analytics.sql is run in the Lash Tribe Supabase SQL editor."
          : e.message);
        return;
      }
      setData(d);
    })();
    return () => { live = false; };
  }, [period, tick]);

  const insights = useMemo(() => buildInsights(data), [data]);
  const from = data?.from ? new Date(data.from) : null;
  const to = data?.to ? new Date(data.to) : null;
  const fmt = (d) => d.toLocaleString("en-KE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" });

  return (
    <div className="an">
      <div className="an-top">
        <Seg options={PERIODS.map((p) => [p.key, p.label])} value={period} onChange={setPeriod} />
        <div className="an-top-right">
          <Seg options={TABS.map((t) => [t.key, t.label])} value={tab} onChange={setTab} />
          <button type="button" className="admin-btn secondary" onClick={() => setTick((t) => t + 1)} disabled={loading}>{loading ? "Loading…" : "Refresh"}</button>
        </div>
      </div>
      {data && (
        <p className="an-period">
          {PERIODS.find((p) => p.key === period)?.label}
          {from && to ? ` · ${fmt(from)} to ${fmt(to)} (Nairobi time).` : "."} Browsers that have opened this admin are not counted.
        </p>
      )}

      {error && <p className="an-error">{error}</p>}
      {loading && !data && <p className="an-hint">Loading analytics…</p>}
      {data && !data.tracking_since && (
        <p className="an-note">Nothing recorded yet. Visits and clicks fill up from the day this update goes live on lashesbyshazz.com.</p>
      )}

      {data && tab === "overview" && <Overview data={data} insights={insights} />}
      {data && tab === "bookings" && <BookingsTab data={data} />}
      {data && tab === "academy" && <AcademyTab data={data} />}
      {data && tab === "marketing" && <MarketingTab data={data} />}
    </div>
  );
}

const TILES = [
  { label: "Visitors", k: "visitors", spark: "visitors", hint: "People, not browsers" },
  { label: "Page views", k: "page_views", spark: "page_views" },
  { label: "Looked at prices", k: "price_views", sub: () => "lash, academy, hair and Revive price pages" },
  { label: "Book presses", k: "book_clicks", spark: "bookings", sub: (s) => `${num(s.book_links)} from shared booking links` },
  { label: "WhatsApp chats", k: "whatsapp_clicks", spark: "whatsapp" },
  { label: "Call presses", k: "call_clicks", spark: "calls" },
  { label: "Contact rate", k: "contact_rate", pctOf: ["contacted_visits", "visits"], sub: () => "of visits pressed Book, WhatsApp or Call" },
  { label: "Enrol presses", k: "enrol_clicks", spark: "enrol", sub: () => "academy" },
  { label: "Directions", k: "directions_clicks", sub: () => "opened Google Maps" },
  { label: "Lash Tribe shop", k: "shop_clicks", sub: () => "clicks to lashtribeafrica.com" },
  { label: "Visits", k: "visits", sub: (s) => `${s.visits ? (Number(s.page_views || 0) / s.visits).toFixed(1) : "0"} pages per visit` },
];

function Feed({ rows }) {
  if (!rows?.length) return <Empty />;
  return (
    <ul className="an-feed">
      {rows.map((r, i) => (
        <li key={i}>
          <span className="an-feed-when">{ago(r.at)}</span>
          <span className={`an-feed-dot ${r.name}`} />
          <div>
            <b>{EVENT_TEXT[r.name] || r.name}{r.name === "page_view" ? `: ${r.page}` : ""}</b>
            <div className="an-feed-what">
              {[r.tech, r.service, r.branch, r.name !== "page_view" ? r.label : null].filter(Boolean).join(" · ") || r.brand || "—"}
              <small> {[r.source, r.device, r.city].filter(Boolean).join(" · ")}</small>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Overview({ data, insights }) {
  const s = data.summary || {};
  const p = data.previous || {};
  const daily = data.daily || [];
  const [metric, setMetric] = useState("visitors");
  const metrics = [["visitors", "Visitors"], ["page_views", "Page views"], ["bookings", "Book presses"], ["whatsapp", "WhatsApp"], ["calls", "Calls"], ["contacts", "All contacts"], ["enrol", "Enrol"]];
  const metricColor = { bookings: PALETTE[3], whatsapp: PALETTE[3], calls: PALETTE[2], contacts: PALETTE[1], enrol: PALETTE[5] };
  const dev = data.devices || {};

  return (
    <>
      <div className="an-tiles">
        {TILES.map((t) => {
          const val = t.pctOf ? pct(s[t.pctOf[0]], s[t.pctOf[1]]) : s[t.k];
          const before = t.pctOf ? pct(p[t.pctOf[0]], p[t.pctOf[1]]) : p[t.k];
          return (
            <div className="an-tile" key={t.k} title={t.hint}>
              <div className="an-tile-label">{t.label}</div>
              <div className="an-tile-value">{t.pctOf ? `${val}%` : num(val)}</div>
              {t.sub && <div className="an-tile-sub">{t.sub(s)}</div>}
              <Change now={val} before={before} />
              {t.spark && <Spark values={daily.map((r) => r[t.spark])} />}
            </div>
          );
        })}
      </div>

      {(insights.good.length > 0 || insights.watch.length > 0) && (
        <div className="an-two">
          <Card title="What's working" hint="Worked out from this period's numbers.">
            {insights.good.length ? <ul className="an-ins good">{insights.good.map((t) => <li key={t}>{t}</li>)}</ul> : <Empty>Not enough activity yet.</Empty>}
          </Card>
          <Card title="Needs attention" hint="Things to fix or follow up.">
            {insights.watch.length ? <ul className="an-ins watch">{insights.watch.map((t) => <li key={t}>{t}</li>)}</ul> : <Empty>Nothing worrying right now.</Empty>}
          </Card>
        </div>
      )}

      <Card title="Trend" hint={`${metrics.find((m) => m[0] === metric)[1]} ${data.hourly ? "by hour" : "by day"}. Hover the chart to read a point.`}>
        <Seg small options={metrics} value={metric} onChange={setMetric} />
        <AreaChart rows={daily} k={metric} hourly={data.hourly} color={metricColor[metric] || PALETTE[0]} />
      </Card>

      <div className="an-two">
        <Card title="Booking funnel" hint="Visits that reached each step.">
          <Funnel steps={data.funnel || []} />
          {s.contacted_visits > 0 && <p className="an-hint" style={{ marginTop: 10 }}>{num(s.contacted_visits)} visit{s.contacted_visits === 1 ? "" : "s"} ({pct(s.contacted_visits, s.visits)}%) pressed Book, WhatsApp or Call.</p>}
        </Card>
        <Card title="Buttons clicked" hint="Book, WhatsApp, Call, Enrol, Directions and shop buttons.">
          <Donut items={(data.buttons || []).map((b) => ({ label: BUTTON_NAMES[b.kind] || b.kind, value: b.clicks }))} />
          {(data.button_places || []).length > 0 && <>
            <h4 className="an-sub">Where on the site they were pressed</h4>
            <BarList limit={6} items={(data.button_places || []).map((b, i) => ({ key: i, label: `${BUTTON_NAMES[b.kind] || b.kind}${b.button ? `: ${b.button}` : ""}`, sub: b.page, value: b.clicks, right: people(b.people) }))} />
          </>}
        </Card>
      </div>

      <div className="an-two">
        <Card title="Where visitors come from" hint="How each visit started.">
          <Donut totalLabel="Visits" items={(data.sources || []).map((x) => ({ label: x.source, value: x.visits }))} />
        </Card>
        <Card title="Top pages" hint="Page views, with the number of people.">
          <BarList limit={10} items={(data.pages || []).map((x) => ({ key: x.path, label: x.label, title: x.path, href: x.path, value: x.views, right: people(x.visitors) }))} />
        </Card>
      </div>

      <div className="an-three">
        <Card title="Devices" hint="People by device.">
          <Donut items={[["mobile", "Phone / tablet"], ["desktop", "Computer"], ["unknown", "Unknown"]].map(([k, l], i) => ({ label: l, value: dev[k] || 0, color: PALETTE[[2, 1, 7][i]] }))} />
        </Card>
        <Card title="Branches" hint="Bookings, calls and WhatsApp per branch.">
          <Donut totalLabel="Contacts" items={(data.branches || []).map((b, i) => ({ label: b.branch, value: b.bookings + b.calls + b.whatsapp, color: PALETTE[i ? 2 : 0] }))} />
        </Card>
        <Card title="Locations" hint="People by town or country (approximate).">
          <BarList limit={8} items={(data.locations || []).map((x) => ({ key: `${x.city}-${x.country}`, label: x.city === "Unknown" && x.country ? x.country : x.city, sub: x.city === "Unknown" ? "" : x.country, value: x.people }))} />
        </Card>
      </div>

      <div className="an-two">
        <Card title="Busiest hours" hint="Page views by hour of the day, Nairobi time.">
          {data.hours ? <HourBars hours={data.hours} /> : <Empty />}
        </Card>
        <Card title="Ad campaigns and tagged links" hint="Visits from links tagged with utm_source (Instagram bio, TikTok, ads…).">
          <BarList items={(data.campaigns || []).map((x, i) => ({ key: i, label: x.campaign, sub: x.source, value: x.visits, right: `visits · ${people(x.people)}` }))} />
        </Card>
      </div>

      <Card title="Live activity" hint="The most recent things people did on the site.">
        <Feed rows={data.recent} />
      </Card>
    </>
  );
}

function BookingsTab({ data }) {
  const s = data.summary || {};
  const techs = data.techs || [];
  const branches = data.branches || [];
  const sets = (data.services || []).filter((x) => x.kind === "lash set");
  const maxTech = Math.max(0, ...techs.map((t) => t.clicks));
  return (
    <>
      <div className="an-tiles">
        <div className="an-tile"><div className="an-tile-label">Book presses</div><div className="an-tile-value">{num(s.book_clicks)}</div><Change now={s.book_clicks} before={data.previous?.book_clicks} /></div>
        <div className="an-tile"><div className="an-tile-label">On the website</div><div className="an-tile-value">{num(s.book_clicks - s.book_links)}</div><div className="an-tile-sub">Book buttons on the site</div></div>
        <div className="an-tile"><div className="an-tile-label">Shared booking links</div><div className="an-tile-value">{num(s.book_links)}</div><div className="an-tile-sub">lashesbyshazz.com/book/… opened</div></div>
        <div className="an-tile"><div className="an-tile-label">Calls + WhatsApp</div><div className="an-tile-value">{num(Number(s.call_clicks || 0) + Number(s.whatsapp_clicks || 0))}</div></div>
      </div>

      <Card title="Lash technicians" hint="Booking presses for each tech: from their Book button on the site, and from their own link (lashesbyshazz.com/book/name) shared on Instagram, WhatsApp or TikTok. This counts presses, not finished bookings: the booking site has the final numbers.">
        {techs.length === 0 ? <Empty>No tech has been booked through the site or a shared link in this period.</Empty> : (
          <div className="an-table-wrap">
            <table className="admin-table an-table">
              <thead><tr><th>Tech</th><th>Branch</th><th>Book presses</th><th>On the site</th><th>From their link</th><th>People</th></tr></thead>
              <tbody>{techs.map((t) => (
                <tr key={t.tech}>
                  <td><strong>{t.tech}</strong></td>
                  <td>{t.branch || "—"}</td>
                  <td><div className="an-cellbar"><Bar value={t.clicks} max={maxTech} /> {num(t.clicks)}</div></td>
                  <td>{num(t.from_site)}</td>
                  <td>{num(t.from_links)}</td>
                  <td>{num(t.people)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="an-two">
        <Card title="Branches" hint="Bookings, calls, WhatsApp and Google Maps directions for each branch.">
          {branches.length === 0 ? <Empty /> : (
            <table className="admin-table an-table">
              <thead><tr><th>Branch</th><th>Book</th><th>Calls</th><th>WhatsApp</th><th>Directions</th></tr></thead>
              <tbody>{branches.map((b) => (
                <tr key={b.branch}><td><strong>{b.branch}</strong></td><td>{num(b.bookings)}</td><td>{num(b.calls)}</td><td>{num(b.whatsapp)}</td><td>{num(b.directions)}</td></tr>
              ))}</tbody>
            </table>
          )}
        </Card>
        <Card title="Lash sets" hint="Which set's Book button was pressed on the lashes page (UV and normal).">
          <BarList items={sets.map((x) => ({ key: x.service, label: x.service, value: x.clicks, right: people(x.people) }))} empty="No set's Book button was pressed in this period." />
        </Card>
      </div>
    </>
  );
}

function AcademyTab({ data }) {
  const ac = data.academy || {};
  const courses = (data.services || []).filter((x) => x.kind === "course");
  return (
    <>
      <div className="admin-stat-grid">
        <div className="admin-stat-card"><div className="admin-stat-label">Training page views</div><div className="admin-stat-value">{num(ac.page_views)}</div></div>
        <div className="admin-stat-card"><div className="admin-stat-label">People who looked</div><div className="admin-stat-value">{num(ac.people)}</div></div>
        <div className="admin-stat-card"><div className="admin-stat-label">Enrol enquiries</div><div className="admin-stat-value">{num(ac.enrol_clicks)}</div></div>
        <div className="admin-stat-card"><div className="admin-stat-label">Went to Lash Tribe</div><div className="admin-stat-value">{num(ac.lashtribe_clicks)}</div></div>
      </div>
      <Card title="Courses" hint="Enrol presses for each course on the training page. Enquiries also count WhatsApp and Call presses on the training pages.">
        <BarList items={courses.map((x) => ({ key: x.service, label: x.service, value: x.clicks, right: people(x.people) }))} empty="No Enrol button was pressed in this period." />
        {ac.page_views > 0 && <p className="an-hint" style={{ marginTop: 10 }}>{pct(ac.enrol_clicks, ac.people)}% of people who looked at the training pages asked to enrol.</p>}
      </Card>
    </>
  );
}

function MarketingTab({ data }) {
  const sources = data.sources || [];
  const brands = data.brands || [];
  const dev = data.devices || {};
  const devTotal = Object.values(dev).reduce((a, b) => a + Number(b), 0);
  return (
    <>
      <Card title="The four brands" hint="Bookings and contacts for Lashes by Shazz, the Academy, Revive Aesthetics and Shasha Hair, by the page they were pressed on.">
        {brands.length === 0 ? <Empty /> : (
          <table className="admin-table an-table">
            <thead><tr><th>Brand</th><th>Book</th><th>WhatsApp</th><th>Calls</th><th>Enrol</th><th>People</th></tr></thead>
            <tbody>{brands.map((b) => (
              <tr key={b.brand}><td><strong>{b.brand}</strong></td><td>{num(b.bookings)}</td><td>{num(b.whatsapp)}</td><td>{num(b.calls)}</td><td>{num(b.enrol)}</td><td>{num(b.people)}</td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
      <Card title="Where visitors come from" hint="Decided by how each visit started: a social app, Google, or typed in directly. Add ?utm_source=instagram (etc.) to links you post to be exact.">
        {sources.length === 0 ? <Empty /> : (
          <table className="admin-table an-table">
            <thead><tr><th>Source</th><th>Visits</th><th>People</th><th>Pressed Book, WhatsApp or Call</th></tr></thead>
            <tbody>{sources.map((x) => (
              <tr key={x.source}><td>{x.source}</td><td>{num(x.visits)}</td><td>{num(x.visitors)}</td>
                <td>{num(x.contacted)} <small>({pct(x.contacted, x.visits)}%)</small></td></tr>
            ))}</tbody>
          </table>
        )}
      </Card>
      <div className="an-two">
        <Card title="Ad campaigns and tagged links" hint="Visits from links with utm_campaign.">
          <BarList items={(data.campaigns || []).map((x, i) => ({ key: i, label: x.campaign, sub: x.source, value: x.visits, right: `visits · ${people(x.people)}` }))} />
        </Card>
        <Card title="Phones vs computers">
          {devTotal === 0 ? <Empty /> : Object.entries(dev).map(([k, v]) => (
            <div className="an-funnel-row" key={k}>
              <span className="an-funnel-label">{k === "mobile" ? "Phone / tablet" : k === "desktop" ? "Computer" : "Unknown"}</span>
              <Bar value={v} max={devTotal} />
              <span className="an-funnel-num">{pct(v, devTotal)}%</span>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
