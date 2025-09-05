// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
const CountContext = React.createContext()


// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props

function CountProvider({children}) {
  const value = React.useState(0)
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountDisplay() {

  const [count] = React.useContext(CountContext) // 🐨 replace null with the count from context
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  
  const [,setCount] = React.useContext(CountContext)
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
