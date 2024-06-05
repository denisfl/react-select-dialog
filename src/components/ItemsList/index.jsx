import PropTypes from 'prop-types'
import Item from '@/components/Item'
import styles from './style.module.css'

const ItemsList = ({ items = [] }) => {
  if (items.length === 0) return null
  return (
    <ul className={styles.itemsList}>
      {items.map((item) => (
        <Item key={item.id} label={item.label} />
      ))}
    </ul>
  )
}

ItemsList.propTypes = {
  items: PropTypes.array,
}

export default ItemsList
