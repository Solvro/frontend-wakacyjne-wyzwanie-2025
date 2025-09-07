// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import { useState, useEffect } from 'react'

function useLocalStorageState( stateName, initialState ) {
  const value = window.localStorage.getItem(stateName) ?? initialState;
  const isStorage = window.localStorage.getItem(stateName);
  const isObject = typeof initialState === 'object' && value !== null && !Array.isArray(initialState);
  const isArray = Array.isArray(initialState);

  const [state, setState] = useState(() => isStorage ? isObject ? JSON.parse(value) : isArray ? value.split(',') : value : value);
  
  useEffect(() => {
    window.localStorage.setItem(stateName, isArray ? value.toString() : isObject ? JSON.stringify(state) :  state);
  }, [state]);
  
  return [state, setState];
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', initialName);

  const handleChange = (event) => {
    setName(event.target.value);
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
