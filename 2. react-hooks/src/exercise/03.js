// Zadanie 0
// import * as React from 'react'

// function Name({name, onNameChange}) {
//   return (
//     <div>
//       <label htmlFor="name">Name: </label>
//       <input id="name" value={name} onChange={onNameChange} />
//     </div>
//   )
// }

// function FavoriteAnimal({animal, onAnimalChange}) {
//   return (
//     <div>
//       <label htmlFor="animal">Favorite Animal: </label>
//       <input
//         id="animal"
//         value={animal}
//         onChange={event => onAnimalChange(event.target.value)}
//       />
//     </div>
//   )
// }

// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }

// function App() {
//   const [animal, setAnimal] = React.useState('')
//   const [name, setName] = React.useState('')
//   return (
//     <form>
//       <Name name={name} onNameChange={event => setName(event.target.value)} />
//       <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
//       <Display name={name} animal={animal} />
//     </form>
//   )
// }

// export default App

// Zadanie 1
import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.target.value)}
      />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      <Display animal={animal} />
    </form>
  )
}

export default App
