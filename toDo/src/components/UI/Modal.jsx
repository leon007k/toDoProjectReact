import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';
import { Button } from "./Button"
import './Modal.css';
import { useEffect } from 'react';


// * This element is responsible for showing the bottom of the modal
const Backdrop = ({ children, onOffModal }) => {
  const modalIsShow = onOffModal && 'show';
  return <div className={'modal fade ' + modalIsShow} tabIndex='-1' onClick={onOffModal}>{children}</div>
}

// * This element is in charge of the element Modal
const ModalOverlay = ({ modalTitle, children, onOffModal }) => {

  // * Stoppropagation is added to avoid closing the modal when clicking within the Dialog Modalog
  return (
    <div className='modal-dialog' onClick={(e) => e.stopPropagation()}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5'>{modalTitle}</h1>
          <Button
            type='button'
            addClassName='btn-close'

            aria-label='Close'
            actionButton={onOffModal}
          ></Button>
        </div>
        {children}
      </div>
    </div>
  )
}

const portalElement = document.getElementById('overlays');

export const Modal = ({ modalTitle, children, onOffModal }) => {

  // * It will allow us to close the modal by clicking on the ESC key
  useEffect(() => {
    const closeModal = e => {
      if (e.key === 'Escape') onOffModal()
    }
    window.addEventListener('keydown', closeModal)
    return () => window.removeEventListener('keydown', closeModal)
  }, [onOffModal])

  const modalContent = onOffModal ? children : null

  return (
    <>
      {createPortal(
        <Backdrop onOffModal={onOffModal}>
          <ModalOverlay modalTitle={modalTitle} onOffModal={onOffModal}>
            {modalContent}
          </ModalOverlay>
        </Backdrop>, portalElement)}
    </>
  )
}

Backdrop.propTypes = {
  children: PropTypes.node,
  onOffModal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

ModalOverlay.propTypes = {
  modalTitle: PropTypes.string,
  children: PropTypes.node,
  onOffModal: PropTypes.func
}

Modal.propTypes = {
  modalTitle: PropTypes.string,
  children: PropTypes.node,
  onOffModal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

