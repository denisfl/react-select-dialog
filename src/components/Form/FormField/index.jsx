import PropTypes from 'prop-types'
import style from './style.module.css'

const FormField = ({ id, label, children, role = 'group' }) => {
  return (
    <div role={role} className={style.formField}>
      <label htmlFor={id} className={style.formFieldLabel}>
        {label}
      </label>
      <div>{children}</div>
    </div>
  )
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  role: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default FormField
