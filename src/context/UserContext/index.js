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
import defaultAvatar from "assets/images/avatar_placeholder.png"
import { cleanUpTitle } from "lib/utils"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
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

  // for use in create post and update post. It will check if a post title already exists within users posts titles
  const checkIfUserHasPostWithSameTitle = async (author_id, title) => {
    try {
      const postsRef = collection(db, "posts")
      const postsQuery = query(postsRef, where("author_id", "==", author_id))
      const postsSnap = await getDocs(postsQuery)
      let postsList = []
      postsSnap.forEach((post) => {
        const lowercase_post_title = post
          .data()
          .content.title.toLowerCase()
          .trim()
        if (lowercase_post_title === title.toLowerCase().trim()) {
          postsList.push(post.data().content.title)
        }
      })

      if (postsList.length > 0) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return error
    }
  }

  const createPost = async (body, image, title, id, tags, uid) => {
    const { cleanedTitle, formattedSlug } = cleanUpTitle(title)

    const titleExists = await checkIfUserHasPostWithSameTitle(uid, cleanedTitle)

    if (titleExists) return { error: "A post with this title already exists" }

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

      return formattedSlug
    } catch (error) {
      return error
    }
  }

  const updatePost = async ({ author_id, post_ref, content, tags }) => {
    const { cleanedTitle, formattedSlug } = cleanUpTitle(content.title)

    const titleExists = await checkIfUserHasPostWithSameTitle(
      author_id,
      cleanedTitle
    )

    if (titleExists)
      return {
        error:
          "A post with this title already exists, please use another title",
      }

    try {
      const docRef = doc(db, "posts", post_ref)

      await updateDoc(docRef, {
        content: {
          body: content.body,
          title: content.title,
        },
        slug: formattedSlug,
        edited: new Date(),
        tags: tags,
      })
      return formattedSlug
    } catch (error) {
      return { error: error }
    }
  }

  const deletePost = async (id) => {
    try {
      const commentsRef = collection(db, "comments")
      const commentsQuery = query(commentsRef, where("parent_id", "==", id))
      const querySnapshot = await getDocs(commentsQuery)
      deleteDoc(doc(db, "posts", id))
      querySnapshot.forEach((comment) => {
        deleteDoc(doc(db, "comments", comment.id))
      })
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
    updatePost,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
