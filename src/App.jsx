import { useState, useEffect } from 'react'

import '@/App.css'
import ItemsList from '@/components/ItemsList'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

function App() {
  const [selectedItems, setSelectedItems] = useState(() => {
    const savedItems = localStorage.getItem('selectedItems')
    return savedItems ? JSON.parse(savedItems) : []
  })

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

  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems))
  }, [selectedItems])

  return (
    <>
      <h1 data-test="header">Select items</h1>
      <section className="selected-items-container">
        {hint && (
          <p className="hint" data-test="hint">
            {hint}
          </p>
        )}
        <ItemsList
          items={selectedItems}
          onClick={handleRemoveItem}
          dataTest="selected-list"
        />
      </section>
      <div>
        <Button
          onClick={toggleModal}
          ariaLabel="Open item selection modal"
          dataTest="open-modal-button"
        >
          Change my choice
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
