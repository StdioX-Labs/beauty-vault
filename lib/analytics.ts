// Analytics lives in the Lash Tribe Supabase project, in its own "lashesbyshazz" schema
// (see supabase/lashesbyshazz-analytics.sql). These two values are public by design: the anon key can only
// call lbs_track_event (write one event) and the admin functions, which check for a Lash Tribe admin sign-in.
export const ANALYTICS_URL = 'https://tfmcuhbhxhtghbqukezs.supabase.co';
export const ANALYTICS_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmbWN1aGJoeGh0Z2hicXVrZXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxODM2MDMsImV4cCI6MjEwNTc1OTYwM30.lEySpb_3Q9i_uCm14PFuhWNr5an0pT3YZu3XxjTmUEk';
