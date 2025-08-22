// State Reducer
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import {Switch} from '../switch'

//
const toggleReducerTypes = {
  toggle: 'toggle',
  reset: 'reset',
}

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args))

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case toggleReducerTypes.toggle: {
      return {on: !state.on}
    }
    case toggleReducerTypes.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

// 🐨 add a new option called `reducer` that defaults to `toggleReducer`
function useToggle({initialOn = false, reducer = toggleReducer} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  // 🐨 instead of passing `toggleReducer` here, pass the `reducer` that's
  // provided as an option
  // ... and that's it! Don't forget to check the 💯 extra credit!

  const [state, dispatch] = React.useReducer(reducer, initialState)
  // const [state, dispatch] = React.useReducer(toggleReducer, initialState)

  const {on} = state

  const toggle = () => dispatch({type: toggleReducerTypes.toggle})
  const reset = () => dispatch({type: toggleReducerTypes.reset, initialState})

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  function getResetterProps({onClick, ...props} = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    }
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}

function App() {
  const [timesClicked, setTimesClicked] = React.useState(0)
  const clickedTooMuch = timesClicked >= 4

  // exercise
  // function toggleStateReducer(state, action) {
  //   switch (action.type) {
  //     case toggleReducerTypes.toggle: {
  //       if (clickedTooMuch) {
  //         return {on: state.on}
  //       }
  //       return {on: !state.on}
  //     }
  //     case toggleReducerTypes.reset: {
  //       return {on: false}
  //     }
  //     default: {
  //       throw new Error(`Unsupported type: ${action.type}`)
  //     }
  //   }
  // }

  // extra 1
  function toggleStateReducer(state, action) {
    if (action.type === toggleReducerTypes.toggle && clickedTooMuch) {
      return {on: state.on}
    }
    return toggleReducer(state, action)
  }

  const {on, getTogglerProps, getResetterProps} = useToggle({
    reducer: toggleStateReducer,
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked(count => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({onClick: () => setTimesClicked(0)})}>
        Reset
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
