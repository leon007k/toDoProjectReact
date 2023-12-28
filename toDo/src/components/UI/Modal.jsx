import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';
import { Button } from "./Button"
import './Modal.css';


// * This element is responsible for showing the bottom of the modal
const Backdrop = ({ children, onOffModal }) => {
  const modalIsShow = onOffModal && 'show';
  // ! TODO: resolver bug en modal, se cierra al dar click sobre cualquier elemento que esta dentro del modal
  return <div className={'modal fade ' + modalIsShow} tabIndex='-1' onClick={onOffModal}>{children}</div>
}

// * This element is in charge of the element Modal
const ModalOverlay = ({ modalTitle, children, onOffModal }) => {
  return (
    <div className='modal-dialog'>
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
  return (
    <>
      {createPortal(
        <Backdrop onOffModal={onOffModal}>
          <ModalOverlay modalTitle={modalTitle} onOffModal={onOffModal}>
            {children}
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

