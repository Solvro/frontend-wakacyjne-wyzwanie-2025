// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  // 🐨 squares is the state for this component. Add useState for squares

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
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
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  const [history, setHistory] = useLocalStorageState('history', [])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)
  // const [currentStep, setCurrentStep] = React.useState([])

  function selectSquare(square) {
    if (winner || squares[square]) return

    const squaresCopy = [...squares]

    squaresCopy[square] = nextValue

    setSquares(squaresCopy)
    setHistory([...history, squaresCopy])
    setCurrentStep(currentStep + 1)
    console.log('history: ', history)

    // 🐨 first, if there's already a winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy
  }

  function restart() {
    setSquares(() => Array(9).fill(null))
    setHistory([])
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} selectSquare={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        {history.map((step, index) => (
          <div key={index}>
            <button
              disabled={currentStep === index}
              onClick={() => {
                setSquares(history[index])
                setCurrentStep(index)
                setHistory(history.slice(0, index + 1))
              }}
            >
              {index === 0
                ? 'Go to game start'
                : index === currentStep
                ? `Go to move #${index} (current move)`
                : `Go to move #${index}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return <Game />
}

export default App
