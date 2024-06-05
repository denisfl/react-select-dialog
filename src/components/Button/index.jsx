import PropTypes from 'prop-types'
import styles from './style.module.css'

const Button = ({ isDanger = false, disabled = false, onClick, children }) => {
  const buttonClass = `${styles.button} ${
    isDanger ? styles.danger : styles.success
  } ${disabled ? styles.disabled : ''}`

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  isDanger: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default Button
