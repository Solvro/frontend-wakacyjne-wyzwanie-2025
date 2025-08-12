// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import {useRef, useState, useEffect} from 'react'

// I admit to getting help and inspiration from /final for extra 4
// (saving key value into ref and generalizing with serialize and deserialize funcctions)
function useLocalStorageState(
  itemKey,
  initialItem = '',
  {serializeFunction = JSON.stringify, deserializeFunction = JSON.parse} = {},
) {
  const prevItemKey = useRef(itemKey)

  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [item, setItem] = useState(() => {
    const initialLocalStorageItem = window.localStorage.getItem(itemKey)

    if (initialLocalStorageItem) {
      try {
        return deserializeFunction(initialLocalStorageItem)
      } catch (e) {
        console.warn(e)
        window.localStorage.removeItem(itemKey)
      }
    }

    return typeof initialItem === 'function' ? initialItem() : initialItem
  })

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  useEffect(() => {
    if (prevItemKey.current !== itemKey) {
      window.localStorage.removeItem(prevItemKey.current.value)
      prevItemKey.current = itemKey
    }

    const parsedItem = serializeFunction(item)
    window.localStorage.setItem(itemKey, parsedItem)

    console.log(`Saved to local storage: ${item}`)
  }, [item, itemKey, serializeFunction])

  return [item, setItem]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

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
