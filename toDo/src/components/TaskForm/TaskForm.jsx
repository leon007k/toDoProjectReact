import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal'
import './TaskForm.css'

export const TaskForm = ({ modalDinamic, funcToPerform, typeOfAction = 'add', taskData }) => {

  const [inputsValues, setInputsValues] = useState({
    titleTask: '',
    descriptionTask: ''
  })
  const [requiredTitle, setRequiredTitle] = useState(false)

  useEffect(() => {
    const saveData = evt => {
      if (evt.key === 'Enter' && inputsValues.titleTask.length > 0) registerTask()
    }

    window.addEventListener('keydown', saveData)
    return () => window.removeEventListener('keydown', saveData)
  }, [])


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

  // * function in charge of sending the information
  const registerTask = (event) => {
    // * Condition in case the data is stored by clicking on
    if (event != undefined) event.preventDefault()

    if (!inputsValues.titleTask.trim()) {
      setRequiredTitle(true)
      alert('Lo sentimos, favor de agregar un titulo a su tarea')
      return
    }

    let newtaskTodo

    if (taskData) {
      newtaskTodo = {
        id: taskData.id,
        title: inputsValues.titleTask,
        description: inputsValues.descriptionTask
      }
    } else {
      newtaskTodo = {
        id: Math.random(),
        title: inputsValues.titleTask,
        description: inputsValues.descriptionTask
      }
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
  }

  return (
    <Modal modalTitle={typeOfAction === 'add' ? 'Agregar nueva tarea' : 'Editar tarea'} onOffModal={modalDinamic}>
      <form onSubmit={registerTask}>
        <div className='modal-body'>
          <div id="TitleOfTask" className='mb-1'>
            <label htmlFor='titleTask' className='form-label'>Titulo de tu tarea</label>
            <input type="text" className={`form-control ${requiredTitle && 'required'}`} id="titleTask" required onChange={addTitleTask} defaultValue={taskData?.title} />
          </div>
          <div id="DescriptionOfTask" className='mb-1'>
            <label htmlFor='descriptionTask' className='form-label'>Descripción de la tarea</label>
            <textarea className='form-control' id='descriptionTask' onChange={addDescriptionTask} defaultValue={taskData?.description}></textarea>
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
  taskData: PropTypes.object
}