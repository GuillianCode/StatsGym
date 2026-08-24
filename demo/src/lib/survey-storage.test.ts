import {describe, expect, it} from 'vitest';
import submitSurveySource from '../../../supabase/functions/submit-survey/index.ts?raw';
import submissionIndexMigration from '../../../supabase/migrations/202608240002_fix_survey_submission_unique.sql?raw';
import submissionPermissionMigration from '../../../supabase/migrations/202608240003_grant_survey_upsert_select.sql?raw';
import rateLimitMigration from '../../../supabase/migrations/202608240004_raise_survey_rate_limit.sql?raw';
import schemaVersionMigration from '../../../supabase/migrations/202608240005_survey_schema_version.sql?raw';

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

  it('versionne les réponses et reconnaît les réponses v2 historiques', () => {
    expect(schemaVersionMigration).toMatch(/add column if not exists survey_schema_version smallint not null default 1/i);
    expect(schemaVersionMigration).toContain("'current_ok'");
    expect(schemaVersionMigration).toContain("'coach_tools'");
    expect(schemaVersionMigration).toMatch(/set survey_schema_version = 2/i);
  });

  it('capture une seule fois côté serveur, sans faire échouer le stockage', () => {
    expect(submitSurveySource).toContain(".select('submission_id')");
    expect(submitSurveySource).toContain('if (result.data?.length) await captureSurveyResponse');
    expect(submitSurveySource.indexOf("if (result.error)")).toBeLessThan(submitSurveySource.indexOf('if (result.data?.length)'));
    expect(submitSurveySource).toContain("$process_person_profile: false");
    expect(submitSurveySource).toContain("'x-posthog-distinct-id'");
    expect(submitSurveySource).toContain("'x-posthog-session-id'");
    expect(submitSurveySource).toContain("return reply(201, {ok: true}, origin)");
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
