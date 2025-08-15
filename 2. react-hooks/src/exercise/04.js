// Zadanie 0,1,2
// import * as React from 'react'
// import {useLocalStorageState} from '../utils'

// // function useSetSquaresLocalHost(initialValue) {
// //   const [squares, setSquares] = React.useState(initialValue)

// //   React.useEffect(() => {
// //     const storedSquares = localStorage.getItem('squares')
// //     if (storedSquares) {
// //       setSquares(JSON.parse(storedSquares))
// //     }
// //   }, [])

// //   React.useEffect(() => {
// //     localStorage.setItem('squares', JSON.stringify(squares))
// //   }, [squares])

// //   return [squares, setSquares]
// // }

// function Board() {
//   const [squares, setSquares] = useLocalStorageState(
//     'squares',
//     Array(9).fill(null),
//   )

//   function selectSquare(square) {
//     if (calculateWinner(squares) || squares[square]) {
//       return
//     }

//     const nextValue = calculateNextValue(squares)
//     const squaresCopy = [...squares]
//     squaresCopy[square] = nextValue
//     setSquares(squaresCopy)
//   }

//   function restart() {
//     setSquares(Array(9).fill(null))
//   }

//   function renderSquare(i) {
//     return (
//       <button className="square" onClick={() => selectSquare(i)}>
//         {squares[i]}
//       </button>
//     )
//   }

//   return (
//     <div>
//       <div className="status">
//         {calculateStatus(
//           calculateWinner(squares),
//           squares,
//           calculateNextValue(squares),
//         )}
//       </div>
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

// function Game() {
//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board />
//       </div>
//     </div>
//   )
// }

// // eslint-disable-next-line no-unused-vars
// function calculateStatus(winner, squares, nextValue) {
//   return winner
//     ? `Winner: ${winner}`
//     : squares.every(Boolean)
//     ? `Scratch: Cat's game`
//     : `Next player: ${nextValue}`
// }

// // eslint-disable-next-line no-unused-vars
// function calculateNextValue(squares) {
//   return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
// }

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

// function App() {
//   return <Game />
// }

// export default App

// Zadanie 3
import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
    </div>
  )
}

function Game() {
  const [movesHistory, setMovesHistory] = React.useState([Array(9).fill(null)])
  const [currentSquares, setSquares] = useLocalStorageState(
    'currentSquares',
    Array(9).fill(null),
  )
  const [historyIndex, setHistoryIndex] = React.useState(0)

  function addMove(squaresCopy) {
    const nextHistory = movesHistory.slice(0, historyIndex + 1)
    setSquares(squaresCopy)
    setMovesHistory(prevMoves => [
      ...prevMoves.slice(0, historyIndex + 1),
      squaresCopy,
    ])
    setHistoryIndex(nextHistory.length)
  }

  function backToMove(index) {
    setSquares(movesHistory[index])
    setHistoryIndex(index)
  }

  function selectSquare(square) {
    if (calculateWinner(currentSquares) || currentSquares[square]) {
      return
    }

    const nextValue = calculateNextValue(currentSquares)
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    addMove(squaresCopy)
  }

  function restart() {
    setSquares(Array(9).fill(null))
    setMovesHistory([])
  }
  const status = calculateStatus(
    calculateWinner(currentSquares),
    currentSquares,
    calculateNextValue(currentSquares),
  )

  let moves = movesHistory.map((squares, index) => {
    const description =
      index === 0 ? 'Go to game start' : `Go to move #${index}`
    const isCurrentMove = index === historyIndex
    return (
      <li key={index}>
        <button onClick={() => backToMove(index)} disabled={isCurrentMove}>
          {description} {isCurrentMove ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          onClick={selectSquare}
          squares={currentSquares}
          status={status}
        />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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
