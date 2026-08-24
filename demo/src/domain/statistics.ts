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

const regularityReferences: Record<Athlete['discipline'], number[]> = {
  GAF: [0,.1969,.2273,.2484,.2649,.2778,.2894,.3008,.3113,.3208,.3302,.3388,.3471,.3551,.3631,.37,.3775,.3852,.3923,.3993,.4062,.4132,.4195,.4261,.4323,.4388,.4447,.4509,.4573,.4636,.47,.4759,.4822,.4884,.4944,.5008,.5071,.5131,.5194,.525,.5315,.5377,.5441,.5503,.5569,.5628,.569,.5758,.5822,.5887,.5954,.6019,.6083,.6153,.6223,.6291,.6361,.6435,.6508,.6586,.6663,.6745,.683,.6912,.7002,.709,.7182,.728,.7395,.7506,.7624,.7749,.7882,.8036,.8188,.8373,.8587,.8854,.917,.9622,1.0416,1.2676,1.8081,2.1085,2.2905,2.4199,2.5316,2.6322,2.7137,2.7885,2.8665,2.9309,3.0028,3.0716,3.1444,3.2217,3.3076,3.399,3.5084,3.6563,4.4536],
  GAM: [0,.1684,.2036,.224,.241,.2588,.2727,.2848,.2951,.3069,.3173,.3273,.3364,.3443,.3539,.3641,.3728,.3819,.3887,.3977,.4048,.4134,.4201,.4278,.4357,.4443,.4516,.4585,.4652,.4729,.4796,.4865,.4928,.498,.5051,.5105,.5167,.5222,.529,.5356,.5417,.5473,.5521,.5582,.5636,.5699,.5756,.5822,.5879,.5931,.5984,.604,.6088,.6135,.6186,.6232,.6288,.6336,.6385,.6444,.6496,.6553,.6604,.6656,.6716,.677,.6831,.6879,.6934,.699,.7037,.7092,.7149,.7216,.7277,.7339,.7415,.7488,.7544,.7618,.7693,.7771,.7833,.7911,.7998,.808,.8164,.8266,.8377,.8476,.857,.868,.8823,.8951,.9109,.9336,.9553,.9821,1.0216,1.0972,1.7678],
  GR: [.1788,.2772,.3107,.3353,.3511,.3644,.3801,.3905,.4002,.4069,.4184,.4257,.4382,.4471,.4555,.4618,.4673,.4726,.4771,.4842,.4887,.4919,.4963,.5023,.5072,.5114,.5179,.5216,.5264,.5305,.5339,.5371,.542,.5462,.5508,.5538,.5591,.5629,.5673,.5713,.576,.5797,.5861,.5912,.5953,.5986,.6025,.6069,.6121,.6163,.6212,.624,.6295,.633,.6365,.6402,.6451,.65,.6572,.6616,.666,.6733,.6782,.6817,.6862,.6904,.6938,.6993,.7033,.7091,.7157,.7233,.7296,.7335,.7384,.7457,.7507,.7563,.7622,.7701,.7767,.7845,.7923,.8027,.8111,.8215,.8301,.8403,.8527,.8629,.8742,.8868,.8971,.9152,.9333,.9567,.9845,1.0234,1.0862,1.1604,1.8337],
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
  const percentile = regularityReferences[athlete.discipline].findIndex(threshold => value <= threshold);
  return percentile < 0 ? 0 : 100 - percentile;
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
