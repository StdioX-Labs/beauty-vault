-- =====================================================================
-- Lashes by Shazz analytics (lashesbyshazz.com)
-- Runs in the Lash Tribe Africa Supabase project, in its own schema "lashesbyshazz",
-- so it never touches Lash Tribe's tables. Same idea and same admins as Lash Tribe's
-- Admin -> Analytics (migrations 0049 + 0056 there).
--
-- What this adds
--   * lashesbyshazz.events: one row per thing a visitor does on lashesbyshazz.com (opened a page,
--     pressed Book, WhatsApp, Call, Enrol, opened a /book/<name> link from Instagram...).
--   * lashesbyshazz.visitors: joins one person's browsers together (same idea as Lash Tribe 0056).
--   * public.lbs_track_event(jsonb): the ONLY way in. The site calls it with the public anon key.
--     It accepts only the event names below, cuts long text, ignores Lash Tribe admins and floods.
--   * public.lbs_admin_analytics(from, to): everything /admin -> Analytics shows, in one call.
--     Only accounts in Lash Tribe's academy_admins can call it (public.is_academy_admin()).
--   * Raw events older than 180 days are deleted daily (when pg_cron is on).
--
-- Privacy: no IP address and no cookies. A visitor is a random id kept in the browser.
-- /api/visit on lashesbyshazz.com only returns the approximate town and a daily-changing code.
--
-- How to run: Supabase dashboard of the Lash Tribe project -> SQL editor -> paste all -> Run.
-- Safe to run more than once. Needs Lash Tribe's public.is_academy_admin() (migration 0005).
-- =====================================================================

create schema if not exists lashesbyshazz;
revoke all on schema lashesbyshazz from public, anon, authenticated;

create table if not exists lashesbyshazz.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  visitor_id text not null,
  session_id text not null,
  person_id text,
  path text,                 -- page it happened on, e.g. /lashes
  referrer text,             -- only the other site's host, e.g. instagram.com
  utm_source text,
  utm_medium text,
  utm_campaign text,
  brand text,                -- Lashes by Shazz | Academy | Revive Aesthetics | Shasha Hair
  label text,                -- where on the page / which button, e.g. "Lashes: UV Classic Set"
  tech text,                 -- lash technician, when the button or link was for one
  branch text,               -- CBD | Hurlingham
  service text,              -- lash set or course the button was for
  device text,               -- mobile | desktop
  city text,
  country text,
  props jsonb not null default '{}'::jsonb
);

create index if not exists lbs_events_time_idx on lashesbyshazz.events (created_at desc);
create index if not exists lbs_events_name_time_idx on lashesbyshazz.events (name, created_at desc);
create index if not exists lbs_events_session_idx on lashesbyshazz.events (session_id, created_at);
create index if not exists lbs_events_person_idx on lashesbyshazz.events (person_id, created_at);
create index if not exists lbs_events_visitor_idx on lashesbyshazz.events (visitor_id, created_at desc);

create table if not exists lashesbyshazz.visitors (
  visitor_id text primary key,
  person_id text not null,
  device_key text,           -- md5(daily net code + device details); only matches on the same day
  device text,
  city text,
  country text,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now()
);
create index if not exists lbs_visitors_key_idx on lashesbyshazz.visitors (device_key, last_seen desc);

alter table lashesbyshazz.events enable row level security;
alter table lashesbyshazz.visitors enable row level security;
revoke all on lashesbyshazz.events, lashesbyshazz.visitors from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- lbs_track_event: the one door in
-- ---------------------------------------------------------------------
create or replace function public.lbs_track_event(p jsonb)
returns void
language plpgsql
security definer
set search_path = lashesbyshazz, public
as $$
declare
  v_name text := lower(left(coalesce(p->>'name', ''), 40));
  v_visitor text := left(coalesce(p->>'visitor_id', ''), 64);
  v_session text := left(coalesce(p->>'session_id', ''), 64);
  v_props jsonb := case when jsonb_typeof(p->'props') = 'object' then p->'props' else '{}'::jsonb end;
  v_key text := case when length(coalesce(p->>'device_key', '')) > 20 then md5(left(p->>'device_key', 300)) end;
  v_city text := nullif(left(trim(coalesce(p->>'city', '')), 80), '');
  v_country text := nullif(left(trim(coalesce(p->>'country', '')), 80), '');
  v_device text := case when p->>'device' in ('mobile', 'desktop') then p->>'device' end;
  v_known record;
  v_person text;
