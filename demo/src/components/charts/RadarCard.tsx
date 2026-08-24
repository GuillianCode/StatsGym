import {Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip} from 'chart.js';
import {Radar} from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarCard({values}: {values: {name: string; value: number}[]}) {
  return <div className="chart-wrap"><Radar data={{
    labels: values.map(value => value.name),
    datasets: [{label: 'Note moyenne', data: values.map(value => value.value), borderColor: '#0a85ff', backgroundColor: 'rgba(10,133,255,.2)', pointBackgroundColor: '#a3d1ff'}],
  }} options={{responsive: true, maintainAspectRatio: false, plugins: {legend: {display: false}}, scales: {r: {min: 0, suggestedMax: Math.ceil(Math.max(...values.map(item => item.value)) + 1), ticks: {display: false}, grid: {color: 'rgba(255,255,255,.12)'}, angleLines: {color: 'rgba(255,255,255,.12)'}, pointLabels: {color: '#dbeafe', font: {size: 11}}}}}} /></div>;
}
