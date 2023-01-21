import { useState } from 'react'
import {
  provideInitialArray,
  provideDefaultTurn,
  nextTurn,
  checkWinnerFrom,
  checkEndGame
} from './logic/board'
import { BoardTile } from './components/BoardTile'

function App() {
  const [board, setBoard] = useState(provideInitialArray)

  const [turn, setTurn] = useState(provideDefaultTurn)

  // null => no winner yet, false => tie, or X-O if some turn won
  const [winner, setWinner] = useState(null)
  const [winnerCombo, setWinnerCombo] = useState(null)

  const handleReset = () => {
    setBoard(provideInitialArray)
    setTurn(provideDefaultTurn)
    setWinner(null)
    setWinnerCombo(null)
  }

  const canBoardBeUpdated = (index) => board[index] === null && winner === null

  const updateBoardTile = (index, value) => {
    const newBoard = [...board]
    newBoard[index] = value
    setBoard(newBoard)
    return newBoard
  }

  const onBoardTileAction = (index) => {
    if (!canBoardBeUpdated(index)) return
    const newBoard = updateBoardTile(index, turn)
    const newTurn = nextTurn(turn)
    const [newWinner, newWinnerCombo] = checkWinnerFrom(newBoard)
    if (newWinner !== null) {
      setWinner(newWinner)
      setWinnerCombo(newWinnerCombo)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // tie
    } else {
      setTurn(newTurn)
    }
  }

  return (
    <main className="App">
      <header>
        <a href="./" className="branding">
          <img src="/tic-tac-toe.svg" className="logo" alt="Tic-Tac-Toe logo" />
          <h1 className="title">
            <span>Tic</span>-<span>Tac</span>-<span>Toe</span>
          </h1>
        </a>
      </header>
      <section className="board">
        {board.map((value, index) => (
          <BoardTile
            key={index}
            value={value}
            action={onBoardTileAction}
            index={index}
            highlight={winnerCombo?.includes(index)}
          />
        ))}
      </section>
      <footer>
        <button onClick={handleReset}>Reset</button>
        {winner === null && (
          <p>
            <span>{turn}</span>'s turn
          </p>
        )}
        {winner === false && <p>TIE!</p>}
        {winner && (
          <p>
            <span>{winner}</span> won!
          </p>
        )}
      </footer>
    </main>
  )
}

export default App
