// ZADANIE 0, 1, 2
// import * as React from 'react'
// import {
//   useForceRerender,
//   useDebouncedState,
//   AppGrid,
//   updateGridState,
//   updateGridCellState,
// } from '../utils'

// const AppStateContext = React.createContext()
// const AppDispatchContext = React.createContext()

// const initialGrid = Array.from({length: 100}, () =>
//   Array.from({length: 100}, () => Math.random() * 100),
// )

// function appReducer(state, action) {
//   switch (action.type) {
//     case 'UPDATE_GRID_CELL': {
//       return {...state, grid: updateGridCellState(state.grid, action)}
//     }
//     case 'UPDATE_GRID': {
//       return {...state, grid: updateGridState(state.grid)}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function AppProvider({children}) {
//   const [state, dispatch] = React.useReducer(appReducer, {
//     grid: initialGrid,
//   })
//   return (
//     <AppStateContext.Provider value={state}>
//       <AppDispatchContext.Provider value={dispatch}>
//         {children}
//       </AppDispatchContext.Provider>
//     </AppStateContext.Provider>
//   )
// }

// function useAppState() {
//   const context = React.useContext(AppStateContext)
//   if (!context) {
//     throw new Error('useAppState must be used within the AppProvider')
//   }
//   return context
// }

// function useAppDispatch() {
//   const context = React.useContext(AppDispatchContext)
//   if (!context) {
//     throw new Error('useAppDispatch must be used within the AppProvider')
//   }
//   return context
// }

// const DogContext = React.createContext()
// const DogDispatchContext = React.createContext()

// function dogReducer(state, action) {
//   switch (action.type) {
//     case 'SET_DOG_NAME': {
//       return {dogName: action.dogName}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function DogProvider({children}) {
//   const [state, dispatch] = React.useReducer(dogReducer, {dogName: ''})
//   return (
//     <DogContext.Provider value={state}>
//       <DogDispatchContext.Provider value={dispatch}>
//         {children}
//       </DogDispatchContext.Provider>
//     </DogContext.Provider>
//   )
// }

// function useDogState() {
//   const context = React.useContext(DogContext)
//   if (!context) {
//     throw new Error('useDogState must be used within the DogProvider')
//   }
//   return context
// }

// function useDogDispatch() {
//   const context = React.useContext(DogDispatchContext)
//   if (!context) {
//     throw new Error('useDogDispatch must be used within the DogProvider')
//   }
//   return context
// }

// function Grid() {
//   const dispatch = useAppDispatch()
//   const [rows, setRows] = useDebouncedState(50)
//   const [columns, setColumns] = useDebouncedState(50)
//   const updateGridData = () => dispatch({type: 'UPDATE_GRID'})
//   return (
//     <AppGrid
//       onUpdateGrid={updateGridData}
//       rows={rows}
//       handleRowsChange={setRows}
//       columns={columns}
//       handleColumnsChange={setColumns}
//       Cell={Cell}
//     />
//   )
// }
// Grid = React.memo(Grid)

// function CellImpl({cell, onClick}) {
//   return (
//     <button
//       className="cell"
//       onClick={onClick}
//       style={{
//         color: cell > 50 ? 'white' : 'black',
//         backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
//       }}
//     >
//       {Math.floor(cell)}
//     </button>
//   )
// }
// CellImpl = React.memo(CellImpl)

// function Cell({row, column}) {
//   const state = useAppState()
//   const dispatch = useAppDispatch()
//   const cell = state.grid[row][column]

//   const handleClick = () => dispatch({type: 'UPDATE_GRID_CELL', row, column})

//   return <CellImpl cell={cell} onClick={handleClick} />
// }

// function DogNameInput() {
//   const {dogName} = useDogState()
//   const dispatch = useDogDispatch()

//   function handleChange(event) {
//     const newDogName = event.target.value
//     dispatch({type: 'SET_DOG_NAME', dogName: newDogName})
//   }

