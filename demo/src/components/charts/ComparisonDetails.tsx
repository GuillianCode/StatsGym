import {Bar, Line} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip} from 'chart.js';
import type {Competition} from '../../domain/types';
import {apparatusRows} from '../../domain/statistics';
import type {Metric} from '../../domain/presentation';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);
const options = {responsive: true, maintainAspectRatio: false, plugins: {legend: {labels: {color: '#fff', boxWidth: 11, font: {size: 11}}}}, scales: {x: {ticks: {color: 'rgba(255,255,255,.6)', font: {size: 10}}, grid: {display: false}}, y: {beginAtZero: true, ticks: {color: 'rgba(255,255,255,.6)'}, grid: {color: 'rgba(255,255,255,.07)'}}}} as const;

export function CompareBars({first, second, firstName, secondName}: {first: {name: string; value: number}[]; second: {name: string; value: number}[]; firstName: string; secondName: string}) {
  const labels = [...new Set([...first.map(row => row.name), ...second.map(row => row.name)])];
  return <div className="chart-wrap"><Bar data={{labels, datasets: [{label: firstName, data: labels.map(label => first.find(row => row.name === label)?.value ?? null), backgroundColor: '#0A84FF', borderRadius: 7}, {label: secondName, data: labels.map(label => second.find(row => row.name === label)?.value ?? null), backgroundColor: '#FF9F0A', borderRadius: 7}]}} options={options}/></div>;
}

function byDate(rows: Competition[], metric: Metric) {
  const values = new Map<string, number[]>();
  apparatusRows(rows).forEach(row => {const value = row[metric]; if (typeof value === 'number' && value > 0) values.set(row.competition.d, [...(values.get(row.competition.d) ?? []), value]);});
  return new Map([...values].map(([date, list]) => [date, list.reduce((sum, value) => sum + value, 0) / list.length]));
}

export function CompareEvolution({first, second, metric, firstName, secondName}: {first: Competition[]; second: Competition[]; metric: Metric; firstName: string; secondName: string}) {
  const a = byDate(first, metric), b = byDate(second, metric); const dates = [...new Set([...a.keys(), ...b.keys()])].sort();
  return <div className="chart-wrap"><Line data={{labels: dates.map(date => date.slice(0, 7)), datasets: [{label: firstName, data: dates.map(date => a.get(date) ?? null), borderColor: '#0A84FF', backgroundColor: '#0A84FF', spanGaps: true, tension: .35}, {label: secondName, data: dates.map(date => b.get(date) ?? null), borderColor: '#FF9F0A', backgroundColor: '#FF9F0A', spanGaps: true, tension: .35}]}} options={options}/></div>;
}
