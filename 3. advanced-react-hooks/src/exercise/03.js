// import * as React from 'react'
//
//
// const CountContext = React.createContext()
//
// function CountProvider(props) {
//     const [count, setCount] = React.useState(0)
//     const value = [count, setCount]
//     return <CountContext.Provider value={value} {...props} />
// }
//
// function CountDisplay() {
//     const [count] = React.useContext(CountContext)
//     return <div>{`The current count is ${count}`}</div>
// }
//
// function Counter() {
//     const [, setCount] = React.useContext(CountContext)
//     const increment = () => setCount(c => c + 1)
//     return <button onClick={increment}>Increment count</button>
// }
//
//
// function App() {
//     return (
//         <div>
//            <CountProvider>
//                 <CountDisplay/>
//                 <Counter/>
//            </CountProvider>
//         </div>
//     )
// }

export default App

// Extra 1
import * as React from 'react'


const CountContext = React.createContext()

function CountProvider(props) {
    const [count, setCount] = React.useState(0)
    const value = [count, setCount]
    return <CountContext.Provider value={value} {...props} />
}

function useCount() {
    const context = React.useContext(CountContext)
    if (!context) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

function CountDisplay() {
    const [count] = useCount()
    return <div>{`The current count is ${count}`}</div>
}

function Counter() {
    const [, setCount] = useCount()
    const increment = () => setCount(c => c + 3)
    return <button onClick={increment}>Increment count</button>
}

function App() {
    return (
        <div>
            <CountProvider>
                <CountDisplay />
                <Counter />
            </CountProvider>
        </div>
    )
}