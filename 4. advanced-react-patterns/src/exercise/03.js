// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext

const ToggleContext = React.createContext()

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function ToggleOn({children}) {
  const context = React.useContext(ToggleContext)
  return context.on ? children : null
}

function ToggleOff({children}) {
  const context = React.useContext(ToggleContext)
  return context.on ? null : children
}

function useToggle(contextProp) {
  const context = React.useContext(contextProp)
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider')
  }
  return context
}

function ToggleButton({...props}) {
  const context = useToggle(ToggleContext)
  return <Switch on={context.on} onClick={context.toggle} {...props} />
}

// function App() {
//   return (
//     <div>
//       <Toggle>
//         <ToggleOn>The button is on</ToggleOn>
//         <ToggleOff>The button is off</ToggleOff>
//         <div>
//           <ToggleButton />
//         </div>
//       </Toggle>
//     </div>
//   )
// }

const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
