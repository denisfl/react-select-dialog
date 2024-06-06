import { useState } from 'react'

import '@/App.css'
import ItemsList from '@/components/ItemsList'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

function App() {
  const [selectedItems, setSelectedItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hint = selectedItems.length
    ? `You currently have ${selectedItems.length} selected item${
        selectedItems.length > 1 ? 's' : ''
      }.`
    : null

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleRemoveItem = (id) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <h1>Select items</h1>
      {hint && <p className="hint">{hint}</p>}
      <section aria-labelledby="selected-items">
        <h2 id="selected-items">Selected Items</h2>
        <ItemsList items={selectedItems} onClick={handleRemoveItem} />
      </section>
      <div>
        <Button onClick={toggleModal} ariaLabel="Open item selection modal">
          Confirm my choise
        </Button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          ariaLabelledby="modal-title"
          selectedItems={selectedItems}
          onClose={() => {
            setIsModalOpen(false)
          }}
          onSave={(newSelectedItems) => {
            setSelectedItems(newSelectedItems)
            setIsModalOpen(false)
          }}
        />
      )}
    </>
  )
}

export default App
