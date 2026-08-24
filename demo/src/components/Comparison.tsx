import {useMemo, useState, type MouseEvent} from 'react';
import type {Athlete} from '../domain/types';
import {bestFinalScore, medalBreakdown, regularity} from '../domain/statistics';
import {apparatusOrder, averagesForMetric, filterResults, meanApparatus, metricLabel, programs, seasonMetric, type Metric} from '../domain/presentation';
import ComparisonChart from './charts/ComparisonChart';
import {CompareBars, CompareEvolution} from './charts/ComparisonDetails';

export function Comparison({athlete, partner}: {athlete: Athlete; partner: Athlete}) {
  const shared = useMemo(() => programs(athlete.results).filter(program => partner.results.some(row => row.gr === program)), [athlete, partner]);
  const seasons = useMemo(() => [...new Set([...athlete.results, ...partner.results].map(row => row.s))].sort((a, b) => b - a), [athlete, partner]);
  const [selected, setSelected] = useState(false);
  const [season, setSeason] = useState('*');
  const defaultProgram = athlete.discipline === 'GAM' ? 'Imposés FFGym Mouvements 4 à 6' : athlete.discipline === 'GAF' ? 'Code FIG + bonifications' : 'Code FIG GR · 2021-2024';
  const [program, setProgram] = useState(shared.includes(defaultProgram) ? defaultProgram : shared.at(-1) ?? '*');
  const [apparatus, setApparatus] = useState('*');
  const [format, setFormat] = useState('*');
  const [metric, setMetric] = useState<Metric>(athlete.discipline === 'GAF' ? 'nd' : athlete.discipline === 'GR' ? 'nf' : 'ne');
  const filter = (person: Athlete) => filterResults(person, season, program, apparatus).filter(row => format === '*' || row.t === format);
  const firstRows = filter(athlete), secondRows = filter(partner);
  const order = apparatusOrder[athlete.discipline];
  const firstAverages = averagesForMetric(firstRows, metric, order), secondAverages = averagesForMetric(secondRows, metric, order);
  const strongWeak = (rows: typeof firstRows) => {const values = averagesForMetric(rows, 'nf', order).sort((a, b) => b.value - a.value); return [values[0]?.name ?? '—', values.at(-1)?.name ?? '—'];};
  const score = (value: number | null) => value == null ? '—' : value.toFixed(2);
  const duo = (a: string | number, b: string | number, higher = true) => <div className="duo"><span className={higher && Number(a) > Number(b) ? 'winner' : ''}>{a}</span><i>vs</i><span className={higher && Number(b) > Number(a) ? 'winner' : ''}>{b}</span></div>;
  const metricOptions: Metric[] = athlete.discipline === 'GR' ? ['ne', 'nd', 'art', 'nf'] : ['ne', 'nd', 'nf'];
  const selectPartner = (event: MouseEvent<HTMLButtonElement>) => {
    const scroller = event.currentTarget.closest('.tab-slide');
    setSelected(true);
    requestAnimationFrame(() => scroller?.scrollTo({top: 0, behavior: 'auto'}));
  };
  return <section className="tab-page comparison-page">
    {!selected && <button type="button" className="glass-panel compare-heading" onClick={selectPartner}><p>Comparer avec :</p><div><span className="profile-avatar small">{partner.firstName[0]}{partner.lastName[0]}</span><strong>{partner.firstName} {partner.lastName}</strong><small>{partner.club}</small><i>›</i></div></button>}
    {selected && <>
      <div className="compare-filters glass-panel">
        <div className="compare-names"><span><i/> {athlete.firstName} {athlete.lastName}</span><span><i/> {partner.firstName} {partner.lastName}</span></div>
        <FilterChips label="Saison" value={season} onChange={setSeason} options={[['*', 'Toutes'], ...seasons.map(item => [String(item), String(item)] as [string, string])]}/>
        <FilterChips label="Programme" value={program} onChange={setProgram} options={[['*', 'Tous'], ...shared.map(item => [item, item.replace('Imposés FFGym Mouvements ', 'Imposés ').replace('Code FIG · 2025-2028', 'FIG 25-28').replace('Code FIG · 2021-2024', 'FIG 21-24').replace('Code FIG junior · 2021-2024', 'Junior 21-24') ] as [string, string])]}/>
        <FilterChips label={athlete.discipline === 'GR' ? 'Engin' : 'Agrès'} value={apparatus} onChange={setApparatus} options={[['*', 'Tous'], ...order.map(item => [item, item] as [string, string])]}/>
        <FilterChips label="Type" value={format} onChange={setFormat} options={[['*', 'Tous'], ['IND', 'Individuel'], ['EQU', 'Équipe']]}/>
        <p className="result-count">{firstRows.length} résultat{firstRows.length > 1 ? 's' : ''} pour {athlete.firstName} {athlete.lastName} · {secondRows.length} pour {partner.firstName} {partner.lastName}</p>
      </div>
      <h2 className="section-label">Duel</h2>
      <div className="duel-grid">
        <article className="glass-panel duel-card"><span>Meilleure NF</span>{duo(score(bestFinalScore(firstRows)), score(bestFinalScore(secondRows)))}</article>
        <article className="glass-panel duel-card"><span>Régularité</span>{duo(regularity({...athlete, results: firstRows}) ?? '—', regularity({...partner, results: secondRows}) ?? '—')}</article>
        <article className="glass-panel duel-card"><span>{metricLabel(athlete.discipline, 'ne')} moyenne</span>{duo(score(meanApparatus(firstRows, 'ne')), score(meanApparatus(secondRows, 'ne')))}</article>
        <article className="glass-panel duel-card"><span>{metricLabel(athlete.discipline, 'nd')} moyenne</span>{duo(score(meanApparatus(firstRows, 'nd')), score(meanApparatus(secondRows, 'nd')))}</article>
        <article className="glass-panel duel-card podium-duel"><span>Podiums · {athlete.firstName} {athlete.lastName}</span><div className="medals">{medalBreakdown(firstRows).map((value, index) => <b key={index}>{value}</b>)}</div></article>
        <article className="glass-panel duel-card podium-duel"><span>Podiums · {partner.firstName} {partner.lastName}</span><div className="medals">{medalBreakdown(secondRows).map((value, index) => <b key={index}>{value}</b>)}</div></article>
        <article className="glass-panel duel-card"><span>{athlete.discipline === 'GR' ? 'Engin' : 'Agrès'} fort</span>{duo(strongWeak(firstRows)[0], strongWeak(secondRows)[0], false)}</article>
        <article className="glass-panel duel-card"><span>À travailler</span>{duo(strongWeak(firstRows)[1], strongWeak(secondRows)[1], false)}</article>
      </div>
      <article className="glass-panel chart-panel rich-panel"><div className="panel-heading"><strong>Profil comparé</strong><small>NF moyenne par {athlete.discipline === 'GR' ? 'engin' : 'agrès'}</small></div><ComparisonChart first={athlete} second={partner} firstValues={averagesForMetric(firstRows, 'nf', order)} secondValues={averagesForMetric(secondRows, 'nf', order)}/></article>
      <article className="glass-panel chart-panel rich-panel"><div className="panel-heading"><strong>Par {athlete.discipline === 'GR' ? 'engin' : 'agrès'}</strong><small>{metricLabel(athlete.discipline, metric)} moyenne sur la sélection</small></div><div className="chip-line">{metricOptions.map(value => <button type="button" className={metric === value ? 'active' : ''} onClick={() => setMetric(value)} key={value}>{metricLabel(athlete.discipline, value)}</button>)}</div><CompareBars first={firstAverages} second={secondAverages} firstName={athlete.firstName} secondName={partner.firstName}/><ComparisonTable first={firstAverages} second={secondAverages} firstName={athlete.firstName} secondName={partner.firstName}/></article>
      <article className="glass-panel chart-panel rich-panel"><div className="panel-heading"><strong>Évolution</strong><small>{metricLabel(athlete.discipline, metric)} moyenne par compétition</small></div><CompareEvolution first={firstRows} second={secondRows} metric={metric} firstName={athlete.firstName} secondName={partner.firstName}/></article>
      {season === '*' && <article className="glass-panel chart-panel rich-panel"><div className="panel-heading"><strong>Saison par saison</strong><small>{metricLabel(athlete.discipline, 'ne')} moyenne</small></div><SeasonTable first={seasonMetric(filterResults(athlete, '*', program, apparatus), 'ne')} second={seasonMetric(filterResults(partner, '*', program, apparatus), 'ne')} firstName={athlete.firstName} secondName={partner.firstName}/></article>}
    </>}
  </section>;
}

