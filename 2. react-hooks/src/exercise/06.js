// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

// extra 6
import {ErrorBoundary} from 'react-error-boundary'

// extra 2
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

// extra 4
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {error: null}
//   }

//   static getDerivedStateFromError(error) {
//     return {error: error}
//   }

//   render() {
//     if (this.state.error) {
//       return <this.props.fallback error={this.state.error} />
//     }
//     return this.props.children
//   }
// }

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
  // (This is to enable the loading state when switching between different pokemon.)
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // const [status, setStatus] = React.useState(Status.IDLE)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)

  // extra 3
  const [state, setState] = React.useState({
    status: Status.IDLE,
    pokemon: null,
    error: null,
  })

  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName || pokemonName.trim() === '') return

    // setStatus(Status.PENDING)
    // setPokemon(null)
    setState({status: Status.PENDING})

    fetchPokemon(pokemonName).then(
      pokemonData => {
        // setPokemon(pokemonData)
        // setStatus(Status.RESOLVED)
        setState({status: Status.RESOLVED, pokemon: pokemonData})
      },
      error => {
        // setError(error)
        // setStatus(Status.REJECTED)
        setState({status: Status.REJECTED, error: error})
      },
    )
  }, [pokemonName])

  // extra 1
  // if (error)
  //   return (
  //     <div role="alert">
  //       There was an error:{' '}
  //       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  //     </div>
  //   )

  // if (!pokemonName || pokemonName.trim() === '') return 'Submit a pokemon'
  // else if (!pokemon) return <PokemonInfoFallback name={pokemonName} />
  // return <PokemonDataView pokemon={pokemon} />

  // extra 2
  switch (status) {
    case Status.IDLE:
      return 'Submit a pokemon'
    case Status.PENDING:
      return <PokemonInfoFallback name={pokemonName} />
    case Status.RESOLVED:
      return <PokemonDataView pokemon={pokemon} />
    case Status.REJECTED:
      throw error
    default:
      throw new Error('Internal error')
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* extra 4 and 5 */}
        {/* <ErrorBoundary key={pokemonName} fallback={ErrorFallback}> */}
        {/* extra 6 */}
        <ErrorBoundary
          key={pokemonName}
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
