import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import IconClose from '@/components/Icons/Close'
import Button from '@/components/Button'
import SrOnly from '@/components/SrOnly'
import { FormField, Input, Select } from '@/components/Form'

const Modal = ({ isOpen, onClose, children }) => {
  const filterOptions = [
    { value: '', label: 'No filters' },
    { value: '10', label: '> 10' },
    { value: '50', label: '> 50' },
    { value: '200', label: '> 200' },
  ]

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedValue, setSelectedValue] = useState(filterOptions[0].value)

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

  return (
    <dialog
      ref={dialogRef}
      className={style.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <header className={style.modalHeader}>
        <h2 id="modal-title" className={style.modalTitle}>
          Select items
        </h2>
        <button
          className={style.modalCloseButton}
          onClick={onClose}
          aria-label="Cancel and close dialog"
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
          />
        </FormField>
        <FormField id="modal-filter" label="Search">
          <Select
            id="modal-filter"
            label="Filter"
            value={selectedValue}
            options={filterOptions}
            onChange={(event) => setSelectedValue(event.target.value)}
          />
        </FormField>
      </div>

      {children}

      <footer>
        <Button ariaLabel="Save changes and close dialog">Save</Button>
        <Button ariaLabel="Cancel and close dialog" isDanger onClick={onClose}>
          Cancel
        </Button>
      </footer>
    </dialog>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default Modal
