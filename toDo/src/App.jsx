import './App.css'
import { useState } from 'react'
import { ThingsToDo } from './components/ToDoList/ThingsToDo.jsx';
import { AddNewTaskForm } from './components/AddNewTask/AddNewTaskForm.jsx';

function App() {
  const [taskToDo, setNewTask] = useState([])



  return (
    <>
      <h1 className='text-green'>Lista de pendientes a realizar</h1>
      <AddNewTaskForm />
      <ThingsToDo taskToDo={taskToDo} />
    </>
  )
}

export default App
