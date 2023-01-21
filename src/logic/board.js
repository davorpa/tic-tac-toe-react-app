/*
Turn / player's tile identifiers enum
*/
const TURNS = Object.freeze({
  X: 'X',
  O: 'O'
})

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

export const validateBoard = (value) => {
  if (!Array.isArray(value) || value.length !== 9) {
    throw new Error('value must be an Array(9)')
  }
  if (value.some((turn) => ![null, ...Object.values(TURNS)].includes(turn))) {
    throw new Error(
      'value items must be in [null,' + Object.values(TURNS) + ']'
    )
  }
  return value
}

export const provideDefaultTurn = () => TURNS.X

export const nextTurn = (turn) => (turn === TURNS.X ? TURNS.O : TURNS.X)

export const validateTurn = (value) => {
  if (typeof value !== 'string') {
    throw new Error('value must be a String')
  }
  if (!Object.values(TURNS).includes(value)) {
    throw new Error('value must be in [' + Object.values(TURNS) + ']')
  }
  return value
}

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
