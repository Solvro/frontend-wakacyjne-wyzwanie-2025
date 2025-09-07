// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import { useState, useEffect } from 'react'

function useLocalStorageState( stateName, initialState ) {
  const value = window.localStorage.getItem(stateName) ?? initialState;
  const isStorage = window.localStorage.getItem(stateName);
  const isObject = typeof initialState === 'object' && value !== null && !Array.isArray(initialState);
  const isArray = Array.isArray(initialState);

  const [state, setState] = useState(() => isStorage ? isObject ? JSON.parse(value) : isArray ? value.split(',') : value : value);
  
  useEffect(() => {
    window.localStorage.setItem(stateName, isArray ? value.toString() : isObject ? JSON.stringify(state) :  state);
  }, [state]);
  
  return [state, setState];
}

function Board() {
  const [squares, setSquares] = useLocalStorageState('board', { square: Array(9).fill('') });

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function restart() {
    setSquares({square: Array(9).fill('')});
  }

  function selectSquare(sq) {
    if(winner || squares.square[sq]) return;

    let squaresCopy = squares.square;
    squaresCopy[sq] = nextValue;
    setSquares({square: squaresCopy});
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares.square[i]}
      </button>
    )
  }

  return (
    <div>
      <div>{status}</div>
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
      <div className="game-info">
        <ol>
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.square.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.square.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
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
    if (squares.square[a] && squares.square[a] === squares.square[b] && squares.square[a] === squares.square[c]) {
      return squares.square[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
