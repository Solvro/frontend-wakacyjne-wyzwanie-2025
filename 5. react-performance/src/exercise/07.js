// Production performance monitoring
// http://localhost:3000/isolated/exercise/07.js

import * as React from 'react'
// 🐨 you're going to need the reportProfile function
import reportProfile from '../report-profile'  
// 💰 here, let me help you with that...
// import reportProfile from '../report-profile'

function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return (
    <div>
      {/*
      🐨 Wrap this div in a React.Profiler component
      give it the ID of "counter" and pass reportProfile
      to the onRender prop.
      */}
      <React.Profiler id="counter" onRender={reportProfile}>
      <div>
        Profiled counter
        <Counter />
      </div>
      </React.Profiler>
      <div>
        Unprofiled counter
        <Counter />
      </div>
    </div>
  )
}

export default App
