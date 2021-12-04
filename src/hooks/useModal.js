import { useState } from "react"

const useModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return { openModal, closeModal, modalIsOpen, customStyles }
}

export default useModal

/*

import Modal from "react-modal"
import useModal from "Hooks/useModal"

  const { openModal, closeModal, modalIsOpen, customStyles } = useModal()

      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <p>HELLO THIS IS A MODAL!</p>
      </Modal>

      */
