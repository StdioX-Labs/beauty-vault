// Lashes by Shazz analytics: records what visitors do so /admin -> Analytics can show it in plain words
// (pages, Book / WhatsApp / Call / Enrol presses, which lash tech or set, where visitors came from).
// Same approach as Lash Tribe's public/scripts/track.js.
//
// How it works
//   * Each event goes to the Lash Tribe Supabase project through public.lbs_track_event
//     (supabase/lashesbyshazz-analytics.sql). Nobody but Lash Tribe admins can read the data.
//   * A visitor is a random id kept in this browser. A visit ends after 30 idle minutes. No cookies.
//     The internet address is never stored: /api/visit returns the town and a daily-changing code.
//   * Clicks are picked up from the page: booking links, WhatsApp, phone, Google Maps, Lash Tribe and
//     social links. Every event is also pushed to Google Tag Manager's dataLayer as "lbs_<event>".
//   * Bots, browsers sending "Global Privacy Control" and anyone who has opened /admin are not tracked.
(function () {
  'use strict';
  if (window.LBSTrack) return;

  var cfg = window.__LBS_TRACK || {};
  var noop = function () {};
  var store = {
    get: function (k, s) { try { return (s ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
    set: function (k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) { /* private mode */ } },
  };

  var ua = navigator.userAgent || '';
  var isBot = navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|whatsapp\//i.test(ua);
  var optedOut = navigator.globalPrivacyControl === true;
  if (/^\/admin/.test(location.pathname)) store.set('lbs_admin', '1');
  var isAdminBrowser = store.get('lbs_admin') === '1';

  function gtm(name, data) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: 'lbs_' + name }, data || {}));
    } catch (e) { /* ignore */ }
  }

  if (!cfg.url || !cfg.key || isBot || optedOut || isAdminBrowser) {
    window.LBSTrack = noop;
    return;
  }

  function rid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
  }

  var visitor = store.get('lbs_vid');
  if (!visitor) { visitor = rid(); store.set('lbs_vid', visitor); }

  var now = Date.now();
  var session = store.get('lbs_sid', true);
  var last = Number(store.get('lbs_last') || 0);
  var lastSid = store.get('lbs_sid_l');
  if (!session && lastSid && now - last < 30 * 60 * 1000) session = lastSid; // new tab, same visit
  if (!session || now - last > 30 * 60 * 1000) session = rid();
  store.set('lbs_sid', session, true);
  store.set('lbs_sid_l', session);

  var device = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || Math.min(screen.width, screen.height) < 700 ? 'mobile' : 'desktop';
  var params = new URLSearchParams(location.search);
  var utm = {
    utm_source: params.get('utm_source') || (params.get('fbclid') ? 'facebook' : params.get('gclid') ? 'google' : params.get('ttclid') ? 'tiktok' : ''),
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
  };

  // ---- visit info: town + daily "net" code from /api/visit, once per visit ----
  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* old browser */ }
  var os = /iPhone|iPad|iPod/i.test(ua) ? 'ios' : /Android/i.test(ua) ? 'android' : /Windows/i.test(ua) ? 'windows' : /Mac OS/i.test(ua) ? 'mac' : /Linux/i.test(ua) ? 'linux' : 'other';
  var model = (ua.match(/Android [\d.]+; ([^;)]+)/) || [])[1] || '';
  var sig = [os, model.trim(), screen.width + 'x' + screen.height, window.devicePixelRatio || 1, tz, (navigator.language || '').slice(0, 5)].join('|');
  // when the town lookup is blank (visits through the proxy), the time zone still gives the country
  var TZ_COUNTRY = { 'Africa/Nairobi': 'Kenya', 'Africa/Kampala': 'Uganda', 'Africa/Dar_es_Salaam': 'Tanzania', 'Africa/Kigali': 'Rwanda', 'Africa/Lagos': 'Nigeria', 'Africa/Johannesburg': 'South Africa', 'Africa/Addis_Ababa': 'Ethiopia', 'Europe/London': 'United Kingdom', 'Asia/Dubai': 'United Arab Emirates' };
  var info = null;
  try { info = JSON.parse(store.get('lbs_vinfo', true) || 'null'); } catch (e) { info = null; }
  var infoReady = info ? Promise.resolve(info) : new Promise(function (resolve) {
    var done = false;
    var finish = function (v) { if (done) return; done = true; info = v || {}; if (v) store.set('lbs_vinfo', JSON.stringify(v), true); resolve(info); };
    setTimeout(function () { finish(null); }, 2500);
    try {
      fetch('/api/visit', { credentials: 'omit' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(finish, function () { finish(null); });
    } catch (e) { finish(null); }
  });

  function externalReferrer() {
    try {
      if (!document.referrer) return '';
      var host = new URL(document.referrer).hostname.replace(/^www\./, '');
      return host && host !== location.hostname.replace(/^www\./, '') ? host : '';
    } catch (e) { return ''; }
  }

  // which of the four brands a page belongs to
  function brandOf(path) {
    if (/^\/(aesthetics|beauty-wellness)/.test(path)) return 'Revive Aesthetics';
    if (/^\/(hair|peruvian-wigs)/.test(path)) return 'Shasha Hair';
    if (/^\/(training|how-to-become)/.test(path)) return 'Academy';
    return 'Lashes by Shazz';
  }

  var endpoint = cfg.url.replace(/\/$/, '') + '/rest/v1/rpc/lbs_track_event';
  function send(payload) {
    try {
      fetch(endpoint, {
        method: 'POST',
        keepalive: true,
        headers: { apikey: cfg.key, Authorization: 'Bearer ' + cfg.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p: payload }),
      }).catch(noop);
    } catch (e) { /* ignore */ }
  }

  function track(name, data) {
    data = data || {};
    store.set('lbs_last', String(Date.now()));
    var payload = {
      name: name,
      visitor_id: visitor,
      session_id: session,
      path: location.pathname,
      device: device,
      brand: data.brand || brandOf(location.pathname),
      label: data.label ? String(data.label).slice(0, 160) : '',
      tech: data.tech || '',
      branch: data.branch || '',
      service: data.service || '',
      props: data.props || {},
    };
    if (utm.utm_source) {
      payload.utm_source = utm.utm_source;
      payload.utm_medium = utm.utm_medium;
      payload.utm_campaign = utm.utm_campaign;
    }
    if (name === 'page_view') payload.referrer = externalReferrer();
    if (name !== 'page_view') {
      gtm(name, { lbs_label: payload.label, lbs_brand: payload.brand, lbs_tech: payload.tech, lbs_branch: payload.branch, lbs_service: payload.service });
    }
    infoReady.then(function (v) {
      v = v || {};
      payload.city = v.city || '';
      payload.country = v.country || TZ_COUNTRY[tz] || '';
      if (v.net) payload.device_key = v.net + '|' + sig;
      send(payload);
    });
  }
  window.LBSTrack = track;

  // ---- page views (also when the site changes page without a full reload) ----
  var lastPath = '';
  function pageView() {
    if (location.pathname === lastPath) return;
    lastPath = location.pathname;
    track('page_view', { label: document.title });
  }
  pageView();
  ['pushState', 'replaceState'].forEach(function (fn) {
    var orig = history[fn];
    history[fn] = function () {
      var r = orig.apply(this, arguments);
      setTimeout(pageView, 50);
      return r;
    };
  });
  window.addEventListener('popstate', function () { setTimeout(pageView, 50); });

  // ---- clicks ----
  var techs = cfg.techs || {};        // staff id -> name
  var techSlugs = cfg.techSlugs || {}; // /book/<slug> -> { name, branch }
  var BRANCHES = { 1: 'CBD', 2: 'Hurlingham', cbd: 'CBD', hurlingham: 'Hurlingham' };
  var PHONES = { '254792066140': 'CBD', '254769781771': 'Hurlingham' };

  function textOf(el) {
    return (el.getAttribute('data-lt-label') || el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  }
  function sectionOf(el) {
    var marked = el.closest('[data-lt-section]');
    if (marked) return marked.getAttribute('data-lt-section');
    if (el.closest('footer')) return 'Footer';
    if (el.closest('nav, header')) return 'Top menu';
    var sec = el.closest('section, article, li, aside');
    var h = sec && sec.querySelector('h1, h2, h3');
    var ht = h && (h.innerText || h.textContent || '').replace(/\s+/g, ' ').trim();
    if (ht) return ht.slice(0, 60);
    return 'Page';
  }
  function cardTitle(el) {
    var card = el.closest('article, li, div.group, div[class*="rounded"]');
    var h = card && card.querySelector('h3, h4');
    return h ? h.textContent.replace(/\s+/g, ' ').trim().slice(0, 80) : '';
  }

  document.addEventListener('click', function (event) {
    var target = event.target instanceof Element ? event.target : null;
    var link = target && target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var abs;
    try { abs = new URL(href, location.href); } catch (e) { return; }
    var label = sectionOf(link) + ': ' + textOf(link);
    var digits = href.replace(/\D/g, '');

    if (/^booking\.(lashesbyshazz\.com|revive\.co\.ke)$/i.test(abs.hostname) || /^\/book(\/|$)/.test(abs.pathname) && abs.hostname === location.hostname) {
      var staff = abs.searchParams.get('staff_id');
      var bid = abs.searchParams.get('branch_id');
      var slug = abs.hostname === location.hostname ? abs.pathname.split('/')[2] || '' : '';
      var t = slug && techSlugs[slug];
      track('book_click', {
        label: label,
        brand: /revive/i.test(abs.hostname) ? 'Revive Aesthetics' : undefined,
        tech: (staff && techs[staff]) || (t && t.name) || '',
        branch: (t && BRANCHES[t.branch]) || BRANCHES[bid] || BRANCHES[slug] || '',
        service: link.getAttribute('data-lt-set') || '',
      });
    } else if (/(wa\.me|api\.whatsapp\.com|whatsapp:)/i.test(href)) {
      var onTraining = /^\/training/.test(location.pathname);
      var course = onTraining ? cardTitle(link) : '';
      var isEnrol = onTraining && /enrol/i.test(textOf(link));
      track(isEnrol ? 'enrol_click' : 'whatsapp_click', { label: label, branch: PHONES[digits.slice(0, 12)] || '', service: isEnrol ? course : '' });
    } else if (/^tel:/i.test(href)) {
      track('phone_click', { label: label, branch: PHONES[digits.slice(-12)] || PHONES['254' + digits.slice(-9)] || '' });
    } else if (/(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(href)) {
      track('directions_click', { label: label, branch: /absa|loita/i.test(href) ? 'CBD' : /silverpool|jabavu/i.test(href) ? 'Hurlingham' : '' });
    } else if (/lashtribeafrica\.com/i.test(abs.hostname)) {
      track('shop_click', { label: label });
    } else if (/^mailto:/i.test(href)) {
      track('email_link_click', { label: label });
    } else if (/(instagram\.com|tiktok\.com|facebook\.com|youtube\.com|x\.com|twitter\.com)/i.test(abs.hostname)) {
      track('social_click', { label: abs.hostname.replace(/^www\./, '') + abs.pathname.replace(/\/$/, '') });
    }
  }, true);
})();
