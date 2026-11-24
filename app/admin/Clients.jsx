import { Fragment, useEffect, useMemo, useState } from "react";
import { rpc } from "./supa";
import { Donut, BarList, Funnel, num, ksh, pct } from "./charts.jsx";
import { PERIODS, rangeFor, ago, Card, Empty, Seg } from "./Analytics.jsx";
import "./analytics.css";
import "./clients.css";

// Admin -> Clients: client profiles, retention and bookings from /book.
// Data: public.lbs_admin_clients / lbs_admin_client_list / lbs_admin_set_booking_status in the Lash Tribe
// Supabase project (supabase/lashesbyshazz-booking.sql). Profiles update themselves whenever a booking's
// status changes, so marking visits as Completed or No-show here is what fills in visits, spend and refill dates.

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "list", label: "Client list" },
  { key: "bookings", label: "Bookings" },
  { key: "unfinished", label: "Unfinished" },
];

const SEGMENTS = ["New", "Regular", "VIP", "At risk", "Lapsed"];
const SEG_HINT = {
  New: "No visit yet, or one",
  Regular: "2 or more visits",
  VIP: "5 or more visits in 12 months",
  "At risk": "Past her refill window (21 days), nothing booked",
  Lapsed: "No visit for 45+ days, nothing booked",
};
const SEG_COLOR = { New: "#93C5FD", Regular: "#F9A8D4", VIP: "#FDE68A", "At risk": "#FDBA74", Lapsed: "#A1A1AA" };

const STATUS = {
  requested: "Requested",
  pending_deposit: "Waiting for fee",
  confirmed: "Confirmed",
  reminded: "Reminded",
  checked_in: "Arrived",
  completed: "Completed",
  no_show: "No-show",
  cancelled_client: "Cancelled by client",
  cancelled_salon: "Cancelled by salon",
};
const ACTIONS = [
  ["confirmed", "Confirm (fee paid)"],
  ["checked_in", "Arrived"],
  ["completed", "Completed"],
  ["no_show", "No-show"],
  ["cancelled_client", "Cancelled by client"],
  ["cancelled_salon", "Cancelled by salon"],
];
const CHANNEL = { website: "Website", tech_link: "Tech's own link", reception_phone: "Reception (phone)", reception_walkin: "Walk-in", tech_device: "Tech's device" };
const STEP = { service: "Choosing a service", where: "Choosing branch and tech", when: "Choosing a time", details: "Details form", phone: "Gave phone, then stopped" };

