"use client";
import { useEffect, useRef, useState } from "react";
import AdminLogin from "./AdminLogin";
import Analytics from "./Analytics";
import Clients from "./Clients";
import { getSession, signOut, rpc } from "./supa";
import "./admin.css";
import "./admin-mobile.css";
import "./admin-theme.css";

// Lashes by Shazz admin: the website's look (admin-theme.css) on the Lash Tribe admin layout, same sign-in accounts.
// Sections: Analytics (what visitors do on the site) and Clients (profiles, retention and bookings from /book).
const NAV = [
  {
    key: "analytics", label: "Analytics", title: "Analytics", subtitle: "What visitors do on the site: pages, bookings, WhatsApp, calls and enrolments",
    icon: <path d="M2 14h12M4 11.5V8m3 3.5V4.5m3 7V6.5m3 5V2.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    key: "clients", label: "Clients", title: "Clients", subtitle: "Client profiles, retention and bookings from lashesbyshazz.com/book",
    icon: <path d="M6 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.5 13.5c.4-2.3 2.2-3.8 4.5-3.8s4.1 1.5 4.5 3.8M11 2.7a2.3 2.3 0 0 1 0 4.4M12.3 9.9c1.2.5 2 1.8 2.2 3.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

function AdminShell({ onLogout }) {
  const contentRef = useRef(null);
  const [section, setSection] = useState(() => {
    try { return localStorage.getItem("lbs_admin_section") || "analytics"; } catch { return "analytics"; }
  });
  const go = (key) => {
    setSection(key);
    try { localStorage.setItem("lbs_admin_section", key); } catch { /* private mode */ }
  };
  const current = NAV.find((n) => n.key === section) || NAV[0];

  // Phone layout turns tables into stacked cards; each cell needs its column name for that,
  // so copy the header text onto the cells (as in the Lash Tribe admin).
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return undefined;
    const labelCells = () => {
      root.querySelectorAll(".admin-table").forEach((table) => {
        const heads = Array.from(table.querySelectorAll("thead th")).map((th) => th.textContent.trim());
        table.querySelectorAll("tbody tr").forEach((row) => {
          Array.from(row.children).forEach((cell, i) => {
            if (cell.dataset.label === undefined) cell.dataset.label = heads[i] || "";
          });
        });
      });
    };
    labelCells();
    const observer = new MutationObserver(labelCells);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="admin-root">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="lbs-brand">
            <img src="/icons/lashesbyshazz-round.png" alt="" />
            <span>Lashes by Shazz</span>
          </div>
          <div className="lbs-brand-sub">Admin</div>
          <nav className="admin-nav">
            {NAV.map((item) => (
              <button key={item.key} type="button" className={`admin-nav-item${item.key === current.key ? " active" : ""}`} onClick={() => go(item.key)}>
                <svg className="admin-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">{item.icon}</svg>
                {item.label}
              </button>
            ))}
            <a className="admin-nav-item" href="/" target="_blank" rel="noreferrer">
              <svg className="admin-nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M9 2.5h4.5V7M13.5 2.5 7 9M11.5 9.5v3.5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Open the website
            </a>
          </nav>
          <div className="admin-sidebar-footer">
            <button type="button" className="admin-logout" onClick={onLogout}>Sign out</button>
          </div>
        </aside>
        <div className="admin-main">
          <div className="admin-topbar">
            <div>
              <div className="admin-mobile-brand lbs-brand"><img src="/icons/lashesbyshazz-round.png" alt="" /><span>Lashes by Shazz</span></div>
              <div className="admin-title">{current.title}</div>
              <div className="admin-subtitle">{current.subtitle}</div>
              <div className="lbs-m-switch">
                {NAV.map((item) => (
                  <button key={item.key} type="button" className={item.key === current.key ? "on" : ""} onClick={() => go(item.key)}>{item.label}</button>
                ))}
              </div>
            </div>
            <div className="admin-topbar-action" style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button className="admin-btn secondary" type="button" onClick={onLogout}>Sign out</button>
            </div>
          </div>
          <div className="admin-content" ref={contentRef}>
            {current.key === "clients" ? <Clients /> : <Analytics />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [auth, setAuth] = useState("checking");

  useEffect(() => {
    // this browser is an admin's: the site's own analytics skips it from now on
    try { localStorage.setItem("lbs_admin", "1"); } catch { /* private mode */ }
    (async () => {
      const s = await getSession();
      if (!s) return setAuth("out");
      // A dropped request is not a "no": try the admin check a few times before showing the sign-in form.
      for (let attempt = 0; attempt < 3; attempt++) {
        if (attempt) await new Promise((r) => setTimeout(r, 1200 * attempt));
        const { data, error } = await rpc("is_academy_admin");
        if (!error) return setAuth(data === true ? "in" : "out");
      }
      setAuth("out");
    })();
  }, []);

  async function logout() {
    await signOut();
    setAuth("out");
  }

  if (auth === "checking") {
    return <div className="admin-root admin-login-root"><p className="form-hint">Checking your session…</p></div>;
  }
  if (auth === "out") return <AdminLogin onSignedIn={() => setAuth("in")} />;
  return <AdminShell onLogout={logout} />;
}
