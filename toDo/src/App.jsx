import './App.css'
import { useState } from 'react'
import { ThingsToDo } from './components/ToDoList/ThingsToDo.jsx';
import { TaskForm } from './components/TaskForm/TaskForm.jsx';
import { Button } from './components/UI/Button.jsx';

function App() {
  const [taskToDo, setNewTask] = useState([
    {
      'id': 1,
      'title': 'prueba 1',
      'description': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.Veniam dolor ad alias praesentium eaque? Quas, rerum fugiat, sed non, iste culpa repudiandae nulla quidem quo enim voluptate et iusto eos?'
    },
    {
      'id': 2,
      'title': 'prueba 2',
      'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni modi quam dicta aut in dolor cupiditate tempore, a et fuga. Delectus quia magni quis repudiandae voluptatibus officiis debitis nobis architecto! Ex est molestias labore ut at natus corporis maiores odio minima, amet sit optio aspernatur placeat quos ducimus voluptas tempora quidem dolorum accusantium, similique atque rerum exercitationem aperiam eos? Provident!'
    }
  ])
  const [isShowModal, setIsShowModal] = useState(false)
  const [modalDynamicContent, setModalDynamicContent] = useState({
    typeOfActionModal: '',
    idTaskModal: '',
  })

  // * We allow the information of the pending task to be saved
  const registerNewTask = (newTask) => {
    setNewTask(prevListTask => {
      return [...prevListTask, newTask]
    }
    )
  }

  // * It will allow us to eliminate a task from our list
  const deleteTask = idTask => {
    setNewTask(prevListTask => {
      const updateDListTask = prevListTask.filter(taskFilter => taskFilter.id !== idTask)
      console.log(updateDListTask?.title)
      return updateDListTask
    })
  }

  // * It will allow us to edit a task of our list
  const editTask = taskDataToEdit => {
    setNewTask(prevListTask => {
      const updateEListTask = prevListTask.map(taskFilter => {
        if (taskFilter.id === taskDataToEdit?.id) {
          return {
            ...taskFilter,
            title: taskDataToEdit?.title,
            description: taskDataToEdit?.description
          }
        }

        return taskFilter
      })
      return updateEListTask
    })
  }

  // * This function allows us to be more dynamic, for the option of sour or editing tasks
  const modalDinamic = (typeOfAction, indexOfTask) => {
    setIsShowModal(!isShowModal)
    if (indexOfTask >= 0) {
      setModalDynamicContent({
        typeOfActionModal: typeOfAction,
        indexTaskModal: indexOfTask
      })
    } else {
      setModalDynamicContent({
        typeOfActionModal: typeOfAction
      })
    }
  }

  const validateTaskData = modalDynamicContent.indexTaskModal >= 0
    ? taskToDo[modalDynamicContent.indexTaskModal]
    : ''

  return (
    <>
      {isShowModal && <TaskForm
        modalDinamic={modalDinamic}
        funcToPerform={modalDynamicContent.typeOfActionModal === 'add' ? registerNewTask : editTask}
        typeOfAction={modalDynamicContent.typeOfActionModal}
        taskData={validateTaskData}
      />}
      <h1 className='text-green'>Lista de pendientes a realizar</h1>
      <Button typeButton='button' addClassName='btn-icon-link' actionButton={() => modalDinamic('add')}>
        <svg className='task-icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path fill="currentColor" d="m14 20.18l-3.59-3.59L9 18l5 5l9-9l-1.41-1.42z" />
          <path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" />
        </svg>
        Agregar tarea
      </Button>
      <ThingsToDo taskToDo={taskToDo} onDeleteTask={deleteTask} onEditTask={modalDinamic} />
    </>
  )
}

export default App
