import { useState } from 'react'

import '@/App.css'
import ItemsList from '@/components/ItemsList'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { Checkbox } from '@/components/Form'

function App() {
  const [selectedItems, setSelectedItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // These data should be get from store
  const items = [
    { id: 0, label: 'Element 1' },
    { id: 1, label: 'Element 2' },
    { id: 2, label: 'Element 3' },
    { id: 3, label: 'Element 4' },
    { id: 4, label: 'Element 5' },
  ]
  const hint = selectedItems.length
    ? `You currently have ${selectedItems.length} selected item${
        selectedItems.length > 1 ? 's' : ''
      }.`
    : null

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const updateSelectedItems = (item) => {
    setSelectedItems((prevSelectedItems) => {
      let newSelectedItems
      if (prevSelectedItems.some((prevItem) => prevItem.id === item.id)) {
        newSelectedItems = prevSelectedItems.filter(
          (prevItem) => prevItem.id !== item.id
        )
      } else {
        newSelectedItems = [...prevSelectedItems, item]
      }
      return newSelectedItems.sort((a, b) => a.id - b.id)
    })
  }

  return (
    <>
      <h1>Select items</h1>
      {hint && <p className="hint">{hint}</p>}
      <section aria-labelledby="selected-items">
        <h2 id="selected-items">Selected Items</h2>
        <ItemsList items={selectedItems} />
      </section>
      <div>
        <Button onClick={toggleModal} ariaLabel="Open item selection modal">
          Confirm my choise
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        ariaLabelledby="modal-title"
        onClose={() => {
          setIsModalOpen(false)
        }}
      >
        {items.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            id={`element-${item.id}`}
            onChange={() => updateSelectedItems(item)}
          />
        ))}

        <ItemsList items={selectedItems} />
      </Modal>
    </>
  )
}

export default App
