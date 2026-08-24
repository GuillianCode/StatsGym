import {useMemo, useState} from 'react';
import type {Athlete} from '../domain/types';
import {apparatusColors, apparatusOrder, averagesForMetric, evolutionForMetric, filterResults, metricLabel, programs, seasonMetric, type Metric} from '../domain/presentation';
import {Averages, Evolution, Panel} from './charts/StatisticsCharts';

export function Statistics({athlete}: {athlete: Athlete}) {
  const years = useMemo(() => [...new Set(athlete.results.map(result => result.s))].sort((a, b) => b - a), [athlete]);
  const availablePrograms = useMemo(() => programs(athlete.results), [athlete]);
  const [evolutionMetric, setEvolutionMetric] = useState<Metric>('nf');
  const [averageMetric, setAverageMetric] = useState<Metric>(athlete.discipline === 'GR' ? 'art' : 'nd');
  const [evolutionSeason, setEvolutionSeason] = useState('*');
  const [averageSeason, setAverageSeason] = useState(athlete.discipline === 'GAM' ? '2026' : '2025');
  const [evolutionProgram, setEvolutionProgram] = useState(athlete.discipline === 'GAM' ? 'Code FIG · 2025-2028' : '*');
  const [averageProgram, setAverageProgram] = useState('*');
  const [visible, setVisible] = useState(() => new Set(athlete.discipline === 'GAM' ? ['Sol', 'Barres parallèles'] : apparatusOrder[athlete.discipline]));
  const evolutionRows = filterResults(athlete, evolutionSeason, evolutionProgram);
  const averageRows = filterResults(athlete, averageSeason, averageProgram);
  const evolution = evolutionForMetric(evolutionRows, evolutionMetric, apparatusOrder[athlete.discipline]);
  const averages = averagesForMetric(averageRows, averageMetric, apparatusOrder[athlete.discipline]);
  const seasons = seasonMetric(athlete.results, athlete.discipline === 'GR' ? 'ne' : 'ne');
  const metricOptions: Metric[] = athlete.discipline === 'GR' ? ['ne', 'nd', 'art', 'nf'] : ['ne', 'nd', 'nf'];
  const chips = (value: string, setter: (value: string) => void, values: {value: string; label: string}[], label: string) => <div className="chip-line" aria-label={label}>{values.map(item => <button type="button" key={item.value} className={value === item.value ? 'active' : ''} onClick={() => setter(item.value)}>{item.label}</button>)}</div>;
  return <section className="tab-page statistics-page">
      <Panel title="Évolution" subtitle="">
        {chips(evolutionMetric, value => setEvolutionMetric(value as Metric), metricOptions.map(value => ({value, label: metricLabel(athlete.discipline, value)})), 'Type de note')}
        {chips(evolutionSeason, setEvolutionSeason, [{value: '*', label: 'Toutes'}, ...years.map(value => ({value: String(value), label: String(value)}))], 'Saison')}
        {chips(evolutionProgram, setEvolutionProgram, [{value: '*', label: 'Tous programmes'}, ...availablePrograms.map(value => ({value, label: value.replace('Code ', '')}))], 'Programme')}
        <Evolution data={evolution} visible={visible} discipline={athlete.discipline}/>
        <div className="interactive-legend">{evolution.series.map(row => <label key={row.name} style={{color: apparatusColors[athlete.discipline][row.name]}}><input type="checkbox" checked={visible.has(row.name)} onChange={() => setVisible(previous => {const next = new Set(previous); next.has(row.name) ? next.delete(row.name) : next.add(row.name); return next;})}/><i/><span>{row.name}</span></label>)}</div>
      </Panel>
      <Panel title={`Moyennes par ${athlete.discipline === 'GR' ? 'engin' : 'agrès'}`} subtitle="">
        {chips(averageMetric, value => setAverageMetric(value as Metric), metricOptions.map(value => ({value, label: metricLabel(athlete.discipline, value)})), 'Type de note')}
        {chips(averageSeason, setAverageSeason, [{value: '*', label: 'Toutes'}, ...years.map(value => ({value: String(value), label: String(value)}))], 'Saison')}
        {chips(averageProgram, setAverageProgram, [{value: '*', label: 'Tous programmes'}, ...availablePrograms.map(value => ({value, label: value.replace('Code ', '')}))], 'Programme')}
        <Averages values={averages} discipline={athlete.discipline}/>
      </Panel>
      <Panel title={`${athlete.discipline === 'GR' ? 'E' : 'NE'} — Saison par saison`} subtitle="Moyenne d’exécution, tous agrès confondus">
        <div className="season-table-wrap"><table className="average-table"><thead><tr><th>Saison</th><th>{metricLabel(athlete.discipline, 'ne')} moyenne</th><th>Évolution</th></tr></thead><tbody>{seasons.map((row, index) => <tr key={row.season}><td><strong>{row.season - 1}–{row.season}</strong></td><td>{row.value?.toFixed(2) ?? '—'}</td><td>{row.value != null && seasons[index - 1]?.value != null ? `${row.value - seasons[index - 1].value! >= 0 ? '+' : ''}${(row.value - seasons[index - 1].value!).toFixed(2)}` : '—'}</td></tr>)}</tbody></table></div>
      </Panel>
  </section>;
}
