import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import IconClose from '@/components/Icons/Close'
import Button from '@/components/Button'

const Modal = ({ isOpen, onClose, children }) => {
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
    <dialog ref={dialogRef} className={style.modal}>
      <header className={style.modalHeader}>
        <h2 className={style.modalTitle}>Select items</h2>
        <button className={style.modalCloseButton} onClick={onClose}>
          <IconClose />
        </button>
      </header>
      {children}

      <footer>
        <Button>Save</Button>
        <Button isDanger onClick={onClose}>
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
