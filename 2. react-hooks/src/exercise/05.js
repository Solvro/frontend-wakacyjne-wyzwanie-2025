import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const tiltRef = React.useRef(null)

  React.useEffect(() => {
      const tiltNode = tiltRef.current                   // Get the current reference to the tilt node
      VanillaTilt.init(tiltNode, {                    // Define the options for VanillaTilt
         max: 25,
         speed: 400,
         glare: true,
         'max-glare': 0.5,
       })
       return function cleanup() {
           tiltNode.vanillaTilt.destroy()
       }
     }, [])

  return (
    <div ref = {tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App

