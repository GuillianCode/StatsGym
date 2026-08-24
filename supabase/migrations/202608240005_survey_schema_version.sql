alter table public.survey_responses
  add column if not exists survey_schema_version smallint not null default 1;

update public.survey_responses
set survey_schema_version = 2
where access_model in (
  'current_ok', 'international', 'training', 'video',
  'premium_options', 'coach_app', 'club_funded',
  'club_analytics', 'coach_tools', 'no_use'
);

alter table public.survey_responses
  drop constraint if exists survey_responses_schema_version_check;

alter table public.survey_responses
  add constraint survey_responses_schema_version_check
  check (survey_schema_version >= 1);
