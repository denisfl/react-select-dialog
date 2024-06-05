import PropTypes from 'prop-types'

const Checkbox = ({
  id,
  label,
  isDisabled,
  ariaLabel,
  isChecked,
  onChange,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        disabled={isDisabled}
        checked={isChecked}
        onChange={onChange}
        aria-label={ariaLabel || `Select ${label}`}
        aria-disabled={isDisabled}
        aria-checked={isChecked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
