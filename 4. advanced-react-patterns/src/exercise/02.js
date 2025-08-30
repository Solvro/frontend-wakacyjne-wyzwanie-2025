// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child =>
      React.cloneElement(child, {on, toggle}),
    )
}

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({on,children}) =>{
  if(!on) return null
  return children
} 

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({on,children}) => {
  if(on) return null
  return children
}

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({on,toggle}) => {
  return <Switch on={on} onClick={toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
