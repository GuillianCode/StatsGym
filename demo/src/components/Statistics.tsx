import {lazy, Suspense, useMemo, useState} from 'react';
import type {Athlete} from '../domain/types';
import {apparatusAverages, evolutionBySeason} from '../domain/statistics';

const StatisticsCharts = lazy(() => import('./charts/StatisticsCharts'));

export function Statistics({athlete}: {athlete: Athlete}) {
  const programs = useMemo(() => [...new Set(athlete.results.map(result => result.gr).filter(Boolean) as string[])], [athlete]);
  const [program, setProgram] = useState('*');
  const rows = program === '*' ? athlete.results : athlete.results.filter(result => result.gr === program);
  return <section className="tab-page statistics-page">
    <div className="filter-row glass-panel"><label>Programme comparable <select value={program} onChange={event => setProgram(event.target.value)}><option value="*">Tous les programmes</option>{programs.map(value => <option key={value}>{value}</option>)}</select></label></div>
    <Suspense fallback={<div className="glass-panel chart-skeleton">Chargement des graphiques…</div>}><StatisticsCharts averages={apparatusAverages(rows)} evolution={evolutionBySeason({...athlete, results: rows})}/></Suspense>
  </section>;
}
