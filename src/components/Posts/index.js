import { useEffect, useState } from "react"
import PostPreview from "components/Posts/PostPreview/"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore"
import { db } from "lib/firebase"
import LoadingDots from "components/Skeletons/LoadingDots"

const Posts = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const docRef = collection(db, "posts")
    const snapRef = query(docRef, orderBy("date", "desc"))
    const unsubscribe = onSnapshot(
      snapRef,
      (docs) => {
        let postsArray = []

        docs.forEach((post) => {
          postsArray.push({
            post_ref: post.id,
            ...post.data(),
          })
        })

        setPosts(postsArray)
      },
      (error) => {
        console.log(error)
      }
    )

    setLoading(false)

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!posts) return null
    const getUsers = async () => {
      const usersArray = []
      const usersRef = collection(db, "users")
      const usersSnap = await getDocs(usersRef)

      usersSnap.forEach((user) => {
        usersArray.push({
          id: user.data().uid,
          username: user.data().username,
          avatar: user.data().avatar,
        })
      })

      setUsers(usersArray)
    }

    getUsers()
  }, [posts])

  if (loading) return <LoadingDots />

  if (!posts) return null

  const RenderPosts = () => {
    return posts.map((post) => {
      if (!users) return null

      const user = users.find(
        (user) => user.username.toLowerCase() === post.author.toLowerCase()
      )

      const avatar = user.avatar

      return (
        <PostPreview
          postData={post}
          avatar={avatar}
          key={post.post_ref}
          showAvatar={true}
        />
      )
    })
  }

  return (
    <div className="posts-list">
      <RenderPosts />
    </div>
  )
}

export default Posts
