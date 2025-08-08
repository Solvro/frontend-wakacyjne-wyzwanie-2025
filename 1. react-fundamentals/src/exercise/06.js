// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  
  function handlerSubmit(event){
    event.preventDefault();
    const value = event.target[0].value;
    onSubmitUsername(value);
  }

  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <label htmlFor='username'>Username:</label>
        <input id = 'username' name = 'username' type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
