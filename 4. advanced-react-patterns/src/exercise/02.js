// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, (child) =>{
    const isCustomComponent = /[\s\S]*\([\s\S]*\)[\s\S]*/.test(child.type)
    return React.cloneElement(child, isCustomComponent && {
      on: on,
      toggle: toggle,
    })
  })

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  // 💰 React.Children.map(props.children, child => {/* return child clone here */})
  // 📜 https://react.dev/reference/react/Children
  // 📜 https://react.dev/reference/react/cloneElement
}

// 🐨 Flesh out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({on, children}) => on === true && children

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({on, children}) => on === false && children 

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({on,toggle}) => {return <Switch on={on} onClick={toggle}/>}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
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
