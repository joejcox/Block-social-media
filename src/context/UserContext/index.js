import { useState, useEffect, createContext } from "react"
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "lib/firebase"
import useAuth from "hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const UserContext = createContext({
  userData: Object,
  username: String,
  uid: String,
  avatar: String,
  createPost: Function,
  deletePost: Function,
})

const UserContextProvider = ({ children }) => {
  const navigate = useNavigate()
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

  const convertToSlug = (slug) => {
    return slug
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
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
      const docRef = await addDoc(collection(db, "posts"), {
        author: author,
        author_id: author_id,
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

      console.log(`Post created successfully: ${docRef.id}`)
      navigate(`/user/${author}/posts/${formattedSlug}`)
    } catch (error) {
      return error
    }
  }

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id))
    return true
  }

  const value = {
    userData,
    username,
    uid,
    avatar,
    createPost,
    deletePost,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
