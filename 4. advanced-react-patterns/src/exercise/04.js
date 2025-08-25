// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'
import {functions} from 'lodash'

// extra
const callAll =
  (...functions) =>
  // return funciton
  (...args) =>
    functions.forEach(fun => fun?.(...args))

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}

  // exercise
  // return {on, toggle, togglerProps: {'aria-pressed': on, onClick: toggle}}

  //extra
  const getTogglerProps = ({onClick, ...props} = {}) => {
    return {onClick: callAll(onClick, toggle), 'aria-pressed': on, ...props}
  }

  return {on, toggle, getTogglerProps}
}

function App() {
  // exercise
  // const {on, togglerProps} = useToggle()

  // extra
  const {on, getTogglerProps} = useToggle()

  return (
    <div>
      {/* exercise */}
      {/* <Switch on={on} {...togglerProps} /> */}

      {/* extra */}
      <Switch on={on} {...getTogglerProps()} />
      <hr />
      <button
        // exercise
        // aria-label="custom-button"
        // {...togglerProps}
        // onClick={() => console.info('button clicked')}

        //extra
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('button clicked'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
