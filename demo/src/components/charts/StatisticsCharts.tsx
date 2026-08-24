import {Bar, Line} from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const common = {responsive: true, maintainAspectRatio: false, plugins: {legend: {display: false}}, scales: {x: {ticks: {color: '#b7c3dd'}, grid: {display: false}}, y: {ticks: {color: '#b7c3dd'}, grid: {color: 'rgba(255,255,255,.09)'}}}} as const;

export default function StatisticsCharts({averages, evolution}: {averages: {name: string; value: number}[]; evolution: {season: number; value: number}[]}) {
  return <>
    <article className="glass-panel chart-panel"><h2>Note moyenne par agrès</h2><div className="chart-wrap"><Bar data={{labels: averages.map(row => row.name), datasets: [{data: averages.map(row => row.value), backgroundColor: '#0a85ff', borderRadius: 8}]}} options={common}/></div></article>
    <article className="glass-panel chart-panel"><h2>Évolution saison par saison</h2><div className="chart-wrap"><Line data={{labels: evolution.map(row => row.season), datasets: [{data: evolution.map(row => row.value), borderColor: '#a855f7', backgroundColor: 'rgba(168,85,247,.18)', fill: true, tension: .32}]}} options={common}/></div></article>
  </>;
}
