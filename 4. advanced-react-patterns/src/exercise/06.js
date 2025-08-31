// // Control Props
// // http://localhost:3000/isolated/exercise/06.js

// import * as React from 'react'
// import {Switch} from '../switch'

// const callAll =
//   (...fns) =>
//   (...args) =>
//     fns.forEach(fn => fn?.(...args))

// const actionTypes = {
//   toggle: 'toggle',
//   reset: 'reset',
// }

// function toggleReducer(state, {type, initialState}) {
//   switch (type) {
//     case actionTypes.toggle: {
//       return {on: !state.on}
//     }
//     case actionTypes.reset: {
//       return initialState
//     }
//     default: {
//       throw new Error(`Unsupported type: ${type}`)
//     }
//   }
// }

// function useToggle({
//   initialOn = false,
//   reducer = toggleReducer,
//   onChange,
//   on: controlledOn,
// } = {}) {
//   const {current: initialState} = React.useRef({on: initialOn})
//   const [state, dispatch] = React.useReducer(reducer, initialState)
//   const onIsControlled = controlledOn != null
//   const on = onIsControlled ? controlledOn : state.on

//   function dispatchWithOnChange(action) {
//     if (!onIsControlled) {
//       dispatch(action)
//     }
//     onChange?.(reducer({...state, on}, action), action)
//   }

//   const toggle = () => dispatchWithOnChange({type: actionTypes.toggle})
//   const reset = () =>
//     dispatchWithOnChange({type: actionTypes.reset, initialState})

//   function getTogglerProps({onClick, ...props} = {}) {
//     return {
//       'aria-pressed': on,
//       onClick: callAll(onClick, toggle),
//       ...props,
//     }
//   }

//   function getResetterProps({onClick, ...props} = {}) {
//     return {
//       onClick: callAll(onClick, reset),
//       ...props,
//     }
//   }

//   return {
//     on,
//     reset,
//     toggle,
//     getTogglerProps,
//     getResetterProps,
//   }
// }

// function Toggle({on: controlledOn, onChange, initialOn, reducer}) {
//   const {on, getTogglerProps} = useToggle({
//     on: controlledOn,
//     onChange,
//     initialOn,
//     reducer,
//   })
//   const props = getTogglerProps({on})
//   return <Switch {...props} />
// }

// function App() {
//   const [bothOn, setBothOn] = React.useState(false)
//   const [timesClicked, setTimesClicked] = React.useState(0)

//   function handleToggleChange(state, action) {
//     if (action.type === actionTypes.toggle && timesClicked > 4) {
//       return
//     }
//     setBothOn(state.on)
//     setTimesClicked(c => c + 1)
//   }

//   function handleResetClick() {
//     setBothOn(false)
//     setTimesClicked(0)
//   }

//   return (
//     <div>
//       <div>
//         <Toggle on={bothOn} onChange={handleToggleChange} />
//         <Toggle on={bothOn} onChange={handleToggleChange} />
//       </div>
//       {timesClicked > 4 ? (
//         <div data-testid="notice">
//           Whoa, you clicked too much!
//           <br />
//         </div>
//       ) : (
//         <div data-testid="click-count">Click count: {timesClicked}</div>
//       )}
//       <button onClick={handleResetClick}>Reset</button>
//       <hr />
//       <div>
//         <div>Uncontrolled Toggle:</div>
//         <Toggle
//           onChange={(...args) =>
//             console.info('Uncontrolled Toggle onChange', ...args)
//           }
//         />
//       </div>
//     </div>
//   )
// }

// export default App
// export {Toggle}

// /*
// eslint
//   no-unused-vars: "off",
// */

// DODATKOWE 1
// Control Props
// http://localhost:3000/isolated/exercise/06.js
import warning from 'warning'
import * as React from 'react'
import {Switch} from '../switch'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args))

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
}
function useControlledSwitchWarning(
  controlledValue,
  controlledPropName,
  componentName,
) {
  const isControlled = controlledValue != null
  const wasControlled = React.useRef(isControlled)

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    if (wasControlled.current !== isControlled) {
      if (wasControlled.current && !isControlled) {
        warning(
          false,
          `${componentName} changed from controlled to uncontrolled. ` +
            `Decide between using a controlled or uncontrolled ${componentName} ` +
            `for the lifetime of the component.`,
        )
      }
      if (!wasControlled.current && isControlled) {
        warning(
          false,
          `${componentName} changed from uncontrolled to controlled. ` +
            `Decide between using a controlled or uncontrolled ${componentName} ` +
            `for the lifetime of the component.`,
        )
      }
    }
    wasControlled.current = isControlled
  }, [isControlled, componentName])

  return function checkReadOnly(hasOnChange) {
    if (process.env.NODE_ENV === 'production') return
    warning(
      !(isControlled && !hasOnChange),
      `You provided a \`${controlledPropName}\` prop to ${componentName} without an \`onChange\` handler. ` +
        `This will render a read-only field. If the component should be mutable, use \`${controlledPropName}\` with \`onChange\`. ` +
        `Otherwise, use \`default${controlledPropName[0].toUpperCase()}${controlledPropName.slice(
          1,
        )}\`.`,
    )
  }
}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case actionTypes.toggle: {
      return {on: !state.on}
    }
    case actionTypes.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  onChange,
  on: controlledOn,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const onIsControlled = controlledOn != null
  const on = onIsControlled ? controlledOn : state.on

  const checkReadOnly = useControlledSwitchWarning(controlledOn, 'on', 'Toggle')
  checkReadOnly(!!onChange)

  function dispatchWithOnChange(action) {
    if (!onIsControlled) {
      dispatch(action)
    }
    onChange?.(reducer({...state, on}, action), action)
  }

  const toggle = () => dispatchWithOnChange({type: actionTypes.toggle})
  const reset = () =>
    dispatchWithOnChange({type: actionTypes.reset, initialState})

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

function Toggle({on: controlledOn, onChange, initialOn, reducer}) {
  const {on, getTogglerProps} = useToggle({
    on: controlledOn,
    onChange,
    initialOn,
    reducer,
  })
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

function App() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick() {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  )
}

export default App
export {Toggle}

/*
eslint
  no-unused-vars: "off",
*/
