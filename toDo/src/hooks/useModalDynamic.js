import { useState } from "react"

export function useModalDynamic() {
  const [isShowModal, setIsShowModal] = useState(false)
  const [{ typeOfActionModal, indexTaskModal }, setModalDynamicContent] = useState({
    typeOfActionModal: '',
    indexTaskModal: '',
  })

  // * This function allows us to be more dynamic, for the option of sour or editing tasks
  const modalDynamic = (typeOfAction, indexOfTask) => {
    setIsShowModal(!isShowModal)
    if (indexOfTask >= 0) {
      setModalDynamicContent({
        typeOfActionModal: typeOfAction,
        indexTaskModal: indexOfTask
      })
    } else {
      setModalDynamicContent({
        typeOfActionModal: typeOfAction
      })
    }
  }

  return { isShowModal, modalDynamic, typeOfActionModal, indexTaskModal }
}