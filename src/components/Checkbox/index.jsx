import PropTypes from 'prop-types'

const Checkbox = ({ id, label, isDisabled, isChecked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        disabled={isDisabled}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
