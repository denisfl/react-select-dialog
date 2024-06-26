import PropTypes from 'prop-types'
import Item from '@/components/Item'
import styles from './style.module.css'

const ItemsList = ({
  items = [],
  ariaLabel = 'Items list',
  onClick,
  dataTest = '',
}) => {
  if (items.length === 0) return null
  return (
    <ul
      className={styles.itemsList}
      role="list"
      aria-label={ariaLabel}
      data-test={dataTest}
    >
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          label={item.label}
          onClick={() => onClick(item.id)}
        />
      ))}
    </ul>
  )
}

ItemsList.propTypes = {
  items: PropTypes.array,
  ariaLabel: PropTypes.string,
  onClick: PropTypes.func,
  dataTest: PropTypes.string,
}

export default ItemsList
