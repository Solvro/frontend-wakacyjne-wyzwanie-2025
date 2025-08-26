// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'
function PokemonInfo({pokemonName = ""}) {
  const [state, setState] = React.useState({status: "idle", pokemon: null, error: null})
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() =>{
    setState({...state, error: null})
    if(pokemonName !== ""){
      setState({...state, status: "pending"})
      fetchPokemon(pokemonName).then(
      pokemonData => setState({...state, pokemon: pokemonData, status: "resolved"}),
      err => {setState({...state, error: err, status: "rejected"}); throw err},
      )
    }
  },[pokemonName])
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

  // 💣 remove this

  
  

  if(state.status === "idle"){
    return 'Submit a pokemon';
  }else if(state.status === "pending"){
    return <PokemonInfoFallback name={pokemonName} />
  }else if(state.status === "resolved"){
    return <PokemonDataView pokemon={state.pokemon} />
  }else if(state.status === "rejected"){
    throw state.error
  }
}

const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  const handleReset = () => {
    setPokemonName("")
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
