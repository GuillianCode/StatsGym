import type {SurveyPayload} from '@statsgym/contracts';

const timeoutMs = 12_000;

export async function submitSurvey(payload: SurveyPayload): Promise<{simulated: boolean}> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return {simulated: true};
  }

  const {createClient} = await import('@supabase/supabase-js');
  const client = createClient(url, key, {auth: {persistSession: false}});
  const result = await Promise.race([
    client.functions.invoke('submit-survey', {body: payload}),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs)),
  ]);
  if (result.error) throw result.error;
  return {simulated: false};
}
