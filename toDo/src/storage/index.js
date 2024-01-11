// * Allows you to save tasks in localStorage
export const saveTaskToStorage = (task) => {
  window.localStorage.setItem('thingsToDo', JSON.stringify(task));
}