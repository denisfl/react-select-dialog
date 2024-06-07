import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import IconClose from '@/components/Icons/Close'
import Button from '@/components/Button'
import SrOnly from '@/components/SrOnly'
import ItemsList from '@/components/ItemsList'
import { FormField, Input, Select, Checkbox } from '@/components/Form'

const elements = Array.from({ length: 300 }, (_, i) => ({
  id: i,
  label: `Element ${i + 1}`,
}))

const Modal = ({ selectedItems = [], isOpen, onClose, onSave }) => {
  const filterOptions = [
    { value: '', label: 'No filters' },
    { value: '10', label: '> 10' },
    { value: '50', label: '> 50' },
    { value: '200', label: '> 200' },
  ]

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedValue, setSelectedValue] = useState(filterOptions[0].value)
  const [filteredItems, setFilteredItems] = useState(elements)
  const [currentSelection, setCurrentSelection] = useState(selectedItems)
  const dialogRef = useRef()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      dialogRef.current.showModal()
      window.addEventListener('keydown', handleKeyDown)
    } else {
      dialogRef.current.close()
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    let filtered = elements
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (selectedValue) {
      filtered = filtered.filter((item) => item.id > selectedValue)
    }
    setFilteredItems(filtered)
  }, [searchQuery, selectedValue])

  const handleCheckboxChange = (item) => {
    if (currentSelection.some((selectedItem) => selectedItem.id === item.id)) {
      setCurrentSelection((prev) => prev.filter((i) => i.id !== item.id))
    } else if (currentSelection.length < 3) {
      setCurrentSelection((prev) => {
        const newSelection = [...prev, item]
        newSelection.sort((a, b) => a.id - b.id)
        return newSelection
      })
    }
  }

  const handleRemoveItem = (id) => {
    setCurrentSelection((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSave = () => {
    onSave(currentSelection)
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={style.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-test="modal"
    >
      <header className={style.modalHeader}>
        <h2
          id="modal-title"
          className={style.modalTitle}
          data-test="modal-title"
        >
          Select items
        </h2>
        <button
          className={style.modalCloseButton}
          onClick={onClose}
          aria-label="Cancel and close dialog"
          data-test="modal-close-button"
        >
          <IconClose />
          <SrOnly text="Cancel and close dialog" />
        </button>
      </header>

      <div className={style.modalFilters}>
        <FormField id="modal-search" label="Search">
          <Input
            id="modal-search"
            label="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            dataTest="modal-search"
          />
        </FormField>
        <FormField id="modal-filter" label="Filter">
          <Select
            id="modal-filter"
            label="Filter"
            value={selectedValue}
            options={filterOptions}
            onChange={(event) => setSelectedValue(event.target.value)}
            dataTest="modal-filter"
          />
        </FormField>
      </div>

      <div className={style.modalCheckboxesContainer} data-test="filtered-list">
        {filteredItems.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            id={`element-${item.id}`}
            isChecked={currentSelection.some(
              (selectedItem) => selectedItem.id === item.id
            )}
            isDisabled={
              !currentSelection.some(
                (selectedItem) => selectedItem.id === item.id
              ) && currentSelection.length >= 3
            }
            onChange={() => handleCheckboxChange(item)}
            dataTest="filtered-item"
          />
        ))}
      </div>

      <ItemsList
        items={currentSelection}
        onClick={handleRemoveItem}
        dataTest="modal-selected-items"
      />

      <footer>
        <Button
          onClick={handleSave}
          ariaLabel="Save changes and close dialog"
          dataTest="button-save"
        >
          Save
        </Button>
        <Button
          ariaLabel="Cancel and close dialog"
          isDanger
          onClick={onClose}
          dataTest="button-cancel"
        >
          Cancel
        </Button>
      </footer>
    </dialog>
  )
}

Modal.propTypes = {
  selectedItems: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Modal
