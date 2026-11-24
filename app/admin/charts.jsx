// Small chart pieces for Admin -> Analytics. Plain SVG, no chart library, so the admin stays light.
import { useMemo, useState } from "react";

// Soft colours that read well on the site's near-black background (pink first, like the site).
export const PALETTE = ["#F9A8D4", "#FDBA74", "#93C5FD", "#86EFAC", "#FDA4AF", "#C4B5FD", "#FDE68A", "#A1A1AA"];
export const num = (v) => Number(v || 0).toLocaleString();
export const ksh = (v) => `KES ${Math.round(Number(v || 0)).toLocaleString()}`;
export const pct = (a, b) => (b ? Math.round((Number(a || 0) / Number(b)) * 100) : 0);

/** ▲ 12% vs previous */
export function Change({ now, before, money }) {
  const a = Number(now || 0);
  const b = Number(before || 0);
  if (!b && !a) return <span className="an-change">No change</span>;
  if (!b) return <span className="an-change up">▲ New vs previous</span>;
  const p = Math.round(((a - b) / b) * 100);
  if (p === 0) return <span className="an-change">Same as previous</span>;
  return (
    <span className={`an-change ${p > 0 ? "up" : "down"}`} title={`Previous period: ${money ? ksh(b) : num(b)}`}>
      {p > 0 ? "▲" : "▼"} {Math.abs(p)}% vs previous
    </span>
  );
}

