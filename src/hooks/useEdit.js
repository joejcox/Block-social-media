import { useState } from "react"

const useEdit = () => {
  const [isEditing, setIsEditing] = useState(false)

  const startEditing = () => {
    setIsEditing(true)
  }

  const stopEditing = () => {
    setIsEditing(false)
  }

  return { isEditing, startEditing, stopEditing }
}

export default useEdit
