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
      const querySnapshot = query(
        collection(db, "users"),
        where("uid", "==", currentUser.uid)
      )
      const docRefs = await getDocs(querySnapshot)
      docRefs.forEach((doc) => {
        setUserData({ userId: doc.id, ...doc.data() })
      })
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

  const createPost = async (
    author,
    author_id,
    body,
    excerpt,
    image,
    title,
    id,
    tags
  ) => {
    const formattedSlug = convertToSlug(title)

    try {
      await addDoc(collection(db, "posts"), {
        author: author,
        author_id: author_id,
        comment_count: 0,
        content: {
          body: body,
          excerpt: excerpt,
          image: image,
          title: title,
        },
        date: new Date(),
        id: id,
        slug: formattedSlug,
        tags: tags,
      })

      navigate(`/user/${author}/posts/${formattedSlug}`)
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

  const getAvatar = async (author) => {
    try {
      const docRef = doc(db, "users", author)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) return null

      const userAvatar = docSnap.data().avatar

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
