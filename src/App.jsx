import { useEffect, useState } from 'react'
import {
  checkEndGame,
  checkWinnerFrom,
  nextTurn,
  provideInitialArray,
  provideDefaultTurn,
  validateBoard,
  validateTurn
} from './logic/board'
import { createConfetti, resetConfetti } from './logic/confetti'
import {
  loadBoardFromStorage,
  loadTurnFromStorage,
  resetGameStorage,
  saveGameToStorage
} from './logic/storage'
import { BoardTile } from './components/BoardTile'

function App() {
  const [board, setBoard] = useState(
    loadBoardFromStorage(validateBoard, provideInitialArray)
  )

  const [turn, setTurn] = useState(
    loadTurnFromStorage(validateTurn, provideDefaultTurn)
  )

  // null => no winner yet, false => tie, or X-O if some turn won
  const [winner, setWinner] = useState(null)
  const [winnerCombo, setWinnerCombo] = useState(null)

  const handleReset = () => {
    setBoard(provideInitialArray)
    setTurn(provideDefaultTurn)
    setWinner(null)
    setWinnerCombo(null)
    resetConfetti()
    resetGameStorage()
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
    setTurn(newTurn)
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
  }

  // sync computed values when board state changes
  useEffect(() => {
    const [newWinner, newWinnerCombo] = checkWinnerFrom(board)
    if (newWinner !== null) {
      createConfetti()
      setWinner(newWinner)
      setWinnerCombo(newWinnerCombo)
    } else if (checkEndGame(board)) {
      setWinner(false) // tie
    }
  }, [board])

  return (
    <main className="App">
      <header>
        <a href="./" className="branding">
          <img src="tic-tac-toe.svg" className="logo" alt="Tic-Tac-Toe logo" />
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
