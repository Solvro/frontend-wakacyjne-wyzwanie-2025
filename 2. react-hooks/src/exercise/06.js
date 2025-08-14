// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {PokemonForm, PokemonInfoFallback, PokemonDataView, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)

  

  fetchPokemon(pokemonName).then(
      pokemonData => {setPokemon(pokemonData)},
    )
  React.useEffect(() => {
    if(!pokemonName) return
  },[pokemonName])

  if(!pokemonName){
    return 'Submit a pokemon'
  }
  else if(!pokemon){
    return <PokemonInfoFallback name={pokemonName} />
  }  
  else{
    return <PokemonDataView pokemon={pokemon} />
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
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
