import * as React from 'react'

const loadGlobe = () => import(/* webpackPrefetch: true */ '../globe')
const Globe = React.lazy(loadGlobe)

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

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
      <label 
      style={{marginBottom: '1rem'}}
      onMouseOver={loadGlobe}
      onFocus={loadGlobe}
      >
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}          
        />
        {' show globe'}
      </label>
      <div style={{width: 400, height: 400}}>
        {showGlobe ? (
          <React.Suspense fallback={<div>loading globe...</div>}>
            <Globe />
          </React.Suspense>
        ) : null}
      </div>
    </div>
  )
}

export default App
