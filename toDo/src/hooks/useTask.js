import { useState, useEffect } from "react"
import { saveTaskToStorage } from "../storage";

export function useTasks() {
  // * Matine the state of resolution for each specific task
  const [resolvedTasks, setResolvedTasks] = useState(() => {
    const cookiesResolvedTasks = window.localStorage.getItem('taskResolved');
    return cookiesResolvedTasks
      ? JSON.parse(cookiesResolvedTasks)
      : {};
  });

  // * Will be in charge of updating the state of resolution for each specific task
  const toggleResolvedTask = taskId => {
    const addNewTaskResolved = { ...resolvedTasks };
    addNewTaskResolved[taskId] = !addNewTaskResolved[taskId];
    setResolvedTasks(addNewTaskResolved);
  };

  // * We save our tasks in localStorage to avoid losing adjustments
  useEffect(() => {
    saveTaskToStorage({ taskResolved: resolvedTasks });
  }, [resolvedTasks]);

  return { resolvedTasks, toggleResolvedTask }
}