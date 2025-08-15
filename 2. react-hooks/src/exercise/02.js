// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue='') {
  const [state, setState] = React.useState(
    () => {
      const localValue= window.localStorage.getItem(key)
      if(localValue) {
        return JSON.parse(localValue)
      }
      return defaultValue
    }
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {

  const [name, setName] = useLocalStorageState(initialName)

  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') ?? initialName

  //   //window.localStorage.getItem('name') ?? initialName
  // )


  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
