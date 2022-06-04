import './App.css'
import { ChartPositions } from './components/ChartPositions'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useState } from 'react';

const Layout = ({ nightMode, children }) => {
  return nightMode ? (
    <div className='dayTheme'>
        {children}
    </div>
  ) : (
    <div className='nightTheme'>
      {children}
    </div>
  )
}

const App = () => {
  const [color, setColor] = useColor("hex", "#121212");
  const [currencyIndex, setCurrencyIndex] = useState(undefined);
  const [theme, setTheme] = useState(false)
  const [labelIndex, setLabelIndex] = useState(undefined);
  const [bgColors, setBgColors] = useState(["rgba(53, 162, 235, 0.5)", 'rgba(53, 162, 235, 0.5)', 'rgba(53, 162, 235, 0.5)']);

  const saveColor = () => {
    let temporal = [...bgColors];
    let alpha = color.rgb.a;
    const minimunAlpha = 0.10;
    if (alpha === undefined) {
      alpha = 1;
    }
    if (alpha >= 0 && alpha < minimunAlpha) {
      alpha = minimunAlpha;
    }
    temporal[labelIndex] = ("rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + alpha + ")");

    setBgColors(temporal);
    setLabelIndex(undefined);
  }

  const switchTheme = (theme) => {
    setTheme(!theme)
  }

  return (
    <Layout nightMode={theme} >
      <div className="App">
        <div className='grid'>
          <div>
            <button onClick={() => switchTheme(theme)} >{theme ? "Night Mode" : "Day Mode"}</button>
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
    </Layout>
  )
}

export default App
