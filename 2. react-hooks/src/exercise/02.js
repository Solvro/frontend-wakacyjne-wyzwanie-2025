// import * as React from 'react'
// Zadanie 0
// function Greeting({initialName = ''}) {
//   const [name, setName] = React.useState(
//     window.localStorage.getItem('name') ?? initialName,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name])

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting />
// }

// export default App

// Zadanie 1
// import * as React from 'react'

// function Greeting({initialName = ''}) {
//   const [name, setName] = React.useState(
//     () => window.localStorage.getItem('name') ?? initialName,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name])

//   function handleChange(event) {
//     setName(event.target.value)
//   }

//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting />
// }

// export default App

// Zadanie 3
// import * as React from 'react'

// function useLocalStorageState(key, initialValue) {
//   const [value, setValue] = React.useState(() => {
//     return window.localStorage.getItem(key) ?? initialValue
//   })

//   React.useEffect(() => {
//     window.localStorage.setItem(key, value)
//   }, [key, value])

//   return [value, setValue]
// }

// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorageState('name', initialName)

//   function handleChange(event) {
//     setName(event.target.value)
//   }

//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting />
// }

// export default App

// Zadanie 4
import * as React from 'react'

function useLocalStorageState(key, initialValue) {
  const storageKey = String(key)

  const [value, setValue] = React.useState(() => {
    try {
      const storedValue = window.localStorage.getItem(storageKey)
      if (storedValue !== null) {
        return JSON.parse(storedValue)
      }
    } catch (error) {
      console.error('Error reading localStorage key:', storageKey, error)
    }
    return initialValue
  })

  React.useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing localStorage key:', storageKey, error)
    }
  }, [storageKey, value])

  const setStoredValue = newValue => {
    setValue(prevValue =>
      typeof newValue === 'function' ? newValue(prevValue) : newValue,
    )
  }

  return [value, setStoredValue]
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
