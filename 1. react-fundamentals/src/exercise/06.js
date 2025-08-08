// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import {useRef} from 'react'

function UsernameForm({onSubmitUsername}) {
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
    event.preventDefault()
    const username = event.target.elements.usernameInput.value
    onSubmitUsername(username)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input type="text" id="usernameInput" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function UsernameFormExtra1({onSubmitUsername}) {
  const inputRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    const username = inputRef.current.value
    onSubmitUsername(username)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInputExtra1">Username:</label>
        <input id="usernameInputExtra1" type="text" ref={inputRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return (
    <div className="flex">
      <h3>Task</h3>
      <UsernameForm onSubmitUsername={onSubmitUsername} />
      <h3>Extra 1</h3>
      <UsernameFormExtra1 onSubmitUsername={onSubmitUsername} />
    </div>
  )
}

export default App
