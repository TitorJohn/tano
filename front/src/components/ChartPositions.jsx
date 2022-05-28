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

const labels = [currencies[0].name.replace(' - CHICAGO MERCANTILE EXCHANGE', ''), currencies[1].name.replace(' - CHICAGO MERCANTILE EXCHANGE', '')];

let currencyIndex;
let labelIndex;
export const data = {
  labels,
  datasets: [
    {
      label: 'MANAGER',
      data: currencies[0].metrics.map(metric => metric.long.positions),
      backgroundColor: '',
    },
    {
      label: 'MANAGER',
      data: currencies[0].metrics.map(metric => metric.short.positions),
      backgroundColor: '',
    },
    {
      label: 'NON-COMERCIAL',
      data: currencies[0].metrics.map(metric => metric.short.positions),
      backgroundColor: '',
    }
  ],
};

export function ChartPositions(props) {
  const options = {
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'GENERAL EXPOSITIONS',
    },
  },
  onClick : (event, clickedElements) => barClickHandler(event, clickedElements),
  responsive: true,
  maintainAspectRatio: false,
  };

  function barClickHandler(event, clickedElements){
    if (clickedElements.length === 0) return

      const currencyIndex  = clickedElements[0].index;
      const labelIndex = clickedElements[0].datasetIndex;
      //index is the data.labels ; datasetindex is the data.datasets.label
      console.log("index: ",currencyIndex,"dataset index: ",labelIndex);
      console.log(data.labels[currencyIndex], " : ", data.datasets[labelIndex].label);

      props.setCurrencyIndex(currencyIndex);
      props.setLabelIndex(labelIndex);
  }

  //data.datasets[0].backgroundColor = props?.testdata;
  for(let i = 0; i < data.datasets.length; i++){
    data.datasets[i].backgroundColor = props.bgColors[i];
    console.log(data.datasets[i].backgroundColor);
    //data.datasets[0].backgroundColor = "rgba(203, 6, 247, 0.5)";
  };
  return (
    <>
      <Bar options={options} data={data} />
    </>
  )
};
