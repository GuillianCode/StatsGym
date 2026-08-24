import {lazy, Suspense, useMemo, useState} from 'react';
import type {Athlete} from '../domain/types';
import {apparatusAverages} from '../domain/statistics';

const ComparisonChart = lazy(() => import('./charts/ComparisonChart'));

export function Comparison({athlete, partner}: {athlete: Athlete; partner: Athlete}) {
  const shared = useMemo(() => [...new Set(athlete.results.map(row => row.gr).filter(Boolean))].filter(program => partner.results.some(row => row.gr === program)) as string[], [athlete, partner]);
  const [program, setProgram] = useState(shared.at(-1) ?? '*');
  const filter = (person: Athlete) => program === '*' ? person.results : person.results.filter(result => result.gr === program);
  return <section className="tab-page comparison-page">
    <article className="glass-panel compare-heading"><p>Comparer avec :</p><div><span className="profile-avatar small">{partner.firstName[0]}{partner.lastName[0]}</span><strong>{partner.firstName} {partner.lastName}</strong><small>{partner.club}</small></div></article>
    <div className="filter-row glass-panel"><label>Programme commun <select value={program} onChange={event => setProgram(event.target.value)}><option value="*">Tous les programmes</option>{shared.map(value => <option key={value}>{value}</option>)}</select></label></div>
    <article className="glass-panel chart-panel"><h2>Profil comparé par {athlete.discipline === 'GR' ? 'engin' : 'agrès'}</h2><Suspense fallback={<div className="chart-skeleton">Chargement…</div>}><ComparisonChart first={athlete} second={partner} firstValues={apparatusAverages(filter(athlete))} secondValues={apparatusAverages(filter(partner))}/></Suspense></article>
  </section>;
}
