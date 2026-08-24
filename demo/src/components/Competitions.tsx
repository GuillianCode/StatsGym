import type {Athlete, Competition} from '../domain/types';
import {apparatusColors, competitionGroups} from '../domain/presentation';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC'});
const score = (value: number | null | undefined) => value == null ? '—' : value.toFixed(2);
const rank = (value: number | null | undefined) => value ? `${value}${value === 1 ? 'er' : 'e'}` : '—';

function ApparatusTable({row, discipline}: {row: Competition; discipline: Athlete['discipline']}) {
  const gr = discipline === 'GR';
  return row.ag?.length ? <div className="apparatus-scroll"><table className="apparatus-table">
    <thead><tr><th>{gr ? 'Engin' : 'Agrès'}</th><th>NF</th><th>{gr ? 'D' : 'ND'}</th>{gr && <th>A</th>}<th>{gr ? 'E' : 'NE'}</th><th>Péna</th><th>Bonif</th>{!gr && <th>{row.ag.some(item => item.du) ? 'Duel' : 'Rang'}</th>}</tr></thead>
    <tbody>{row.ag.map((item, index) => <tr key={`${item.a}-${index}`}>
      <td><i style={{background: apparatusColors[discipline][item.a]}}/>{item.a}</td><td>{score(item.nf)}</td><td>{score(item.nd)}</td>{gr && <td>{score(item.art)}</td>}<td>{score(item.ne)}</td><td>{item.p ? score(item.p) : '—'}</td><td>{item.b ? `+${score(item.b)}` : '—'}</td>{!gr && <td>{item.du ? <b className={item.du === 'gagné' ? 'won' : 'lost'}>{item.du === 'gagné' ? 'Gagné' : 'Perdu'}</b> : rank(item.r)}</td>}
    </tr>)}</tbody>
  </table></div> : <p className="empty-note">Détail par {gr ? 'engin' : 'agrès'} non disponible pour cette compétition.</p>;
}

function Medal({value}: {value: number | null | undefined}) {
  return value && value <= 3 ? <span className={`rank-medal medal-${value}`} aria-label={`${rank(value)} place`}>{value}</span> : <small>{rank(value)}</small>;
}

function detailTitle(row: Competition, main: boolean) {
  if (main) return row.ph || 'Concours général';
  if (row.ph === 'Finale par agrès') return `Finale par agrès — ${row.pa || row.ag?.[0]?.a || ''}`;
  return row.ph || row.lb || 'Résultat supplémentaire';
}

export function Competitions({athlete}: {athlete: Athlete}) {
  const groups = competitionGroups(athlete.results);
  let previousSeason: number | null = null;
  return <section className="tab-page competitions-page">
    <h1 className="section-label">Compétitions</h1>
    <div className="competition-list">{groups.map(group => {
      const divider = previousSeason !== group.main.s;
      previousSeason = group.main.s;
      const headline = group.main;
      const rows = [group.main, ...group.extras].sort((a, b) => (a === group.main ? -1 : b === group.main ? 1 : (a.pa ?? '').localeCompare(b.pa ?? '')));
      const medal = rows.flatMap(row => [row.rg, row.ri]).find(value => value != null && value >= 1 && value <= 3);
      return <div className="competition-entry" key={group.key}>
        {divider && <div className="season-divider"><span>{headline.s - 1}–{headline.s}</span><i/></div>}
        <details className="competition-card glass-panel">
          <summary><span className="competition-copy"><strong>{headline.c}</strong><span>{dateFormatter.format(new Date(`${headline.d}T00:00:00Z`))} · {headline.l || 'Lieu non renseigné'}</span><em>{headline.co || headline.lb || 'Catégorie non renseignée'}</em><span className="competition-pills">{headline.n && <b className={`level level-${headline.n.toLowerCase()}`}>{headline.n}</b>}<b className={`format format-${headline.t}`}>{headline.t === 'EQU' ? 'Équipe' : 'Individuel'}</b>{group.extras.length > 0 && <small>＋ {group.extras.length} résultat{group.extras.length > 1 ? 's' : ''}</small>}</span></span>
            <span className="competition-score"><b>{score(headline.nf)}</b><Medal value={medal ?? (headline.rc ? null : headline.ri ?? headline.rg)}/>{headline.rc && <em className={headline.rc.startsWith('gagn') ? 'won' : 'lost'}>{headline.rc.replace(/^gagnée/i, 'Gagné').replace(/^perdue/i, 'Perdu')}</em>}<i>⌄</i></span>
          </summary>
          <div className="competition-detail">{rows.map((row, index) => <section key={`${row.ph}-${row.pa}-${index}`}><h3 className={row.ph === 'Finale par agrès' ? 'final-title' : ''}>{detailTitle(row, row === group.main)} <span>{score(row.nf)} · {rank(row.ri ?? row.rg)}</span></h3><ApparatusTable row={row} discipline={athlete.discipline}/></section>)}</div>
        </details>
      </div>;
    })}</div>
  </section>;
}
