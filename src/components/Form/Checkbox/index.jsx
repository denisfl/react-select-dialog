import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import style from './style.module.css'

const Checkbox = ({
  id,
  label,
  ariaLabel,
  isDisabled = false,
  isChecked = false,
  onChange,
  dataTest = '',
}) => {
  const [className, setClassName] = useState(
    `${style.checkbox} ${isDisabled ? style.disabled : ''}`
  )

  useEffect(() => {
    setClassName(`${style.checkbox} ${isDisabled ? style.disabled : ''}`)
  }, [isDisabled])

  return (
    <div className={className} data-test={dataTest}>
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
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  isDisabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  dataTest: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
