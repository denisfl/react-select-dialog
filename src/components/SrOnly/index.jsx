import PropTypes from 'prop-types'
import style from './style.module.css'

const SrOnly = ({ text }) => (
  <span aria-label={text} className={style.srOnly}>
    {text}
  </span>
)

SrOnly.propTypes = {
  text: PropTypes.string.isRequired,
}
export default SrOnly
