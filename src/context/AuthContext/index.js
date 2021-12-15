import { useState, useEffect, createContext } from "react"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth"
import auth from "lib/firebase"
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "lib/firebase"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        getDisplayName(user.uid)
      }
    })

    return () => unsubscribe()
  }, [])

  const getDisplayName = async (uid) => {
    try {
      const usersRef = collection(db, "users")
      const usersQuery = query(usersRef, where("uid", "==", uid))
      const usersSnap = await getDocs(usersQuery)

      usersSnap.forEach((user) => {
        setDisplayName(user.data().username)
      })
    } catch (error) {
      console.log("Error in getDisplayName")
      console.log(error)
    }
  }

  const signUp = async (email, password, username) => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"))
      let usernameExists
      usersSnapshot.forEach((doc) => {
        if (username.toLowerCase() === doc.data().username.toLowerCase()) {
          usernameExists = true
        }
      })

      if (usernameExists) {
        setError("Username already exists, please choose another username")
        return
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const { user } = response

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: username,
        bio: "",
        email: user.email,
        avatar: "",
      })

      setError(null)
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("Email already exists, please use another email")
      } else {
        setError("Please contact an administrator")
        console.log("Error", e)
      }
    }
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    try {
      const response = await signOut(auth)
      setCurrentUser(response)
      setDisplayName(null)
    } catch (error) {
      console.log(error)
    }
  }

  const resetPassword = async (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        return { errorCode, errorMessage }
      })
  }

  const value = {
    currentUser,
    signUp,
    signIn,
    logout,
    resetPassword,
    error,
    displayName,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
