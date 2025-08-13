import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  const handleSubmit = event => {
    event.preventDefault()
    const username = event.target.elements.usernameInput.value
    onSubmitUsername(username)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`Wpisano: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App