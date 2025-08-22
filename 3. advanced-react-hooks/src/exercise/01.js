// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// ZADANIE 0
// function countReducer(state, newState) {
//   return newState
// }

// function Counter({initialCount = 0, step = 1}) {
//   const [count, setCount] = React.useReducer(countReducer, initialCount)
//   const increment = () => setCount(count + step)
//   return <button onClick={increment}>{count}</button>
// }

// ZADANIE 1
// function countReducer(state, newState) {
//   return state + newState
// }

// function Counter({initialCount = 0, step = 1}) {
//   const [count, changeCount] = React.useReducer(countReducer, initialCount)
//   const increment = () => changeCount(step)
//   return <button onClick={increment}>{count}</button>
// }

// ZADANIE 2
// function countReducer(state, newState) {
//   return {...state, ...newState}
// }

// function Counter({initialCount = 0, step = 1}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () => setState({count: count + step})
//   return <button onClick={increment}>{count}</button>
// }

// ZADANIE 3
// function countReducer(state, newState) {
//   return {
//     ...state,
//     ...(typeof newState === 'function' ? newState(state) : newState),
//   }
// }

// function Counter({initialCount = 0, step = 1}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () =>
//     setState(currentState => ({count: currentState.count + step}))
//   return <button onClick={increment}>{count}</button>
// }

// ZADANIE 4
function countReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + action.step}
    default:
      return state
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => dispatch({type: 'INCREMENT', step})
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
