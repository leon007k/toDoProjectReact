import PropTypes from 'prop-types';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal'
import './AddNewTaskForm.css'

export const AddNewTaskForm = ({ onOffModal }) => {

  return (
    <Modal modalTitle='Agregar nueva tarea' onOffModal={onOffModal}>
      <div className='modal-body'>
        <form>
          <div id="TitleOfTask" className='mb-1'>
            <label htmlFor='titleTask' className='form-label'>Titulo de tu tarea</label>
            <input type="text" className="form-control" id="titleTask" required />
          </div>
          <div id="DescriptionOfTask" className='mb-1'>
            <label htmlFor='descriptionTask' className='form-label'>Descripción de la tarea</label>
            <textarea className='form-control' id='descriptionTask'></textarea>
          </div>
        </form>
      </div>
      <div className='modal-footer'>
        <Button
          typeButton='button'
          addClassName='btn-delete-task keep-rd'
          actionButton={onOffModal}
        >Cancelar</Button>
        <Button typeButton='submit' addClassName='btn-task-done keep-rd'>Agregar</Button>
      </div>
    </Modal>
  )
}

AddNewTaskForm.propTypes = {
  onOffModal: PropTypes.func
}