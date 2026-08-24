import type {Discipline} from '../domain/types';
import {visibleAthletes} from '../domain/catalog';

export function Home({discipline, onDiscipline, onOpen, onSurvey}: {
  discipline: Discipline;
  onDiscipline: (discipline: Discipline) => void;
  onOpen: () => void;
  onSurvey: () => void;
}) {
  const athlete = visibleAthletes[discipline];
  return <main className="home-screen">
    <section className="welcome-content">
      <header className="welcome-heading">
        <p className="welcome-kicker"><span>👋</span>&nbsp; BIENVENUE SUR</p>
        <h1>StatsGym</h1>
        <h2>Toute une carrière de gymnaste,<br/><span>enfin réunie.</span></h2>
      </header>
      <section className="demo-card glass-card" aria-label="Démo interactive">
        <div className="discipline-switch" role="tablist" aria-label="Discipline">
          <i className="discipline-pill" aria-hidden="true" style={{transform: `translateX(${(['GAM', 'GAF', 'GR'] as const).indexOf(discipline) * 100}%)`}}/>
          {(['GAM', 'GAF', 'GR'] as const).map(value => <button key={value} type="button" role="tab" aria-selected={discipline === value} className={discipline === value ? 'active' : ''} onClick={() => onDiscipline(value)}>{value}</button>)}
        </div>
        <button className="athlete-card" type="button" onClick={onOpen} aria-label={`Ouvrir la démo de ${athlete.firstName} ${athlete.lastName}`}>
          <span className="avatar">{athlete.firstName[0]}{athlete.lastName[0]}</span>
          <span className="athlete-copy"><strong>{athlete.firstName} {athlete.lastName}</strong><small>{athlete.club}</small></span>
          <span className="arrow">›</span>
        </button>
        <p className="invite"><span>👉</span> Clique sur la fiche pour explorer la démo</p>
      </section>
      <button className="access-card glass-card" type="button" onClick={onSurvey}>
        <strong>Accède à tes propres statistiques.</strong>
        <span className="access-copy">Cette démo présente la carrière de 3 gymnastes.<b>Pour demander l’accès à tes propres données, et nous aider à créer l’outil idéal…</b><em>ÇA SE PASSE JUSTE ICI 👇</em></span>
        <span className="access-action">💬&nbsp; Je demande l’accès à mes statistiques <i>→</i></span>
      </button>
    </section>
    <p className="welcome-footer">StatsGym · Un projet créé pour &amp; par la communauté gym 🇫🇷</p>
  </main>;
}
