import { useState, useEffect, createContext } from "react"
import {
  /*doc, setDoc, getDoc,*/ collection,
  getDocs,
} from "firebase/firestore"
import { db } from "lib/firebase"
import useAuth from "hooks/useAuth"

export const UserContext = createContext({
  userData: Object,
  username: String,
  uid: String,
  avatar: String,
})

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [username, setUsername] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [uid, setUid] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    const setData = async () => {
      if (!currentUser) return
      const querySnapshot = await getDocs(collection(db, "users"))
      querySnapshot.forEach((doc) => {
        if (currentUser.uid === doc.data().uid) {
          setUserData(doc.data())
          setUsername(doc.id)
          setAvatar(doc.data().avatar)
          setUid(doc.data().uid)
        }
      })
    }

    setData()
  }, [currentUser])

  const value = {
    userData,
    username,
    uid,
    avatar,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
