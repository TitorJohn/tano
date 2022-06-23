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

import { useState } from 'react';
import { useEffect } from 'react';

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


const getData = (currency) => {
  const labels = ["long", "short"]

  const assetManager = currency.metrics[1]
  const leveragedFunds = currency.metrics[2]

  const assetManagerData = [assetManager.long.positions, assetManager.short.positions]
  const leveragedFundsData = [leveragedFunds.long.positions, leveragedFunds.short.positions]
  const nonComercialData = [
    assetManager.long.positions + leveragedFunds.long.positions,
    assetManager.short.positions + leveragedFunds.short.positions
  ]
  return {
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
}


export function ChartPositions(props) {
  const [data, setData] = useState({})

  useEffect(() => {
    const firstData = getData(props.currency)
    //data.datasets[0].backgroundColor = props?.testdata;

    for (let i = 0; i < firstData.datasets.length; i++) {
      firstData.datasets[i].backgroundColor = props.bgColors[i];
    };

    setData(firstData)
  }, [])
  

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

  if(!isFirstBoot){
    if( !(props.bgColors.length <= 1) ) {
      for (let i = 0; i < data.datasets.length; i++) {
        data.datasets[i].backgroundColor = props.bgColors[i];
      };
    }
  }else{
    let tempColors = [];
    for (let i = 0; i < data.datasets.length; i++) {
        tempColors[i] = data.datasets[i].backgroundColor;
    };
    props.setBgColors(tempColors);
    setBoot(false);
  }

  function handleDropDownChange(event){
    const selectedCurrency = event.target.value;
    const trueCurrency = currencies.find( (curren,index) => {
      return curren.name.toLowerCase().includes(selectedCurrency);
    });
    setcurrency(trueCurrency);
  }

  return (  
    <>
      <Bar options={options} data={data} />
    </>
  ): 'loading';
};
