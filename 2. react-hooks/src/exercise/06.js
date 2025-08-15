// import * as React from 'react'
// import {
//     fetchPokemon,
//     PokemonInfoFallback,
//     PokemonForm,
//     PokemonDataView,
// } from '../pokemon'
//
// function PokemonInfo({pokemonName}) {
//     const [pokemon, setPokemon] = React.useState(null)      // Have state for the pokemon (null)
//
//     React.useEffect(() => {
//         // If pokemonName is falsy, exit early
//         if (!pokemonName) {
//             return
//         }
//
//         setPokemon(null)
//         fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon))
//     }, [pokemonName])
//
//     if (!pokemonName) {
//         return 'Submit a pokemon'
//     } else if (!pokemon) {
//         return <PokemonInfoFallback name={pokemonName} />
//     } else {
//         return <PokemonDataView pokemon={pokemon} />
//     }
// }
//
// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')
//
//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }
//
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
//
// export default App

// Extra 1
// import * as React from 'react'
// import {
//     fetchPokemon,
//     PokemonInfoFallback,
//     PokemonForm,
//     PokemonDataView,
// } from '../pokemon'
//
// function PokemonInfo({pokemonName}) {
//     const [pokemon, setPokemon] = React.useState(null)      // Have state for the pokemon (null)
//     const [error, setError] = React.useState(null)          // Have state for error (null)
//
//     React.useEffect(() => {
//         // If pokemonName is falsy, exit early
//         if (!pokemonName) {
//             return
//         }
//
//         setError(null)
//         setPokemon(null)
//         fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon),
//             error =>
//                 setError(error)                                        // If there's an error, set the error state
//         )
//     }, [pokemonName])
//
//     if( error) {
//         return (
//             <div role="alert">
//                 There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//             </div>
//         )
//     }
//     if (!pokemonName) {
//         return 'Submit a pokemon'
//     } else if (!pokemon) {
//         return <PokemonInfoFallback name={pokemonName} />
//     } else {
//         return <PokemonDataView pokemon={pokemon} />
//     }
// }
//
// function App() {
//     const [pokemonName, setPokemonName] = React.useState('')
//
//     function handleSubmit(newPokemonName) {
//         setPokemonName(newPokemonName)
//     }
//
//     return (
//         <div className="pokemon-info-app">
//             <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//             <hr />
//             <div className="pokemon-info">
//                 <PokemonInfo pokemonName={pokemonName} />
//             </div>
//         </div>
//     )
// }
//
// export default App


// Extra 2
import * as React from 'react'
import {
    fetchPokemon,
    PokemonInfoFallback,
    PokemonForm,
    PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {

    const [status, setStatus] = React.useState('idle')
    const [pokemon, setPokemon] = React.useState(null)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if (!pokemonName) {
            return
        }

        setStatus('pending')
        fetchPokemon(pokemonName).then(
            pokemon => {
                setPokemon(pokemon)
                setStatus('resolved')
            },
            error => {
                setError(error)
                setStatus('rejected')
            },
        )
    }, [pokemonName])

    if (status === 'idle') {
        return 'Submit a pokemon'
    } else if (status === 'pending') {
        return <PokemonInfoFallback name={pokemonName} />
    } else if (status === 'rejected') {
        return (
            <div>
                There was an error:{' '}
                <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
            </div>
        )
    } else if (status === 'resolved') {
        return <PokemonDataView pokemon={pokemon} />
    }

    throw new Error('This should never happened')
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
