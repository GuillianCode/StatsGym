import {describe, expect, it} from 'vitest';
import {comparisonPartners, visibleAthletes} from './catalog';
import {apparatusOrder, averagesForMetric, competitionGroups, evolutionForMetric, filterResults} from './presentation';

describe('adaptateurs de présentation fidèles à la démo historique', () => {
  it.each([['GAM', 55], ['GAF', 41], ['GR', 29]] as const)('regroupe les lignes %s en compétitions uniques', (discipline, count) => {
    expect(competitionGroups(visibleAthletes[discipline].results)).toHaveLength(count);
  });

  it('place le concours général avant sa finale par agrès', () => {
    const first = competitionGroups(visibleAthletes.GAM.results)[0];
    expect(first.main.nf).toBe(77.45);
    expect(first.extras).toHaveLength(1);
    expect(first.extras[0].ph).toBe('Finale par agrès');
  });

  it('reproduit la sélection de duel GAM de la référence', () => {
    const program = 'Imposés FFGym Mouvements 4 à 6';
    expect(filterResults(visibleAthletes.GAM, '*', program)).toHaveLength(5);
    expect(filterResults(comparisonPartners.GAM, '*', program)).toHaveLength(3);
  });

  it('construit les séries par date et dans l’ordre des agrès', () => {
    const athlete = visibleAthletes.GAM;
    const averages = averagesForMetric(athlete.results, 'ne', apparatusOrder.GAM);
    expect(averages.map(row => row.name)).toEqual(apparatusOrder.GAM);
    const evolution = evolutionForMetric(athlete.results, 'nf', apparatusOrder.GAM);
    expect(evolution.dates).toEqual([...evolution.dates].sort());
    expect(evolution.series).toHaveLength(6);
  });
});
