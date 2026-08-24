drop index if exists public.survey_responses_submission_id_key;

create unique index survey_responses_submission_id_key
  on public.survey_responses(submission_id);
