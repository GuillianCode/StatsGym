import {describe, expect, it} from 'vitest';
import {comparisonPartners, disciplines, visibleAthletes} from './catalog';
import {overview} from './statistics';

describe('snapshot StatsGym', () => {
  it('contient exactement trois profils et leurs trois partenaires', () => {
    expect(disciplines).toEqual(['GAM', 'GAF', 'GR']);
    expect(Object.values(visibleAthletes).map(person => person.firstName)).toEqual(['Anthony', 'Elena', 'Hélène']);
    expect(Object.values(comparisonPartners).map(person => person.firstName)).toEqual(['Arthur', 'Maiana', 'Lily']);
  });

  it.each([
    ['GAM', 55, 26, 29, 12, 45, 81.098],
    ['GAF', 41, 16, 25, 8, 47, 56.2],
    ['GR', 29, 29, 0, 8, 16, 104.7],
  ] as const)('fige les KPI de référence %s', (discipline, competitions, individualCompetitions, teamCompetitions, seasons, medals, bestScore) => {
    expect(overview(visibleAthletes[discipline])).toEqual({competitions, individualCompetitions, teamCompetitions, seasons, medals, bestScore});
  });

  it('ne laisse aucune compétition sans date, nom, programme ou grille', () => {
    for (const person of [...Object.values(visibleAthletes), ...Object.values(comparisonPartners)]) {
      for (const result of person.results) {
        expect(result.d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(result.c).toBeTruthy();
        expect(result.pr).toBeTruthy();
        expect(result.gr).toBeTruthy();
      }
    }
  });
});
