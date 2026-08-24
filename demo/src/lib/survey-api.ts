import type {SurveyPayload} from '@statsgym/contracts';

const timeoutMs = 12_000;

export async function submitSurvey(payload: SurveyPayload): Promise<{simulated: boolean}> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  if (!url) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return {simulated: true};
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/functions/v1/submit-survey`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`submit-survey:${response.status}`);
    return {simulated: false};
  } finally {
    clearTimeout(timeout);
  }
}
