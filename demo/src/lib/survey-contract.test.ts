import {describe, expect, it} from 'vitest';
import {accessOptionsByProfile, priceScaleFor, surveyPayloadSchema, type Profile} from '@statsgym/contracts';

const base = (profil: Profile, extra: Record<string, unknown> = {}) => ({
  submission_id: crypto.randomUUID(),
  profil,
  club_name: '',
  discipline: 'Gymnastique artistique masculine',
  context: profil === 'club' ? '101–250' : profil === 'entraineur' ? '11–30' : 'Compétition fédérale',
  feature_ratings: {historique_competitions: 4, reperes_par_agres: 4, palmares: 3, progression_temps: 5, comparaison_gymnastes: 2},
  stats_clarity: profil === 'club' ? null : '4',
  stats_preference: profil === 'club' ? null : 'balanced',
  club_offer: null,
  club_pricing_model: null,
  price_range: null,
  price_period: null,
  idea: '',
  first_name: 'Camille',
  last_name: 'Durand',
  email: 'camille@example.org',
  waitlist_opt_in: false,
  ...extra,
});

describe('Contrat du questionnaire — étape Attentes', () => {
  it('accepte les quatre propositions de chaque profil', () => {
    for (const [profil, options] of Object.entries(accessOptionsByProfile) as [Profile, typeof accessOptionsByProfile[Profile]][]) {
      expect(options).toHaveLength(4);
      for (const [model] of options) {
        const scale = priceScaleFor(model);
        const budget = scale ? {price_range: scale.ranges[0][0], price_period: scale.period} : {};
        const result = surveyPayloadSchema.safeParse(base(profil, {access_model: model, ...budget}));
        expect(result.success, `${profil} / ${model} : ${JSON.stringify(result.error?.issues)}`).toBe(true);
      }
    }
  });

  it('refuse une proposition qui appartient à un autre profil', () => {
    for (const [profil, model] of [['gymnaste', 'coach_tools'], ['club', 'video'], ['parent', 'premium_options'], ['entraineur', 'international']] as const) {
      const result = surveyPayloadSchema.safeParse(base(profil, {access_model: model}));
      expect(result.success, `${profil} / ${model}`).toBe(false);
    }
  });

  it('exige le budget de la bonne échelle quand la réponse en ouvre une', () => {
    expect(surveyPayloadSchema.safeParse(base('entraineur', {access_model: 'premium_options'})).success).toBe(false);
    // 17-20 appartient à l’échelle « appli coachs », pas aux options avancées.
    expect(surveyPayloadSchema.safeParse(base('entraineur', {access_model: 'premium_options', price_range: '17-20', price_period: 'monthly'})).success).toBe(false);
    expect(surveyPayloadSchema.safeParse(base('entraineur', {access_model: 'premium_options', price_range: '3-4', price_period: 'monthly'})).success).toBe(true);
  });

  it('impose la bonne périodicité : mensuelle pour un coach, annuelle pour un club', () => {
    expect(surveyPayloadSchema.safeParse(base('club', {access_model: 'club_analytics', price_range: '100-150', price_period: 'monthly'})).success).toBe(false);
    expect(surveyPayloadSchema.safeParse(base('club', {access_model: 'club_analytics', price_range: '100-150', price_period: 'annual'})).success).toBe(true);
  });

  it('refuse les réponses d’étape 2 restées d’un profil précédent', () => {
    // Un club ne répond plus aux questions statistiques : les garder signalerait
    // un état non nettoyé après un changement de profil.
    expect(surveyPayloadSchema.safeParse(base('club', {access_model: 'no_use', stats_clarity: '4'})).success).toBe(false);
    expect(surveyPayloadSchema.safeParse(base('club', {access_model: 'no_use', stats_preference: 'balanced'})).success).toBe(false);
    expect(surveyPayloadSchema.safeParse(base('club', {access_model: 'no_use', club_offer: 'some'})).success).toBe(false);
  });

  it('refuse un budget accroché à une réponse qui n’en demande pas', () => {
    expect(surveyPayloadSchema.safeParse(base('gymnaste', {access_model: 'current_ok', price_range: '3-4', price_period: 'monthly'})).success).toBe(false);
    expect(surveyPayloadSchema.safeParse(base('entraineur', {access_model: 'club_funded', price_range: '3-4', price_period: 'monthly'})).success).toBe(false);
    expect(surveyPayloadSchema.safeParse(base('club', {access_model: 'no_use'})).success).toBe(true);
  });
});
