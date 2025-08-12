// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import {useState} from 'react'

function Greeting({initialName = 'Bart', style}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = useState(initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div style={style}>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return (
    <div>
      <Greeting />
      <Greeting initialName="Mike" style={{marginTop: 48}} />
    </div>
  )
}

export default App
