import PropTypes from 'prop-types';
import './ThingsToDo.css'
import { Task } from "./Task"

export const ThingsToDo = ({ taskToDo, onDeleteTask, onEditTask }) => {

  const deleteTaskHandler = taskId => {
    const wantToDeleteTask = confirm("¿Estas seguro de eliminar la tarea?")
    wantToDeleteTask && onDeleteTask(taskId)
  }

  const editTaskHandler = taskId => {
    const indexOfTask = taskToDo.findIndex(taskToSearch => taskToSearch.id === taskId)
    onEditTask('edit', indexOfTask)
  }

  // * It is validated that there are added tasks, in case of not existing, we show alternate text
  const hasNotTask = taskToDo.length > 0

  return (
    hasNotTask
      ? <Task task={taskToDo} editTaskHandler={editTaskHandler} deleteTaskHandler={deleteTaskHandler} />
      : <section className='empty-task'>
        <p className='empty-task__text'>Aun no tienes tareas por realizar. Agrega una tarea, para poder tenerlas enlistadas</p>
        <img height="150" width="150" src="https://cdn-icons-png.flaticon.com/512/8944/8944502.png" alt="thinking" loading="lazy" />
      </section>
  )
}

ThingsToDo.propTypes = {
  taskToDo: PropTypes.object,
  onDeleteTask: PropTypes.func,
  onEditTask: PropTypes.func
}