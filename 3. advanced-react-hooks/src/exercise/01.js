// Background
// import * as React from 'react'
//
// function countReducer (state, newState) {
//   return newState
// }
//
// function Counter({initialCount = 0, step = 1}) {
//   const [count, setCount] = React.useReducer(countReducer, initialCount)
//
//   const increment = () => setCount(count + step)
//   return <button onClick={increment}>{count}</button>
// }
//
// function App() {
//   return <Counter />
// }
//
// export default App


// Extra 1
// import * as React from 'react'
//
// function countReducer(count, step) {
//     return count + step
// }
//
// function Counter({step = 3, initialCount = 0}) {
//   const [count, changeCount] = React.useReducer(countReducer, initialCount)
//
//   const increment = () => changeCount(step)
//   return <button onClick={increment}>{count}</button>
// }
//
// function App() {
//   return <Counter />
// }
//
// export default App


// Extra 2
// import * as React from 'react'
//
// const countReducer = (state, action)=> ( {
//     ...state,
//     ...action
// })
//
// function Counter({step = 3, initialCount = 0}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () => setState({count: count + step})
//   return <button onClick={increment}>{count}</button>
// }
//
//
// function App() {
//   return <Counter />
// }
//
// export default App


// Extra 3
// import * as React from 'react'
//
// const countReducer = (state, action)=> ( {
//   ...state,
//   ...(typeof action === 'function' ? action(state) : action)
// })
//
// function Counter({step = 3, initialCount = 0}) {
//   const [state, setState] = React.useReducer(countReducer, {
//     count: initialCount,
//   })
//   const {count} = state
//   const increment = () =>
//       setState({count: count + step})
//   return <button onClick={increment}>{count}</button>
// }
//
//
// function App() {
//   return <Counter />
// }
//
// export default App


// Extra 4
import * as React from 'react'

// const countReducer = (state, action)=> ( {
//   ...state,
//   ...(typeof action === 'function' ? action(state) : action)
// })

function countReducer(state, action) {
  const {type, step} = action
  switch (type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + step,
      }
    }
    default: {
      throw new Error(`Unsupported action type: ${type}`)
    }
  }
}

function Counter({step = 3, initialCount = 0}) {
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