begin
  if v_name not in (
    'page_view', 'book_click', 'book_link_open', 'whatsapp_click', 'phone_click', 'social_click',
    'email_link_click', 'enrol_click', 'shop_click', 'directions_click'
  ) then
    return;
  end if;
  if length(v_visitor) < 8 or length(v_session) < 8 then return; end if;

  -- Lash Tribe admins browsing the site are not clients
  if auth.uid() is not null and public.is_academy_admin() then return; end if;

  -- one visitor sending a flood is a bot or a bug
  if (select count(*) from lashesbyshazz.events
       where visitor_id = v_visitor and created_at > now() - interval '1 minute') >= 90 then
    return;
  end if;

  -- who is this person? (same browser = same person; same connection + same device on the same day = same person)
  select * into v_known from lashesbyshazz.visitors where visitor_id = v_visitor;
  if v_known.person_id is not null then
    v_person := v_known.person_id;
  elsif v_key is not null then
    select person_id into v_person from lashesbyshazz.visitors
     where device_key = v_key and last_seen > now() - interval '1 day'
     order by last_seen desc limit 1;
  end if;
  v_person := coalesce(v_person, 'v:' || v_visitor);

  insert into lashesbyshazz.visitors as av (visitor_id, person_id, device_key, device, city, country)
  values (v_visitor, v_person, v_key, v_device, v_city, v_country)
  on conflict (visitor_id) do update set
    device_key = coalesce(excluded.device_key, av.device_key),
    device = coalesce(excluded.device, av.device),
    city = coalesce(excluded.city, av.city),
    country = coalesce(excluded.country, av.country),
    last_seen = now();

  if length(v_props::text) > 1500 then v_props := '{}'::jsonb; end if;

  insert into lashesbyshazz.events
    (name, visitor_id, session_id, person_id, path, referrer, utm_source, utm_medium, utm_campaign,
     brand, label, tech, branch, service, device, city, country, props)
  values (
    v_name, v_visitor, v_session, v_person,
    left(nullif(p->>'path', ''), 300),
    lower(left(nullif(p->>'referrer', ''), 120)),
    lower(left(nullif(p->>'utm_source', ''), 80)),
    lower(left(nullif(p->>'utm_medium', ''), 80)),
    left(nullif(p->>'utm_campaign', ''), 120),
    left(nullif(p->>'brand', ''), 40),
    left(nullif(p->>'label', ''), 160),
    left(nullif(p->>'tech', ''), 80),
    case when p->>'branch' in ('CBD', 'Hurlingham') then p->>'branch' end,
    left(nullif(p->>'service', ''), 80),
    v_device,
    coalesce(v_city, v_known.city),
    coalesce(v_country, v_known.country),
    v_props
  );
