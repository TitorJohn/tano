import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import currencies from '../../../2022-05-10.json'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  scales: {
    x: {
      stacked: true,
    }
  }
};

const labels = currencies[0].metrics.map(metric => metric.name);


export const data = {
  labels,
  datasets: [
    {
      label: 'long',
      data: currencies[0].metrics.map(metric => metric.long.positions),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'short',
      data: currencies[0].metrics.map(metric => metric.short.positions),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'spreading',
      data: currencies[0].metrics.map(metric => metric.spreading.positions),
      backgroundColor: 'rgba(53, 0, 235, 0.5)',
    },
  ],
};

export function ChartPositions() {
  const [toggle, setToggle] = useState(true)
  return (
    <>
      <button onClick={() => setToggle(!toggle)}>Change graph</button>
      {toggle ?
        <Bar options={options} data={data} /> :
        <Line options={options} data={data} />
      }
    </>
  )
};
