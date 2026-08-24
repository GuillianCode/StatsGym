import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from 'chart.js';
import {Radar} from 'react-chartjs-2';
import type {Athlete} from '../../domain/types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function ComparisonChart({first, second, firstValues, secondValues}: {first: Athlete; second: Athlete; firstValues: {name: string; value: number}[]; secondValues: {name: string; value: number}[]}) {
  const labels = [...new Set([...firstValues.map(row => row.name), ...secondValues.map(row => row.name)])];
  const values = (rows: {name: string; value: number}[]) => labels.map(label => rows.find(row => row.name === label)?.value ?? null);
  return <div className="chart-wrap tall"><Radar data={{labels, datasets: [
    {label: first.firstName, data: values(firstValues), borderColor: '#0a85ff', backgroundColor: 'rgba(10,133,255,.16)'},
    {label: second.firstName, data: values(secondValues), borderColor: '#bf5af2', backgroundColor: 'rgba(191,90,242,.12)'},
  ]}} options={{responsive: true, maintainAspectRatio: false, scales: {r: {ticks: {display: false}, grid: {color: 'rgba(255,255,255,.12)'}, angleLines: {color: 'rgba(255,255,255,.12)'}, pointLabels: {color: '#dbeafe'}}}, plugins: {legend: {labels: {color: '#fff'}}}}}/></div>;
}
