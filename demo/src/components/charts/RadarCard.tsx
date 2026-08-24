import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from 'chart.js';
import {Radar} from 'react-chartjs-2';
import {shortApparatus} from '../../domain/presentation';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarCard({values}: {values: {name: string; value: number}[]}) {
  return <div className="chart-wrap"><Radar data={{
    labels: values.map(value => shortApparatus(value.name)),
    datasets: [{label: 'NE moyenne', data: values.map(value => value.value), borderColor: '#0A84FF', borderWidth: 2, backgroundColor: 'rgba(10,132,255,.18)', pointBackgroundColor: '#0A84FF'}],
  }} options={{responsive: true, maintainAspectRatio: false, layout: {padding: {top: 2, bottom: 0, left: 4, right: 4}}, plugins: {legend: {display: false}}, scales: {r: {min: 0, max: Math.ceil(Math.max(...values.map(item => item.value)) + 1), ticks: {display: false, stepSize: 2}, grid: {color: 'rgba(255,255,255,.10)'}, angleLines: {color: 'rgba(255,255,255,.10)'}, pointLabels: {color: 'rgba(255,255,255,.80)', font: {size: 11}}}}}} /></div>;
}
