import './App.css'
import { ThingsToDo } from './components/ToDoList/ThingsToDo.jsx';
import { TaskForm } from './components/TaskForm/TaskForm.jsx';
import { Button } from './components/UI/Button.jsx';
import { useCrudTasks } from './hooks/useCrudTask.js';
import { useModalDynamic } from './hooks/useModalDynamic.js';

function App() {
  const { taskToDo, registerNewTask, deleteTask, editTask } = useCrudTasks()
  const { isShowModal, modalDynamic, typeOfActionModal, indexTaskModal } = useModalDynamic()
  const validateTaskData = indexTaskModal >= 0
    ? taskToDo[indexTaskModal]
    : ''

  return (
    <>
      {isShowModal && <TaskForm
        modalDinamic={modalDynamic}
        funcToPerform={typeOfActionModal === 'add' ? registerNewTask : editTask}
        typeOfAction={typeOfActionModal}
        taskData={validateTaskData}
      />}
      <header>
        <h1 className='text-green'>Lista de pendientes a realizar</h1>
        <Button typeButton='button' addClassName='btn-icon-link' actionButton={() => modalDynamic('add')}>
          <svg className='task-icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path fill="currentColor" d="m14 20.18l-3.59-3.59L9 18l5 5l9-9l-1.41-1.42z" />
            <path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" />
          </svg>
          Agregar tarea
        </Button>
      </header>
      <section className={`task-container ${taskToDo.length > 2 && 'scrollY'}`}>
        <ThingsToDo taskToDo={taskToDo} onDeleteTask={deleteTask} onEditTask={modalDynamic} />
      </section>
    </>
  )
}

export default App
