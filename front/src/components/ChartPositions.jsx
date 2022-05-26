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
import { Bar } from 'react-chartjs-2';
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

export const options = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'GENERAL EXPOSITIONS',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const labels = [currencies[0].name.replace(' - CHICAGO MERCANTILE EXCHANGE', ''), currencies[1].name.replace(' - CHICAGO MERCANTILE EXCHANGE', '')];

export const data = {
  labels,
  datasets: [
    {
      label: 'MANAGER',
      data: currencies[0].metrics.map(metric => metric.long.positions),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'MANAGER',
      data: currencies[0].metrics.map(metric => metric.short.positions),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'NON-COMERCIAL',
      data: currencies[0].metrics.map(metric => metric.short.positions),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};

export function ChartPositions() {
  return (
    <>
      <Bar options={options} data={data} />
    </>
  )
};
