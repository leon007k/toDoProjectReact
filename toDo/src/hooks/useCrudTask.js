import { useState, useEffect } from "react"
import { saveTaskToStorage } from "../storage"
import { EXAMPLE_TASKS } from "../constants"

export function useCrudTasks() {
  const [taskToDo, setTaskToDo] = useState(() => {
    const cookiesTask = window.localStorage.getItem('thingsToDo')
    return cookiesTask
      ? JSON.parse(cookiesTask)
      : EXAMPLE_TASKS
  })

  // * We save our tasks in localStorage to avoid losing adjustments
  useEffect(() => {
    saveTaskToStorage({ task: taskToDo })
  }, [taskToDo])

  // * We allow the information of the pending task to be saved
  const registerNewTask = (newTask) => {
    setTaskToDo(prevListTask => {
      return [...prevListTask, newTask]
    }
    )
  }

  // * It will allow us to eliminate a task from our list
  const deleteTask = idTask => {
    setTaskToDo(prevListTask => {
      const updateDListTask = prevListTask.filter(taskFilter => taskFilter.id !== idTask)
      return updateDListTask
    })
  }

  // * It will allow us to edit a task of our list
  const editTask = taskDataToEdit => {
    setTaskToDo(prevListTask => {
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

  return { taskToDo, registerNewTask, deleteTask, editTask }
}