//   return (
//     <form onSubmit={e => e.preventDefault()}>
//       <label htmlFor="dogName">Dog Name</label>
//       <input
//         value={dogName}
//         onChange={handleChange}
//         id="dogName"
//         placeholder="Toto"
//       />
//       {dogName ? (
//         <div>
//           <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
//         </div>
//       ) : null}
//     </form>
//   )
// }

// function App() {
//   const forceRerender = useForceRerender()
//   return (
//     <div className="grid-app">
//       <button onClick={forceRerender}>force rerender</button>
//       <AppProvider>
//         <DogProvider>
//           <div>
//             <DogNameInput />
//             <Grid />
//           </div>
//         </DogProvider>
//       </AppProvider>
//     </div>
//   )
// }

// export default App

// /*
// eslint
//   no-func-assign: 0,
// */

// ZADANIE 3
// import * as React from 'react'
// import {
//   useForceRerender,
//   useDebouncedState,
//   AppGrid,
//   updateGridState,
//   updateGridCellState,
// } from '../utils'

// const AppStateContext = React.createContext()
// const AppDispatchContext = React.createContext()

// const initialGrid = Array.from({length: 100}, () =>
//   Array.from({length: 100}, () => Math.random() * 100),
// )

// function appReducer(state, action) {
//   switch (action.type) {
//     case 'UPDATE_GRID_CELL': {
//       return {...state, grid: updateGridCellState(state.grid, action)}
//     }
//     case 'UPDATE_GRID': {
//       return {...state, grid: updateGridState(state.grid)}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function AppProvider({children}) {
//   const [state, dispatch] = React.useReducer(appReducer, {
//     grid: initialGrid,
//   })
//   return (
//     <AppStateContext.Provider value={state}>
//       <AppDispatchContext.Provider value={dispatch}>
//         {children}
//       </AppDispatchContext.Provider>
//     </AppStateContext.Provider>
//   )
// }

// function useAppState() {
//   const context = React.useContext(AppStateContext)
//   if (!context) {
//     throw new Error('useAppState must be used within the AppProvider')
//   }
//   return context
// }

// function useAppDispatch() {
//   const context = React.useContext(AppDispatchContext)
//   if (!context) {
//     throw new Error('useAppDispatch must be used within the AppProvider')
//   }
//   return context
// }

// const DogContext = React.createContext()
// const DogDispatchContext = React.createContext()

