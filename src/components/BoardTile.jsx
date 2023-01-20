import PropTypes from 'prop-types'

export const BoardTile = ({ value, index, action, highlight }) => {
  const className = `tile${highlight ? ' is-hl' : ''}`

  const handleClick = () => {
    action(index)
  }

  return (
    <button onClick={handleClick} data-id={index} className={className}>
      {value}
    </button>
  )
}

BoardTile.propTypes = {
  value: PropTypes.oneOf([null, 'X', 'O']),
  action: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  highlight: PropTypes.bool
}
