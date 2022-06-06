import React from 'react';
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
import currencies from '../../../files/2022-05-10.json'
import { TradingsterTable } from './TradingsterTable';


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

//const labels = [currencies[0].name.replace(' - CHICAGO MERCANTILE EXCHANGE', ''), currencies[1].name.replace(' - CHICAGO MERCANTILE EXCHANGE', '')];  
const labels = ["long", "short"]

const assetManager = currencies[0].metrics[1]
const leveragedFunds = currencies[0].metrics[2]

const assetManagerData = [assetManager.long.positions, assetManager.short.positions]
const leveragedFundsData = [leveragedFunds.long.positions, leveragedFunds.short.positions]
const nonComercialData = [
  assetManager.long.positions + leveragedFunds.long.positions,
  assetManager.short.positions + leveragedFunds.short.positions
]
export const data = {
  labels,
  datasets: [
    {
      label: 'Asset Manager',
      data: assetManagerData,
      backgroundColor: '',
    },
    {
      label: 'Leveraged Funds',
      data: leveragedFundsData,
      backgroundColor: '',
    },
    {
      label: 'Non-ComerciaL',
      data: nonComercialData,
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
    onClick: (event, clickedElements) => barClickHandler(event, clickedElements),
    responsive: true,
    maintainAspectRatio: false,
  };


  function barClickHandler(event, clickedElements) {
    if (clickedElements.length === 0) return

    const currencyIndex = clickedElements[0].index;
    const labelIndex = clickedElements[0].datasetIndex;

    props.setCurrencyIndex(currencyIndex);
    props.setLabelIndex(labelIndex);
  }

  //data.datasets[0].backgroundColor = props?.testdata;
  for (let i = 0; i < data.datasets.length; i++) {
    data.datasets[i].backgroundColor = props.bgColors[i];

  };

  return (  
    <>
      <div style={{height: "30%"}}>
        <TradingsterTable currency={currencies[0]} />
      </div>
      <div style={{height: "70%"}}>
        <Bar options={options} data={data} />
      </div>
    </>
  )
};
