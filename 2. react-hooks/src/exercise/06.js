// Zadanie 0, 1, 2
// import * as React from 'react'
// import {
//   PokemonForm,
//   fetchPokemon,
//   PokemonDataView,
//   PokemonInfoFallback,
// } from '../pokemon'

// function PokemonInfo({pokemonName}) {
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)
//   const [status, setStatus] = React.useState('idle')

//   React.useEffect(() => {
//     if (!pokemonName) return

//     setPokemon(null)
//     setError(null)
//     setStatus('pending')
//     fetchPokemon(pokemonName)
//       .then(pokemon => {
//         setPokemon(pokemon)
//         setStatus('resolved')
//       })
//       .catch(error => {
//         setError(error)
//         setStatus('rejected')
//       })
//   }, [pokemonName])

//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'rejected') {
//     return (
//       <div role="alert">
//         There was an error:{' '}
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }

// export default App

// Zadanie 3, 4, 5
// import * as React from 'react'
// import {
//   PokemonForm,
//   fetchPokemon,
//   PokemonDataView,
//   PokemonInfoFallback,
// } from '../pokemon'

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {error: null}
//   }

//   static getDerivedStateFromError(error) {
//     return {error}
//   }

//   render() {
//     if (this.state.error) {
//       return (
//         <div role="alert">
//           There was an error:{' '}
//           <pre style={{whiteSpace: 'normal'}}>{this.state.error.message}</pre>
//         </div>
//       )
//     }

//     return this.props.children
//   }
// }

// function PokemonInfo({pokemonName}) {
//   const [state, setState] = React.useState({
//     pokemon: null,
//     status: 'idle',
//     error: null,
//   })

//   React.useEffect(() => {
//     if (!pokemonName) return

//     setState({pokemon: null, status: 'pending', error: null})
//     fetchPokemon(pokemonName)
//       .then(pokemon => {
//         setState({pokemon, status: 'resolved', error: null})
//       })
//       .catch(error => {
//         setState({pokemon: null, status: 'rejected', error})
//       })
//   }, [pokemonName])

//   if (state.status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (state.status === 'rejected') {
//     throw state.error
//     // return (
//     //   <div role="alert">
//     //     There was an error:{' '}
//     //     <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
//     //   </div>
//     // )
//   } else if (state.status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (state.status === 'resolved') {
//     return <PokemonDataView pokemon={state.pokemon} />
//   }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <ErrorBoundary key={pokemonName}>
//           <PokemonInfo pokemonName={pokemonName} />
//         </ErrorBoundary>
//       </div>
//     </div>
//   )
// }

// export default App

// Zadanie 6, 7, 8
import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    status: 'idle',
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) return

    setState({pokemon: null, status: 'pending', error: null})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({pokemon, status: 'resolved', error: null})
      })
      .catch(error => {
        setState({pokemon: null, status: 'rejected', error})
      })
  }, [pokemonName])

  if (state.status === 'idle') {
    return 'Submit a pokemon'
  } else if (state.status === 'rejected') {
    throw state.error
  } else if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
