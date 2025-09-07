// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext
const countContext = React.createContext()

function CountProvider(props){
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <countContext.Provider value = {value} {...props} />
}
// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [count] = React.useContext(countContext)
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const[, setCount] = React.useContext(countContext)
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