/** Tiny line under a number. */
export function Spark({ values, color = PALETTE[0] }) {
  const v = values.map((x) => Number(x || 0));
  if (v.length < 2) return <svg className="an-spark" viewBox="0 0 100 24" />;
  const max = Math.max(1, ...v);
  const pts = v.map((y, i) => `${(i / (v.length - 1)) * 100},${22 - (y / max) * 20}`).join(" ");
  return (
    <svg className="an-spark" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
      <polygon points={`0,24 ${pts} 100,24`} fill={color} opacity="0.12" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

/** Area chart with an axis and hover read-out. rows: [{ day, ... }], k: field */
export function AreaChart({ rows, k, hourly, money, color = PALETTE[0] }) {
  const [hover, setHover] = useState(null);
  const W = 1000, H = 230, L = 34, B = 24, T = 10;
  const vals = rows.map((r) => Number(r[k] || 0));
  const max = niceMax(Math.max(1, ...vals));
  const x = (i) => L + (rows.length <= 1 ? 0 : (i / (rows.length - 1)) * (W - L - 8));
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const line = vals.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const label = (d) => new Date(d).toLocaleString("en-KE", hourly ? { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi" } : { day: "numeric", month: "short", timeZone: "Africa/Nairobi" });
  // rounded ticks can repeat when the numbers are small (e.g. 0, 0, 1, 1, 1 on an empty day), so keep each once
  const ticks = [...new Set([0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f)))];
  const every = Math.max(1, Math.ceil(rows.length / 7));
  return (
    <div className="an-area" onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Trend chart">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - 4} y1={y(t)} y2={y(t)} className="an-grid" />
            <text x={L - 6} y={y(t) + 3} textAnchor="end" className="an-axis">{money ? short(t) : t}</text>
          </g>
        ))}
        {rows.length > 0 && <polygon points={`${x(0)},${y(0)} ${line} ${x(rows.length - 1)},${y(0)}`} fill={color} opacity="0.13" />}
        <polyline points={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
        {rows.map((r, i) => (i % every === 0 || i === rows.length - 1) && (
          <text key={`${r.day}-${i}`} x={x(i)} y={H - 6} textAnchor="middle" className="an-axis">{label(r.day)}</text>
        ))}
        {rows.map((r, i) => (
          <rect key={`h${i}`} x={x(i) - (W - L) / Math.max(2, rows.length) / 2} y={T} width={(W - L) / Math.max(2, rows.length)} height={H - T - B}
            fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
        {hover !== null && rows[hover] && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke={color} strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(vals[hover])} r="4.5" fill="#0a0a0a" stroke={color} strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover !== null && rows[hover] && (
        <div className="an-tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
          <b>{money ? ksh(vals[hover]) : num(vals[hover])}</b> {label(rows[hover].day)}
        </div>
      )}
    </div>
  );
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
}
const short = (v) => (v >= 1e6 ? `${Math.round(v / 1e5) / 10}M` : v >= 1000 ? `${Math.round(v / 100) / 10}k` : v);

/** Ring (donut) chart with the total in the middle and a legend. items: [{ label, value }] */
export function Donut({ items, totalLabel = "Total", empty = "Nothing yet in this period." }) {
  const list = items.filter((i) => Number(i.value) > 0);
  const total = list.reduce((a, b) => a + Number(b.value), 0);
  const [on, setOn] = useState(null);
  if (!total) return <p className="an-empty">{empty}</p>;
  const R = 42, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="an-donut">
      <svg viewBox="0 0 120 120" role="img" aria-label={`${totalLabel}: ${total}`}>
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="16" />
        {list.map((it, i) => {
          const len = (Number(it.value) / total) * C;
          const seg = (
            <circle key={`${it.label}-${i}`} cx="60" cy="60" r={R} fill="none" stroke={it.color || PALETTE[i % PALETTE.length]}
              strokeWidth={on === i ? 20 : 16} strokeDasharray={`${Math.max(0, len - (list.length > 1 ? 1.2 : 0))} ${C}`} strokeDashoffset={-acc}
              transform="rotate(-90 60 60)" onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)} style={{ transition: "stroke-width .15s" }}>
              <title>{`${it.label}: ${num(it.value)} (${pct(it.value, total)}%)`}</title>
            </circle>
          );
          acc += len;
          return seg;
        })}
        <text x="60" y="56" textAnchor="middle" className="an-donut-k">{on === null ? totalLabel : list[on].label.slice(0, 14)}</text>
        <text x="60" y="73" textAnchor="middle" className="an-donut-v">{num(on === null ? total : list[on].value)}</text>
      </svg>
      <ul className="an-legend">
        {list.map((it, i) => (
          <li key={`${it.label}-${i}`} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)} className={on === i ? "on" : ""}>
            <i style={{ background: it.color || PALETTE[i % PALETTE.length] }} />
            <span>{it.label}</span>
            <b>{num(it.value)}</b>
            <small>{pct(it.value, total)}%</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Rows with a soft bar behind them. items: [{ key, label, sub, value, right }] */
export function BarList({ items, empty = "Nothing yet in this period.", limit = 12, money }) {
  const [all, setAll] = useState(false);
  const max = useMemo(() => Math.max(1, ...items.map((i) => Number(i.value || 0))), [items]);
  if (!items.length) return <p className="an-empty">{empty}</p>;
  const shown = all ? items : items.slice(0, limit);
  return (
    <div className="an-barlist">
      {shown.map((it, i) => (
        <div className="an-barrow" key={`${it.key ?? it.label}-${i}`} title={it.title || it.label}>
          <div className="an-barfill" style={{ width: `${Math.max(2, (Number(it.value || 0) / max) * 100)}%` }} />
          <span className="an-barlabel">{it.href ? <a href={it.href} target="_blank" rel="noreferrer">{it.label}</a> : it.label}{it.sub && <small> {it.sub}</small>}</span>
          <span className="an-barval">{money ? ksh(it.value) : num(it.value)}{it.right && <small> {it.right}</small>}</span>
        </div>
      ))}
      {items.length > limit && (
        <button type="button" className="an-more" onClick={() => setAll(!all)}>{all ? "Show less" : `Show all ${items.length}`}</button>
      )}
    </div>
  );
}

/** Sales funnel: thick bars that shrink, with the drop between steps. */
export function Funnel({ steps }) {
  const top = Math.max(1, Number(steps[0]?.count || 0));
  return (
    <div className="an-funnel">
      {steps.map((s, i) => {
        const prev = i > 0 ? Number(steps[i - 1].count || 0) : 0;
        return (
          <div key={s.step}>
            {i > 0 && <div className="an-funnel-drop">↓ {prev ? `${pct(s.count, prev)}% went on to the next step` : "—"}</div>}
            <div className="an-funnel-step">
              <div className="an-funnel-head"><span>{s.step}</span><b>{num(s.count)} <small>{pct(s.count, top)}%</small></b></div>
              <div className="an-funnel-track"><div className="an-funnel-bar" style={{ width: `${Math.max(1.5, (Number(s.count || 0) / top) * 100)}%`, opacity: 1 - i * 0.1 }} /></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 24 bars, one per hour of the day. */
export function HourBars({ hours }) {
  const v = (hours || []).map((x) => Number(x || 0));
  const max = Math.max(1, ...v);
  const peak = v.indexOf(Math.max(...v));
  if (!v.some(Boolean)) return <p className="an-empty">Nothing yet in this period.</p>;
  return (
    <div>
      <div className="an-hours">
        {v.map((n, h) => (
          <div key={h} className={`an-hour${h === peak ? " peak" : ""}`} title={`${String(h).padStart(2, "0")}:00 to ${String((h + 1) % 24).padStart(2, "0")}:00 · ${n} page views`}>
            <i style={{ height: `${Math.max(n ? 4 : 0, (n / max) * 100)}%` }} />
          </div>
        ))}
      </div>
      <div className="an-hours-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span></div>
      <p className="an-hint">Busiest: <b>{String(peak).padStart(2, "0")}:00 to {String((peak + 1) % 24).padStart(2, "0")}:00</b>. A good time to post or send offers.</p>
    </div>
  );
}
