// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function countReducer(state, action) {
  // reducer zwraca nowy stan
  return state + action
}

function Counter({initialCount = 0, step = 1}) {
  const [count, dispatch] = React.useReducer(countReducer, initialCount)
  const increment = () => dispatch(step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
