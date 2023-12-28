import { CardWithFooter } from "../UI/CardWithFooter"
import './ThingsToDo.css'

export const ThingsToDo = ({ taskToDo }) => {

  // * It is validated that there are added tasks, in case of not existing, we show alternate text
  let EnlistTasks = taskToDo.length > 0 ?
    (
      taskToDo.map(task => (
        <CardWithFooter
          key={task?.id}
          cardBodyContent={task?.description}
        >
          {task?.title}
        </CardWithFooter>
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