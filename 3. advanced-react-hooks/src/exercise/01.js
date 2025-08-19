// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function CounterNode({counterName, increment, count}) {
  return (
    <div
      style={{display: 'flex', gap: '36px', justifyContent: 'space-between'}}
    >
      <label htmlFor="counter-button">Counter - {counterName}</label>
      <button className="counter-button" onClick={increment}>
        {count}
      </button>
    </div>
  )
}

function Counter({initialCount = 0, step = 1}) {
  function countReducer(_, next) {
    return next
  }

  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount)
  // const [count, setCount] = React.useState(initialCount)
  const [count, setCount] = React.useReducer(countReducer, initialCount)

  // 💰 you can write the countReducer function so you don't have to make any
  // changes to the next two lines of code! Remember:
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount
  const increment = () => setCount(count + step)
  return (
    <CounterNode
      counterName="The original"
      count={count}
      increment={increment}
    />
  )
}

// extra 1
function CounterExtra1({initialCount = 0, step = 1}) {
  function countReducer(prevState, step) {
    return prevState + step
  }

  const [count, changeCount] = React.useReducer(countReducer, initialCount)
  const increment = () => changeCount(step)

  return (
    <CounterNode counterName="Extra 1" count={count} increment={increment} />
  )
}

// extra 2
function CounterExtra2({initialCount = 0, step = 1}) {
  function countReducer(_, value) {
    return value
  }

  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = state

  const increment = () => setState({count: count + step})

  return (
    <CounterNode counterName="Extra 2 " count={count} increment={increment} />
  )
}

// extra 3
function CounterExtra3({initialCount = 0, step = 1}) {
  function countReducer(state, action) {
    return action(state)
  }

  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = state

  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))

  return (
    <CounterNode counterName="Extra 3 " count={count} increment={increment} />
  )
}

// extra 4
function CounterExtra4({initialCount = 0, step = 1}) {
  function countReducer(state, action) {
    if (action.type === 'INCREMENT') {
      return {...state, count: state.count + action.step}
    }
    throw Error('Unknown action.')
  }

  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = state

  const increment = () => dispatch({type: 'INCREMENT', step})

  return (
    <CounterNode counterName="Extra 4 " count={count} increment={increment} />
  )
}

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
      <Counter />
      <CounterExtra1 />
      <CounterExtra2 />
      <CounterExtra3 />
      <CounterExtra4 />
    </div>
  )
}

export default App
