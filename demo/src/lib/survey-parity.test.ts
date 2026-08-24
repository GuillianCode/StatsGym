// `?raw` évite toute dépendance à Node : Vite fournit le fichier tel quel.
import html from '../../../published-demo/index.html?raw';
import {describe, expect, it} from 'vitest';
import {accessOptionsByProfile, priceScales} from '@statsgym/contracts';

// Le questionnaire existe en double : la page publiée (JavaScript autonome) et
// le chantier React (qui lit le contrat). Ce test échoue dès que les deux
// listes de l'étape « Attentes » cessent d'être identiques.

const donneesPubliees = () => {
  const debut = html.indexOf('const accessOptions={');
  const fin = html.indexOf('const models=()=>', debut);
  expect(debut, 'bloc accessOptions introuvable dans la page publiée').toBeGreaterThan(-1);
  expect(fin, 'bloc priceScales introuvable dans la page publiée').toBeGreaterThan(debut);
  return new Function(`${html.slice(debut, fin)} return {accessOptions, priceScales};`)() as {
    accessOptions: Record<string, [string, string][]>;
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
});
