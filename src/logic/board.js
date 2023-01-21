/*
Indexes within the board
[0] [1] [2]
[3] [4] [5]
[6] [7] [8]
*/
const winningConditions = [
  [0, 1, 2], // horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonal
  [2, 4, 6]
]

export const provideInitialArray = () => Array(9).fill(null)

export const provideDefaultTurn = () => 'X'

export const nextTurn = (turn) => (turn === 'X' ? 'O' : 'X')

export const checkWinnerFrom = (board) => {
  // review game conditions some winning combination
  for (const condition of winningConditions) {
    const [a, b, c] = condition
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [board[a], [...condition]]
    }
  }
  // no winner
  return [null, null]
}

export const checkEndGame = (board) => {
  // review if is a tie when there are no more empty tiles
  return board.every((value) => value !== null)
}