function FilterChips({label, value, onChange, options}: {label: string; value: string; onChange: (value: string) => void; options: [string, string][]}) {
  return <div className="compare-chip-row"><span>{label}</span><div>{options.map(([key, text]) => <button type="button" key={key} className={key === value ? 'active' : ''} onClick={() => onChange(key)}>{text}</button>)}</div></div>;
}

function ComparisonTable({first, second, firstName, secondName}: {first: {name: string; value: number}[]; second: {name: string; value: number}[]; firstName: string; secondName: string}) {
  const labels = [...new Set([...first.map(row => row.name), ...second.map(row => row.name)])];
  return <div className="season-table-wrap"><table className="average-table"><thead><tr><th>Agrès</th><th>{firstName}</th><th>{secondName}</th><th>Écart</th></tr></thead><tbody>{labels.map(label => {const a = first.find(row => row.name === label)?.value, b = second.find(row => row.name === label)?.value; return <tr key={label}><td><strong>{label}</strong></td><td>{a?.toFixed(2) ?? '—'}</td><td>{b?.toFixed(2) ?? '—'}</td><td className={a != null && b != null && a - b >= 0 ? 'positive' : 'negative'}>{a != null && b != null ? `${a - b >= 0 ? '+' : ''}${(a - b).toFixed(2)}` : '—'}</td></tr>;})}</tbody></table></div>;
}

function SeasonTable({first, second, firstName, secondName}: {first: {season: number; value: number | null}[]; second: {season: number; value: number | null}[]; firstName: string; secondName: string}) {
  const seasons = [...new Set([...first.map(row => row.season), ...second.map(row => row.season)])].sort();
  return <div className="season-table-wrap"><table className="average-table"><thead><tr><th>Saison</th><th>{firstName}</th><th>{secondName}</th><th>Écart</th></tr></thead><tbody>{seasons.map(season => {const a = first.find(row => row.season === season)?.value, b = second.find(row => row.season === season)?.value; return <tr key={season}><td><strong>{season - 1}–{season}</strong></td><td>{a?.toFixed(2) ?? '—'}</td><td>{b?.toFixed(2) ?? '—'}</td><td>{a != null && b != null ? (a - b).toFixed(2) : '—'}</td></tr>;})}</tbody></table></div>;
}
