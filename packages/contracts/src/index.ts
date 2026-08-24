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

export const accessModels = [
  'current_ok', 'international', 'training', 'video',
  'premium_options', 'coach_app', 'club_funded',
  'club_analytics', 'coach_tools', 'no_use',
] as const;
export type AccessModel = (typeof accessModels)[number];
export type Profile = (typeof profiles)[number];

// Chaque profil ne voit que ses propres propositions : un gymnaste ne peut pas
// répondre « équiper nos coachs », un club ne peut pas répondre « ma vidéo ».
export const accessOptionsByProfile: Record<Profile, readonly (readonly [AccessModel, string])[]> = {
  gymnaste: [
    ['current_ok', 'Cette version me convient très bien.'],
    ['international', 'Je veux suivre les stats et l’évolution des gymnastes internationaux.'],
    ['training', 'Je préfère un outil pour suivre ma progression à l’entraînement.'],
    ['video', 'Je veux pouvoir associer la vidéo de mes mouvements à mes notes.'],
  ],
  parent: [
    ['current_ok', 'Cette version pour suivre les résultats de mon enfant me convient très bien.'],
    ['international', 'Je veux pouvoir suivre aussi les gymnastes internationaux avec lui / elle.'],
    ['training', 'Je préfère un outil pour suivre ses progrès aux entraînements.'],
    ['video', 'Je veux pouvoir associer la vidéo de ses mouvements à ses notes.'],
  ],
  entraineur: [
    ['current_ok', 'Cette version me suffit amplement.'],
    ['premium_options', 'J’aimerais des options avancées payantes.'],
    ['coach_app', 'Je serais prêt à payer pour une appli entièrement pensée pour les coachs.'],
    ['club_funded', 'Ce type d’appli, mais financée par mon club.'],
  ],
  club: [
    ['current_ok', 'Cette version nous suffit amplement.'],
    ['club_analytics', 'Intéressés par des options payantes pour analyser les performances du club.'],
    ['coach_tools', 'Prêts à équiper nos coachs d’un outil sur mesure de suivi des gymnastes.'],
    ['no_use', 'Nous n’avons pas l’utilité d’un tel outil.'],
  ],
};

// Entraîneurs et clubs répondent à une question d'accès ; gymnastes et parents,
// à une question de direction produit.
export const accessTitles: Record<Profile, string> = {
  gymnaste: 'Et pour la suite ?',
  parent: 'Et pour la suite ?',
  entraineur: 'Comment aimeriez-vous accéder à StatsGym ?',
  club: 'Comment aimeriez-vous accéder à StatsGym ?',
};

// Questions de fin d'étape 2. Les clubs n'en ont plus.
export const statsQuestionLabels: Record<Exclude<Profile, 'club'>, {clarity: string; preference: string}> = {
  gymnaste: {
    clarity: 'Les graphiques actuels vous paraissent-ils faciles à comprendre ?',
    preference: 'Préférez-vous une vue plus simple des statistiques, ou des graphiques encore plus poussés ?',
  },
  parent: {
    clarity: 'Les graphiques actuels vous paraissent-ils faciles à comprendre ?',
    preference: 'Préférez-vous une vue plus simple des statistiques, ou des graphiques encore plus poussés ?',
  },
  entraineur: {
    clarity: 'Les graphiques actuels suffisent-ils à suivre la progression d’une gymnaste ?',
    preference: 'Pour suivre vos gymnastes, une vue plus simple ou des graphiques plus poussés ?',
  },
};

export const ideaLabel = 'Une idée, une question, ou une amélioration à nous partager ?';

// Seules ces réponses ouvrent la question du budget, chacune avec sa propre échelle.
export const priceScales = {
  premium_options: {
    period: 'monthly',
    prompt: 'Pour ces options avancées, quel prix mensuel vous semblerait raisonnable ?',
    ranges: [['1-2', '1–2 € / mois'], ['3-4', '3–4 € / mois'], ['5-6', '5–6 € / mois'], ['7-8', '7–8 € / mois'], ['9-10', '9–10 € / mois']],
  },
  coach_app: {
    period: 'monthly',
    prompt: 'Pour une application pensée pour les coachs, quel prix mensuel vous semblerait raisonnable ?',
    ranges: [['5-7', '5–7 € / mois'], ['8-10', '8–10 € / mois'], ['11-13', '11–13 € / mois'], ['14-16', '14–16 € / mois'], ['17-20', '17–20 € / mois']],
  },
  club_analytics: {
    period: 'annual',
    prompt: 'Quel budget annuel votre club pourrait-il y consacrer ?',
    ranges: [['50-100', '50–100 € / an'], ['100-150', '100–150 € / an'], ['150-200', '150–200 € / an'], ['200-plus', '200 € et plus / an']],
  },
  coach_tools: {
    period: 'annual',
    prompt: 'Quel budget annuel votre club pourrait-il y consacrer ?',
    ranges: [['50-100', '50–100 € / an'], ['100-150', '100–150 € / an'], ['150-200', '150–200 € / an'], ['200-plus', '200 € et plus / an']],
  },
} as const satisfies Record<string, {period: 'monthly' | 'annual'; prompt: string; ranges: readonly (readonly [string, string])[]}>;

export const priceScaleFor = (model: string) =>
  (priceScales as Record<string, (typeof priceScales)[keyof typeof priceScales] | undefined>)[model];

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
  access_model: z.enum(accessModels),
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
  if (value.club_offer) {
    context.addIssue({code: 'custom', path: ['club_offer'], message: 'Réponse club non attendue'});
  }
  if (isClub && (value.stats_clarity || value.stats_preference)) {
    context.addIssue({code: 'custom', path: ['stats_clarity'], message: 'Réponses statistiques non attendues'});
  }
  if (!isClub && (!/^[1-5]$/.test(value.stats_clarity ?? '') || !['simple', 'balanced', 'advanced'].includes(value.stats_preference ?? ''))) {
    context.addIssue({code: 'custom', path: ['stats_clarity'], message: 'Réponses statistiques invalides'});
  }
  if (!accessOptionsByProfile[value.profil].some(([key]) => key === value.access_model)) {
    context.addIssue({code: 'custom', path: ['access_model'], message: 'Réponse indisponible pour ce profil'});
  }
  if (value.club_pricing_model) {
    context.addIssue({code: 'custom', path: ['club_pricing_model'], message: 'Mode de financement non attendu'});
  }
  const scale = priceScaleFor(value.access_model);
  if (scale) {
    if (value.price_period !== scale.period || !scale.ranges.some(([key]) => key === value.price_range)) {
      context.addIssue({code: 'custom', path: ['price_range'], message: 'Budget invalide pour cette réponse'});
    }
  } else if (value.price_range || value.price_period) {
    context.addIssue({code: 'custom', path: ['price_range'], message: 'Budget non attendu'});
  }
});

export type SurveyPayload = z.infer<typeof surveyPayloadSchema>;
