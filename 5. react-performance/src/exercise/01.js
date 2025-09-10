// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {ClipLoader} from 'react-spinners'

// 💣 remove this import
// import Globe from '../globe'

// 🐨 use React.lazy to create a Globe component which uses a dynamic import
// to get the Globe component from the '../globe' module.
const importGlobe = () => import(/* webpackPrefetch: true */ '../globe')
const Globe = React.lazy(importGlobe)

// extra plus
const LoadingSpinner = () => {
  return (
    <ClipLoader size={100} aria-label="Loading Spinner" data-testid="loader" />
  )
}

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  // 🐨 wrap the code below in a <React.Suspense /> component
  // with a fallback.
  // 💰 try putting it in a few different places and observe how that
  // impacts the user experience.
  return (
    // <React.Suspense fallback={<div>Loading...</div>}>
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
      <label
        // extra 1
        onMouseOver={importGlobe}
        onFocus={importGlobe}
        style={{marginBottom: '1rem'}}
      >
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
        />
        {' show globe'}
      </label>
      <div
        style={{width: 400, height: 400, display: 'grid', placeItems: 'center'}}
      >
        <React.Suspense fallback={<LoadingSpinner />}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
    // </React.Suspense>
  )
}

// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

// for educational purposes I will not rely on that one haha

export default App
