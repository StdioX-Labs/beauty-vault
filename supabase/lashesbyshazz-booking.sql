-- Lashes by Shazz online booking (lashesbyshazz.com/book)
-- ----------------------------------------------------------------------------------------------
-- Clients, bookings, their status history, health answers, unfinished attempts and offers.
-- Everything lives in the "lashesbyshazz" schema. The tables are locked: the website can only call
-- the public.lbs_book_* functions below, which check every input and never hand out client lists,
-- health answers or emails. Staff and /admin screens will read the tables through signed-in
-- functions later (phase 3 and 5 of the plan).
--
-- Safe to run more than once. Run it in the Lash Tribe Supabase SQL editor (same project as the analytics,
-- lashesbyshazz-analytics.sql). lib/booking/config.ts already points there.
-- ----------------------------------------------------------------------------------------------

create schema if not exists lashesbyshazz;
create extension if not exists btree_gist with schema extensions;

-- ---------- reference data ----------

create table if not exists lashesbyshazz.branches (
  id smallint primary key,
  slug text unique not null,
  name text not null,
  address text,
  phone text,
  whatsapp text,
  maps_url text,
  open_days smallint[] not null default '{1,2,3,4,5,6}',   -- 0 = Sunday ... 6 = Saturday
  opens time not null default '08:00',
  closes time not null default '20:00',
  active boolean not null default true
);

