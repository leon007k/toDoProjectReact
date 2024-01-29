import { useState, useEffect } from "react"

export function useControlTaskForm({ typeOfAction, taskData }) {
  const [{ titleTask, descriptionTask }, setInputsValues] = useState({
    titleTask: '',
    descriptionTask: ''
  })
  const [requiredTitle, setRequiredTitle] = useState(false)

  useEffect(() => {
    if (typeOfAction === 'edit')
      setInputsValues({
        titleTask: taskData?.title || '',
        descriptionTask: taskData?.description || ''
      })
  }, [typeOfAction, taskData])

  return { titleTask, descriptionTask, requiredTitle, setInputsValues, setRequiredTitle }
}