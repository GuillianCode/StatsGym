import {lazy, Suspense} from 'react';
import type {Athlete} from '../domain/types';
import {apparatusAverages, careerExecutionAverage, currentScoringRows, medalBreakdown, regularity} from '../domain/statistics';
import {apparatusOrder} from '../domain/presentation';

const RadarCard = lazy(() => import('./charts/RadarCard'));

export function Overview({athlete}: {athlete: Athlete}) {
  const currentRows = currentScoringRows(athlete.results);
  const best = currentRows.reduce((winner, result) => (result.nf ?? -Infinity) > (winner?.nf ?? -Infinity) ? result : winner, currentRows[0]);
  const execution = careerExecutionAverage(athlete.results);
  const difficulty = apparatusAverages(currentRows, 'nd').sort((a, b) => b.value - a.value);
  const score = regularity(athlete);
  const medals = medalBreakdown(athlete.results);
  const averages = apparatusAverages(athlete.results).sort((a, b) => apparatusOrder[athlete.discipline].indexOf(a.name) - apparatusOrder[athlete.discipline].indexOf(b.name));
  return <section className="tab-page overview-page">
    <h1 className="section-label">Aperçu</h1>
    <div className="kpi-grid">
      <article className="glass-panel kpi"><span>Meilleure NF</span><strong>{best?.nf?.toFixed(2) ?? '—'}</strong><small>{best ? `${best.c.slice(0, 30)}${best.c.length > 30 ? '…' : ''} · ${best.d.slice(0, 4)}` : '—'}</small></article>
      <article className="glass-panel kpi"><span>NE moyenne (carrière)</span><strong>{execution?.toFixed(2) ?? '—'}</strong><small>Tous {athlete.discipline === 'GR' ? 'engins' : 'agrès'} confondus</small></article>
      <article className="glass-panel kpi"><span>{athlete.discipline === 'GR' ? 'Engin' : 'Agrès'} fort</span><strong className="tag-good">{difficulty[0]?.name ?? '—'}</strong><small>{athlete.discipline === 'GR' ? 'D' : 'ND'} moy. {difficulty[0]?.value.toFixed(2) ?? '—'}</small></article>
      <article className="glass-panel kpi"><span>{athlete.discipline === 'GR' ? 'Engin' : 'Agrès'} à travailler</span><strong className="tag-bad">{difficulty.at(-1)?.name ?? '—'}</strong><small>{athlete.discipline === 'GR' ? 'D' : 'ND'} moy. {difficulty.at(-1)?.value.toFixed(2) ?? '—'}</small></article>
      <article className="glass-panel kpi regularity-kpi"><span>Score de régularité</span><strong>{score == null ? '—' : `${score}/100`}</strong><small>{score == null ? 'Pas assez de compétitions' : score >= 80 ? 'très régulier' : score >= 60 ? 'régulier' : score >= 40 ? 'dans la moyenne' : score >= 20 ? 'irrégulier' : 'très irrégulier'}</small>{score != null && <i><b style={{width: `${score}%`}} /></i>}</article>
      <article className="glass-panel kpi medal-kpi"><span>Podiums</span><div className="medals"><b>{medals[0]}</b><b>{medals[1]}</b><b>{medals[2]}</b></div></article>
    </div>
    <article className="glass-panel chart-panel">
      <h2>Profil par {athlete.discipline === 'GR' ? 'engin' : 'agrès'}</h2>
      <Suspense fallback={<div className="chart-skeleton">Chargement du graphique…</div>}><RadarCard values={averages}/></Suspense>
    </article>
  </section>;
}
