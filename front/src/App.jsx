import './App.css'
import { ChartPositions } from './components/ChartPositions'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useState } from 'react';

//this is a bad implementation and needs fixing
function dayTheme(){
  console.log("set theme to day");
  document.getElementById("nightThemeBtn").classList.remove("displayNone");
  document.getElementById("dayThemeBtn").classList.add("displayNone");

  let elements = document.getElementsByClassName("nightTheme");

  for(let i= elements.length ; i > 0; i--){
    elements[0].classList.add("dayTheme");
    elements[0].classList.remove("nightTheme");
  }
}
function nightTheme(){
  console.log("set theme to night");
  document.getElementById("dayThemeBtn").classList.remove("displayNone");
  document.getElementById("nightThemeBtn").classList.add("displayNone");

  let elements = document.getElementsByClassName("dayTheme");

  for(let i= elements.length ; i > 0; i--){
    elements[0].classList.add("nightTheme");
    elements[0].classList.remove("dayTheme");
  }
}

function App() {
  const [color, setColor] = useColor("hex", "#121212");
  const [currencyIndex, setCurrencyIndex] = useState(undefined);
  const [labelIndex, setLabelIndex] = useState(undefined);
  const [bgColors, setBgColors] = useState(["rgba(53, 162, 235, 0.5)",'rgba(53, 162, 235, 0.5)','rgba(53, 162, 235, 0.5)']);

  function saveColor(){
    let temporal = [...bgColors];
    let alpha = color.rgb.a;
    const minimunAlpha = 0.10;
    if(alpha === undefined){
      alpha = 1;
    }
    if(alpha >= 0 && alpha < minimunAlpha){
      alpha = minimunAlpha;
    }
    temporal[labelIndex] = ( "rgba("+ color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + alpha + ")");

    setBgColors(temporal) ;
    setLabelIndex(undefined);
  }
  return (
    <div className="App nightTheme" >
      <div className='grid'>
        <div>
          <button onClick={ nightTheme } id="nightThemeBtn" className="dayTheme displayNone">Night Mode</button>
          <button onClick={ dayTheme } id="dayThemeBtn" className="nightTheme ">Day Mode</button>
          {
            labelIndex !== undefined
            &&
            <>
              <h1 className='gridChild'>Color Picker</h1>
              <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV alpha={true} dark />
              <button onClick={saveColor}>save</button>
            </>
          }
        </div>
        <div className="chart">
          <ChartPositions key={bgColors.toString()} bgColors={bgColors} setCurrencyIndex={setCurrencyIndex} setLabelIndex={setLabelIndex} />
        </div>
      </div>
    </div>
  )
}

export default App
