import PropTypes from 'prop-types'

const Select = ({ id, label, options, value, onChange, dataTest = '' }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      aria-label={label}
      data-test={dataTest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  dataTest: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Select
