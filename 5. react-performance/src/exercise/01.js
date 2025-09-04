// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const loadGlobe = () => import('../globe')
const Globe = React.lazy(loadGlobe);

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  // 🐨 wrap the code below in a <React.Suspense /> component
  // with a fallback.
  // 💰 try putting it in a few different places and observe how that
  // impacts the user experience.
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
      }}
    >

      <label style={{marginBottom: '1rem'}} 
      onMouseOver={loadGlobe} 
      onFocus={loadGlobe}>
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
        />
        {' show globe'}
      </label>
      <div style={{width: 400, height: 400}}>
        <React.Suspense fallback={<div>globe is loading...</div>}>
        {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
      
    </div>
  )
}


export default App
