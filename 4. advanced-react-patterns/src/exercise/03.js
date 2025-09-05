// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'
const ToggleContext = React.createContext()


function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider value={{on, toggle}}>
    {children}
  </ToggleContext.Provider>
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = React.useContext(ToggleContext)`
// 📜 https://react.dev/reference/react/useContext

function useToggleContext() {
  const context = React.useContext(ToggleContext)
  if(!context) {
    throw new Error('useToggleContext must be used within a Toggle')
  }
  return context
}


// 🐨 do the same thing to this that you did to the ToggleOn component

function ToggleOn({children}) {
  return useToggleContext().on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  return useToggleContext().on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton() {
  return <Switch on={useToggleContext().on} onClick={useToggleContext().toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
