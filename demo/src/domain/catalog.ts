import rawSnapshot from '../data/athletes.snapshot.json';
import type {Athlete, Discipline, Snapshot} from './types';

const snapshot = rawSnapshot as Snapshot;

export const visibleAthleteIds: Record<Discipline, string> = {
  GAM: '2677368', GAF: '2716113', GR: '2344697',
};

export const partnerIds: Record<Discipline, string> = {
  GAM: '2251117', GAF: '2654589', GR: '2234488',
};

export const disciplines: Discipline[] = ['GAM', 'GAF', 'GR'];

export function getAthlete(discipline: Discipline, id = visibleAthleteIds[discipline]): Athlete {
  const athlete = snapshot[discipline][id];
  if (!athlete) throw new Error(`Gymnaste absent du snapshot : ${discipline}/${id}`);
  return {
    id, discipline, lastName: athlete.n, firstName: athlete.p,
    club: athlete.c, results: athlete.r,
  };
}

export const visibleAthletes = Object.fromEntries(
  disciplines.map(discipline => [discipline, getAthlete(discipline)]),
) as Record<Discipline, Athlete>;

export const comparisonPartners = Object.fromEntries(
  disciplines.map(discipline => [discipline, getAthlete(discipline, partnerIds[discipline])]),
) as Record<Discipline, Athlete>;