const nbo = (d, opts) => new Date(d).toLocaleString("en-KE", { timeZone: "Africa/Nairobi", ...opts });
const when = (d) => nbo(d, { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
const day = (d) => (d ? new Date(`${d}T12:00:00+03:00`).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" }) : "—");
const phoneShow = (p) => (p ? `0${String(p).slice(3, 6)} ${String(p).slice(6, 9)} ${String(p).slice(9)}` : "");
const wa = (p, text) => `https://wa.me/${p}?text=${encodeURIComponent(text)}`;
const first = (n) => (n || "").split(" ")[0];

function Pill({ segment }) {
  if (!segment) return null;
  return <span className="cl-pill" style={{ "--c": SEG_COLOR[segment] || "#aaa" }}>{segment}</span>;
}

export default function Clients() {
  const [period, setPeriod] = useState("30");
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
    // bookings tab also shows what is coming up, so look 60 days ahead
    const ahead = new Date(Date.now() + 60 * 86400000).toISOString();
    (async () => {
      const { data: d, error: e } = await rpc("lbs_admin_clients", { p_from: from, p_to: tab === "bookings" ? ahead : to });
      if (!live) return;
      setLoading(false);
      if (e) {
        setError(/lbs_admin_clients|function|schema cache/i.test(e.message || "") && !/Admins only/.test(e.message)
          ? "Clients starts once supabase/lashesbyshazz-booking.sql is run in the Lash Tribe Supabase SQL editor."
          : e.message);
        return;
      }
      setData(d);
    })();
    return () => { live = false; };
  }, [period, tick, tab === "bookings"]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="an">
      <div className="an-top">
        <Seg options={PERIODS.filter((p) => p.key !== "yesterday").map((p) => [p.key, p.label])} value={period} onChange={setPeriod} />
        <div className="an-top-right">
          <Seg options={TABS.map((t) => [t.key, t.label])} value={tab} onChange={setTab} />
          <button type="button" className="admin-btn secondary" onClick={() => setTick((t) => t + 1)} disabled={loading}>{loading ? "Loading…" : "Refresh"}</button>
        </div>
      </div>
      {error && <p className="an-error">{error}</p>}
      {loading && !data && <p className="an-hint">Loading clients…</p>}
      {data && tab === "overview" && <Overview d={data} />}
      {tab === "list" && <ClientList tick={tick} />}
      {data && tab === "bookings" && <Bookings rows={data.bookings || []} onChanged={() => setTick((t) => t + 1)} />}
      {data && tab === "unfinished" && <Unfinished rows={data.unfinished || []} />}
    </div>
  );
}

function Tile({ label, value, sub }) {
  return (
    <div className="an-tile">
      <div className="an-tile-label">{label}</div>
      <div className="an-tile-value">{value}</div>
      {sub && <div className="an-tile-sub">{sub}</div>}
    </div>
  );
}

function Overview({ d }) {
  const s = d.summary || {};
  const r = d.retention || {};
  const noShowRate = pct(s.no_shows, r.no_show_rate_base);
  return (
    <>
      <div className="an-tiles">
        <Tile label="Clients" value={num(s.clients)} sub={`${num(s.opted_in)} said yes to offers`} />
        <Tile label="New clients" value={num(s.new_clients)} sub="first booked in this period" />
        <Tile label="Returning clients" value={num(s.returning_in_period)} sub="booked again in this period" />
        <Tile label="Bookings" value={num(s.bookings)} sub={`${num(s.completed)} completed · ${num(s.cancelled)} cancelled`} />
        <Tile label="Revenue (completed)" value={ksh(s.revenue)} sub={`${ksh(s.deposits)} in booking fees`} />
        <Tile label="Refills due" value={num(s.refills_due_7d)} sub="in the next 7 days" />
        <Tile label="At risk" value={num(s.at_risk)} sub="past refill window, nothing booked" />
        <Tile label="Lapsed" value={num(s.lapsed)} sub="45+ days, nothing booked" />
      </div>

      <Card title="Retention" hint="The numbers that say whether clients come back. Completed visits only, so mark visits in Bookings.">
        <div className="an-tiles">
          <Tile label="Back within 21 days" value={r.new_sets_judged ? `${pct(r.back_within_21, r.new_sets_judged)}%` : "—"} sub={`of ${num(r.new_sets_judged)} new sets (21+ days old)`} />
          <Tile label="2+ visits in 90 days" value={r.active_90 ? `${pct(r.two_plus_90, r.active_90)}%` : "—"} sub={`of ${num(r.active_90)} clients seen in 90 days`} />
          <Tile label="Days between visits" value={r.avg_days_between ?? "—"} sub="average, this period" />
          <Tile label="Repeat revenue" value={r.revenue ? `${pct(r.repeat_revenue, r.revenue)}%` : "—"} sub="from clients' second visit onwards" />
          <Tile label="No-show rate" value={r.no_show_rate_base ? `${noShowRate}%` : "—"} sub={`${num(s.no_shows)} no-shows`} />
          <Tile label="Late cancels" value={num(r.late_cancels)} sub="cancelled under 24h before" />
        </div>
      </Card>

      <div className="an-two">
        <Card title="Client segments" hint="Everyone, as of today">
          <Donut items={(d.segments || []).map((x) => ({ label: x.segment, value: x.clients, color: SEG_COLOR[x.segment] }))} totalLabel="Clients" empty="No clients yet." />
        </Card>
        <Card title="Booking funnel" hint="People who started on /book in this period">
          <Funnel steps={d.funnel || []} />
        </Card>
      </div>

      <div className="an-two">
        <Card title="How new clients heard about us" hint="Asked once, on her first booking">
          <BarList items={(d.heard_from || []).map((x) => ({ label: x.label, value: x.clients }))} empty="No new clients in this period." />
        </Card>
        <Card title="Where new clients came from" hint="From the link she first booked through (ad tags, tech links)">
          <BarList items={(d.sources || []).map((x) => ({ label: x.source, value: x.clients }))} empty="No new clients in this period." />
        </Card>
      </div>

      <div className="an-two">
        <Card title="Booking channels" hint="How bookings in this period were made">
          <BarList items={(d.channels || []).map((x) => ({ label: CHANNEL[x.channel] || x.channel, value: x.bookings }))} />
        </Card>
        <Card title="Campaigns" hint="Offer codes and utm_campaign tags">
          <BarList items={(d.campaigns || []).map((x) => ({ label: x.campaign, value: x.bookings, right: `${num(x.completed)} done · ${ksh(x.revenue)}` }))} empty="No campaign bookings in this period." />
        </Card>
      </div>

      <Card title="Lash techs" hint="Internal only. Came back = completed visits where the client booked again.">
        {(d.techs || []).length ? (
          <div className="an-table-wrap">
            <table className="admin-table an-table">
              <thead><tr><th>Tech</th><th>Branch</th><th>Bookings</th><th>Chosen by name</th><th>Completed</th><th>Came back</th><th>No-shows</th><th>Revenue</th></tr></thead>
              <tbody>
                {d.techs.map((t) => (
                  <tr key={t.tech}>
                    <td>{t.tech}</td><td>{t.branch}</td><td>{num(t.bookings)}</td><td>{num(t.chosen)}</td><td>{num(t.completed)}</td>
                    <td>{t.completed ? `${pct(t.came_back, t.completed)}%` : "—"}</td><td>{num(t.no_shows)}</td><td>{ksh(t.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <Empty />}
      </Card>

      <Card title="Where unfinished bookings stopped" hint="Started on /book in this period but did not book">
        <BarList items={(d.dropoff || []).map((x) => ({ label: STEP[x.step] || x.step, value: x.count }))} empty="No unfinished bookings in this period." />
      </Card>
    </>
  );
}

function ClientList({ tick }) {
  const [q, setQ] = useState("");
  const [segment, setSegment] = useState("");
  const [sort, setSort] = useState("recent");
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    let live = true;
    const t = setTimeout(async () => {
      const { data, error } = await rpc("lbs_admin_client_list", { p_search: q, p_segment: segment, p_sort: sort });
      if (!live) return;
      if (error) setErr(error.message);
      else { setErr(""); setRows(data || []); }
    }, 250);
    return () => { live = false; clearTimeout(t); };
  }, [q, segment, sort, tick]);

  const counts = useMemo(() => {
    const c = {};
    (rows || []).forEach((r) => { c[r.segment] = (c[r.segment] || 0) + 1; });
    return c;
  }, [rows]);

  return (
    <Card title="Clients" hint="Every client who has booked on /book, matched by phone number">
      <div className="cl-filters">
        <input type="search" placeholder="Search name or phone" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={segment} onChange={(e) => setSegment(e.target.value)}>
          <option value="">All segments</option>
          {SEGMENTS.map((s) => <option key={s} value={s}>{s}{!segment && counts[s] ? ` (${counts[s]})` : ""}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="recent">Latest visit</option>
          <option value="refill">Refill due soonest</option>
          <option value="visits">Most visits</option>
          <option value="spend">Highest spend</option>
        </select>
      </div>
      {segment && <p className="an-hint">{SEG_HINT[segment]}</p>}
      {err && <p className="an-error">{err}</p>}
      {rows && !rows.length && <Empty>No clients match.</Empty>}
      {rows && rows.length > 0 && (
        <div className="an-table-wrap">
          <table className="admin-table an-table cl-table">
            <thead><tr><th>Client</th><th>Phone</th><th>Segment</th><th>Visits</th><th>Spend</th><th>Last visit</th><th>Refill due</th><th>Next booking</th><th>Tech</th><th>Came from</th></tr></thead>
            <tbody>
              {rows.map((c) => (
                <Fragment key={c.id}>
                  <tr className="cl-row" onClick={() => setOpen(open === c.id ? null : c.id)}>
                    <td><b>{c.name || "—"}</b></td>
                    <td><a href={`tel:+${c.phone}`} onClick={(e) => e.stopPropagation()}>{phoneShow(c.phone)}</a></td>
                    <td><Pill segment={c.segment} /></td>
                    <td>{num(c.visits)}</td>
                    <td>{ksh(c.spend)}</td>
                    <td>{day(c.last_visit)}</td>
                    <td>{day(c.refill_due)}</td>
                    <td>{c.next_booking ? when(c.next_booking) : "—"}</td>
                    <td>{c.favourite_tech || "—"}</td>
                    <td>{c.source || c.heard_from || "—"}</td>
                  </tr>
                  {open === c.id && (
                    <tr className="cl-more">
                      <td colSpan={10}>
                        <dl className="cl-dl">
                          <div><dt>Email</dt><dd>{c.email || "—"}</dd></div>
                          <div><dt>Client since</dt><dd>{day(String(c.created_at).slice(0, 10))}</dd></div>
                          <div><dt>First visit</dt><dd>{day(c.first_visit)}</dd></div>
                          <div><dt>Current lashes</dt><dd>{c.current_lash || "—"}</dd></div>
                          <div><dt>Favourite branch</dt><dd>{c.favourite_branch || "—"}</dd></div>
                          <div><dt>Heard about us</dt><dd>{c.heard_from || "—"}{c.referred_by ? `, referred by ${c.referred_by}` : ""}</dd></div>
                          <div><dt>No-shows / late cancels</dt><dd>{num(c.no_shows)} / {num(c.late_cancels)}</dd></div>
                          <div><dt>Offers and reminders</dt><dd>{c.opted_in ? "Yes" : "No"}</dd></div>
                        </dl>
                        <a className="admin-btn secondary" href={wa(c.phone, `Hi ${first(c.name)}, this is Lashes by Shazz.`)} target="_blank" rel="noreferrer">WhatsApp {first(c.name)}</a>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function Bookings({ rows, onChanged }) {
  const [show, setShow] = useState("upcoming");
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");
  const now = Date.now();
  const list = rows
    .filter((b) => (show === "upcoming" ? Date.parse(b.starts_at) >= now - 3 * 3600000 : Date.parse(b.starts_at) < now))
    .sort((a, b) => (show === "upcoming" ? 1 : -1) * (Date.parse(a.starts_at) - Date.parse(b.starts_at)));

  async function mark(ref, status) {
    setBusy(ref);
    setErr("");
    const { error } = await rpc("lbs_admin_set_booking_status", { p_ref: ref, p_status: status });
    setBusy("");
    if (error) setErr(error.message);
    else onChanged();
  }

  return (
    <Card
      title="Bookings"
      hint="Mark each visit as Completed or No-show: that is what keeps client profiles, refill dates and retention right."
      action={<Seg small options={[["upcoming", "Upcoming"], ["past", "Past"]]} value={show} onChange={setShow} />}
    >
      {err && <p className="an-error">{err}</p>}
      {!list.length ? <Empty>{show === "upcoming" ? "Nothing booked ahead." : "No past bookings in this period."}</Empty> : (
        <div className="an-table-wrap">
          <table className="admin-table an-table">
            <thead><tr><th>When</th><th>Client</th><th>Services</th><th>Tech</th><th>Total</th><th>Status</th><th>Mark as</th></tr></thead>
            <tbody>
              {list.map((b) => (
                <tr key={b.ref}>
                  <td>{when(b.starts_at)}<small className="cl-sub">{b.branch} · {b.ref}</small></td>
                  <td>
                    {b.client} <Pill segment={b.segment} />
                    <small className="cl-sub"><a href={wa(b.phone, `Hi ${first(b.client)}, this is Lashes by Shazz about your booking ${b.ref}.`)} target="_blank" rel="noreferrer">{phoneShow(b.phone)}</a> · {CHANNEL[b.channel] || b.channel}</small>
                  </td>
                  <td>{b.services}{b.lock_refill && <small className="cl-sub">Refill held for {day(b.refill_hold_on)}</small>}</td>
                  <td>{b.tech || "—"}</td>
                  <td>{ksh(b.total)}<small className="cl-sub">{b.deposit_paid ? `${ksh(b.deposit_paid)} fee paid` : "fee not paid"}</small></td>
                  <td><span className={`cl-status s-${b.status}`}>{STATUS[b.status] || b.status}</span></td>
                  <td>
                    <select value="" disabled={busy === b.ref} onChange={(e) => e.target.value && mark(b.ref, e.target.value)} className="cl-select">
                      <option value="">{busy === b.ref ? "Saving…" : "Choose…"}</option>
                      {ACTIONS.filter(([k]) => k !== b.status).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function Unfinished({ rows }) {
  return (
    <Card title="Unfinished bookings" hint="Gave a phone number on /book but did not finish. One friendly message usually brings them back.">
      {!rows.length ? <Empty>No unfinished bookings in this period.</Empty> : (
        <div className="an-table-wrap">
          <table className="admin-table an-table">
            <thead><tr><th>When</th><th>Name</th><th>Phone</th><th>Stopped at</th><th>Wanted</th><th>Came from</th><th></th></tr></thead>
            <tbody>
              {rows.map((a, i) => (
                <tr key={`${a.phone}-${i}`}>
                  <td>{ago(a.updated_at)}</td>
                  <td>{a.name || "—"}{a.returning && <small className="cl-sub">returning client</small>}</td>
                  <td>{phoneShow(a.phone)}</td>
                  <td>{STEP[a.step] || a.step}</td>
                  <td>{(a.cart || []).join(", ") || "—"}{a.starts_at && <small className="cl-sub">{when(a.starts_at)}{a.branch ? ` · ${a.branch}` : ""}</small>}</td>
                  <td>{a.source || "—"}</td>
                  <td>
                    <a className="admin-btn secondary" href={wa(a.phone, `Hi${a.name ? ` ${first(a.name)}` : ""}, this is Lashes by Shazz. Your booking is still open, finish it here: https://lashesbyshazz.com/book${a.cart?.length ? `?service=${a.cart.join(",")}` : ""}`)} target="_blank" rel="noreferrer">WhatsApp</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
