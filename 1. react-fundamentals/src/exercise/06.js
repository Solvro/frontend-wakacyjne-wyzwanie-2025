import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
    const [username, setUsername] = React.useState('')

    // 1
    // const [error, setError] = React.useState(null)

    function handleSubmit(event){
        event.preventDefault()
        onSubmitUsername(username)
        // 1
        // onSubmitUsername(value)

        console.log(`Submitted form`)
        console.dir(event.target)
    }

    function handleChange(event) {
        const {value} = event.target
        setUsername(value.toLowerCase())
        // 1
        // const isLowerCase = value === value.toLowerCase()
        // setError(isLowerCase ? null : 'Username must be lower case')
    }

  return (
      <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="usernameInput">Username:</label>
              <input
                  id="usernameInput"
                  type="text"
                  onChange={handleChange}
                  value={username}
              />
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
