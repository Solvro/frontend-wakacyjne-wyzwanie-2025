// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function countReducer(num, newNum) {
  let count = 0;
  switch(newNum.type) {
    case 'INCREMENT': count = num.count + newNum.step; break;
    case 'DECREMENT': count = num.count - newNum.step; break;
    default: throw new Error('Type unknown');
  }
  return {...num, count};
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state;
  const increment = () => 
    dispatch({type: 'INCREMENT', step});

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
