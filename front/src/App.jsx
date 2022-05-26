import './App.css'
import { ChartPositions } from './components/ChartPositions'

function App() {

  return (
    <div className="App" >
      <div className='grid'>
        <div>
          <h1 className='gridChild'>test</h1>
        </div>
        <div className="chart">
          <ChartPositions />
        </div>
      </div>
    </div>
  )
}

export default App
