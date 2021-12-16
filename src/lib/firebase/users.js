import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "lib/firebase"
import defaultAvatar from "assets/images/avatar_placeholder.jpg"

export const getAvatar = async (username) => {
  try {
    const usersRef = collection(db, "users")
    const usersSnap = query(usersRef, where("username", "==", username))
    const docSnap = await getDocs(usersSnap)

    let userAvatar = null
    docSnap.forEach((user) => {
      userAvatar = user.data().avatar
    })

    return userAvatar
  } catch (error) {
    return defaultAvatar
  }
}

export const getDefaultAvatar = () => defaultAvatar
