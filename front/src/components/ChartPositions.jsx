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
import { useState } from 'react';
import { CURRENCIES } from '../CURRENCIES';



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
console.log(currencies);

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
  const [currency, setcurrency] = useState(currencies[0]);

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

  function handleDropDownChange(event){
    const selectedCurrency = event.target.value;
    const trueCurrency = currencies.find( (curren,index) => {
      return curren.name.toLowerCase().includes(selectedCurrency);
    });
    setcurrency(trueCurrency);
  }

  return (  
    <>
      <div style={{height: "10%"}}>
        <select name="cars" id="cars" onChange={handleDropDownChange}>
          {CURRENCIES.map ((data,index) => {
            return(
              <option key={index} value={data}>{data}</option>
            );
          })}
        </select>
      </div>
      <div style={{height: "25%"}}>
        <TradingsterTable currency={currency} />
      </div>
      <div style={{height: "65%"}}>
        <Bar options={options} data={data} />
      </div>
    </>
  )
};