create table if not exists lashesbyshazz.staff (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,               -- lashesbyshazz.com/book/<slug>
  name text not null,
  branch_id smallint not null references lashesbyshazz.branches(id),
  odoo_staff_id integer,
  specialty text,
  photo_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists lashesbyshazz.services (
  slug text primary key,                   -- /book?service=<slug>
  name text not null,
  category text not null,                  -- uv | normal | refill | brows | removal
  price integer not null,                  -- KES, VAT included
  duration_min integer not null,
  fee integer not null default 500,        -- booking fee paid up front
  refill_of text,                          -- for refills: the full set it refills
  active boolean not null default true,
  sort integer not null default 0,
  odoo_service_id integer
);

-- One row per campaign. Live when active and now() is between starts_at and ends_at.
create table if not exists lashesbyshazz.offers (
  code text primary key,                   -- /book?campaign=<code>
  name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  services text[] not null default '{}',   -- affected service slugs (empty = all)
  prices jsonb not null default '{}',      -- {"uv-classic": 3500} campaign prices
  extra text,                              -- an included extra instead of / as well as a price
  theme text,                              -- e.g. 'midnight'
  banner text,
  segment text,                            -- later: target a client segment
  public boolean not null default true,    -- false = only via its link
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists lashesbyshazz.settings (
  key text primary key,
  value text not null
);

-- Videos (and photos) of each lash set on real clients, shown square in the "See the look" sheet on /book.
-- Upload the file to Supabase Storage (a public bucket, e.g. "lbs-media") and paste its public URL here.
-- set_key: classic | hybrid | volume | mega-volume. category: 'uv', 'normal', or null for both.
create table if not exists lashesbyshazz.set_media (
  id bigint generated always as identity primary key,
  set_key text not null check (set_key in ('classic', 'hybrid', 'volume', 'mega-volume')),
  category text check (category in ('uv', 'normal')),
  kind text not null default 'video' check (kind in ('video', 'image')),
  url text not null check (url ~ '^https://'),
  poster text check (poster is null or poster ~ '^https://'),
  caption text,
  sort smallint not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table lashesbyshazz.set_media enable row level security;
revoke all on lashesbyshazz.set_media from anon, authenticated;

-- ---------- clients and bookings ----------

create table if not exists lashesbyshazz.clients (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,              -- 2547XXXXXXXX, her identity
  name text,
  email text,
  heard_from text,                         -- asked once, first booking
  referred_by text,
  acquired_source jsonb,                   -- utm/click ids of her first booking
  marketing_opt_in boolean not null default false,
  first_visit date,
  last_visit date,
  visit_count integer not null default 0,
  total_spend integer not null default 0,
  favourite_staff uuid references lashesbyshazz.staff(id),
  favourite_branch smallint references lashesbyshazz.branches(id),
  current_lash text,                       -- service slug of her current set
  refill_due date,
  lapse_date date,
  no_show_count integer not null default 0,
  late_cancel_count integer not null default 0,
  tags text[] not null default '{}',
  odoo_partner_id integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lashesbyshazz.bookings (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,
  client_id uuid not null references lashesbyshazz.clients(id),
  branch_id smallint not null references lashesbyshazz.branches(id),
  staff_id uuid references lashesbyshazz.staff(id),
  staff_choice text not null default 'next',   -- next | tech | rebook
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'requested',
  -- requested | pending_deposit | confirmed | reminded | checked_in | completed
  -- | cancelled_client | cancelled_salon | rescheduled | no_show
  channel text not null default 'website',    -- website | tech_link | reception_phone | reception_walkin | tech_device
  total integer not null,
  fee integer not null,
  balance integer not null,
  deposit_paid integer not null default 0,
  mpesa_checkout_id text,
  mpesa_receipt text,
  offer_code text references lashesbyshazz.offers(code),
  source jsonb not null default '{}',         -- utm_*, gclid, fbclid, ttclid, landing, referrer, tech link
  lock_refill boolean not null default false,
  refill_hold_on date,
  notes text,
  odoo_event_id integer,
  created_by text not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lbs_booking_time check (ends_at > starts_at)
);

-- No tech can be double-booked while a booking is live.
do $$ begin
  alter table lashesbyshazz.bookings add constraint lbs_no_double_booking
    exclude using gist (staff_id with =, tstzrange(starts_at, ends_at) with &&)
    where (staff_id is not null and status in ('requested', 'pending_deposit', 'confirmed', 'reminded', 'checked_in'));
exception when duplicate_object or duplicate_table then null;
end $$;

create index if not exists lbs_bookings_branch_time on lashesbyshazz.bookings (branch_id, starts_at);
create index if not exists lbs_bookings_client on lashesbyshazz.bookings (client_id, starts_at desc);

create table if not exists lashesbyshazz.booking_items (
  id bigint generated always as identity primary key,
  booking_id uuid not null references lashesbyshazz.bookings(id) on delete cascade,
  service_slug text not null references lashesbyshazz.services(slug),
  name text not null,
  price integer not null,                  -- the price at the moment of booking
  list_price integer not null,
  duration_min integer not null
);

-- Every change of status, with when and who.
create table if not exists lashesbyshazz.booking_events (
  id bigint generated always as identity primary key,
  booking_id uuid not null references lashesbyshazz.bookings(id) on delete cascade,
  status text not null,
  note text,
  by_who text not null default 'client',
  created_at timestamptz not null default now()
);

-- Health answers: sensitive data (Kenya Data Protection Act 2019). Kept apart, on the appointment only.
create table if not exists lashesbyshazz.booking_health (
  booking_id uuid primary key references lashesbyshazz.bookings(id) on delete cascade,
  answers jsonb not null,
  consent_at timestamptz not null default now()
);

-- Unfinished bookings: saved step by step, so /admin sees where people drop off and they can be followed up.
create table if not exists lashesbyshazz.booking_attempts (
  session_id text primary key,
  phone text,
  client_id uuid references lashesbyshazz.clients(id),
  name text,
  step text not null,
  cart text[] not null default '{}',
  branch_id smallint,
  staff_slug text,
  starts_at timestamptz,
  source jsonb not null default '{}',
  booking_id uuid references lashesbyshazz.bookings(id),
  nudged_at timestamptz,
  nudge_count smallint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists lbs_attempts_open on lashesbyshazz.booking_attempts (updated_at) where booking_id is null and phone is not null;

-- Lock everything: only the functions below (security definer) touch these tables.
do $$ declare t text; begin
  foreach t in array array['branches','staff','services','offers','settings','clients','bookings',
                           'booking_items','booking_events','booking_health','booking_attempts'] loop
    execute format('alter table lashesbyshazz.%I enable row level security', t);
    execute format('revoke all on lashesbyshazz.%I from anon, authenticated', t);
  end loop;
end $$;

-- ---------- seed: branches, techs, services (newest prices, VAT included) ----------

insert into lashesbyshazz.branches (id, slug, name, address, phone, whatsapp) values
  (1, 'cbd', 'CBD', 'Absa Towers, Lower Ground (Loita Street)', '+254792066140', '254792066140'),
  (2, 'hurlingham', 'Hurlingham', 'Silverpool Suite, Jabavu Lane', '+254769781771', '254769781771')
on conflict (id) do update set slug = excluded.slug, name = excluded.name, address = excluded.address,
  phone = excluded.phone, whatsapp = excluded.whatsapp;

insert into lashesbyshazz.staff (slug, name, branch_id, odoo_staff_id, specialty, photo_url) values
  ('ann', 'Ann Njoroge', 1, 1, 'UV lash tech', '/team/ann-njoroge.webp'),
  ('dan', 'Dan Osiya', 1, 56, 'UV lash tech', '/team/dan-osiya.webp'),
  ('elizabeth', 'Elizabeth Nyakio', 1, 2, 'UV lash tech', '/team/elizabeth-nyakio.webp'),
  ('linda', 'Linda Makena', 1, 3, 'UV lash tech', '/team/linda-makena.webp'),
  ('nereah', 'Nereah Adhiambo', 1, 57, 'UV lash tech', '/team/nereah-adhiambo.webp'),
  ('oscar', 'Oscar Otieno', 1, 72, 'UV lash tech', '/team/oscar-otieno.webp'),
  ('ritah', 'Ritah Wainaina', 1, 4, 'UV lash tech', '/team/ritah-wainaina.webp'),
  ('sarah', 'Sarah Kemunto', 1, 6, 'UV lash tech', '/team/sarah-kemunto.webp'),
  ('anelka', 'Anelka Munyeshaka', 2, 8, 'UV lash tech', '/team/anelka-munyeshaka.webp'),
  ('ashley', 'Ashley Moraa', 2, 9, 'UV lash tech', '/team/ashley-moraa.webp'),
  ('bridget', 'Bridget Nyatichi', 2, 10, 'UV lash tech', '/team/bridget-nyatichi.webp'),
  ('caroline', 'Caroline Juma', 2, 12, 'UV lash tech', '/team/caroline-juma.webp'),
  ('dorothy', 'Dorothy Savai', 2, 13, 'UV lash tech', '/team/dorothy-savai.webp'),
  ('evelyne', 'Evelyne Kaulio', 2, 187, 'UV lash tech', '/team/evelyne-kaulio.webp'),
  ('harriet', 'Harriet Akinyi', 2, 68, 'UV lash tech', '/team/harriet-akinyi.webp'),
  ('mercy', 'Mercy Nyanchama', 2, 15, 'UV lash tech', '/team/mercy-nyanchama.webp'),
  ('paulette', 'Paulette Otieno', 2, 16, 'UV lash tech', '/team/paulette-otieno.webp'),
  ('ronald', 'Ronald Ochieng', 2, 17, 'UV lash tech', '/team/ronald-ochieng.webp'),
  ('ruth', 'Ruth Wairimu', 2, 5, 'UV lash tech', '/team/ruth-wairimu.webp'),
  ('sharon-nyambura', 'Sharon Nyambura', 2, 18, 'UV lash tech', '/team/sharon-nyambura.webp')
on conflict (slug) do update set name = excluded.name, branch_id = excluded.branch_id,
  odoo_staff_id = excluded.odoo_staff_id, photo_url = excluded.photo_url;

-- Durations are estimates until the team confirms them (Odoo shows 1.5h for every lash service).
insert into lashesbyshazz.services (slug, name, category, price, duration_min, fee, refill_of, sort) values
  ('uv-classic',          'UV Classic Set',              'uv',      4060, 120,  500, null, 10),
  ('uv-hybrid',           'UV Hybrid Set',               'uv',      5220, 150,  500, null, 11),
  ('uv-volume',           'UV Volume Set',               'uv',      6380, 150,  500, null, 12),
  ('uv-mega-volume',      'UV Mega Volume Set',          'uv',      7540, 180,  500, null, 13),
  ('classic',             'Classic Set',                 'normal',  2900, 120,  500, null, 20),
  ('hybrid',              'Hybrid Set',                  'normal',  4060, 150,  500, null, 21),
  ('volume',              'Volume Set',                  'normal',  5220, 150,  500, null, 22),
  ('mega-volume',         'Mega Volume Set',             'normal',  6380, 180,  500, null, 23),
  ('uv-classic-refill',   'UV Classic Refill',           'refill',  2900,  90,  500, 'uv-classic', 30),
  ('uv-hybrid-refill',    'UV Hybrid Refill',            'refill',  4060,  90,  500, 'uv-hybrid', 31),
  ('uv-volume-refill',    'UV Volume Refill',            'refill',  5220, 120,  500, 'uv-volume', 32),
  ('uv-mega-volume-refill','UV Mega Volume Refill',      'refill',  6380, 120,  500, 'uv-mega-volume', 33),
  ('classic-refill',      'Classic Refill',              'refill',  2320,  90,  500, 'classic', 34),
  ('hybrid-refill',       'Hybrid Refill',               'refill',  3480,  90,  500, 'hybrid', 35),
  ('volume-refill',       'Volume Refill',               'refill',  4640, 120,  500, 'volume', 36),
  ('mega-volume-refill',  'Mega Volume Refill',          'refill',  5800, 120,  500, 'mega-volume', 37),
  ('microshading',        'Microshading / Microblading', 'brows',  15000, 120, 2500, null, 40),
  ('lash-removal',        'Lash Removal',                'removal', 1160,  30,  500, null, 50)
on conflict (slug) do nothing;   -- prices edited in the database are kept on re-run

-- ---------- helpers ----------

create or replace function lashesbyshazz.norm_phone(p text) returns text
language sql immutable set search_path = '' as $$
  select case
    when d ~ '^0[17]\d{8}$' then '254' || substr(d, 2)
    when d ~ '^[17]\d{8}$' then '254' || d
    when d ~ '^254[17]\d{8}$' then d
  end
  from (select regexp_replace(coalesce(p, ''), '\D', '', 'g') d) x;
$$;

create or replace function lashesbyshazz.clean(p text, n int) returns text
language sql immutable set search_path = '' as $$
  select nullif(left(trim(regexp_replace(coalesce(p, ''), '[\u0000-\u001f<>]', '', 'g')), n), '');
$$;

-- Source fields kept from the page (utm, click ids, landing page, tech link).
create or replace function lashesbyshazz.clean_source(p jsonb) returns jsonb
language sql immutable set search_path = '' as $$
  select coalesce(jsonb_object_agg(k, left(p->>k, 200)) filter (where p ? k and coalesce(p->>k, '') <> ''), '{}'::jsonb)
  from unnest(array['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','ttclid',
                    'landing','referrer','tech_link','campaign','visitor_id','looked','first_time','watched']) k
  where jsonb_typeof(p) = 'object';
$$;

-- ---------- public functions (called by the site's /api/book routes) ----------

-- Busy times (no client details), active techs, live prices and live offers.
drop function if exists public.lbs_book_availability(smallint, date, int);
create or replace function public.lbs_book_availability(p_branch int default null, p_from date default null, p_days int default 21)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  v_from date := greatest(coalesce(p_from, (now() at time zone 'Africa/Nairobi')::date), (now() at time zone 'Africa/Nairobi')::date);
  v_to timestamptz;
begin
  v_to := ((v_from + least(greatest(coalesce(p_days, 21), 1), 62)) :: timestamp) at time zone 'Africa/Nairobi';
  return jsonb_build_object(
    'busy', coalesce((
      select jsonb_agg(jsonb_build_object('staff', s.slug, 'start', b.starts_at, 'end', b.ends_at))
      from lashesbyshazz.bookings b join lashesbyshazz.staff s on s.id = b.staff_id
      where b.status in ('requested', 'pending_deposit', 'confirmed', 'reminded', 'checked_in')
        and b.ends_at > now() and b.starts_at < v_to
        and (p_branch is null or b.branch_id = p_branch)), '[]'::jsonb),
    'staff', coalesce((
      select jsonb_agg(jsonb_build_object('slug', slug, 'branch', branch_id) order by name)
      from lashesbyshazz.staff where active and (p_branch is null or branch_id = p_branch)), '[]'::jsonb),
    'branches', coalesce((
      select jsonb_agg(jsonb_build_object('id', id, 'days', open_days, 'opens', to_char(opens, 'HH24:MI'), 'closes', to_char(closes, 'HH24:MI')))
      from lashesbyshazz.branches where active), '[]'::jsonb),
    'services', coalesce((
      select jsonb_agg(jsonb_build_object('slug', slug, 'price', price, 'duration', duration_min, 'fee', fee, 'active', active))
      from lashesbyshazz.services), '[]'::jsonb),
    'offers', coalesce((
      select jsonb_agg(jsonb_build_object('code', code, 'name', name, 'ends_at', ends_at, 'services', services,
                                          'prices', prices, 'extra', extra, 'theme', theme, 'banner', banner, 'public', public))
      from lashesbyshazz.offers where active and now() between starts_at and ends_at), '[]'::jsonb),
    'media', coalesce((
      select jsonb_agg(jsonb_build_object('set', set_key, 'category', category, 'kind', kind, 'url', url,
                                          'poster', poster, 'caption', caption) order by set_key, sort, id)
      from lashesbyshazz.set_media where active), '[]'::jsonb),
    'verify_phone', coalesce((select value = 'on' from lashesbyshazz.settings where key = 'phone_verification'), false)
  );
end $$;

-- Save how far someone got. When a phone number is given, says whether she has booked before
-- (first name and last tech only: nothing else is ever returned to the page).
create or replace function public.lbs_book_track(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_session text := lashesbyshazz.clean(p->>'session_id', 64);
  v_phone text := lashesbyshazz.norm_phone(p->>'phone');
  v_client lashesbyshazz.clients;
  v_last record;
  v_cart text[];
begin
  if v_session is null or length(v_session) < 8 then return '{}'::jsonb; end if;
  if jsonb_typeof(p->'cart') = 'array' then
    select coalesce(array_agg(left(x, 40)), '{}') into v_cart from jsonb_array_elements_text(p->'cart') x limit 6;
  end if;

  if v_phone is not null then
    select * into v_client from lashesbyshazz.clients where phone = v_phone;
  end if;

  insert into lashesbyshazz.booking_attempts as a (session_id, phone, client_id, name, step, cart, branch_id, staff_slug, starts_at, source)
  values (v_session, v_phone, v_client.id, lashesbyshazz.clean(p->>'name', 80), coalesce(lashesbyshazz.clean(p->>'step', 20), 'service'),
          coalesce(v_cart, '{}'), nullif(p->>'branch', '')::smallint, lashesbyshazz.clean(p->>'staff', 40),
          case when coalesce(p->>'starts_at', '') <> '' then (p->>'starts_at')::timestamptz end,
          lashesbyshazz.clean_source(p->'source'))
  on conflict (session_id) do update set
    phone = coalesce(excluded.phone, a.phone),
    client_id = coalesce(excluded.client_id, a.client_id),
    name = coalesce(excluded.name, a.name),
    step = excluded.step,
    cart = case when cardinality(excluded.cart) > 0 then excluded.cart else a.cart end,
    branch_id = coalesce(excluded.branch_id, a.branch_id),
    staff_slug = coalesce(excluded.staff_slug, a.staff_slug),
    starts_at = coalesce(excluded.starts_at, a.starts_at),
    source = a.source || excluded.source,
    updated_at = now()
  where a.booking_id is null;

  if v_client.id is null then return jsonb_build_object('returning', false); end if;
  select s.slug, s.name, b.branch_id into v_last
    from lashesbyshazz.bookings b left join lashesbyshazz.staff s on s.id = b.staff_id
   where b.client_id = v_client.id and b.status not in ('cancelled_salon')
   order by b.starts_at desc limit 1;
  return jsonb_build_object(
    'returning', true,
    'first_name', split_part(coalesce(v_client.name, ''), ' ', 1),
    'last_staff', v_last.slug,
    'last_staff_name', split_part(coalesce(v_last.name, ''), ' ', 1),
    'last_branch', v_last.branch_id,
    'asked_heard', v_client.heard_from is not null
  );
exception when invalid_text_representation or invalid_datetime_format or datetime_field_overflow then
  return '{}'::jsonb;
end $$;

-- Create a booking. Prices, durations, hours and the tech's free time are all checked here.
create or replace function public.lbs_book_create(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_phone text := lashesbyshazz.norm_phone(p->>'phone');
  v_name text := lashesbyshazz.clean(p->>'name', 80);
  v_email text := lower(lashesbyshazz.clean(p->>'email', 120));
  v_branch lashesbyshazz.branches;
  v_start timestamptz;
  v_end timestamptz;
  v_local timestamp;
  v_slugs text[];
  v_items jsonb := '[]';
  v_offer lashesbyshazz.offers;
  v_total int := 0; v_fee int := 0; v_dur int := 0; v_lash int := 0;
  v_staff lashesbyshazz.staff;
  v_choice text := case when coalesce(p->>'staff', '') = '' then 'next' else 'tech' end;
  v_client uuid;
  v_new_client boolean := false;
  v_booking uuid;
  v_ref text;
  v_status text := case when p->>'payment' = 'mpesa' then 'pending_deposit' else 'requested' end;
  v_channel text := case when p->>'channel' in ('website', 'tech_link') then p->>'channel' else 'website' end;
  v_source jsonb := lashesbyshazz.clean_source(p->'source');
  r record;
begin
  if v_phone is null then return jsonb_build_object('ok', false, 'error', 'phone'); end if;
  if v_name is null or length(v_name) < 2 then return jsonb_build_object('ok', false, 'error', 'name'); end if;
  if v_email is null or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then return jsonb_build_object('ok', false, 'error', 'email'); end if;
  -- Phone verification (lashesbyshazz.settings 'phone_verification' = 'on'): the number must have been
  -- confirmed with a code in this visit, or on this device before (a remembered device token).
  if coalesce((select value = 'on' from lashesbyshazz.settings where key = 'phone_verification'), false)
     and not lashesbyshazz.phone_verified(v_phone, p->>'session_id', p->>'verify_token') then
    return jsonb_build_object('ok', false, 'error', 'verify');
  end if;

  select * into v_branch from lashesbyshazz.branches where id = nullif(p->>'branch', '')::smallint and active;
  if v_branch.id is null then return jsonb_build_object('ok', false, 'error', 'branch'); end if;

  v_start := (p->>'starts_at')::timestamptz;
  if v_start < now() + interval '30 minutes' or v_start > now() + interval '90 days' then
    return jsonb_build_object('ok', false, 'error', 'time');
  end if;

  -- services and prices (a live campaign price wins when its code came with the booking or it is public)
  if jsonb_typeof(p->'cart') <> 'array' then return jsonb_build_object('ok', false, 'error', 'cart'); end if;
  select array_agg(distinct x) into v_slugs from jsonb_array_elements_text(p->'cart') x;
  if coalesce(cardinality(v_slugs), 0) = 0 or cardinality(v_slugs) > 4 then return jsonb_build_object('ok', false, 'error', 'cart'); end if;

  select * into v_offer from lashesbyshazz.offers o
   where o.active and now() between o.starts_at and o.ends_at
     and (o.public or o.code = lashesbyshazz.clean(p->>'campaign', 60))
   order by (o.code = lashesbyshazz.clean(p->>'campaign', 60)) desc nulls last, o.ends_at limit 1;

  for r in select s.* from lashesbyshazz.services s where s.slug = any(v_slugs) and s.active order by s.sort loop
    declare v_price int := r.price; begin
      if v_offer.code is not null and (cardinality(v_offer.services) = 0 or r.slug = any(v_offer.services))
         and (v_offer.prices ? r.slug) then
        v_price := least(r.price, (v_offer.prices->>r.slug)::int);
      end if;
      v_items := v_items || jsonb_build_object('slug', r.slug, 'name', r.name, 'price', v_price, 'list', r.price, 'dur', r.duration_min);
      v_total := v_total + v_price;
      v_fee := greatest(v_fee, r.fee);
      v_dur := v_dur + r.duration_min;
      if r.category in ('uv', 'normal', 'refill') then v_lash := v_lash + 1; end if;
    end;
  end loop;
  if jsonb_array_length(v_items) <> cardinality(v_slugs) then return jsonb_build_object('ok', false, 'error', 'cart'); end if;
  if v_lash > 1 then return jsonb_build_object('ok', false, 'error', 'cart'); end if;

  -- opening hours, in Nairobi time
  v_end := v_start + make_interval(mins => v_dur);
  v_local := v_start at time zone 'Africa/Nairobi';
  if not (extract(dow from v_local)::smallint = any(v_branch.open_days))
     or v_local::time < v_branch.opens
     or (v_end at time zone 'Africa/Nairobi')::time > v_branch.closes
     or (v_end at time zone 'Africa/Nairobi')::date <> v_local::date then
    return jsonb_build_object('ok', false, 'error', 'hours');
  end if;

  -- one booking at a time per branch while choosing the tech
  perform pg_advisory_xact_lock(hashtext('lbs-book-' || v_branch.id));

  if v_choice = 'tech' then
    select * into v_staff from lashesbyshazz.staff
     where slug = lashesbyshazz.clean(p->>'staff', 40) and branch_id = v_branch.id and active;
    if v_staff.id is null then return jsonb_build_object('ok', false, 'error', 'staff'); end if;
    if exists (select 1 from lashesbyshazz.bookings b where b.staff_id = v_staff.id
                and b.status in ('requested', 'pending_deposit', 'confirmed', 'reminded', 'checked_in')
                and tstzrange(b.starts_at, b.ends_at) && tstzrange(v_start, v_end)) then
      return jsonb_build_object('ok', false, 'error', 'taken');
    end if;
  else
    -- next available: the free tech with the lightest day
    select s.* into v_staff from lashesbyshazz.staff s
     where s.branch_id = v_branch.id and s.active
       and not exists (select 1 from lashesbyshazz.bookings b where b.staff_id = s.id
                        and b.status in ('requested', 'pending_deposit', 'confirmed', 'reminded', 'checked_in')
                        and tstzrange(b.starts_at, b.ends_at) && tstzrange(v_start, v_end))
     order by (select count(*) from lashesbyshazz.bookings b where b.staff_id = s.id
                and (b.starts_at at time zone 'Africa/Nairobi')::date = v_local::date
                and b.status in ('requested', 'pending_deposit', 'confirmed', 'reminded', 'checked_in')), random()
     limit 1;
    if v_staff.id is null then return jsonb_build_object('ok', false, 'error', 'taken'); end if;
  end if;

  -- client profile, matched by phone
  select id into v_client from lashesbyshazz.clients where phone = v_phone;
  if v_client is null then
    v_new_client := true;
    insert into lashesbyshazz.clients (phone, name, email, heard_from, referred_by, acquired_source, marketing_opt_in)
    values (v_phone, v_name, v_email, lashesbyshazz.clean(p->>'heard_from', 40), lashesbyshazz.clean(p->>'referred_by', 80),
            v_source, coalesce((p->>'marketing_opt_in')::boolean, false))
    returning id into v_client;
  else
    update lashesbyshazz.clients set
      name = coalesce(v_name, name),
      email = coalesce(v_email, email),
      heard_from = coalesce(heard_from, lashesbyshazz.clean(p->>'heard_from', 40)),
      referred_by = coalesce(referred_by, lashesbyshazz.clean(p->>'referred_by', 80)),
      marketing_opt_in = marketing_opt_in or coalesce((p->>'marketing_opt_in')::boolean, false),
      updated_at = now()
    where id = v_client;
  end if;

  v_ref := 'LBS-' || upper(substr(translate(encode(extensions.gen_random_bytes(6), 'base64'), '+/=0O1Il', ''), 1, 6));

  insert into lashesbyshazz.bookings (ref, client_id, branch_id, staff_id, staff_choice, starts_at, ends_at, status, channel,
                                      total, fee, balance, offer_code, source, lock_refill, refill_hold_on)
  values (v_ref, v_client, v_branch.id, v_staff.id,
          case when v_choice = 'tech' and coalesce((p->>'rebook')::boolean, false) then 'rebook' else v_choice end,
          v_start, v_end, v_status, v_channel, v_total, v_fee, v_total - v_fee, v_offer.code, v_source,
          coalesce((p->>'lock_refill')::boolean, false),
          case when coalesce((p->>'lock_refill')::boolean, false) then (v_local + interval '16 days')::date end)
  returning id into v_booking;

  insert into lashesbyshazz.booking_items (booking_id, service_slug, name, price, list_price, duration_min)
  select v_booking, i->>'slug', i->>'name', (i->>'price')::int, (i->>'list')::int, (i->>'dur')::int
    from jsonb_array_elements(v_items) i;

  insert into lashesbyshazz.booking_events (booking_id, status, by_who) values (v_booking, v_status, 'client');

  if jsonb_typeof(p->'health') = 'object' and coalesce((p->>'health_consent')::boolean, false) then
    insert into lashesbyshazz.booking_health (booking_id, answers) values (v_booking, p->'health');
  end if;

  update lashesbyshazz.booking_attempts set booking_id = v_booking, step = 'booked', client_id = v_client, updated_at = now()
   where session_id = lashesbyshazz.clean(p->>'session_id', 64);

  return jsonb_build_object(
    'ok', true, 'ref', v_ref, 'status', v_status, 'new_client', v_new_client,
    'staff', v_staff.slug, 'staff_name', v_staff.name, 'staff_photo', v_staff.photo_url,
    'branch', v_branch.id, 'starts_at', v_start, 'ends_at', v_end,
    'items', v_items, 'total', v_total, 'fee', v_fee, 'balance', v_total - v_fee,
    'offer', v_offer.code
  );
exception
  when exclusion_violation then return jsonb_build_object('ok', false, 'error', 'taken');
  when invalid_text_representation or invalid_datetime_format or datetime_field_overflow or numeric_value_out_of_range then
    return jsonb_build_object('ok', false, 'error', 'input');
end $$;

-- The site keeps the M-Pesa request id on the booking, then the payment callback marks it paid.
-- Both need the shared secret in lashesbyshazz.settings ('server_secret'), which only the site's server holds.
create or replace function public.lbs_book_payment(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_secret text;
  v_b lashesbyshazz.bookings;
begin
  select value into v_secret from lashesbyshazz.settings where key = 'server_secret';
  if v_secret is null or coalesce(p->>'secret', '') <> v_secret then return jsonb_build_object('ok', false); end if;

  if p->>'action' = 'checkout' then
    update lashesbyshazz.bookings set mpesa_checkout_id = left(p->>'checkout_id', 80), updated_at = now()
     where ref = p->>'ref' returning * into v_b;
  elsif p->>'action' = 'paid' then
    update lashesbyshazz.bookings set status = 'confirmed', deposit_paid = coalesce((p->>'amount')::int, fee),
           mpesa_receipt = left(p->>'receipt', 40), updated_at = now()
     where mpesa_checkout_id = p->>'checkout_id' and status = 'pending_deposit' returning * into v_b;
    if v_b.id is not null then
      insert into lashesbyshazz.booking_events (booking_id, status, note, by_who) values (v_b.id, 'confirmed', 'M-Pesa ' || coalesce(p->>'receipt', ''), 'mpesa');
    end if;
  elsif p->>'action' = 'failed' then
    select * into v_b from lashesbyshazz.bookings where mpesa_checkout_id = p->>'checkout_id';
    if v_b.id is not null then
      insert into lashesbyshazz.booking_events (booking_id, status, note, by_who) values (v_b.id, 'deposit_failed', left(p->>'reason', 200), 'mpesa');
    end if;
  end if;
  return jsonb_build_object('ok', v_b.id is not null);
end $$;

-- What the confirmation page polls while she approves the M-Pesa prompt. Needs the ref and her phone.
create or replace function public.lbs_book_status(p_ref text, p_phone text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce((
    select jsonb_build_object('status', b.status, 'deposit_paid', b.deposit_paid,
      'failed', exists (select 1 from lashesbyshazz.booking_events e where e.booking_id = b.id and e.status = 'deposit_failed'))
    from lashesbyshazz.bookings b join lashesbyshazz.clients c on c.id = b.client_id
    where b.ref = upper(p_ref) and c.phone = lashesbyshazz.norm_phone(p_phone)), '{}'::jsonb);
$$;

revoke all on function public.lbs_book_availability(int, date, int) from public;
revoke all on function public.lbs_book_track(jsonb) from public;
revoke all on function public.lbs_book_create(jsonb) from public;
revoke all on function public.lbs_book_payment(jsonb) from public;
revoke all on function public.lbs_book_status(text, text) from public;
grant execute on function public.lbs_book_availability(int, date, int) to anon, authenticated;
grant execute on function public.lbs_book_track(jsonb) to anon, authenticated;
grant execute on function public.lbs_book_create(jsonb) to anon, authenticated;
grant execute on function public.lbs_book_payment(jsonb) to anon, authenticated;
grant execute on function public.lbs_book_status(text, text) to anon, authenticated;

-- A random server secret for the payment callback. Copy it into the site's LBS_BOOKING_SECRET setting:
--   select value from lashesbyshazz.settings where key = 'server_secret';
insert into lashesbyshazz.settings (key, value)
values ('server_secret', encode(extensions.gen_random_bytes(24), 'hex'))
on conflict (key) do nothing;

-- ==============================================================================================
-- Client profiles that keep themselves up to date, and the /admin -> Clients data
-- ==============================================================================================
-- Every time a booking is created or its status changes, the client's profile is worked out again
-- from her bookings: visits, spend, favourite tech and branch, current lash, refill due (+14 days),
-- lapse date (+21 days), no-shows and late cancels. Segments (New, Regular, VIP, At risk, Lapsed)
-- depend on today's date, so they are worked out when /admin asks, never stored stale.
-- Only Lash Tribe admins (public.is_academy_admin()) can call the lbs_admin_* functions.

create or replace function lashesbyshazz.refresh_client(p_client uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_last_lash record;
begin
  select b.starts_at, coalesce(sv.refill_of, sv.slug) lash
    into v_last_lash
    from lashesbyshazz.bookings b
    join lashesbyshazz.booking_items i on i.booking_id = b.id
    join lashesbyshazz.services sv on sv.slug = i.service_slug
   where b.client_id = p_client and b.status = 'completed' and sv.category in ('uv', 'normal', 'refill')
   order by b.starts_at desc limit 1;

  update lashesbyshazz.clients c set
    first_visit = x.first_visit,
    last_visit = x.last_visit,
    visit_count = x.visits,
    total_spend = x.spend,
    favourite_staff = x.fav_staff,
    favourite_branch = x.fav_branch,
    current_lash = v_last_lash.lash,
    refill_due = (v_last_lash.starts_at at time zone 'Africa/Nairobi')::date + 14,
    lapse_date = (v_last_lash.starts_at at time zone 'Africa/Nairobi')::date + 21,
    no_show_count = x.no_shows,
    late_cancel_count = x.late_cancels,
    updated_at = now()
  from (
    select
      min((b.starts_at at time zone 'Africa/Nairobi')::date) filter (where b.status = 'completed') first_visit,
      max((b.starts_at at time zone 'Africa/Nairobi')::date) filter (where b.status = 'completed') last_visit,
      count(*) filter (where b.status = 'completed') visits,
      coalesce(sum(b.total) filter (where b.status = 'completed'), 0) spend,
      count(*) filter (where b.status = 'no_show') no_shows,
      count(*) filter (where b.status = 'cancelled_client' and exists (
        select 1 from lashesbyshazz.booking_events e where e.booking_id = b.id and e.status = 'cancelled_client'
          and e.created_at > b.starts_at - interval '24 hours')) late_cancels,
      (select b2.staff_id from lashesbyshazz.bookings b2 where b2.client_id = p_client and b2.status = 'completed' and b2.staff_id is not null
        group by b2.staff_id order by count(*) desc, max(b2.starts_at) desc limit 1) fav_staff,
      (select b2.branch_id from lashesbyshazz.bookings b2 where b2.client_id = p_client and b2.status = 'completed'
        group by b2.branch_id order by count(*) desc, max(b2.starts_at) desc limit 1) fav_branch
    from lashesbyshazz.bookings b where b.client_id = p_client
  ) x
  where c.id = p_client;
end $$;

create or replace function lashesbyshazz.on_booking_change() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  perform lashesbyshazz.refresh_client(new.client_id);
  return new;
end $$;

drop trigger if exists lbs_booking_refresh_client on lashesbyshazz.bookings;
create trigger lbs_booking_refresh_client
  after insert or update of status, total, staff_id, starts_at on lashesbyshazz.bookings
  for each row execute function lashesbyshazz.on_booking_change();

-- Segment rules (change the numbers here):
--   New      = no completed visit yet, or exactly one
--   Regular  = 2 or more visits
--   VIP      = 5 or more visits in the last 12 months
--   At risk  = past her lapse date (21 days after her last lash visit) with nothing booked
--   Lapsed   = no visit for 45 days or more and nothing booked
create or replace function lashesbyshazz.client_segment(c lashesbyshazz.clients) returns text
language sql stable security definer set search_path = '' as $$
  with up as (
    select exists (select 1 from lashesbyshazz.bookings b where b.client_id = c.id and b.starts_at > now()
                   and b.status in ('requested', 'pending_deposit', 'confirmed', 'reminded')) booked,
           (select count(*) from lashesbyshazz.bookings b where b.client_id = c.id and b.status = 'completed'
             and b.starts_at > now() - interval '12 months') visits_12m
  ), today as (select (now() at time zone 'Africa/Nairobi')::date d)
  select case
    when c.last_visit is not null and not up.booked and today.d - c.last_visit >= 45 then 'Lapsed'
    when c.lapse_date is not null and not up.booked and today.d > c.lapse_date then 'At risk'
    when up.visits_12m >= 5 then 'VIP'
    when c.visit_count >= 2 then 'Regular'
    else 'New'
  end
  from up, today;
$$;

-- Everything /admin -> Clients shows for a period, in one call.
create or replace function public.lbs_admin_clients(p_from timestamptz, p_to timestamptz)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  v_from timestamptz := coalesce(p_from, now() - interval '30 days');
  v_to timestamptz := coalesce(p_to, now());
  v_today date := (now() at time zone 'Africa/Nairobi')::date;
  v jsonb;
begin
  if not public.is_academy_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;

  with
  seg as (select c.*, lashesbyshazz.client_segment(c) segment from lashesbyshazz.clients c),
  pb as (  -- bookings in the period, by appointment time
    select b.*, (select string_agg(i.name, ', ' order by i.id) from lashesbyshazz.booking_items i where i.booking_id = b.id) services
    from lashesbyshazz.bookings b where b.starts_at >= v_from and b.starts_at < v_to),
  first_b as (select distinct on (client_id) client_id, id from lashesbyshazz.bookings
              where status = 'completed' order by client_id, starts_at),
  newset as (  -- completed new sets old enough to judge a 21-day return
    select b.id, b.client_id, b.starts_at,
           exists (select 1 from lashesbyshazz.bookings n where n.client_id = b.client_id and n.starts_at > b.starts_at
                   and n.starts_at <= b.starts_at + interval '21 days'
                   and n.status not in ('cancelled_client', 'cancelled_salon', 'no_show')) came_back
    from lashesbyshazz.bookings b
    where b.status = 'completed' and b.starts_at >= v_from and b.starts_at < v_to and b.starts_at <= now() - interval '21 days'
      and exists (select 1 from lashesbyshazz.booking_items i join lashesbyshazz.services s on s.slug = i.service_slug
                  where i.booking_id = b.id and s.category in ('uv', 'normal'))),
  gaps as (
    select extract(epoch from starts_at - lag(starts_at) over (partition by client_id order by starts_at)) / 86400 gap, starts_at
    from lashesbyshazz.bookings where status = 'completed'),
  recent as (
    select client_id, count(*) n from lashesbyshazz.bookings
    where status = 'completed' and starts_at > now() - interval '90 days' group by client_id)
  select jsonb_build_object(
    'from', v_from, 'to', v_to,
    'summary', jsonb_build_object(
      'clients', (select count(*) from lashesbyshazz.clients),
      'new_clients', (select count(*) from lashesbyshazz.clients where created_at >= v_from and created_at < v_to),
      'returning_in_period', (select count(distinct pb.client_id) from pb join lashesbyshazz.clients c on c.id = pb.client_id
                              where c.created_at < v_from and pb.status not in ('cancelled_client', 'cancelled_salon')),
      'bookings', (select count(*) from pb),
      'completed', (select count(*) from pb where status = 'completed'),
      'no_shows', (select count(*) from pb where status = 'no_show'),
      'cancelled', (select count(*) from pb where status in ('cancelled_client', 'cancelled_salon')),
      'revenue', (select coalesce(sum(total), 0) from pb where status = 'completed'),
      'deposits', (select coalesce(sum(deposit_paid), 0) from pb),
      'refills_due_7d', (select count(*) from seg where refill_due between v_today and v_today + 7),
      'at_risk', (select count(*) from seg where segment = 'At risk'),
      'lapsed', (select count(*) from seg where segment = 'Lapsed'),
      'vip', (select count(*) from seg where segment = 'VIP'),
      'opted_in', (select count(*) from lashesbyshazz.clients where marketing_opt_in)),
    'retention', jsonb_build_object(
      'new_sets_judged', (select count(*) from newset),
      'back_within_21', (select count(*) from newset where came_back),
      'active_90', (select count(*) from recent),
      'two_plus_90', (select count(*) from recent where n >= 2),
      'avg_days_between', (select round(avg(gap)::numeric, 1) from gaps where gap is not null and starts_at >= v_from and starts_at < v_to),
      'revenue', (select coalesce(sum(total), 0) from pb where status = 'completed'),
      'repeat_revenue', (select coalesce(sum(pb.total), 0) from pb where pb.status = 'completed'
                          and not exists (select 1 from first_b f where f.id = pb.id)),
      'no_show_rate_base', (select count(*) from pb where status in ('completed', 'no_show')),
      'late_cancels', (select count(*) from pb where status = 'cancelled_client' and exists (
          select 1 from lashesbyshazz.booking_events e where e.booking_id = pb.id and e.status = 'cancelled_client'
            and e.created_at > pb.starts_at - interval '24 hours'))),
    'segments', (select coalesce(jsonb_agg(jsonb_build_object('segment', segment, 'clients', n) order by n desc), '[]')
                 from (select segment, count(*) n from seg group by segment) x),
    'heard_from', (select coalesce(jsonb_agg(jsonb_build_object('label', k, 'clients', n) order by n desc), '[]')
                   from (select coalesce(heard_from, 'Not asked') k, count(*) n from lashesbyshazz.clients
                         where created_at >= v_from and created_at < v_to group by 1) x),
    'sources', (select coalesce(jsonb_agg(jsonb_build_object('source', k, 'clients', n) order by n desc), '[]')
                from (select coalesce(nullif(acquired_source->>'utm_source', ''),
                                      case when acquired_source ? 'fbclid' then 'facebook' when acquired_source ? 'gclid' then 'google'
                                           when acquired_source ? 'ttclid' then 'tiktok' when acquired_source ? 'tech_link' then 'tech link'
                                           when acquired_source ? 'referrer' then acquired_source->>'referrer' end, 'direct') k, count(*) n
                      from lashesbyshazz.clients where created_at >= v_from and created_at < v_to group by 1) x),
    'campaigns', (select coalesce(jsonb_agg(jsonb_build_object('campaign', k, 'bookings', n, 'completed', d, 'revenue', r) order by n desc), '[]')
                  from (select coalesce(offer_code, source->>'utm_campaign') k, count(*) n, count(*) filter (where status = 'completed') d,
                               coalesce(sum(total) filter (where status = 'completed'), 0) r
                        from pb where coalesce(offer_code, source->>'utm_campaign') is not null group by 1) x),
    'channels', (select coalesce(jsonb_agg(jsonb_build_object('channel', channel, 'bookings', n) order by n desc), '[]')
                 from (select channel, count(*) n from pb group by channel) x),
    'branches', (select coalesce(jsonb_agg(jsonb_build_object('branch', br.name, 'bookings', n, 'completed', d) order by n desc), '[]')
                 from (select branch_id, count(*) n, count(*) filter (where status = 'completed') d from pb group by branch_id) x
                 join lashesbyshazz.branches br on br.id = x.branch_id),
    'techs', (select coalesce(jsonb_agg(jsonb_build_object('tech', s.name, 'branch', br.name, 'bookings', x.n, 'completed', x.d,
                                                          'no_shows', x.ns, 'came_back', x.cb, 'chosen', x.ch, 'revenue', x.r) order by x.n desc), '[]')
              from (select pb.staff_id, count(*) n, count(*) filter (where pb.status = 'completed') d,
                           count(*) filter (where pb.status = 'no_show') ns,
                           count(*) filter (where pb.staff_choice in ('tech', 'rebook')) ch,
                           coalesce(sum(pb.total) filter (where pb.status = 'completed'), 0) r,
                           count(*) filter (where pb.status = 'completed' and exists (
                             select 1 from lashesbyshazz.bookings n where n.client_id = pb.client_id and n.starts_at > pb.starts_at
                               and n.status not in ('cancelled_client', 'cancelled_salon', 'no_show'))) cb
                    from pb where pb.staff_id is not null group by pb.staff_id) x
              join lashesbyshazz.staff s on s.id = x.staff_id join lashesbyshazz.branches br on br.id = s.branch_id),
    'funnel', jsonb_build_array(
      jsonb_build_object('step', 'Started booking on the site', 'count', (select count(*) from lashesbyshazz.booking_attempts where created_at >= v_from and created_at < v_to)),
      jsonb_build_object('step', 'Picked a time', 'count', (select count(*) from lashesbyshazz.booking_attempts where created_at >= v_from and created_at < v_to and (starts_at is not null or booking_id is not null))),
      jsonb_build_object('step', 'Gave a phone number', 'count', (select count(*) from lashesbyshazz.booking_attempts where created_at >= v_from and created_at < v_to and phone is not null and (starts_at is not null or booking_id is not null))),
      jsonb_build_object('step', 'Booked', 'count', (select count(*) from lashesbyshazz.booking_attempts where created_at >= v_from and created_at < v_to and booking_id is not null)),
      jsonb_build_object('step', 'Fee paid or confirmed', 'count', (select count(*) from lashesbyshazz.booking_attempts a join lashesbyshazz.bookings b on b.id = a.booking_id
                                                                  where a.created_at >= v_from and a.created_at < v_to and (b.deposit_paid > 0 or b.status in ('confirmed', 'reminded', 'checked_in', 'completed')))),
      jsonb_build_object('step', 'Came in', 'count', (select count(*) from lashesbyshazz.booking_attempts a join lashesbyshazz.bookings b on b.id = a.booking_id
                                                     where a.created_at >= v_from and a.created_at < v_to and b.status in ('checked_in', 'completed')))),
    'dropoff', (select coalesce(jsonb_agg(jsonb_build_object('step', step, 'count', n) order by n desc), '[]')
                from (select step, count(*) n from lashesbyshazz.booking_attempts
                      where created_at >= v_from and created_at < v_to and booking_id is null group by step) x),
    'bookings', (select coalesce(jsonb_agg(jsonb_build_object(
                   'ref', pb.ref, 'starts_at', pb.starts_at, 'status', pb.status, 'client', c.name, 'phone', c.phone,
                   'segment', lashesbyshazz.client_segment(c), 'tech', s.name, 'branch', br.name, 'services', pb.services,
                   'total', pb.total, 'fee', pb.fee, 'deposit_paid', pb.deposit_paid, 'channel', pb.channel,
                   'lock_refill', pb.lock_refill, 'refill_hold_on', pb.refill_hold_on) order by pb.starts_at), '[]')
                 from (select * from pb order by starts_at desc limit 400) pb
                 join lashesbyshazz.clients c on c.id = pb.client_id
                 left join lashesbyshazz.staff s on s.id = pb.staff_id
                 join lashesbyshazz.branches br on br.id = pb.branch_id),
    'unfinished', (select coalesce(jsonb_agg(jsonb_build_object(
                     'name', a.name, 'phone', a.phone, 'step', a.step, 'cart', a.cart, 'staff', a.staff_slug,
                     'branch', br.name, 'starts_at', a.starts_at, 'updated_at', a.updated_at, 'returning', a.client_id is not null,
                     'source', a.source->>'utm_source') order by a.updated_at desc), '[]')
                   from (select * from lashesbyshazz.booking_attempts
                         where booking_id is null and phone is not null and updated_at >= v_from and updated_at < v_to
                         order by updated_at desc limit 200) a
                   left join lashesbyshazz.branches br on br.id = a.branch_id)
  ) into v;
  return v;
end $$;

-- The client list: search by name or phone, filter by segment, sort.
create or replace function public.lbs_admin_client_list(p_search text default null, p_segment text default null, p_sort text default 'recent')
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  v_q text := nullif(trim(coalesce(p_search, '')), '');
  v_digits text := regexp_replace(coalesce(p_search, ''), '\D', '', 'g');
begin
  if not public.is_academy_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  return (
    select coalesce(jsonb_agg(row_to_json(x)::jsonb), '[]')
    from (
      select c.id, c.name, c.phone, c.email, c.segment, c.visit_count visits, c.total_spend spend, c.first_visit, c.last_visit,
             c.refill_due, c.lapse_date, c.current_lash, c.no_show_count no_shows, c.late_cancel_count late_cancels,
             s.name favourite_tech, br.name favourite_branch, c.heard_from, c.referred_by, c.marketing_opt_in opted_in,
             coalesce(nullif(c.acquired_source->>'utm_source', ''), case when c.acquired_source ? 'tech_link' then 'tech link' end) source,
             c.created_at,
             (select min(b.starts_at) from lashesbyshazz.bookings b where b.client_id = c.id and b.starts_at > now()
               and b.status in ('requested', 'pending_deposit', 'confirmed', 'reminded')) next_booking
      from (select c.*, lashesbyshazz.client_segment(c) segment from lashesbyshazz.clients c) c
      left join lashesbyshazz.staff s on s.id = c.favourite_staff
      left join lashesbyshazz.branches br on br.id = c.favourite_branch
      where (v_q is null or c.name ilike '%' || v_q || '%' or (length(v_digits) >= 3 and c.phone like '%' || ltrim(v_digits, '0') || '%'))
        and (p_segment is null or p_segment = '' or c.segment = p_segment)
      order by
        case when p_sort = 'spend' then c.total_spend end desc nulls last,
        case when p_sort = 'visits' then c.visit_count end desc nulls last,
        case when p_sort = 'refill' then c.refill_due end asc nulls last,
        c.last_visit desc nulls last, c.created_at desc
      limit 500
    ) x);
end $$;

-- Reception / admin marks what happened to a booking. Each change is kept in booking_events with who did it.
create or replace function public.lbs_admin_set_booking_status(p_ref text, p_status text, p_note text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_b lashesbyshazz.bookings;
  v_who text := coalesce((select email from auth.users where id = auth.uid()), 'admin');
begin
  if not public.is_academy_admin() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_status not in ('requested', 'confirmed', 'reminded', 'checked_in', 'completed', 'no_show', 'cancelled_client', 'cancelled_salon') then
    raise exception 'Unknown status %', p_status;
  end if;
  update lashesbyshazz.bookings set
    status = p_status,
    deposit_paid = case when p_status in ('confirmed', 'checked_in', 'completed') and deposit_paid = 0 then fee else deposit_paid end,
    updated_at = now()
  where ref = upper(p_ref) returning * into v_b;
  if v_b.id is null then raise exception 'No booking %', p_ref; end if;
  insert into lashesbyshazz.booking_events (booking_id, status, note, by_who) values (v_b.id, p_status, left(p_note, 300), v_who);
  return jsonb_build_object('ok', true, 'ref', v_b.ref, 'status', v_b.status);
end $$;

revoke all on function public.lbs_admin_clients(timestamptz, timestamptz) from public, anon;
revoke all on function public.lbs_admin_client_list(text, text, text) from public, anon;
revoke all on function public.lbs_admin_set_booking_status(text, text, text) from public, anon;
grant execute on function public.lbs_admin_clients(timestamptz, timestamptz) to authenticated;
grant execute on function public.lbs_admin_client_list(text, text, text) to authenticated;
grant execute on function public.lbs_admin_set_booking_status(text, text, text) to authenticated;


-- ==============================================================================================
-- Refill messages that don't nag (plan: "Selling Sets & Refills", Part 1)
-- ==============================================================================================
-- At most two refill messages per set, both before the 21-day window closes, then one "something new"
-- note weeks later, then silence until she books. Any upcoming booking stops everything. Nothing is sent
-- here: the sender (HeySasa / SMS) asks lbs_admin_messages_due() each morning, sends, then calls
-- lbs_admin_log_message() for each one so nobody is ever messaged twice.
--
--   refill_1  day 12-14 after her last lash visit   "Your refill window opens this week" (+ her tech's slots)
--   refill_2  day 18-20, only if refill_1 went out  "3 days left for refill pricing"     (last refill message)
--   winback   day 35-45                             something new, not a reminder        (once per set)
--   locked    day 12-14 when she locked in a refill  a confirmation of the held slot, not a reminder
--
-- Rules: she must have ticked the reminders box (marketing_opt_in) and not chosen 'self' or 'stop';
-- never more than one message in 72 hours. Send between 9am and 7pm Nairobi time.

alter table lashesbyshazz.clients add column if not exists reminder_pref text not null default 'remind';
-- remind = send refill reminders | self = "I'll book myself" (aftercare only) | stop = replied STOP
do $$ begin
  alter table lashesbyshazz.clients add constraint lbs_reminder_pref check (reminder_pref in ('remind', 'self', 'stop'));
exception when duplicate_object then null;
end $$;

create table if not exists lashesbyshazz.client_messages (
  id bigint generated always as identity primary key,
  client_id uuid not null references lashesbyshazz.clients(id) on delete cascade,
  kind text not null,                      -- refill_1 | refill_2 | winback | locked | aftercare | other
  for_visit date,                          -- the lash visit this message is about (one of each kind per visit)
  channel text not null default 'whatsapp',
  status text not null default 'sent',     -- sent | failed | complained
  created_at timestamptz not null default now()
);
create unique index if not exists lbs_client_messages_once
  on lashesbyshazz.client_messages (client_id, kind, for_visit) where for_visit is not null and status <> 'failed';
alter table lashesbyshazz.client_messages enable row level security;
revoke all on lashesbyshazz.client_messages from anon, authenticated;

-- Admins, or the sender running with the service role key.
create or replace function lashesbyshazz.can_send() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(auth.role() = 'service_role', false) or coalesce(public.is_academy_admin(), false);
$$;

-- Who to message today, with everything needed to make it personal. Nothing is returned twice.
create or replace function public.lbs_admin_messages_due()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  v_today date := (now() at time zone 'Africa/Nairobi')::date;
  v jsonb;
begin
  if not lashesbyshazz.can_send() then
    raise exception 'Admins only' using errcode = '42501';
  end if;

  with base as (
    select c.*, v_today - c.last_visit as day,
           s.name as tech_name, sv.name as lash_name,
           exists (select 1 from lashesbyshazz.bookings b where b.client_id = c.id and b.starts_at > now()
                   and b.status in ('requested', 'pending_deposit', 'confirmed', 'reminded')) as booked,
           (select b.refill_hold_on from lashesbyshazz.bookings b where b.client_id = c.id and b.lock_refill
              and b.status = 'completed' and (b.starts_at at time zone 'Africa/Nairobi')::date = c.last_visit
            order by b.starts_at desc limit 1) as held_on,
           (select max(m.created_at) from lashesbyshazz.client_messages m where m.client_id = c.id and m.status <> 'failed') as last_msg
      from lashesbyshazz.clients c
      left join lashesbyshazz.staff s on s.id = c.favourite_staff
      left join lashesbyshazz.services sv on sv.slug = c.current_lash
     where c.last_visit is not null and c.current_lash is not null
  ),
  due as (
    select b.*,
      case
        when b.held_on is not null and b.day between 12 and 14 and b.reminder_pref <> 'stop' then 'locked'
        when b.booked then null
        when b.reminder_pref <> 'remind' or not b.marketing_opt_in then null
        when b.last_msg is not null and b.last_msg > now() - interval '72 hours' then null
        when b.day between 12 and 14 then 'refill_1'
        when b.day between 18 and 20 and exists (select 1 from lashesbyshazz.client_messages m where m.client_id = b.id
               and m.kind = 'refill_1' and m.for_visit = b.last_visit and m.status = 'sent') then 'refill_2'
        when b.day between 35 and 45 then 'winback'
      end as kind
    from base b
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'client_id', d.id,
           'phone', d.phone,
           'first_name', split_part(coalesce(d.name, ''), ' ', 1),
           'kind', d.kind,
           'day', d.day,
           'for_visit', d.last_visit,
           'lash', d.lash_name,
           'tech', split_part(coalesce(d.tech_name, ''), ' ', 1),
           'refill_held_on', d.held_on,
           -- refill messages open the refill; the day-35+ note opens her set's "See the look" sheet
           'book_link', case when d.kind = 'winback' then '/book?look=' || d.current_lash
                        else '/book?service=' || coalesce((select r.slug from lashesbyshazz.services r
                               where r.refill_of = d.current_lash and r.active limit 1), d.current_lash) end
         ) order by d.kind, d.day), '[]'::jsonb)
    into v
    from due d
   where d.kind is not null
     and not exists (select 1 from lashesbyshazz.client_messages m where m.client_id = d.id and m.kind = d.kind
                     and m.for_visit = d.last_visit and m.status <> 'failed');
  return v;
end $$;

-- The sender records each message it sent (or failed to send), and staff record complaints.
create or replace function public.lbs_admin_log_message(p_client uuid, p_kind text, p_for_visit date,
                                                        p_channel text default 'whatsapp', p_status text default 'sent')
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  if not lashesbyshazz.can_send() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  insert into lashesbyshazz.client_messages (client_id, kind, for_visit, channel, status)
  values (p_client, left(p_kind, 20), p_for_visit, left(coalesce(p_channel, 'whatsapp'), 20), left(coalesce(p_status, 'sent'), 20))
  on conflict do nothing;
  return jsonb_build_object('ok', true);
end $$;

-- "I'll book myself" / STOP / back on. From My bookings, a STOP reply, or reception.
create or replace function public.lbs_admin_set_reminder_pref(p_phone text, p_pref text)
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  if not lashesbyshazz.can_send() then
    raise exception 'Admins only' using errcode = '42501';
  end if;
  if p_pref not in ('remind', 'self', 'stop') then return jsonb_build_object('ok', false); end if;
  update lashesbyshazz.clients set reminder_pref = p_pref, updated_at = now()
   where phone = lashesbyshazz.norm_phone(p_phone);
  return jsonb_build_object('ok', found);
end $$;

revoke all on function public.lbs_admin_messages_due() from public, anon;
revoke all on function public.lbs_admin_log_message(uuid, text, date, text, text) from public, anon;
revoke all on function public.lbs_admin_set_reminder_pref(text, text) from public, anon;
grant execute on function public.lbs_admin_messages_due() to authenticated, service_role;
grant execute on function public.lbs_admin_log_message(uuid, text, date, text, text) to authenticated, service_role;
grant execute on function public.lbs_admin_set_reminder_pref(text, text) to authenticated, service_role;

-- ==============================================================================================
-- Phone verification on /book
-- ==============================================================================================
-- She types her number, gets a 6-digit code (WhatsApp or SMS, sent by the site's server), types it in.
-- Once verified, the page may show her saved name and email, and the device is remembered for 180 days
-- so next time she just confirms "Booking as Amina" and carries on.
-- Switch it on once the code sender works (see lib/booking/otp.ts):
--   insert into lashesbyshazz.settings (key, value) values ('phone_verification', 'on')
--   on conflict (key) do update set value = excluded.value;
-- While it is off, /book works as before (no code), and bookings are not checked for it.

create table if not exists lashesbyshazz.phone_codes (
  id bigint generated always as identity primary key,
  phone text not null,
  session_id text not null,
  code_hash text not null,
  salt text not null,
  tries smallint not null default 0,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '10 minutes',
  verified_at timestamptz
);
create index if not exists lbs_phone_codes_phone on lashesbyshazz.phone_codes (phone, created_at desc);

create table if not exists lashesbyshazz.trusted_devices (
  token_hash text primary key,
  phone text not null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '180 days'
);
create index if not exists lbs_trusted_devices_phone on lashesbyshazz.trusted_devices (phone);

alter table lashesbyshazz.phone_codes enable row level security;
alter table lashesbyshazz.trusted_devices enable row level security;
revoke all on lashesbyshazz.phone_codes, lashesbyshazz.trusted_devices from anon, authenticated;

create or replace function lashesbyshazz.sha(p text) returns text
language sql immutable set search_path = '' as $$
  select encode(extensions.digest(convert_to(p, 'UTF8'), 'sha256'), 'hex');
$$;

-- True when this phone was verified with a code in this visit (last 2 hours) or holds a remembered device token.
create or replace function lashesbyshazz.phone_verified(p_phone text, p_session text, p_token text) returns boolean
language sql stable security definer set search_path = '' as $$
  select p_phone is not null and (
    exists (select 1 from lashesbyshazz.phone_codes c
             where c.phone = p_phone and c.session_id = coalesce(p_session, '')
               and c.verified_at > now() - interval '2 hours')
    or exists (select 1 from lashesbyshazz.trusted_devices d
                where d.phone = p_phone and d.token_hash = lashesbyshazz.sha(coalesce(p_token, ''))
                  and d.expires_at > now()));
$$;

-- Server only (needs the server secret): makes a code and returns it so the server can send it.
-- At most 3 codes per number in 15 minutes and 8 a day.
create or replace function public.lbs_book_otp_start(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_secret text;
  v_phone text := lashesbyshazz.norm_phone(p->>'phone');
  v_session text := lashesbyshazz.clean(p->>'session_id', 64);
  v_code text;
  v_salt text := encode(extensions.gen_random_bytes(8), 'hex');
begin
  select value into v_secret from lashesbyshazz.settings where key = 'server_secret';
  if v_secret is null or coalesce(p->>'secret', '') <> v_secret then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if v_phone is null then return jsonb_build_object('ok', false, 'error', 'phone'); end if;
  if v_session is null or length(v_session) < 8 then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  if (select count(*) from lashesbyshazz.phone_codes where phone = v_phone and created_at > now() - interval '15 minutes') >= 3
     or (select count(*) from lashesbyshazz.phone_codes where phone = v_phone and created_at > now() - interval '1 day') >= 8 then
    return jsonb_build_object('ok', false, 'error', 'wait');
  end if;
  v_code := lpad((('x' || encode(extensions.gen_random_bytes(4), 'hex'))::bit(32)::bigint % 1000000)::text, 6, '0');
  insert into lashesbyshazz.phone_codes (phone, session_id, code_hash, salt)
  values (v_phone, v_session, lashesbyshazz.sha(v_salt || v_code), v_salt);
  return jsonb_build_object('ok', true, 'phone', v_phone, 'code', v_code);
end $$;

-- The page sends the code she typed. On success: a device token to remember her, and her saved
-- name and email (safe now: she has shown she owns the number). 5 tries per code.
create or replace function public.lbs_book_otp_verify(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_phone text := lashesbyshazz.norm_phone(p->>'phone');
  v_session text := lashesbyshazz.clean(p->>'session_id', 64);
  v_code text := regexp_replace(coalesce(p->>'code', ''), '\D', '', 'g');
  v_row lashesbyshazz.phone_codes;
  v_token text;
  v_client lashesbyshazz.clients;
begin
  if v_phone is null or v_session is null then return jsonb_build_object('ok', false, 'error', 'input'); end if;
  select * into v_row from lashesbyshazz.phone_codes
   where phone = v_phone and session_id = v_session and verified_at is null and expires_at > now()
   order by created_at desc limit 1;
  if v_row.id is null then return jsonb_build_object('ok', false, 'error', 'expired'); end if;
  if v_row.tries >= 5 then return jsonb_build_object('ok', false, 'error', 'tries'); end if;
  if lashesbyshazz.sha(v_row.salt || v_code) <> v_row.code_hash then
    update lashesbyshazz.phone_codes set tries = tries + 1 where id = v_row.id;
    return jsonb_build_object('ok', false, 'error', 'code', 'left', 4 - v_row.tries);
  end if;
  update lashesbyshazz.phone_codes set verified_at = now() where id = v_row.id;
  v_token := encode(extensions.gen_random_bytes(24), 'hex');
  insert into lashesbyshazz.trusted_devices (token_hash, phone) values (lashesbyshazz.sha(v_token), v_phone);
  select * into v_client from lashesbyshazz.clients where phone = v_phone;
  return jsonb_build_object('ok', true, 'token', v_token, 'phone', v_phone,
    'returning', v_client.id is not null,
    'name', v_client.name, 'email', v_client.email);
end $$;

-- "Booking as Amina?" on a remembered device. Returns nothing unless the token is valid.
create or replace function public.lbs_book_me(p jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_dev lashesbyshazz.trusted_devices;
  v_client lashesbyshazz.clients;
  v_last_slug text; v_last_name text; v_last_branch smallint;
begin
  select * into v_dev from lashesbyshazz.trusted_devices
   where token_hash = lashesbyshazz.sha(coalesce(p->>'token', '')) and expires_at > now();
  if v_dev.phone is null then return jsonb_build_object('ok', false); end if;
  update lashesbyshazz.trusted_devices set last_used_at = now() where token_hash = v_dev.token_hash;
  select * into v_client from lashesbyshazz.clients where phone = v_dev.phone;
  if v_client.id is not null then
    select s.slug, s.name, b.branch_id into v_last_slug, v_last_name, v_last_branch
      from lashesbyshazz.bookings b left join lashesbyshazz.staff s on s.id = b.staff_id
     where b.client_id = v_client.id and b.status not in ('cancelled_salon')
     order by b.starts_at desc limit 1;
  end if;
  return jsonb_build_object('ok', true, 'phone', v_dev.phone,
    'returning', v_client.id is not null,
    'name', v_client.name, 'email', v_client.email,
    'last_staff', v_last_slug, 'last_staff_name', split_part(coalesce(v_last_name, ''), ' ', 1), 'last_branch', v_last_branch);
end $$;

-- "Not you?" forgets the device.
create or replace function public.lbs_book_forget(p jsonb)
returns jsonb language sql security definer set search_path = '' as $$
  delete from lashesbyshazz.trusted_devices where token_hash = lashesbyshazz.sha(coalesce(p->>'token', ''));
  select jsonb_build_object('ok', true);
$$;

revoke all on function public.lbs_book_otp_start(jsonb) from public;
revoke all on function public.lbs_book_otp_verify(jsonb) from public;
revoke all on function public.lbs_book_me(jsonb) from public;
revoke all on function public.lbs_book_forget(jsonb) from public;
grant execute on function public.lbs_book_otp_start(jsonb) to anon, authenticated;
grant execute on function public.lbs_book_otp_verify(jsonb) to anon, authenticated;
grant execute on function public.lbs_book_me(jsonb) to anon, authenticated;
grant execute on function public.lbs_book_forget(jsonb) to anon, authenticated;
