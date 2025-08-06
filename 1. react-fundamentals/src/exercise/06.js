// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {useRef} from 'react'

function UsernameForm({onSubmitUsername}) {

  const inputID = 'usernameInput'
  const inputRef = useRef(null);
  const [error, setError] = React.useState(null)
  const [username, setUsername] = React.useState('')

  function handleSubmit(event){
    event.preventDefault()
    //basic
    //const value = event.target.elements[inputID].value;

    //extra credit 1
    const value = inputRef.current.value;
    onSubmitUsername(value);
  }

  /*extra credit 2
  function handleChange(event){
    const value = event.target.value;
    setError(value !== value.toLowerCase() ? 'No capital letters allowed' : null);
  }*/

  //extra credit 3
  function handleChange(event){
    setUsername(event.target.value.toLowerCase());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor = {inputID}> Username: </label>
        <input id = {inputID} type="text" ref={inputRef} onChange={handleChange} value={username} />
      </div>
      <div role="alert" style={{color: 'red'}}> {error} </div>
      <button disabled = {error} type="submit"> Submit </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
