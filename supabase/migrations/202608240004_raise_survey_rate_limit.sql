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
  return current_attempts <= 100;
end;
$$;

revoke all on function public.claim_survey_submission_slot(text) from public, anon, authenticated;
grant execute on function public.claim_survey_submission_slot(text) to service_role;
