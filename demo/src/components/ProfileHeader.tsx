import type {Athlete} from '../domain/types';
import {overview, seasons} from '../domain/statistics';

export function ProfileHeader({athlete, onBack}: {athlete: Athlete; onBack: () => void}) {
  const values = overview(athlete);
  const years = seasons(athlete.results);
  return <header className="profile-header glass-panel">
    <button className="back-button" type="button" onClick={onBack} aria-label="Retour à l’accueil">‹</button>
    <span className="profile-avatar">{athlete.firstName[0]}{athlete.lastName[0]}</span>
    <span><strong>{athlete.firstName} {athlete.lastName}</strong><small>{athlete.club}</small></span>
    <span className="profile-stat"><strong>{values.competitions}</strong><small>Compét.</small><em>{values.individualCompetitions} ind · {values.teamCompetitions} éq</em></span>
    <span className="profile-stat"><strong>{values.seasons}</strong><small>Saisons</small><em>{years[0]}–{years.at(-1)}</em></span>
  </header>;
}
