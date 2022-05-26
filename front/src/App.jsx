import './App.css'
import { ChartPositions } from './components/ChartPositions'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

function App() {
  const [color, setColor] = useColor("hex", "#121212");
  return (
    <div className="App" >
      <div className='grid'>
        <div>
          <h1 className='gridChild'>Color Picker</h1>
          <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV dark />
        </div>
        <div className="chart">
          <ChartPositions />
        </div>
      </div>
    </div>
  )
}

export default App
