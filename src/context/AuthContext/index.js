import { useState, useEffect, createContext } from "react"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth"
import auth from "lib/firebase"
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore"
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

        const getDisplayName = async () => {
          const querySnapshot = await getDocs(collection(db, "users"))
          querySnapshot.forEach((doc) => {
            if (user.uid === doc.data().uid) {
              setDisplayName(doc.id)
            }
          })
        }

        getDisplayName()
      }
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email, password, username) => {
    const checkDoc = await getDoc(doc(db, "users", username))

    if (checkDoc._document) {
      setError("Username already exists, please choose another username")
      return
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const { user } = response

      await setDoc(doc(db, "users", username), {
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
        setError("Please check the console for more information")
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
