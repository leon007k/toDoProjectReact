import './App.css'
import { useState } from 'react'
import { ThingsToDo } from './components/ToDoList/ThingsToDo.jsx';
import { AddNewTaskForm } from './components/AddNewTask/AddNewTaskForm.jsx';
import { Button } from './components/UI/Button.jsx';

function App() {
  const [taskToDo, setNewTask] = useState([
    {
      'id': 1,
      'title': 'prueba',
      'description': 'prueba de una tarea'
    }
  ])
  const [isShowModal, setIsShowModal] = useState(false)

  // * We control the option to show the modal
  const onOffModal = () => {
    setIsShowModal(!isShowModal)
    console.log(isShowModal);
  };

  return (
    <>
      {isShowModal && <AddNewTaskForm onOffModal={onOffModal} />}
      <h1 className='text-green'>Lista de pendientes a realizar</h1>
      <Button typeButton='button' addClassName='btn-icon-link' actionButton={onOffModal}>
        <svg className='task-icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path fill="currentColor" d="m14 20.18l-3.59-3.59L9 18l5 5l9-9l-1.41-1.42z" />
          <path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" />
        </svg>
        Agregar tarea
      </Button>
      <ThingsToDo taskToDo={taskToDo} />
    </>
  )
}

export default App
