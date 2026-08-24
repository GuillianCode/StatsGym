import {describe, expect, it} from 'vitest';
import submitSurveySource from '../../../supabase/functions/submit-survey/index.ts?raw';
import submissionIndexMigration from '../../../supabase/migrations/202608240002_fix_survey_submission_unique.sql?raw';
import submissionPermissionMigration from '../../../supabase/migrations/202608240003_grant_survey_upsert_select.sql?raw';

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
});
