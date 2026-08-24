import type {ApparatusResult, Athlete, Competition, Discipline} from './types';
import {apparatusRows, groupedCompetitions} from './statistics';

export const apparatusOrder: Record<Discipline, string[]> = {
  GAM: ['Sol', 'Cheval d’arçons', 'Anneaux', 'Saut', 'Barres parallèles', 'Barre fixe'],
  GAF: ['Saut', 'Barres asymétriques', 'Poutre', 'Sol'],
  GR: ['Cerceau', 'Ballon', 'Massues', 'Ruban'],
};

export const apparatusColors: Record<Discipline, Record<string, string>> = {
  GAM: {Sol: '#FF9F0A', "Cheval d’arçons": '#FF453A', Anneaux: '#BF5AF2', Saut: '#30D158', 'Barres parallèles': '#64D2FF', 'Barre fixe': '#0A84FF'},
  GAF: {Saut: '#30D158', 'Barres asymétriques': '#0A84FF', Poutre: '#FF9F0A', Sol: '#FF375F'},
  GR: {Cerceau: '#FF9F0A', Ballon: '#0A84FF', Massues: '#BF5AF2', Ruban: '#FF375F'},
};

export const shortApparatus = (name: string) => ({
  "Cheval d’arçons": 'Arçons', 'Barres parallèles': 'Parallèles', 'Barre fixe': 'Fixe',
  'Barres asymétriques': 'Barres',
}[name] ?? name);

export const metricLabel = (discipline: Discipline, metric: Metric) => {
  if (discipline === 'GR') return metric === 'ne' ? 'E' : metric === 'nd' ? 'D' : metric === 'art' ? 'A' : 'NF';
  return metric.toUpperCase();
};

export type Metric = 'ne' | 'nd' | 'nf' | 'art';

export type CompetitionGroup = {key: string; main: Competition; extras: Competition[]};

export function competitionGroups(results: Competition[]): CompetitionGroup[] {
  return groupedCompetitions(results).map((rows) => {
    const main = rows.find(row => !row.pa && !/Imposé/i.test(row.ph ?? ''))
      ?? [...rows].sort((a, b) => (b.ag?.length ?? 0) - (a.ag?.length ?? 0) || (b.nf ?? 0) - (a.nf ?? 0))[0];
    return {key: main.ci != null ? `c${main.ci}` : `${main.c}|${main.d}`, main, extras: rows.filter(row => row !== main)};
  }).sort((a, b) => b.main.d.localeCompare(a.main.d));
}

export function rowsForMetric(results: Competition[], metric: Metric) {
  const rows = apparatusRows(results).filter(row => typeof row[metric] === 'number' && (row[metric] as number) > 0);
  return rows.map(row => ({...row, value: row[metric] as number}));
}

export function averagesForMetric(results: Competition[], metric: Metric, order: string[]) {
  const buckets = new Map<string, number[]>();
  rowsForMetric(results, metric).forEach(row => buckets.set(row.a, [...(buckets.get(row.a) ?? []), row.value]));
  return order.filter(name => buckets.has(name)).map(name => {
    const values = buckets.get(name)!;
    return {name, value: values.reduce((sum, value) => sum + value, 0) / values.length, count: values.length};
  });
}

export function evolutionForMetric(results: Competition[], metric: Metric, order: string[]) {
  const byDate = new Map<string, Map<string, number[]>>();
  rowsForMetric(results, metric).forEach(row => {
    const apparatus = byDate.get(row.competition.d) ?? new Map<string, number[]>();
    apparatus.set(row.a, [...(apparatus.get(row.a) ?? []), row.value]);
    byDate.set(row.competition.d, apparatus);
  });
  const dates = [...byDate.keys()].sort();
  return {
    dates,
    series: order.map(name => ({name, values: dates.map(date => {
      const values = byDate.get(date)?.get(name);
      return values?.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
    })})).filter(row => row.values.some(value => value != null)),
  };
}

export function seasonMetric(results: Competition[], metric: Metric) {
  const seasons = [...new Set(results.map(row => row.s))].sort((a, b) => a - b);
  return seasons.map(season => {
    const values = rowsForMetric(results.filter(row => row.s === season), metric).map(row => row.value);
    return {season, value: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null};
  });
}

export function filterResults(athlete: Athlete, season: string, program: string, apparatus = '*') {
  return athlete.results.filter(row => (season === '*' || String(row.s) === season)
    && (program === '*' || row.gr === program)
    && (apparatus === '*' || row.ag?.some(item => item.a === apparatus)));
}

export function programs(results: Competition[]) {
  return [...new Set(results.map(row => row.gr).filter((value): value is string => Boolean(value)))];
}

export function meanApparatus(results: Competition[], metric: keyof ApparatusResult) {
  const values = apparatusRows(results).map(row => row[metric]).filter((value): value is number => typeof value === 'number' && value > 0);
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}
