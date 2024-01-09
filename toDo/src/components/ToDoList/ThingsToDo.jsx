import { useState } from "react"
import { Button } from "../UI/Button"
import { Card } from "../UI/Card"
import './ThingsToDo.css'

export const ThingsToDo = ({ taskToDo, onDeleteTask, onEditTask }) => {

  // * Matine the state of resolution for each specific task
  const [resolvedTasks, setResolvedTasks] = useState({})

  // * Will be in charge of updating the state of resolution for each specific task
  const toggleResolvedTask = taskId => {
    const updateTaskResolved = { ...resolvedTasks }
    updateTaskResolved[taskId] = !updateTaskResolved[taskId]
    setResolvedTasks(updateTaskResolved)
  }

  const deleteTaskHandler = taskId => {
    const wantToDeleteTask = confirm("¿Estas seguro de eliminar la tarea?")
    wantToDeleteTask && onDeleteTask(taskId)
  }

  const editTaskHandler = taskId => {
    const indexOfTask = taskToDo.findIndex(taskToSearch => taskToSearch.id === taskId)
    onEditTask('edit', indexOfTask)
  }

  // * It is validated that there are added tasks, in case of not existing, we show alternate text
  let EnlistTasks = taskToDo.length > 0 ?
    (
      taskToDo.map(task => (
        <Card
          key={task?.id}
          titleTask={task?.title}
          cardBodyContent={task?.description}
          taskIsDone={resolvedTasks[task?.id]}
        >
          <div className='card-footer btn-group'>
            <Button typeButton='button' addClassName={'btn-task-done'} actionButton={() => toggleResolvedTask(task?.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 1600 1280">
                <path fill="white" d="M1575 310q0 40-28 68l-724 724l-136 136q-28 28-68 28t-68-28l-136-136L53 740q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295l656-657q28-28 68-28t68 28l136 136q28 28 28 68" />
              </svg>
            </Button>
            <Button typeButton='button' addClassName={'btn-edit-task'} actionButton={() => editTaskHandler(task?.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M8.707 19.707L18 10.414L13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263M21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586L19.414 9z" /></svg>
            </Button>
            <Button typeButton='button' addClassName={'btn-delete-task'} actionButton={() => deleteTaskHandler(task?.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="white" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" />
              </svg>
            </Button>
          </div>
        </Card>
      ))
    ) :
    (
      <section className='empty-task'>
        <p className='empty-task__text'>Aun no tienes tareas por realizar. Agrega una tarea, para poder tenerlas enlistadas</p>
        <img height="150" width="150" src="https://cdn-icons-png.flaticon.com/512/8944/8944502.png" alt="thinking"></img>
      </section>
    )


  return EnlistTasks
}