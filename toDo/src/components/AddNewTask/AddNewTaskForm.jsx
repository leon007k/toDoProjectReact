// import PropTypes from 'prop-types';
import { Button } from '../UI/Button';
import './AddNewTaskForm.css'

export const AddNewTaskForm = () => {

  return (
    <section id='AddNewTask'>
      <form>
        <div id="TitleOfTask" className='w-95 mb-1'>
          <label htmlFor='titleTask' className='form-label'>Titulo de tu tarea</label>
          <input type="text" className="form-control" id="titleTask" required />
        </div>
        <div id="DescriptionOfTask" className='w-95 mb-1'>
          <label htmlFor='descriptionTask' className='form-label'>Descripción de la tarea</label>
          <textarea className='form-control' id='descriptionTask'></textarea>
        </div>
        <div className='btn-group w-95' role='group'>
          <Button typeButton='submit' addClassName='btn-task-done keep-pd'>Agregar</Button>
          <Button typeButton='button' addClassName='btn-delete-task keep-pd'>Cancelar</Button>
        </div>
      </form>
    </section>
  )
}

AddNewTaskForm.propTypes = {

}