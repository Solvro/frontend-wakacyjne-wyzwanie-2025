// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  const username = React.useRef("");
  const [error, setError] = React.useState(null);
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  const handleSubmit = event => {
    const username = event.target.elements[0].value;
    onSubmitUsername(username);
  }
  const handleChange = event => {
    username.current = event.target.value;
    if (!(username.current === username.current.toLowerCase())) {
      setError('Username must be lower case');
    }
    else {
      setError(null);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div role="alert" style={{color: 'red'}}>
          {error}
        </div>
        <label>Username:</label>
        <input type="text"  onChange={(e) => handleChange(e)}/>
      </div>
      <button type="submit" disabled={Boolean(error)} >Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
