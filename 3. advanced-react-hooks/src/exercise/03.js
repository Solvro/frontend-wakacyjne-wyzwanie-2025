// ZADANIE 0
// // useContext: simple Counter
// // http://localhost:3000/isolated/exercise/03.js

// import * as React from 'react'

// const CountContext = React.createContext()

// function CountProvider(props) {
//   const [state, setState] = React.useState(0)
//   return <CountContext.Provider value={[state, setState]} {...props} />
// }

// function CountDisplay() {
//   const [count] = React.useContext(CountContext)
//   return <div>{`The current count is ${count}`}</div>
// }

// function Counter() {
//   const [, setCount] = React.useContext(CountContext)
//   const increment = () => setCount(c => c + 1)
//   return <button onClick={increment}>Increment count</button>
// }

// function App() {
//   return (
//     <div>
//       <CountProvider>
//         <CountDisplay />
//         <Counter />
//       </CountProvider>
//     </div>
//   )
// }

// export default App

// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

// ZADANIE 1
import * as React from 'react'

const CountContext = React.createContext()

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

function CountProvider(props) {
  const [state, setState] = React.useState(0)
  return <CountContext.Provider value={[state, setState]} {...props} />
}

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
