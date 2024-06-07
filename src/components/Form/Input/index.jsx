import PropTypes from 'prop-types'

const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  dataTest = '',
}) => {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      aria-label={label}
      type={type}
      data-test={dataTest}
    />
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  dataTest: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Input