end;
$$;
revoke all on function public.lbs_track_event(jsonb) from public;
grant execute on function public.lbs_track_event(jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------
-- Friendly names for a page path
-- ---------------------------------------------------------------------
create or replace function lashesbyshazz.page_label(p_path text)
returns text
language sql
immutable
as $$
  select case
    when p_path is null then 'Unknown page'
    when p_path in ('/', '') then 'Home'
    when p_path like '/book/%' then 'Booking link: ' || initcap(replace(split_part(p_path, '/', 3), '-', ' '))
    when p_path = '/lashes' then 'Lashes & prices'
    when p_path = '/lash-extensions' then 'Lash extensions'
    when p_path = '/lash-refill-services' then 'Lash refills'
    when p_path = '/services' then 'Services'
    when p_path = '/training' then 'Academy'
    when p_path = '/our-team' then 'Our team'
    when p_path = '/about' then 'About'
    when p_path = '/contact-us' then 'Contact us'
    when p_path = '/faq-page' then 'FAQ'
    when p_path = '/hair' then 'Shasha Hair'
    when p_path = '/peruvian-wigs' then 'Peruvian wigs'
    when p_path = '/aesthetics' then 'Revive Aesthetics'
    when p_path = '/category/lashes' then 'Blog'
    else initcap(replace(trim(both '/' from p_path), '-', ' '))
  end;
$$;

-- Where a visit came from, in plain words
create or replace function lashesbyshazz.source_label(p_utm text, p_ref text)
returns text
language sql
immutable
as $$
  select case
    when coalesce(p_utm, p_ref) is null then 'Direct / typed in'
    when coalesce(p_utm, p_ref) ~ '(instagram|^ig$)' then 'Instagram'
    when coalesce(p_utm, p_ref) ~ '(facebook|^fb$|fb\.)' then 'Facebook'
    when coalesce(p_utm, p_ref) ~ 'tiktok' then 'TikTok'
    when coalesce(p_utm, p_ref) ~ '(whatsapp|wa\.me)' then 'WhatsApp'
    when coalesce(p_utm, p_ref) ~ '(google|gclid)' then 'Google'
    when coalesce(p_utm, p_ref) ~ '(bing|yahoo|duckduckgo)' then 'Other search engines'
    when coalesce(p_utm, p_ref) ~ '(youtube|youtu\.be)' then 'YouTube'
    when coalesce(p_utm, p_ref) ~ 'lashtribeafrica' then 'Lash Tribe Africa'
    when coalesce(p_utm, p_ref) ~ '(t\.co|twitter|x\.com)' then 'X (Twitter)'
    when coalesce(p_utm, p_ref) = 'email' then 'Email'
    else coalesce(p_utm, p_ref)
  end;
$$;

-- ---------------------------------------------------------------------
-- lbs_admin_analytics: the whole /admin -> Analytics page for any period
-- ---------------------------------------------------------------------
create or replace function public.lbs_admin_analytics(p_from timestamptz, p_to timestamptz)
returns jsonb
language plpgsql
stable
security definer
set search_path = lashesbyshazz, public
as $$
declare
  v_from timestamptz := coalesce(p_from, now() - interval '30 days');
  v_to timestamptz := least(coalesce(p_to, now()), now() + interval '1 minute');
  v_len interval;
  v_prev timestamptz;
  v_hourly boolean;
  out jsonb;
  contact_names text[] := array['book_click', 'book_link_open', 'whatsapp_click', 'phone_click'];
  price_pages text[] := array['/lashes', '/lash-extensions', '/lash-refill-services', '/services', '/training', '/aesthetics', '/hair', '/peruvian-wigs', '/microshading'];
begin
  if not public.is_academy_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if v_to <= v_from then v_to := v_from + interval '1 day'; end if;
  v_len := v_to - v_from;
  v_prev := v_from - v_len;
  v_hourly := v_len <= interval '2 days';

  -- headline numbers, this period and the one before it
  with periods(k, f, t) as (values ('now', v_from, v_to), ('before', v_prev, v_from)),
  s as (
    select p.k,
      (select count(distinct coalesce(person_id, 'v:' || visitor_id)) from events e where e.created_at >= p.f and e.created_at < p.t) visitors,
      (select count(distinct session_id) from events e where e.created_at >= p.f and e.created_at < p.t) visits,
      (select count(*) from events e where e.name = 'page_view' and e.created_at >= p.f and e.created_at < p.t) page_views,
      (select count(*) from events e where e.name = 'page_view' and e.path = any(price_pages) and e.created_at >= p.f and e.created_at < p.t) price_views,
      (select count(*) from events e where e.name in ('book_click', 'book_link_open') and e.created_at >= p.f and e.created_at < p.t) book_clicks,
      (select count(*) from events e where e.name = 'book_link_open' and e.created_at >= p.f and e.created_at < p.t) book_links,
      (select count(*) from events e where e.name = 'whatsapp_click' and e.created_at >= p.f and e.created_at < p.t) whatsapp_clicks,
      (select count(*) from events e where e.name = 'phone_click' and e.created_at >= p.f and e.created_at < p.t) call_clicks,
      (select count(*) from events e where e.name = 'enrol_click' and e.created_at >= p.f and e.created_at < p.t) enrol_clicks,
      (select count(*) from events e where e.name = 'shop_click' and e.created_at >= p.f and e.created_at < p.t) shop_clicks,
      (select count(*) from events e where e.name = 'directions_click' and e.created_at >= p.f and e.created_at < p.t) directions_clicks,
      (select count(distinct session_id) from events e where e.name = any(contact_names) and e.created_at >= p.f and e.created_at < p.t) contacted_visits
    from periods p
  )
  select jsonb_build_object(
    'from', v_from, 'to', v_to, 'hourly', v_hourly,
    'days', greatest(1, round(extract(epoch from v_len) / 86400)),
    'tracking_since', (select min(created_at) from events),
    'summary', (select to_jsonb(s) - 'k' from s where k = 'now'),
    'previous', (select to_jsonb(s) - 'k' from s where k = 'before')
  ) into out;

  -- trend: one point per hour (today / yesterday) or per day
  out := out || jsonb_build_object('daily', coalesce((
    with b as (
      select g as b_start, g + case when v_hourly then interval '1 hour' else interval '1 day' end as b_end
      from generate_series(
        case when v_hourly then date_trunc('hour', v_from) else (date_trunc('day', v_from at time zone 'Africa/Nairobi') at time zone 'Africa/Nairobi') end,
        v_to - interval '1 second',
        case when v_hourly then interval '1 hour' else interval '1 day' end) g
    )
    select jsonb_agg(jsonb_build_object('day', x.b_start, 'visitors', x.visitors, 'page_views', x.page_views,
      'bookings', x.bookings, 'whatsapp', x.whatsapp, 'calls', x.calls, 'contacts', x.contacts, 'enrol', x.enrol) order by x.b_start)
    from (
      select b.b_start,
        count(distinct coalesce(ev.person_id, 'v:' || ev.visitor_id)) filter (where ev.id is not null) visitors,
        count(*) filter (where ev.name = 'page_view') page_views,
        count(*) filter (where ev.name in ('book_click', 'book_link_open')) bookings,
        count(*) filter (where ev.name = 'whatsapp_click') whatsapp,
        count(*) filter (where ev.name = 'phone_click') calls,
        count(*) filter (where ev.name = any(contact_names)) contacts,
        count(*) filter (where ev.name = 'enrol_click') enrol
      from b left join events ev on ev.created_at >= b.b_start and ev.created_at < b.b_end
      group by b.b_start
    ) x
  ), '[]'::jsonb));

  -- funnel by visit
  out := out || jsonb_build_object('funnel', jsonb_build_array(
    jsonb_build_object('step', 'Visits', 'count', (select count(distinct session_id) from events where created_at >= v_from and created_at < v_to)),
    jsonb_build_object('step', 'Looked at prices or a service', 'count', (select count(distinct session_id) from events where name = 'page_view' and path = any(price_pages) and created_at >= v_from and created_at < v_to)),
    jsonb_build_object('step', 'Pressed Book, WhatsApp or Call', 'count', (select count(distinct session_id) from events where name = any(contact_names) and created_at >= v_from and created_at < v_to)),
    jsonb_build_object('step', 'Went to the booking site', 'count', (select count(distinct session_id) from events where name in ('book_click', 'book_link_open') and created_at >= v_from and created_at < v_to))
  ));

  -- buttons clicked (kinds) and where on the site
  out := out || jsonb_build_object('buttons', coalesce((
    select jsonb_agg(jsonb_build_object('kind', name, 'clicks', n, 'people', p) order by n desc)
    from (select name, count(*) n, count(distinct person_id) p from events
          where name <> 'page_view' and created_at >= v_from and created_at < v_to group by name) x
  ), '[]'::jsonb),
  'button_places', coalesce((
    select jsonb_agg(jsonb_build_object('kind', name, 'page', page_label(path), 'button', label, 'clicks', n, 'people', p) order by n desc)
    from (select name, path, label, count(*) n, count(distinct person_id) p from events
          where name <> 'page_view' and created_at >= v_from and created_at < v_to
          group by name, path, label order by count(*) desc limit 25) x
  ), '[]'::jsonb));

  -- the four brands: what people contacted / booked
  out := out || jsonb_build_object('brands', coalesce((
    select jsonb_agg(jsonb_build_object('brand', brand, 'bookings', b, 'whatsapp', w, 'calls', c, 'enrol', en, 'people', p) order by b + w + c + en desc)
    from (select coalesce(brand, 'Lashes by Shazz') brand,
            count(*) filter (where name in ('book_click', 'book_link_open')) b,
            count(*) filter (where name = 'whatsapp_click') w,
            count(*) filter (where name = 'phone_click') c,
            count(*) filter (where name = 'enrol_click') en,
            count(distinct person_id) p
          from events where name <> 'page_view' and created_at >= v_from and created_at < v_to
          group by 1) x
  ), '[]'::jsonb));

  -- lash technicians: booking presses on the site + /book/<name> links opened from Instagram, WhatsApp...
  out := out || jsonb_build_object('techs', coalesce((
    select jsonb_agg(jsonb_build_object('tech', tech, 'branch', branch, 'clicks', n, 'from_site', s, 'from_links', l, 'people', p) order by n desc)
    from (select tech, max(branch) branch, count(*) n,
            count(*) filter (where name = 'book_click') s,
            count(*) filter (where name = 'book_link_open') l,
            count(distinct person_id) p
          from events where name in ('book_click', 'book_link_open') and tech is not null and created_at >= v_from and created_at < v_to
          group by tech) x
  ), '[]'::jsonb));

  -- branches
  out := out || jsonb_build_object('branches', coalesce((
    select jsonb_agg(jsonb_build_object('branch', branch, 'bookings', b, 'calls', c, 'whatsapp', w, 'directions', d) order by b + c + w desc)
    from (select branch,
            count(*) filter (where name in ('book_click', 'book_link_open')) b,
            count(*) filter (where name = 'phone_click') c,
            count(*) filter (where name = 'whatsapp_click') w,
            count(*) filter (where name = 'directions_click') d
          from events where branch is not null and created_at >= v_from and created_at < v_to
          group by branch) x
  ), '[]'::jsonb));

  -- lash sets and courses people pressed Book / Enrol on
  out := out || jsonb_build_object('services', coalesce((
    select jsonb_agg(jsonb_build_object('service', service, 'kind', kind, 'clicks', n, 'people', p) order by n desc)
    from (select service, case when name = 'enrol_click' then 'course' else 'lash set' end kind, count(*) n, count(distinct person_id) p
          from events where service is not null and name in ('book_click', 'enrol_click', 'whatsapp_click') and created_at >= v_from and created_at < v_to
          group by 1, 2 order by 3 desc limit 20) x
  ), '[]'::jsonb));

  -- academy: page views and enrol presses
  out := out || jsonb_build_object('academy', jsonb_build_object(
    'page_views', (select count(*) from events where name = 'page_view' and (path = '/training' or path like '/how-to-become%') and created_at >= v_from and created_at < v_to),
    'people', (select count(distinct person_id) from events where name = 'page_view' and (path = '/training' or path like '/how-to-become%') and created_at >= v_from and created_at < v_to),
    'enrol_clicks', (select count(*) from events where (name = 'enrol_click' or (brand = 'Academy' and name in ('whatsapp_click', 'phone_click'))) and created_at >= v_from and created_at < v_to),
    'lashtribe_clicks', (select count(*) from events where name = 'shop_click' and path = '/training' and created_at >= v_from and created_at < v_to)
  ));

  -- pages, with people
  out := out || jsonb_build_object('pages', coalesce((
    select jsonb_agg(jsonb_build_object('path', r.path, 'label', page_label(r.path), 'views', r.views, 'visitors', r.visitors,
             'contacts', r.contacts) order by r.views desc)
    from (
      select path, count(*) filter (where name = 'page_view') views,
        count(distinct coalesce(person_id, 'v:' || visitor_id)) filter (where name = 'page_view') visitors,
        count(*) filter (where name = any(contact_names)) contacts
      from events where created_at >= v_from and created_at < v_to and path is not null and path not like '/book/%'
      group by path order by 2 desc limit 30
    ) r
  ), '[]'::jsonb));

  -- where visits come from (the first thing in each visit decides)
  out := out || jsonb_build_object('sources', coalesce((
    with first_ev as (
      select distinct on (session_id) session_id, person_id, utm_source, referrer
      from events where created_at >= v_from and created_at < v_to
      order by session_id, created_at
    ),
    sess as (
      select f.*, source_label(f.utm_source, f.referrer) source,
        exists (select 1 from events e where e.session_id = f.session_id and e.name = any(contact_names)) contacted
      from first_ev f
    )
    select jsonb_agg(jsonb_build_object('source', source, 'visits', visits, 'visitors', visitors, 'contacted', contacted) order by visits desc)
    from (select source, count(*) visits, count(distinct person_id) visitors, count(*) filter (where contacted) contacted
          from sess group by source) g
  ), '[]'::jsonb));

  out := out || jsonb_build_object('devices', coalesce((
    select jsonb_object_agg(coalesce(device, 'unknown'), n)
    from (select device, count(distinct coalesce(person_id, 'v:' || visitor_id)) n
          from events where created_at >= v_from and created_at < v_to group by device) x
  ), '{}'::jsonb));

  out := out || jsonb_build_object('locations', coalesce((
    select jsonb_agg(jsonb_build_object('city', city, 'country', country, 'people', p) order by p desc)
    from (select coalesce(city, 'Unknown') city, coalesce(country, '') country, count(distinct coalesce(person_id, 'v:' || visitor_id)) p
          from events where created_at >= v_from and created_at < v_to
          group by 1, 2 order by 3 desc limit 15) x
  ), '[]'::jsonb));

  out := out || jsonb_build_object('hours', (
    select jsonb_agg(coalesce(x.n, 0) order by h)
    from generate_series(0, 23) h
    left join (select extract(hour from created_at at time zone 'Africa/Nairobi')::int hr, count(*) n
               from events where name = 'page_view' and created_at >= v_from and created_at < v_to group by 1) x on x.hr = h
  ));

  out := out || jsonb_build_object('campaigns', coalesce((
    select jsonb_agg(jsonb_build_object('campaign', coalesce(utm_campaign, '(no campaign name)'), 'source', concat_ws(' / ', utm_source, utm_medium),
             'visits', v, 'people', p) order by v desc)
    from (select utm_campaign, utm_source, utm_medium, count(distinct session_id) v, count(distinct person_id) p
          from events where utm_source is not null and created_at >= v_from and created_at < v_to
          group by 1, 2, 3 order by 4 desc limit 15) x
  ), '[]'::jsonb));

  out := out || jsonb_build_object('recent', coalesce((
    select jsonb_agg(to_jsonb(r) order by r.at desc)
    from (
      select e.created_at at, e.name, e.device, e.city, e.label, e.tech, e.branch, e.service, e.brand,
        page_label(e.path) page, source_label(e.utm_source, e.referrer) source
      from events e
      where e.created_at >= v_from and e.created_at < v_to
      order by e.created_at desc
      limit 40
    ) r
  ), '[]'::jsonb));

  return out;
end;
$$;
revoke all on function public.lbs_admin_analytics(timestamptz, timestamptz) from public, anon;
grant execute on function public.lbs_admin_analytics(timestamptz, timestamptz) to authenticated;

-- ---------------------------------------------------------------------
-- Keep it small: raw events older than 180 days are deleted daily
-- ---------------------------------------------------------------------
create or replace function lashesbyshazz.purge()
returns void
language sql
security definer
set search_path = lashesbyshazz
as $$
  delete from lashesbyshazz.events where created_at < now() - interval '180 days';
  delete from lashesbyshazz.visitors where last_seen < now() - interval '180 days';
$$;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    begin
      perform cron.unschedule('lashesbyshazz-analytics-purge');
    exception when others then null;
    end;
    perform cron.schedule('lashesbyshazz-analytics-purge', '41 2 * * *', 'select lashesbyshazz.purge()');
  end if;
end $$;
