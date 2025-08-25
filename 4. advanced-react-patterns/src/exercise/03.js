// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext

const ToggleContext = React.createContext()

function useToggleContext() {
  const context = React.useContext(ToggleContext)
  if (context === undefined) {
    throw new Error(
      `useToggleContext must be used within a ToggleContext.Provider`,
    )
  }
  return context
}

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  // return React.Children.map(children, child => {
  //   return typeof child.type === 'string'
  //     ? child
  //     : React.cloneElement(child, {on, toggle})
  // }

  return <ToggleContext.Provider value={{toggle, on}} children={children} />
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = React.useContext(ToggleContext)`
// 📜 https://react.dev/reference/react/useContext
function ToggleOn({children}) {
  const {on} = useToggleContext()
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const {on} = useToggleContext()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {
  const {on, toggle} = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
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

// extra -> error message provided thanks to useToggleContext function
// const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
