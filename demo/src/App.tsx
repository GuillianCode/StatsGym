import {useEffect, useState} from 'react';
import type {Discipline} from './domain/types';
import {comparisonPartners, visibleAthletes} from './domain/catalog';
import {NetworkBackground} from './components/NetworkBackground';
import {Home} from './components/Home';
import {Profile, type Tab} from './components/Profile';
import {analytics} from './lib/analytics';

type View = 'home' | 'profile';

export default function App() {
  const [discipline, setDiscipline] = useState<Discipline>('GAM');
  const [view, setView] = useState<View>('home');
  const [tab, setTab] = useState<Tab>('apercu');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('utm_source') === 'participant_share') analytics.capture('shared_demo_opened', {campaign: params.get('utm_campaign'), share_medium: params.get('utm_medium')});
    const onPop = () => {setView('home'); setTab('apercu');};
    addEventListener('popstate', onPop); return () => removeEventListener('popstate', onPop);
  }, []);

  const open = (destination: Tab) => {
    setTab(destination); setView('profile'); history.pushState({statsgym: true, view: 'profile', discipline, tab: destination}, '');
    analytics.capture('athlete_profile_opened', {athlete_name: `${visibleAthletes[discipline].firstName} ${visibleAthletes[discipline].lastName}`, discipline});
  };
  const back = () => {setView('home'); setTab('apercu'); history.replaceState({statsgym: true, view: 'home'}, '');};
  const changeTab = (value: Tab) => {setTab(value); history.replaceState({statsgym: true, view: 'profile', discipline, tab: value}, ''); analytics.capture('athlete_tab_viewed', {discipline, tab_name: value});};

  return <><NetworkBackground active={view === 'home'}/>{view === 'home' ? <Home discipline={discipline} onDiscipline={value => {setDiscipline(value); analytics.capture('discipline_selected', {discipline: value});}} onOpen={() => open('apercu')} onSurvey={() => open('classement')}/> : <Profile athlete={visibleAthletes[discipline]} partner={comparisonPartners[discipline]} tab={tab} onTab={changeTab} onBack={back}/>}</>;
}
