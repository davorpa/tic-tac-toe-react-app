import { useState } from 'react'
import { BoardTile } from './components/BoardTile'

function App() {
  const [board, setBoard] = useState(() => Array(9).fill(null))

  const updateBoardTile = (index, value) => {
    const newBoard = [...board]
    newBoard[index] = value
    setBoard(newBoard)
  }

  const onBoardTileAction = (index) => {
    updateBoardTile(index, 'X')
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
          />
        ))}
      </section>
    </main>
  )
}

export default App
