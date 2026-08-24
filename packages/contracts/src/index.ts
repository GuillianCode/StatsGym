import {z} from 'zod';

export const profiles = ['gymnaste', 'parent', 'entraineur', 'club'] as const;
export const disciplines = [
  'Gymnastique artistique féminine', 'Gymnastique artistique masculine',
  'Gymnastique rythmique', 'Trampoline', 'Tumbling', 'Gymnastique aérobic',
  'Gymnastique acrobatique', 'TeamGym', 'Parkour', 'Gym pour tous',
] as const;
export const featureKeys = [
  'historique_competitions', 'reperes_par_agres', 'palmares',
  'progression_temps', 'comparaison_gymnastes',
] as const;

const nullableShort = (max: number) => z.string().trim().max(max).nullable();
const ratingSchema = z.object(Object.fromEntries(featureKeys.map(key => [key, z.number().int().min(1).max(5)])) as Record<(typeof featureKeys)[number], z.ZodNumber>);

export const surveyPayloadSchema = z.object({
  submission_id: z.uuid(),
  profil: z.enum(profiles),
  club_name: z.string().trim().max(180),
  discipline: z.enum(disciplines),
  context: z.string().trim().min(1).max(80),
  feature_ratings: ratingSchema,
  stats_clarity: nullableShort(1),
  stats_preference: nullableShort(30),
  club_offer: nullableShort(30),
  access_model: z.enum(['no_pay', 'club_access', 'freemium', 'individual']),
  club_pricing_model: nullableShort(30),
  price_range: nullableShort(20),
  price_period: z.enum(['monthly', 'annual']).nullable(),
  idea: z.string().trim().max(4000),
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.email().max(254).transform(value => value.toLowerCase()),
  waitlist_opt_in: z.boolean(),
  'bot-field': z.string().optional(),
}).superRefine((value, context) => {
  const isClub = value.profil === 'club';
  if (isClub && !['all', 'some', 'maybe', 'no'].includes(value.club_offer ?? '')) {
    context.addIssue({code: 'custom', path: ['club_offer'], message: 'Réponse club invalide'});
  }
  if (!isClub && (!/^[1-5]$/.test(value.stats_clarity ?? '') || !['simple', 'balanced', 'advanced'].includes(value.stats_preference ?? ''))) {
    context.addIssue({code: 'custom', path: ['stats_clarity'], message: 'Réponses statistiques invalides'});
  }
  const annual = isClub && value.access_model === 'club_access';
  const monthly = !isClub && ['individual', 'freemium'].includes(value.access_model);
  if (annual && (!['all_members', 'per_gymnast'].includes(value.club_pricing_model ?? '') || value.price_period !== 'annual')) {
    context.addIssue({code: 'custom', path: ['club_pricing_model'], message: 'Budget annuel invalide'});
  }
  if (monthly && (value.price_period !== 'monthly' || !value.price_range)) {
    context.addIssue({code: 'custom', path: ['price_range'], message: 'Budget mensuel invalide'});
  }
  if (!annual && !monthly && (value.club_pricing_model || value.price_range || value.price_period)) {
    context.addIssue({code: 'custom', path: ['price_range'], message: 'Budget non attendu'});
  }
});

export type SurveyPayload = z.infer<typeof surveyPayloadSchema>;
