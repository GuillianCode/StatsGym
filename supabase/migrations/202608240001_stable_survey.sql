create table if not exists public.survey_responses (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  submission_id uuid,
  profile text not null,
  club_name text,
  discipline text not null,
  context jsonb not null,
  feature_ratings jsonb not null,
  usage_intent text,
  stats_clarity text,
  stats_preference text,
  club_offer text,
  access_model text,
  club_pricing_model text,
  price_range text,
  price_period text,
  idea text,
  first_name text not null,
  last_name text not null,
  email text not null,
  waitlist_opt_in boolean not null default false
);

alter table public.survey_responses
  add column if not exists submission_id uuid,
  add column if not exists stats_clarity text,
  add column if not exists stats_preference text,
  add column if not exists club_offer text,
  add column if not exists access_model text,
  add column if not exists club_pricing_model text,
  add column if not exists price_period text;

create unique index if not exists survey_responses_submission_id_key
  on public.survey_responses(submission_id) where submission_id is not null;

alter table public.survey_responses enable row level security;
revoke all on table public.survey_responses from anon, authenticated;
grant insert on table public.survey_responses to service_role;
grant usage on sequence public.survey_responses_id_seq to service_role;

create table if not exists private_survey_rate_limits (
  fingerprint text not null,
  bucket timestamptz not null,
  attempts integer not null default 1,
  primary key (fingerprint, bucket)
);
revoke all on table private_survey_rate_limits from public, anon, authenticated;
grant select, insert, update, delete on table private_survey_rate_limits to service_role;

create or replace function public.claim_survey_submission_slot(client_fingerprint text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_bucket timestamptz := date_trunc('hour', now());
  current_attempts integer;
begin
  insert into private_survey_rate_limits(fingerprint, bucket, attempts)
  values (client_fingerprint, current_bucket, 1)
  on conflict (fingerprint, bucket)
  do update set attempts = private_survey_rate_limits.attempts + 1
  returning attempts into current_attempts;
  delete from private_survey_rate_limits where bucket < now() - interval '48 hours';
  return current_attempts <= 10;
end;
$$;
revoke all on function public.claim_survey_submission_slot(text) from public, anon, authenticated;
grant execute on function public.claim_survey_submission_slot(text) to service_role;
