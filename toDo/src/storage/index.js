// * Allows you to save tasks in localStorage
export const saveTaskToStorage = ({ task, taskResolved }) => {
  task && window.localStorage.setItem('thingsToDo', JSON.stringify(task));
  taskResolved && window.localStorage.setItem('taskResolved', JSON.stringify(taskResolved));
}