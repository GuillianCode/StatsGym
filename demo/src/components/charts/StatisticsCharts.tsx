import {useState, type ReactNode} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip} from 'chart.js';
import {apparatusColors, shortApparatus} from '../../domain/presentation';
import type {Discipline} from '../../domain/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const ticks = {color: 'rgba(255,255,255,.60)', font: {size: 10.5}};

export function Panel({title, subtitle, children}: {title: string; subtitle: string; children: ReactNode}) {
  const [collapsed, setCollapsed] = useState(false);
  return <article className={`glass-panel chart-panel rich-panel${collapsed ? ' collapsed' : ''}`}><button className="panel-title" type="button" onClick={() => setCollapsed(value => !value)} aria-expanded={!collapsed}><span><strong>{title}</strong><small>{subtitle}</small></span><i>⌄</i></button><div className="panel-body">{children}</div></article>;
}

export function Evolution({data, visible, discipline}: {data: {dates: string[]; series: {name: string; values: (number | null)[]}[]}; visible: Set<string>; discipline: Discipline}) {
  return <div className="fixed-axis-chart"><div className="chart-wrap wide"><Line data={{labels: data.dates.map(value => new Intl.DateTimeFormat('fr-FR', {day: '2-digit', month: 'short'}).format(new Date(`${value}T00:00:00Z`))), datasets: data.series.filter(row => visible.has(row.name)).map(row => ({label: row.name, data: row.values, borderColor: apparatusColors[discipline][row.name], backgroundColor: apparatusColors[discipline][row.name], tension: .35, spanGaps: true, pointRadius: 3, borderWidth: 2}))}} options={{responsive: true, maintainAspectRatio: false, interaction: {mode: 'nearest', intersect: false}, plugins: {legend: {display: false}}, scales: {x: {ticks: {...ticks, maxRotation: 45, minRotation: 45}, grid: {display: false}}, y: {beginAtZero: true, ticks, grid: {color: 'rgba(255,255,255,.07)'}}}}}/></div></div>;
}

export function Averages({values, discipline}: {values: {name: string; value: number}[]; discipline: Discipline}) {
  return <div className="chart-wrap average-bars"><Bar data={{labels: values.map(row => shortApparatus(row.name)), datasets: [{data: values.map(row => row.value), backgroundColor: values.map(row => apparatusColors[discipline][row.name]), borderRadius: 7, maxBarThickness: 28}]}} options={{responsive: true, maintainAspectRatio: false, plugins: {legend: {display: false}}, scales: {x: {ticks, grid: {display: false}}, y: {beginAtZero: true, ticks, grid: {color: 'rgba(255,255,255,.07)'}}}}}/></div>;
}
