import {createClient} from '@supabase/supabase-js';
import {surveyPayloadSchema} from '../../../packages/contracts/src/index.ts';

const allowedDefault = ['https://guilliancode.github.io'];
const encoder = new TextEncoder();

function cors(origin: string | null) {
  const configured = (Deno.env.get('ALLOWED_ORIGINS') || '').split(',').map(value => value.trim()).filter(Boolean);
  const allowed = [...allowedDefault, ...configured].includes(origin || '') || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '');
  return {
    'access-control-allow-headers': 'authorization, x-client-info, apikey, content-type',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-origin': allowed ? origin! : allowedDefault[0],
    'cache-control': 'no-store',
    'content-type': 'application/json',
    vary: 'origin',
  };
}

function reply(status: number, body: unknown, origin: string | null) {
  return new Response(JSON.stringify(body), {status, headers: cors(origin)});
}

async function fingerprint(request: Request) {
  const address = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const salt = Deno.env.get('RATE_LIMIT_SALT') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || 'statsgym';
  const key = await crypto.subtle.importKey('raw', encoder.encode(salt), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(address));
  return [...new Uint8Array(signature)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async request => {
  const origin = request.headers.get('origin');
  if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers: cors(origin)});
  if (request.method !== 'POST') return reply(405, {error: 'Méthode non autorisée'}, origin);
  if (Number(request.headers.get('content-length') || 0) > 32_000) return reply(400, {error: 'Réponse trop volumineuse'}, origin);

  let raw: unknown;
  try { raw = await request.json(); } catch { return reply(400, {error: 'Requête invalide'}, origin); }
  if (raw && typeof raw === 'object' && !Array.isArray(raw) && String((raw as Record<string, unknown>)['bot-field'] || '').trim()) return reply(201, {ok: true}, origin);
  const parsed = surveyPayloadSchema.safeParse(raw);
  if (!parsed.success) return reply(422, {error: 'Réponse invalide', fields: parsed.error.issues.map(issue => issue.path.join('.'))}, origin);

  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) return reply(500, {error: 'Service temporairement indisponible'}, origin);
  const supabase = createClient(url, key, {auth: {persistSession: false}});
  const rate = await supabase.rpc('claim_survey_submission_slot', {client_fingerprint: await fingerprint(request)});
  if (rate.error) return reply(500, {error: 'Service temporairement indisponible'}, origin);
  if (!rate.data) return reply(429, {error: 'Trop de tentatives. Réessayez plus tard.'}, origin);

  const body = parsed.data;
  const insert = {
    submission_id: body.submission_id,
    profile: body.profil,
    club_name: body.club_name || null,
    discipline: body.discipline,
    context: {value: body.context},
    feature_ratings: body.feature_ratings,
    stats_clarity: body.stats_clarity,
    stats_preference: body.stats_preference,
    club_offer: body.club_offer,
    access_model: body.access_model,
    club_pricing_model: body.club_pricing_model,
    price_range: body.price_range,
    price_period: body.price_period,
    idea: body.idea || null,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    waitlist_opt_in: body.waitlist_opt_in,
  };
  const result = await supabase.from('survey_responses').upsert(insert, {onConflict: 'submission_id', ignoreDuplicates: true});
  if (result.error) return reply(502, {error: 'Enregistrement indisponible'}, origin);
  return reply(201, {ok: true}, origin);
});
