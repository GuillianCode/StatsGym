// `?raw` évite toute dépendance à Node : Vite fournit le fichier tel quel.
import html from '../../../published-demo/index.html?raw';
import reactHtml from '../../index.html?raw';
import {describe, expect, it} from 'vitest';
import {accessOptionsByProfile, accessTitles, ideaLabel, priceScales, statsQuestionLabels} from '@statsgym/contracts';

// Le questionnaire existe en double : la page publiée (JavaScript autonome) et
// le chantier React (qui lit le contrat). Ce test échoue dès que les deux
// listes de l'étape « Attentes » cessent d'être identiques.

const donneesPubliees = () => {
  const debut = html.indexOf('const accessOptions={');
  const fin = html.indexOf('const models=()=>', debut);
  expect(debut, 'bloc accessOptions introuvable dans la page publiée').toBeGreaterThan(-1);
  expect(fin, 'bloc priceScales introuvable dans la page publiée').toBeGreaterThan(debut);
  return new Function(`${html.slice(debut, fin)} return {accessOptions, accessTitles, statsLabels, ideaLabel, priceScales};`)() as {
    accessOptions: Record<string, [string, string][]>;
    accessTitles: Record<string, string>;
    statsLabels: Record<string, {clarity: string; preference: string}>;
    ideaLabel: string;
    priceScales: Record<string, {period: string; prompt: string; ranges: [string, string][]}>;
  };
};

describe('Parité entre la page publiée et le contrat', () => {
  it('propose les mêmes réponses à chaque profil', () => {
    const {accessOptions} = donneesPubliees();
    for (const [profil, options] of Object.entries(accessOptionsByProfile)) {
      expect(accessOptions[profil], `profil ${profil}`).toEqual(options.map(([key, label]) => [key, label]));
    }
    expect(Object.keys(accessOptions).sort()).toEqual(Object.keys(accessOptionsByProfile).sort());
  });

  it('applique les mêmes échelles de prix', () => {
    const {priceScales: publiees} = donneesPubliees();
    expect(Object.keys(publiees).sort()).toEqual(Object.keys(priceScales).sort());
    for (const [model, scale] of Object.entries(priceScales)) {
      expect(publiees[model].period, `${model}: périodicité`).toBe(scale.period);
      expect(publiees[model].prompt, `${model}: question`).toBe(scale.prompt);
      expect(publiees[model].ranges.map(([key]) => key), `${model}: budgets`).toEqual(scale.ranges.map(([key]) => key));
    }
  });

  it('affiche les mêmes titres et les mêmes questions', () => {
    const publiees = donneesPubliees();
    expect(publiees.accessTitles).toEqual(accessTitles);
    expect(publiees.statsLabels).toEqual(statsQuestionLabels);
    expect(publiees.ideaLabel).toBe(ideaLabel);
    // Un club ne répond plus à la question de fin d'étape 2.
    expect(publiees.statsLabels.club).toBeUndefined();
  });

  it('publie le contrat analytique v2 sans soumission réussie côté client', () => {
    expect(html).toContain('survey_schema_version:2');
    expect(html).toContain("'x-posthog-distinct-id'");
    expect(html).toContain("'x-posthog-session-id'");
    expect(html).not.toContain("posthog.capture('survey_response_submitted'");
  });

  it('propose uniquement le partage natif avec attribution', () => {
    expect(html).toContain('id="share-native"');
    expect(html).toContain('Partager StatsGym');
    expect(html).toContain("shareAnalytics('native_share')");
    expect(html).toContain("url.searchParams.set('share_id',getShareId())");
    expect(html).not.toContain('id="share-instagram"');
    expect(html).not.toContain('instagram_story');
    expect(html).not.toContain('prepareStoryFile');
    expect(html).not.toContain('navigator.canShare');
  });

  it('publie l’aperçu horizontal du site sans restaurer l’ancienne story', () => {
    for (const page of [html, reactHtml]) {
      expect(page).not.toContain('statsgym-story');
      expect(page).toContain('https://guilliancode.github.io/StatsGym/assets/share/statsgym-preview.png');
      expect(page).toContain('property="og:image"');
      expect(page).toContain('property="og:image:width" content="1200"');
      expect(page).toContain('property="og:image:height" content="630"');
      expect(page).toContain('name="twitter:card" content="summary_large_image"');
      expect(page).toContain('name="twitter:image"');
    }
  });
});
