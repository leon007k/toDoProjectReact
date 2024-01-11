import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
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
    if (typeOfAction === 'edit')
      setInputsValues({
        titleTask: taskData?.title || '',
        descriptionTask: taskData?.description || ''
      })
  }, [typeOfAction, taskData])

  const alertRequireTitle = () => {
    setRequiredTitle(true)
    alert('Lo sentimos, favor de agregar un titulo a su tarea')
    return
  }

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

    const isTitleValid = inputsValues.titleTask.trim() !== ''

    if (!isTitleValid) {
      alertRequireTitle()
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
  }, [inputsValues.titleTask, inputsValues.descriptionTask, taskData, funcToPerform, setInputsValues, modalDinamic])

  useEffect(() => {
    const saveData = evt => {
      if (modalDinamic && evt.key === 'Enter' && inputsValues.titleTask.length > 0) {
        registerTask()
      } else if (modalDinamic && evt.key === 'Enter') {
        alertRequireTitle()
        return
      }
    }

    window.addEventListener('keydown', saveData)

    return () => window.removeEventListener('keydown', saveData)
  }, [inputsValues.titleTask, registerTask, modalDinamic])

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