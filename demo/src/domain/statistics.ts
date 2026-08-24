import type {ApparatusResult, Athlete, Competition} from './types';

const finite = (value: number | null | undefined): value is number => Number.isFinite(value);
export const formatScore = (value: number | null | undefined) => finite(value) ? value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '') : '—';

export function medals(results: Competition[]) {
  return results.reduce((count, result) => count + (result.rg != null && result.rg >= 1 && result.rg <= 3 ? 1 : 0), 0);
}

export function medalBreakdown(results: Competition[]) {
  return ([1, 2, 3] as const).map(rank => results.filter(result => result.rg === rank || result.ri === rank).length);
}

export function groupedCompetitions(results: Competition[]) {
  const groups = new Map<string, Competition[]>();
  for (const result of results) {
    const key = result.ci != null ? `c${result.ci}` : `${result.c}|${result.d}`;
    groups.set(key, [...(groups.get(key) ?? []), result]);
  }
  return [...groups.values()];
}

export function seasons(results: Competition[]) {
  return [...new Set(results.map(result => result.s))].sort((a, b) => a - b);
}

export function bestFinalScore(results: Competition[]) {
  return results.reduce<number | null>((best, result) => finite(result.nf) && (best == null || result.nf > best) ? result.nf : best, null);
}

export function apparatusRows(results: Competition[]) {
  return results.flatMap(result => (result.ag ?? []).map(apparatus => ({...apparatus, competition: result})));
}

export function apparatusAverages(results: Competition[], field: keyof ApparatusResult = 'nf') {
  const groups = new Map<string, number[]>();
  for (const row of apparatusRows(results)) {
    const value = row[field];
    if (!finite(value as number | null | undefined)) continue;
    const values = groups.get(row.a) ?? [];
    values.push(value as number);
    groups.set(row.a, values);
  }
  return [...groups].map(([name, values]) => ({
    name, value: values.reduce((sum, value) => sum + value, 0) / values.length,
    count: values.length,
  }));
}

const isFig = (result: Competition) => /^code fig/i.test(result.pr ?? '') && !/bonific|ffgym|aménagé/i.test(result.pr ?? '');

export function currentScoringRows(results: Competition[]) {
  const fig = results.filter(isFig);
  const current = fig.filter(result => result.s >= 2025);
  return current.length ? current : fig.length ? fig : results;
}

const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
const deviation = (values: number[]) => {
  const average = mean(values);
  return Math.sqrt(mean(values.map(value => (value - average) ** 2)));
};

const regularityReferences: Record<Athlete['discipline'], [number, number][]> = {
  GAM: [[0, 100], [.3173, 90], [.4048, 80], [.4796, 70], [.4928, 68], [.5417, 60], [.5984, 50], [.6496, 40], [.7092, 30], [.7693, 20], [.857, 10], [1.7678, 0]],
  GAF: [[0, 100], [.3302, 90], [.4062, 80], [.47, 70], [.4884, 67], [.5315, 60], [.5954, 50], [.6663, 40], [.7749, 30], [1.0416, 20], [2.6322, 10], [4.4536, 0]],
  GR: [[.1788, 100], [.4184, 90], [.4887, 80], [.5339, 70], [.576, 60], [.6069, 53], [.6212, 50], [.666, 40], [.7157, 30], [.7767, 20], [.8629, 10], [1.8337, 0]],
};

export function regularity(athlete: Athlete) {
  const fig = athlete.results.filter(isFig);
  let rows = fig.length ? fig : athlete.results;
  if (athlete.discipline === 'GR') {
    const comparable = rows.filter(result => result.ag?.some(apparatus => apparatus.art != null));
    if (comparable.length >= 3) rows = comparable;
  }
  const groups = new Map<string, number[]>();
  for (const row of apparatusRows(rows)) {
    if (!finite(row.ne) || row.ne <= 0) continue;
    groups.set(row.a, [...(groups.get(row.a) ?? []), row.ne]);
  }
  const deviations = [...groups.values()].filter(values => values.length >= 3).map(deviation);
  if (deviations.length < 3) return null;
  const value = mean(deviations);
  const references = regularityReferences[athlete.discipline];
  const upperIndex = references.findIndex(([threshold]) => value <= threshold);
  if (upperIndex <= 0) return upperIndex === 0 ? references[0][1] : 0;
  return references[upperIndex][1];
}

export function careerExecutionAverage(results: Competition[]) {
  const values = apparatusRows(results).map(row => row.ne).filter(finite).filter(value => value > 0);
  return values.length ? mean(values) : null;
}

export function evolutionBySeason(athlete: Athlete) {
  const values = new Map<number, number[]>();
  for (const result of athlete.results) {
    if (!finite(result.nf)) continue;
    const seasonValues = values.get(result.s) ?? [];
    seasonValues.push(result.nf);
    values.set(result.s, seasonValues);
  }
  return [...values].sort(([a], [b]) => a - b).map(([season, scores]) => ({
    season, value: scores.reduce((sum, score) => sum + score, 0) / scores.length,
  }));
}

export function overview(athlete: Athlete) {
  const groups = groupedCompetitions(athlete.results);
  return {
    competitions: groups.length,
    individualCompetitions: groups.filter(group => group[0]?.t !== 'EQU').length,
    teamCompetitions: groups.filter(group => group[0]?.t === 'EQU').length,
    seasons: seasons(athlete.results).length,
    medals: medals(athlete.results),
    bestScore: bestFinalScore(currentScoringRows(athlete.results)),
  };
}
