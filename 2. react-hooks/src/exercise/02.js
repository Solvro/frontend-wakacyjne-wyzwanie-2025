// import * as React from 'react'
//
// function Greeting() {
//   const initialName = ''
//   const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName)
//
//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   })
//
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
//
// function App() {
//   return <Greeting />
// }
//
// export default App


// Extra 2
// import * as React from 'react'
//
// function Greeting({initialName = ''}) {
//   console.log('rendering')
//
//   const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName)
//
//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   })
//
//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//       <div>
//         <form>
//           <label htmlFor="name">Name: </label>
//           <input value={name} onChange={handleChange} id="name" />
//         </form>
//         {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//       </div>
//   )
// }
//
// function App() {
//   return <Greeting />
// }
//
// export default App


// Extra 3
// import * as React from 'react'
//
// function useLocalStorageState(key, defaultValue = '') {
//   const [state, setState] = React.useState(
//       () => window.localStorage.getItem(key) || defaultValue
//   )
//
//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])
//
//   return [state, setState]
// }
//
//
// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorageState('name', initialName)
//
//   function handleChange(event) {
//     setName(event.target.value)
//   }
//
//   return (
//       <div>
//         <form>
//           <label htmlFor="name">Name: </label>
//           <input value={name} onChange={handleChange} id="name" />
//         </form>
//         {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//       </div>
//   )
// }
//
//
// function App() {
//   return <Greeting />
// }
//
// export default App


// Extra 4
import * as React from 'react'

function useLocalStorageState(
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)

    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }

    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
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
