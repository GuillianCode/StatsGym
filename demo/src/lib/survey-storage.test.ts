import {describe, expect, it} from 'vitest';
import submitSurveySource from '../../../supabase/functions/submit-survey/index.ts?raw';
import submissionIndexMigration from '../../../supabase/migrations/202608240002_fix_survey_submission_unique.sql?raw';

describe('survey storage contract', () => {
  it('backs the submission upsert with a non-partial unique index', () => {
    expect(submitSurveySource).toContain("onConflict: 'submission_id'");
    expect(submissionIndexMigration).toMatch(
      /create unique index survey_responses_submission_id_key\s+on public\.survey_responses\(submission_id\);/i,
    );
    expect(submissionIndexMigration).not.toMatch(/where\s+submission_id\s+is\s+not\s+null/i);
  });
});
