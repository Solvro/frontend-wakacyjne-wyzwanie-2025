// Control Props
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import warning from 'warning'
import {Switch} from '../switch'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn?.(...args))

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
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

// extra 3
function useFunctionOrReadonlyWarning(
  controlPropValue,
  controlPropName,
  componentName,
  funValue,
  funName,
  isReadonly,
  isReadonlyName = 'isReadonly',
) {
  const isControlled = controlPropValue != null

  React.useEffect(() => {
    warning(
      Boolean(funValue) || !isControlled || isReadonly,
      `Failed prop type: You provided a ${controlPropName} prop to a ${componentName} without an ${funName} handler. This will render a read-only field. If the field should be mutable use ${funName}. Otherwise, set either ${funName} or ${isReadonlyName}.`,
    )
  }, [
    controlPropName,
    controlPropValue,
    componentName,
    isControlled,
    funName,
    funValue,
    isReadonly,
    isReadonlyName,
  ])
}

// extra 3
function useControlledSwitchWarning(
  controlPropValue,
  controlPropName,
  componentName,
) {
  const isControlled = controlPropValue != null
  const wasControlled = React.useRef(isControlled)

  React.useEffect(() => {
    warning(
      !(isControlled && !wasControlled.current),
      `${componentName} is changing from uncontrolled to be controlled. ${componentName} should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
    warning(
      !(!isControlled && wasControlled.current),
      `${componentName} is changing from controlled to be uncontrolled. ${componentName} should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
    wasControlled.current = isControlled
  }, [isControlled, controlPropName, componentName])
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  // 🐨 add an `onChange` prop.
  // 🐨 add an `on` option here
  // 💰 you can alias it to `controlledOn` to avoid "variable shadowing."
  onChange,
  on: controlledOn,
  isReadonly = false,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // 🐨 determine whether on is controlled and assign that to `onIsControlled`
  // 💰 `controlledOn != null`
  const isControlled = controlledOn != null

  // 🐨 Replace the next line with `const on = ...` which should be `controlledOn` if
  // `onIsControlled`, otherwise, it should be `state.on`.

  const on = isControlled ? controlledOn : state.on
  // const {on} = state

  // // extra 1 (replaced by extra 3)
  // React.useEffect(() => {
  //   warning(
  //     Boolean(onChange) || !isControlled || isReadonly,
  //     'Failed prop type: You provided a `on` prop to a Toggle without an `onChange` handler. This will render a read-only field. If the field should be mutable use `onChange`. Otherwise, set either `onChange` or `readOnly`.',
  //   )
  // }, [isControlled, onChange, isReadonly])

  // extra 4
  if (process.env.NODE_ENV !== 'production') {
    // extra 3
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFunctionOrReadonlyWarning(
      controlledOn,
      'on',
      'useToggle',
      onChange,
      'onChange',
      isReadonly,
      'isReadonly',
    )

    // extra 2 (replaced by extra 3)
    // const wasControlled = React.useRef(isControlled)

    // React.useEffect(() => {
    //   warning(
    //     !(isControlled && !wasControlled.current),
    //     'A component is changing an uncontrolled input to be controlled. Decide between one strategy for the lifetime of the component.',
    //   )
    //   warning(
    //     !(!isControlled && wasControlled.current),
    //     'A component is changing a controlled input to be uncontrolled. Decide between one strategy for the lifetime of the component.',
    //   )
    //   wasControlled.current = isControlled
    // }, [isControlled])

    // extra 3
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useControlledSwitchWarning(controlledOn, 'on', 'useToggle')
  }

  // We want to call `onChange` any time we need to make a state change, but we
  // only want to call `dispatch` if `!onIsControlled` (otherwise we could get
  // unnecessary renders).
  // 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
  // right here. This will:
  // 1. accept an action
  // 2. if onIsControlled is false, call dispatch with that action
  // 3. Then call `onChange` with our "suggested changes" and the action.

  const dispatchWithOnChange = action => {
    if (!isControlled) dispatch(action)
    onChange?.(reducer({...state, on}, action), action)
  }

  // 🦉 "Suggested changes" refers to: the changes we would make if we were
  // managing the state ourselves. This is similar to how a controlled <input />
  // `onChange` callback works. When your handler is called, you get an event
  // which has information about the value input that _would_ be set to if that
  // state were managed internally.
  // So how do we determine our suggested changes? What code do we have to
  // calculate the changes based on the `action` we have here? That's right!
  // The reducer! So if we pass it the current state and the action, then it
  // should return these "suggested changes!"
  //
  // 💰 Sorry if Olivia the Owl is cryptic. Here's what you need to do for that onChange call:
  // `onChange(reducer({...state, on}, action), action)`
  // 💰 Also note that user's don't *have* to pass an `onChange` prop (it's not required)
  // so keep that in mind when you call it! How could you avoid calling it if it's not passed?

  // make these call `dispatchWithOnChange` instead

  const toggle = () => dispatchWithOnChange({type: actionTypes.toggle})
  const reset = () =>
    dispatchWithOnChange({type: actionTypes.reset, initialState})
  // const toggle = () => dispatch({type: actionTypes.toggle})
  // const reset = () => dispatch({type: actionTypes.reset, initialState})

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

function Toggle({on: controlledOn, onChange, initialOn, reducer, isReadonly}) {
  const {on, getTogglerProps} = useToggle({
    on: controlledOn,
    onChange,
    initialOn,
    reducer,
    isReadonly,
  })
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

function App() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)
  const [stateExtra2, setStateExtra2] = React.useState(false)

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
      <div style={{display: 'flex', gap: '16px'}}>
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
      {/* extra 1 */}
      <hr />
      Extra 1 (toggle with only on warning) :
      <div style={{display: 'flex', gap: '16px'}}>
        {/* Doesn't trigger warning because of isReadonly param */}
        <Toggle on={false} isReadonly={true} />
        {/* Triggers warning */}
        {/* isReadonly deafult is false */}
        <Toggle on={false} />
      </div>
      {/* extra 2 */}
      <hr />
      <div>
        <div>Extra 2 (flip controlledness) :</div>
        <Toggle
          on={stateExtra2}
          onChange={() => {
            setStateExtra2(stateExtra2 === undefined ? true : undefined)
          }}
        />
      </div>
    </div>
  )
}

export default App
// we're adding the Toggle export for tests
export {Toggle}

/*
eslint
  no-unused-vars: "off",
*/
