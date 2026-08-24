import {useEffect, useState} from 'react';
import type {Discipline} from './domain/types';
import {comparisonPartners, visibleAthletes} from './domain/catalog';
import {NetworkBackground} from './components/NetworkBackground';
import {Home} from './components/Home';
import {Profile, type Tab} from './components/Profile';
import {analytics} from './lib/analytics';
import {surveySchemaVersion} from '@statsgym/contracts';

type View = 'home' | 'profile';

export default function App() {
  const [discipline, setDiscipline] = useState<Discipline>('GAM');
  const [view, setView] = useState<View>('home');
  const [tab, setTab] = useState<Tab>('apercu');
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('utm_source') === 'participant_share') analytics.capture('shared_demo_opened', {survey: 'new-sondage', survey_schema_version: surveySchemaVersion, campaign: params.get('utm_campaign'), share_medium: params.get('utm_medium')});
    history.replaceState({statsgym: true, view: 'home', discipline, tab: 'apercu'}, '');
    const onPop = (event: PopStateEvent) => {
      const state = event.state as {statsgym?: boolean; view?: View; discipline?: Discipline; tab?: Tab} | null;
      if (state?.statsgym && state.view === 'profile' && state.discipline && state.tab) {
        setDiscipline(state.discipline); setTab(state.tab); setView('profile');
      } else { setView('home'); setTab('apercu'); }
    };
    addEventListener('popstate', onPop); return () => removeEventListener('popstate', onPop);
  // The initial discipline is deliberately captured once, like the legacy demo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && view === 'profile') back(); };
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey);
  });

  const open = (destination: Tab) => {
    setTab(destination); setView('profile'); history.pushState({statsgym: true, view: 'profile', discipline, tab: destination}, '');
    analytics.capture('athlete_profile_opened', {profile_role: 'visible_demo', discipline});
  };
  const back = () => {setView('home'); setTab('apercu'); history.replaceState({statsgym: true, view: 'home', discipline, tab: 'apercu'}, '');};
  const changeTab = (value: Tab) => {setTab(value); history.replaceState({statsgym: true, view: 'profile', discipline, tab: value}, ''); analytics.capture('athlete_tab_viewed', {discipline, tab_name: value});};

  return <><NetworkBackground active={view === 'home'}/>{view === 'home' ? <Home discipline={discipline} onDiscipline={value => {setDiscipline(value); analytics.capture('discipline_selected', {discipline: value});}} onOpen={() => open('apercu')} onSurvey={() => open('classement')}/> : <Profile athlete={visibleAthletes[discipline]} partner={comparisonPartners[discipline]} tab={tab} onTab={changeTab} onBack={back}/>}</>;
}
