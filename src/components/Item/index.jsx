import PropTypes from 'prop-types'
import styles from './style.module.css'
import IconClose from '@/components/Icons/Close'

const Item = ({ label, onClick }) => {
  return (
    <li className={styles.item}>
      <span className={styles.itemLabel}>{label}</span>
      <button
        className={styles.itemButton}
        type="button"
        onClick={onClick}
        aria-label={`Remove ${label}`}
      >
        <IconClose />
      </button>
    </li>
  )
}

Item.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Item
