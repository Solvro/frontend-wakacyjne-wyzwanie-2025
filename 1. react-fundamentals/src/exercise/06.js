// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

// Part 1
// function UsernameForm({onSubmitUsername}) {
//   function handleSubmit(event) {
//     event.preventDefault()
//     const username = event.target.elements[0].value
//     onSubmitUsername(username)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

// function App() {
//   const onSubmitUsername = username => alert(`You entered: ${username}`)
//   return <UsernameForm onSubmitUsername={onSubmitUsername} />
// }

// Part 2
// function UsernameForm({onSubmitUsername}) {
//   const usernameRef = React.useRef(null)

//   function handleSubmit(event) {
//     event.preventDefault()
//     onSubmitUsername(usernameRef.current.value)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" ref={usernameRef} />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   )
// }

// function App() {
//   const onSubmitUsername = username => alert(`You entered: ${username}`)
//   return <UsernameForm onSubmitUsername={onSubmitUsername} />
// }

// Part 3
// function UsernameForm({onSubmitUsername}) {
//   const [error, setError] = React.useState('')

//   function handleChange(event) {
//     const inputUsername = event.target.value
//     setError(
//       inputUsername === inputUsername.toLowerCase()
//         ? ''
//         : 'Username must be lowercase',
//     )
//   }

//   function handleSubmit(event) {
//     event.preventDefault()
//     onSubmitUsername(event.target.elements.username.value)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" onChange={handleChange} />
//         <div role="alert" style={{color: 'red'}}>
//           {error}
//         </div>
//       </div>
//       <button type="submit" disabled={error !== ''}>
//         Submit
//       </button>
//     </form>
//   )
// }

// Part 4
function UsernameForm({onSubmitUsername}) {
  const [username, setUsername] = React.useState('')

  function handleChange(event) {
    const inputUsername = event.target.value
    setUsername(inputUsername.toLowerCase())
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmitUsername(event.target.elements.username.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleChange}
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
