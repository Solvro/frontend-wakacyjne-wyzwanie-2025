// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import { useState } from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = useState(initialName);

  const handleChangeName = (event) => {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChangeName} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName='Nikita'/>
}

export default App
