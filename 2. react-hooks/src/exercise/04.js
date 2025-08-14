// import * as React from 'react'
//
// function Board() {
//   const [squares, setSquares] = React.useState(() => Array(9).fill(null))
//
//   // squares[0] = 'X'
//   // squares[1] = 'O'
//   // squares[2] = 'X'
//
//   const nextValue = calculateNextValue(squares) // X or O
//   const winner = calculateWinner(squares) // X, O or null
//   const status = calculateStatus(winner, squares, nextValue) // Winner, Scratch, or Next player
//
//   // This is the function your square click handler will call. `square` should
//   // be an index. So if they click the center square, this will be `4`.
//   function selectSquare(square) {
//     if (winner || squares[square]) return
//
//     const squaresCopy = [...squares]
//     squaresCopy[square] = nextValue
//     setSquares(squaresCopy)
//   }
//
//   // make array empty
//   function restart() {
//     setSquares(Array(9).fill(null))
//   }
//   // render each square, it will be called 9 times,
//   function renderSquare(i) {
//     return (
//       <button className="square" onClick={() => selectSquare(i)}>
//         {squares[i]}
//       </button>
//     )
//   }
//
//   return (
//     <div>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         {renderSquare(0)}
//         {renderSquare(1)}
//         {renderSquare(2)}
//       </div>
//       <div className="board-row">
//         {renderSquare(3)}
//         {renderSquare(4)}
//         {renderSquare(5)}
//       </div>
//       <div className="board-row">
//         {renderSquare(6)}
//         {renderSquare(7)}
//         {renderSquare(8)}
//       </div>
//       <button className="restart" onClick={restart}>
//         restart
//       </button>
//     </div>
//   )
// }
//
// function Game() {
//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board />
//       </div>
//     </div>
//   )
// }
//
// // eslint-disable-next-line no-unused-vars
// function calculateStatus(winner, squares, nextValue) {
//   return winner
//     ? `Winner: ${winner}`
//     : squares.every(Boolean)
//     ? `Scratch: Cat's game`
//     : `Next player: ${nextValue}`
// }
//
// // eslint-disable-next-line no-unused-vars
// function calculateNextValue(squares) {
//   return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
// }
//
// // eslint-disable-next-line no-unused-vars
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ]
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i]
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a]
//     }
//   }
//   return null
// }
//
// function App() {
//   return <Game />
// }
//
// export default App


// Extra 1
// import * as React from 'react'
//
// function Board() {
//   const [squares, setSquares] = React.useState(
//       () =>
//           JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null))
//
//   // squares[0] = 'X'
//   // squares[1] = 'O'
//   // squares[2] = 'X'
//
//   React.useEffect(() => {
//     window.localStorage.setItem('squares', JSON.stringify(squares))
//   }, [squares])
//
//   const nextValue = calculateNextValue(squares) // X or O
//   const winner = calculateWinner(squares) // X, O or null
//   const status = calculateStatus(winner, squares, nextValue) // Winner, Scratch, or Next player
//
//   // This is the function your square click handler will call. `square` should
//   // be an index. So if they click the center square, this will be `4`.
//   function selectSquare(square) {
//     if (winner || squares[square]) return
//
//     const squaresCopy = [...squares]
//     squaresCopy[square] = nextValue
//     setSquares(squaresCopy)
//   }
//
//   // make array empty
//   function restart() {
//     setSquares(Array(9).fill(null))
//   }
//   // render each square, it will be called 9 times,
//   function renderSquare(i) {
//     return (
//         <button className="square" onClick={() => selectSquare(i)}>
//           {squares[i]}
//         </button>
//     )
//   }
//
//   return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {renderSquare(0)}
//           {renderSquare(1)}
//           {renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {renderSquare(3)}
//           {renderSquare(4)}
//           {renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {renderSquare(6)}
//           {renderSquare(7)}
//           {renderSquare(8)}
//         </div>
//         <button className="restart" onClick={restart}>
//           restart
//         </button>
//       </div>
//   )
// }
//
// function Game() {
//   return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//       </div>
//   )
// }
//
// // eslint-disable-next-line no-unused-vars
// function calculateStatus(winner, squares, nextValue) {
//   return winner
//       ? `Winner: ${winner}`
//       : squares.every(Boolean)
//           ? `Scratch: Cat's game`
//           : `Next player: ${nextValue}`
// }
//
// // eslint-disable-next-line no-unused-vars
// function calculateNextValue(squares) {
//   return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
// }
//
// // eslint-disable-next-line no-unused-vars
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ]
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i]
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a]
//     }
//   }
//   return null
// }
//
// function App() {
//   return <Game />
// }
//
// export default App


// Extra 2
import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
    const [squares, setSquares] = useLocalStorageState(
        'squares',
        Array(9).fill(null)
    )

    // squares[0] = 'X'
    // squares[1] = 'O'
    // squares[2] = 'X'

    const nextValue = calculateNextValue(squares) // X or O
    const winner = calculateWinner(squares) // X, O or null
    const status = calculateStatus(winner, squares, nextValue) // Winner, Scratch, or Next player

    // This is the function your square click handler will call. `square` should
    // be an index. So if they click the center square, this will be `4`.
    function selectSquare(square) {
        if (winner || squares[square]) return

        const squaresCopy = [...squares]
        squaresCopy[square] = nextValue
        setSquares(squaresCopy)
    }

    // make array empty
    function restart() {
        setSquares(Array(9).fill(null))
    }
    // render each square, it will be called 9 times,
    function renderSquare(i) {
        return (
            <button className="square" onClick={() => selectSquare(i)}>
                {squares[i]}
            </button>
        )
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className="restart" onClick={restart}>
                restart
            </button>
        </div>
    )
}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
    return winner
        ? `Winner: ${winner}`
        : squares.every(Boolean)
            ? `Scratch: Cat's game`
            : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

function App() {
    return <Game />
}

export default App
