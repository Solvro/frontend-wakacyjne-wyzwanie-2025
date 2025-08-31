// // Prop Collections and Getters
// // http://localhost:3000/isolated/exercise/04.js

// import * as React from 'react'
// import {Switch} from '../switch'

// function useToggle() {
//   const [on, setOn] = React.useState(false)
//   const toggle = () => setOn(!on)
//   const togglerProps = {'aria-pressed': on, onClick: toggle}

//   return {on, togglerProps}
// }

// function App() {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

// export default App

// /*
// eslint
//   no-unused-vars: "off",
// */

// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

// DODATKOWE ZADANIE
import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  function getTogglerProps(props = {}) {
    return {
      'aria-pressed': on,
      onClick: (...args) => {
        if (props.onClick) props.onClick(...args)
        toggle()
      },
      ...props,
    }
  }

  return {on, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
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
