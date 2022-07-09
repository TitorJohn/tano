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
import currencies from "../../../files/2022-05-10.json";

import { useState } from 'react';
import { CURRENCIES } from '../CURRENCIES';
import { getChartData } from '../getChartData';
const data = getChartData();

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

export function ChartPositions(props) {
  const [currency, setcurrency] = useState(currencies[0]);
  const [isFirstBoot, setBoot] = useState(true);

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
      <div style={{height: "5%"}}>
        <select name="cars" id="cars" onChange={handleDropDownChange}>
          {CURRENCIES.map ((data,index) => {
            return(
              <option key={index} value={data}>{data}</option>
            );
          })}
        </select>
      </div>

      <div style={{height: "95%"}}>
        <Bar options={options} data={data} />
      </div>
    </>
  )
};
