import { useContext } from "react"
import { UserContext } from "context/UserContext"

// Hook to get the user
const useFirestore = () => {
  const userData = useContext(UserContext)
  return userData ? userData : null
}

export default useFirestore
