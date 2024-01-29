import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal'
import './TaskForm.css'
import { useControlTaskForm } from '../../hooks/useControlTaskForm';

export const TaskForm = ({ modalDinamic, funcToPerform, typeOfAction = 'add', taskData }) => {
  const { titleTask, descriptionTask, requiredTitle, setInputsValues, setRequiredTitle } = useControlTaskForm(
    { typeOfAction, taskData }
  )

  // * Functions responsible for obtaining the values entered
  const addTitleTask = event => {
    if (requiredTitle) setRequiredTitle(false)
    setInputsValues(prevValues => {
      return { ...prevValues, titleTask: event.target.value.trim() }
    })
  }

  const addDescriptionTask = event => {
    setInputsValues(prevValues => {
      return { ...prevValues, descriptionTask: event.target.value.trim() }
    })
  }

  /* 
  * function in charge of sending the information 
   * When using Usecallback, you make sure that the UseEffect is not unnecessarily executed 
   * Every time the component is rendered due to the recreation of the Registertask function.
  */
  const registerTask = useCallback((event) => {
    // * Condition in case the data is stored by clicking on
    if (event !== undefined) event.preventDefault()

    const isTitleValid = titleTask.trim() !== ''

    if (!isTitleValid) {
      setRequiredTitle(true)
      alert('Lo sentimos, favor de agregar un titulo a su tarea')
      return
    }

    const newtaskTodo = taskData
      ? {
        id: taskData.id,
        title: titleTask,
        description: descriptionTask
      }
      : {
        id: Math.random(),
        title: titleTask,
        description: descriptionTask
      }

    // * We send the information to record the new task
    funcToPerform(newtaskTodo)

    // * We empty the registered values
    setInputsValues({
      titleTask: '',
      descriptionTask: ''
    })

    // * We close the modal after finishing saving the data
    modalDinamic()
  }, [titleTask, descriptionTask])

  return (
    <Modal modalTitle={typeOfAction === 'add' ? 'Agregar nueva tarea' : 'Editar tarea'} onOffModal={modalDinamic}>
      <form onSubmit={registerTask}>
        <div className='modal-body'>
          <div id="TitleOfTask" className='mb-1'>
            <label htmlFor='titleTask' className='form-label'>Titulo de tu tarea</label>
            <input type="text"
              className={`form-control ${requiredTitle && 'required'}`}
              id="titleTask"
              required
              defaultValue={taskData?.title}
              onChange={addTitleTask}
            />
          </div>
          <div id="DescriptionOfTask" className='mb-1'>
            <label htmlFor='descriptionTask' className='form-label'>Descripción de la tarea</label>
            <textarea
              className='form-control'
              id='descriptionTask'
              defaultValue={taskData?.description}
              onChange={addDescriptionTask}></textarea>
          </div>
        </div>
        <div className='modal-footer'>
          <Button
            typeButton='button'
            addClassName='btn-delete-task keep-rd'
            actionButton={modalDinamic}
          >Cancelar</Button>
          <Button typeButton='submit' addClassName='btn-task-done keep-rd'>{
            typeOfAction === 'add' ? 'Agregar' : 'Guardar cambios'
          }</Button>
        </div>
      </form>
    </Modal>
  )
}

TaskForm.propTypes = {
  modalDinamic: PropTypes.func,
  funcToPerform: PropTypes.func,
  typeOfAction: PropTypes.string,
  taskData: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}