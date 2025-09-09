// Fix "perf death by a thousand cuts"
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  useForceRerender,
  useDebouncedState,
  AppGrid,
  updateGridState,
  updateGridCellState,
} from '../utils'

const AppStateContext = React.createContext()
const AppDispatchContext = React.createContext()
// extra 1
const DogContext = React.createContext()

const initialGrid = Array.from({length: 100}, () =>
  Array.from({length: 100}, () => Math.random() * 100),
)

function appReducer(state, action) {
  switch (action.type) {
    // we're no longer managing the dogName state in our reducer
    // 💣 remove this case
    // case 'TYPED_IN_DOG_INPUT': {
    //   return {...state, dogName: action.dogName}
    // }
    case 'UPDATE_GRID_CELL': {
      return {...state, grid: updateGridCellState(state.grid, action)}
    }
    case 'UPDATE_GRID': {
      return {...state, grid: updateGridState(state.grid)}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({children}) {
  const [state, dispatch] = React.useReducer(appReducer, {
    // 💣 remove the dogName state because we're no longer managing that
    // dogName: '',
    grid: initialGrid,
  })
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

function useAppState() {
  const context = React.useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppProvider')
  }
  return context
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext)
  if (!context) {
    throw new Error('useAppDispatch must be used within the AppProvider')
  }
  return context
}

// extra 1
function DogProvider({children}) {
  const [dogName, setDogName] = React.useState('')
  return (
    <DogContext.Provider value={[dogName, setDogName]}>
      {children}
    </DogContext.Provider>
  )
}

// extra 1
function useDogState() {
  const context = React.useContext(DogContext)
  if (!context) {
    throw new Error('useDogState must be used within DogContext')
  }
  return context
}

function Grid() {
  const dispatch = useAppDispatch()
  const [rows, setRows] = useDebouncedState(50)
  const [columns, setColumns] = useDebouncedState(50)
  const updateGridData = () => dispatch({type: 'UPDATE_GRID'})
  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell}
    />
  )
}

Grid = React.memo(Grid)

// // extra 2
//   function Cell({row, column}) {
//     const state = useAppState()
//     const cell = state.grid[row][column]
//     // extra 2
//     return <CellImpl cell={cell} row={row} column={column} />
//   }

//   Cell = React.memo(Cell)

//   // extra 2
//   // here React.memo works because it compares props with Object.is which is similar to ===
//   function CellImpl({cell, row, column}) {
//     // track when it's rendered (on cell update only one Cell gets updated - cool!)
//     console.log(`Cell ${row} ${column} render`)
//     // (commented out for extra 2)
//     // const state = useAppState()
//     // const cell = state.grid[row][column]
//     const dispatch = useAppDispatch()
//     const handleClick = () => dispatch({type: 'UPDATE_GRID_CELL', row, column})
//     return (
//       <button
//         className="cell"
//         onClick={handleClick}
//         style={{
//           color: cell > 50 ? 'white' : 'black',
//           backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
//         }}
//       >
//         {Math.floor(cell)}
//       </button>
//     )
//   }

//   CellImpl = React.memo(CellImpl)

// extra 3
// I admit I had to use help (solution and gpt)
// But I understand what's going on
function withStateSlice(Component, sliceFunction) {
  const ComponentMemo = React.memo(Component)
  function ComponentWrapper(props) {
    const state = useAppState()
    const sliceState = sliceFunction(state, props)
    return <ComponentMemo sliceState={sliceState} {...props} />
  }
  return React.memo(ComponentWrapper)
}

// extra 3
function Cell({sliceState: cell, row, column}) {
  console.log(`Cell ${row} ${column} render`)
  const dispatch = useAppDispatch()
  const handleClick = () => dispatch({type: 'UPDATE_GRID_CELL', row, column})
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? 'white' : 'black',
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  )
}

Cell = withStateSlice(Cell, (state, {row, column}) => {
  return state.grid[row][column]
})

function DogNameInput() {
  // 🐨 replace the useAppState and useAppDispatch with a normal useState here
  // to manage the dogName locally within this component
  // const state = useAppState()
  // const dispatch = useAppDispatch()
  // const {dogName} = state
  const [dogName, setDogName] = React.useState('')

  function handleChange(event) {
    const newDogName = event.target.value
    // 🐨 change this to call your state setter that you get from useState
    // dispatch({type: 'TYPED_IN_DOG_INPUT', dogName: newDogName})
    setDogName(newDogName)
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  )
}

// extra 1
function DogNameInputExtra1() {
  const [dogName, setDogName] = useDogState()

  function handleChange(event) {
    const newDogName = event.target.value
    setDogName(newDogName)
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  )
}

function App() {
  const forceRerender = useForceRerender()
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <AppProvider>
        <div>
          <DogNameInput />
          <DogProvider>
            <DogNameInputExtra1 />
          </DogProvider>
          <Grid />
          AppProvider
        </div>
      </AppProvider>
    </div>
  )
}

export default App

/*
eslint
  no-func-assign: 0,
*/
