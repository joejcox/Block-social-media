import { useState, useEffect, createContext } from "react"
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "lib/firebase"
import useAuth from "hooks/useAuth"
import { useNavigate } from "react-router-dom"
import defaultAvatar from "assets/images/avatar_placeholder.png"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    const setData = async () => {
      if (!currentUser) return
      const userRef = await getDoc(doc(db, "users", currentUser.uid))

      setUserData({ userId: userRef.id, ...userRef.data() })
    }

    setData()
  }, [currentUser])

  const convertToSlug = (slug) => {
    return slug
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
  }

  const addComment = async (commentData, currentCommentCount) => {
    try {
      await addDoc(collection(db, "comments"), {
        ...commentData,
        date: new Date(),
      })

      await updateCommentCount(commentData.parent_id, currentCommentCount)
    } catch (error) {
      console.log(`Error in addComment function: ${error}`)
    }
  }

  const updateCommentCount = async (post_id, currentCommentCount) => {
    const count = currentCommentCount + 1

    try {
      const postRef = doc(db, "posts", post_id)
      const postSnap = await getDoc(postRef)

      if (postSnap.exists()) {
        updateDoc(postRef, {
          comment_count: count,
        })
      }
    } catch (error) {
      console.log(`Error in updateCommentCount function: ${error}`)
    }
  }

  const createPost = async (body, image, title, id, tags) => {
    const replaceEmoji = (str) => {
      return str.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        "moji"
      )
    }

    const cleanedTitle = await replaceEmoji(title)
    const formattedSlug = await convertToSlug(cleanedTitle)

    try {
      await addDoc(collection(db, "posts"), {
        author: userData.username,
        author_id: userData.uid,
        comment_count: 0,
        content: {
          body: body,
          image: image,
          title: title,
        },
        date: new Date(),
        id: id,
        slug: formattedSlug,
        tags: tags,
      })

      navigate(`/user/${userData.username}/posts/${formattedSlug}`)
    } catch (error) {
      return error
    }
  }

  // const getCommentCount = async (id) => {}

  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id))
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const getAvatar = async (username) => {
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

  const value = {
    userData,
    createPost,
    deletePost,
    addComment,
    getAvatar,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
