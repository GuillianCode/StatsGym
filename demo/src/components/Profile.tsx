import type {Athlete} from '../domain/types';
import {ProfileHeader} from './ProfileHeader';
import {Overview} from './Overview';
import {Competitions} from './Competitions';
import {Statistics} from './Statistics';
import {Comparison} from './Comparison';
import {Survey} from './Survey';

export type Tab = 'apercu' | 'competitions' | 'statistiques' | 'compare' | 'classement';
const tabs: [Tab, string][] = [['apercu', 'Aperçu'], ['competitions', 'Compétitions'], ['statistiques', 'Statistiques'], ['compare', 'Comparer'], ['classement', 'Le projet']];

export function Profile({athlete, partner, tab, onTab, onBack}: {athlete: Athlete; partner: Athlete; tab: Tab; onTab: (tab: Tab) => void; onBack: () => void}) {
  return <main className={`profile-screen${tab === 'classement' ? ' survey-active' : ''}`}>
    <div className="profile-shell"><ProfileHeader athlete={athlete} onBack={onBack}/>
      {tab === 'apercu' && <Overview athlete={athlete}/>} {tab === 'competitions' && <Competitions athlete={athlete}/>} {tab === 'statistiques' && <Statistics athlete={athlete}/>} {tab === 'compare' && <Comparison athlete={athlete} partner={partner}/>} {tab === 'classement' && <Survey/>}
    </div>
    <nav className="dock" aria-label="Navigation de la fiche">{tabs.map(([value, label]) => <button type="button" key={value} className={tab === value ? 'active' : ''} onClick={() => onTab(value)}>{label}</button>)}</nav>
  </main>;
}