// function dogReducer(state, action) {
//   switch (action.type) {
//     case 'SET_DOG_NAME': {
//       return {dogName: action.dogName}
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function DogProvider({children}) {
//   const [state, dispatch] = React.useReducer(dogReducer, {dogName: ''})
//   return (
//     <DogContext.Provider value={state}>
//       <DogDispatchContext.Provider value={dispatch}>
//         {children}
//       </DogDispatchContext.Provider>
//     </DogContext.Provider>
//   )
// }

// function useDogState() {
//   const context = React.useContext(DogContext)
//   if (!context) {
//     throw new Error('useDogState must be used within the DogProvider')
//   }
//   return context
// }

// function useDogDispatch() {
//   const context = React.useContext(DogDispatchContext)
//   if (!context) {
//     throw new Error('useDogDispatch must be used within the DogProvider')
//   }
//   return context
// }

// function Grid() {
//   const dispatch = useAppDispatch()
//   const [rows, setRows] = useDebouncedState(50)
//   const [columns, setColumns] = useDebouncedState(50)
//   const updateGridData = () => dispatch({type: 'UPDATE_GRID'})

//   return (
//     <AppGrid
//       onUpdateGrid={updateGridData}
//       rows={rows}
//       handleRowsChange={setRows}
//       columns={columns}
//       handleColumnsChange={setColumns}
//       Cell={Cell}
//     />
//   )
// }
// Grid = React.memo(Grid)

// function withStateSlice(Component, sliceFn) {
//   function Wrapper(props) {
//     const state = useAppState()
//     const slice = sliceFn(state, props)
//     return <Component {...props} stateSlice={slice} />
//   }
//   return React.memo(Wrapper)
// }

// function CellImpl({stateSlice: cell, row, column}) {
//   const dispatch = useAppDispatch()
//   const handleClick = () => dispatch({type: 'UPDATE_GRID_CELL', row, column})

//   return (
//     <button
//       className="cell"
//       onClick={handleClick}
//       style={{
//         color: cell > 50 ? 'white' : 'black',
//         backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
//       }}
//     >
//       {Math.floor(cell)}
//     </button>
//   )
// }
// const Cell = withStateSlice(CellImpl, (state, {row, column}) => state.grid[row][column])


// function DogNameInput() {
//   const {dogName} = useDogState()
//   const dispatch = useDogDispatch()

//   function handleChange(event) {
//     const newDogName = event.target.value
//     dispatch({type: 'SET_DOG_NAME', dogName: newDogName})
//   }

//   return (
//     <form onSubmit={e => e.preventDefault()}>
//       <label htmlFor="dogName">Dog Name</label>
//       <input
//         value={dogName}
//         onChange={handleChange}
//         id="dogName"
//         placeholder="Toto"
//       />
//       {dogName ? (
//         <div>
//           <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
//         </div>
//       ) : null}
//     </form>
//   )
// }

// function App() {
//   const forceRerender = useForceRerender()
//   return (
//     <div className="grid-app">
//       <button onClick={forceRerender}>force rerender</button>
//       <AppProvider>
//         <DogProvider>
//           <div>
//             <DogNameInput />
//             <Grid />
//           </div>
//         </DogProvider>
//       </AppProvider>
//     </div>
//   )
// }

// export default App

// /*
// eslint
//   no-func-assign: 0,
// */


// ZADANIE 4
import * as React from 'react'
import {useForceRerender, useDebouncedState, AppGrid} from '../utils'
import {RecoilRoot, useRecoilState, useRecoilCallback, atomFamily} from 'recoil'

const AppStateContext = React.createContext()

const initialGrid = Array.from({length: 100}, () =>
  Array.from({length: 100}, () => Math.random() * 100),
)

const cellAtoms = atomFamily({
  key: 'cells',
  default: ({row, column}) => initialGrid[row][column],
})

function useUpdateGrid() {
  return useRecoilCallback(({set}) => ({rows, columns}) => {
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        if (Math.random() > 0.7) {
          set(cellAtoms({row, column}), Math.random() * 100)
        }
      }
    }
  })
}

function appReducer(state, action) {
  switch (action.type) {
    case 'TYPED_IN_DOG_INPUT': {
      return {...state, dogName: action.dogName}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({children}) {
  const [state, dispatch] = React.useReducer(appReducer, {
    dogName: '',
  })
  const value = [state, dispatch]
  return (
    <AppStateContext.Provider value={value}>
      {children}
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

function Grid() {
  const updateGrid = useUpdateGrid()
  const [rows, setRows] = useDebouncedState(50)
  const [columns, setColumns] = useDebouncedState(50)
  const updateGridData = () => updateGrid({rows, columns})
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

function Cell({row, column}) {
  const [cell, setCell] = useRecoilState(cellAtoms({row, column}))
  const handleClick = () => setCell(Math.random() * 100)
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

function DogNameInput() {
  const [state, dispatch] = useAppState()
  const {dogName} = state

  function handleChange(event) {
    const newDogName = event.target.value
    dispatch({type: 'TYPED_IN_DOG_INPUT', dogName: newDogName})
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
      <RecoilRoot>
        <AppProvider>
          <div>
            <DogNameInput />
            <Grid />
          </div>
        </AppProvider>
      </RecoilRoot>
    </div>
  )
}

export default App

/*
eslint
  no-func-assign: 0,
*/
