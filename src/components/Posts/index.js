import { useEffect, useState } from "react"
import PostPreview from "./PostPreview"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore"
import { db } from "lib/firebase"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"

const Posts = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [limitBy, setLimitBy] = useState(8)

  useEffect(() => {
    const docRef = collection(db, "posts")
    const snapRef = query(docRef, orderBy("date", "desc"), limit(limitBy))
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
  }, [limitBy])

  useEffect(() => {
    const loadMorePosts = (e) => {
      const { scrollTop, scrollHeight, clientHeight } =
        e.target.scrollingElement
      if (scrollHeight - scrollTop < clientHeight + 1) {
        setLimitBy(limitBy + 8)
      }
    }

    document.addEventListener("scroll", loadMorePosts)

    return () => document.removeEventListener("scroll", loadMorePosts)
  }, [limitBy, setLimitBy])

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

  if (loading) return <AllPostsSkeleton />

  if (!posts) return null

  const RenderPosts = () => {
    return posts.map((post) => {
      if (!users) return null

      const user = users.filter(
        (user) => user.username.toLowerCase() === post.author.toLowerCase()
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
