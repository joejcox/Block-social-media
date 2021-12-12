import { useEffect, useState } from "react"
import PostPreview from "./PostPreview"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore"
import { db } from "lib/firebase"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"

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
            id: post.id,
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
          id: user.id,
          avatar: user.data().avatar,
        })
      })

      setUsers(usersArray)
    }

    getUsers()
  }, [posts])

  if (loading) return <AllPostsSkeleton />

  if (!posts) return null

  const RenderPosts = () => {
    return posts.map((post) => {
      if (!users) return null

      const user = users.filter(
        (user) => user.id.toLowerCase() === post.author.toLowerCase()
      )
      const avatar = user[0].avatar

      return (
        <PostPreview
          postData={post}
          avatar={avatar}
          key={post.id}
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
