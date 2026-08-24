import {useMemo, useState} from 'react';
import type {Athlete} from '../domain/types';
import {formatScore} from '../domain/statistics';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'});

export function Competitions({athlete}: {athlete: Athlete}) {
  const years = useMemo(() => [...new Set(athlete.results.map(result => result.s))].sort((a, b) => b - a), [athlete]);
  const [year, setYear] = useState<number | 'all'>('all');
  const rows = year === 'all' ? [...athlete.results].reverse() : athlete.results.filter(result => result.s === year).reverse();
  return <section className="tab-page competitions-page">
    <div className="filter-row glass-panel"><label>Afficher la saison <select value={year} onChange={event => setYear(event.target.value === 'all' ? 'all' : Number(event.target.value))}><option value="all">Toutes</option>{years.map(value => <option value={value} key={value}>{value}</option>)}</select></label></div>
    <div className="competition-list">{rows.map((result, index) => <details className="competition-card glass-panel" key={`${result.d}-${result.c}-${index}`}>
      <summary><span><small>{dateFormatter.format(new Date(`${result.d}T00:00:00Z`))} · {result.l || 'Lieu non renseigné'}</small><strong>{result.c}</strong><em>{result.co || result.lb || result.ph || 'Compétition'}</em></span><span className="score"><b>{formatScore(result.nf)}</b>{result.rg ? <small>{result.rg}<sup>e</sup></small> : null}</span></summary>
      <div className="apparatus-table">{(result.ag ?? []).map((apparatus, apparatusIndex) => <div key={`${apparatus.a}-${apparatusIndex}`}><strong>{apparatus.a}</strong><span>NF {formatScore(apparatus.nf)}</span><span>{apparatus.nd != null ? `D ${formatScore(apparatus.nd)}` : ''}</span><span>{apparatus.ne != null ? `E ${formatScore(apparatus.ne)}` : ''}</span></div>)}</div>
    </details>)}</div>
  </section>;
}
