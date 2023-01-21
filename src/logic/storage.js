export const loadBoardFromStorage = loader('board')

export const loadTurnFromStorage = loader('turn')

export const saveGameToStorage = ({ board, turn }) => {
  // guardar aqui partida
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', JSON.stringify(turn))
}

export const resetGameStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}

function loader(key) {
  return (validator, fallbackSupplier) => () => {
    const item = window.localStorage.getItem(key)
    try {
      if (item) return validator(JSON.parse(item))
    } catch (e) {}
    return fallbackSupplier()
  }
}
