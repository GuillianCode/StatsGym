import {useEffect, useRef} from 'react';
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
  const track = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const pages = useRef<Record<Tab, HTMLElement | null>>({apercu: null, competitions: null, statistiques: null, compare: null, classement: null});
  const activeIndex = tabs.findIndex(([value]) => value === tab);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const destination = pages.current[tab];
    if (header.current) header.current.style.transform = `translate3d(0,${-Math.min(destination?.scrollTop ?? 0, header.current.offsetHeight + 24)}px,0)`;
    node.scrollTo({left: node.clientWidth * activeIndex, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }, [activeIndex, athlete.id, tab]);

  useEffect(() => {Object.values(pages.current).forEach(page => page?.scrollTo({top: 0, behavior: 'auto'}));}, [athlete.id]);

  const syncHeader = (node: HTMLElement) => {
    if (header.current) header.current.style.transform = `translate3d(0,${-Math.min(node.scrollTop, header.current.offsetHeight + 24)}px,0)`;
  };
  const select = (value: Tab) => {
    if (value === tab) {
      pages.current[value]?.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
      return;
    }
    onTab(value);
  };

  return <main className={`profile-screen${tab === 'classement' ? ' survey-active' : ''}`}>
    <div className="profile-shell">
      <div className="profile-header-wrap" ref={header}><ProfileHeader athlete={athlete} onBack={onBack}/></div>
      <div className="tabs-track" ref={track}>
        <section ref={node => {pages.current.apercu = node;}} onScroll={event => tab === 'apercu' && syncHeader(event.currentTarget)} className="tab-slide"><Overview athlete={athlete}/></section>
        <section ref={node => {pages.current.competitions = node;}} onScroll={event => tab === 'competitions' && syncHeader(event.currentTarget)} className="tab-slide"><Competitions athlete={athlete}/></section>
        <section ref={node => {pages.current.statistiques = node;}} onScroll={event => tab === 'statistiques' && syncHeader(event.currentTarget)} className="tab-slide"><Statistics athlete={athlete}/></section>
        <section ref={node => {pages.current.compare = node;}} onScroll={event => tab === 'compare' && syncHeader(event.currentTarget)} className="tab-slide"><Comparison athlete={athlete} partner={partner}/></section>
        <section ref={node => {pages.current.classement = node;}} onScroll={event => tab === 'classement' && syncHeader(event.currentTarget)} className="tab-slide"><Survey/></section>
      </div>
    </div>
    <nav className="dock glass-panel" aria-label="Navigation de la fiche"><i className="dock-pill" aria-hidden="true" style={{transform: `translateX(${activeIndex * 100}%)`}}/>{tabs.map(([value, label]) => <button type="button" key={value} className={tab === value ? 'active' : ''} onClick={() => select(value)}>{label}</button>)}</nav>
  </main>;
}
