import {describe, expect, it} from 'vitest';
import submitSurveySource from '../../../supabase/functions/submit-survey/index.ts?raw';
import submissionIndexMigration from '../../../supabase/migrations/202608240002_fix_survey_submission_unique.sql?raw';
import submissionPermissionMigration from '../../../supabase/migrations/202608240003_grant_survey_upsert_select.sql?raw';
import rateLimitMigration from '../../../supabase/migrations/202608240004_raise_survey_rate_limit.sql?raw';

describe('survey storage contract', () => {
  it('backs the submission upsert with a non-partial unique index', () => {
    expect(submitSurveySource).toContain("onConflict: 'submission_id'");
    expect(submissionIndexMigration).toMatch(
      /create unique index survey_responses_submission_id_key\s+on public\.survey_responses\(submission_id\);/i,
    );
    expect(submissionIndexMigration).not.toMatch(/where\s+submission_id\s+is\s+not\s+null/i);
    expect(submissionPermissionMigration).toMatch(
      /grant select \(submission_id\)\s+on table public\.survey_responses\s+to service_role;/i,
    );
  });

  it('logs storage failures without logging the submitted payload', () => {
    expect(submitSurveySource).toContain("console.error('survey_response_upsert_failed'");
    expect(submitSurveySource).not.toContain('details: result.error.details');
  });

  it('allows shared networks up to 100 survey attempts per hour', () => {
    const threshold = Number(rateLimitMigration.match(/return current_attempts <= (\d+);/i)?.[1]);
    const decisions = Array.from({length: 101}, (_, index) => index + 1 <= threshold);
    expect(decisions.slice(0, 100).every(Boolean)).toBe(true);
    expect(decisions[100]).toBe(false);
    expect(rateLimitMigration).toMatch(/date_trunc\('hour', now\(\)\)/i);
    expect(rateLimitMigration).toMatch(/bucket < now\(\) - interval '48 hours'/i);
    expect(rateLimitMigration).toMatch(
      /grant execute on function public\.claim_survey_submission_slot\(text\) to service_role;/i,
    );
  });
});
