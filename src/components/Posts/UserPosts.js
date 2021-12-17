import { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "lib/firebase"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"

import PostPreview from "components/Posts/PostPreview"

const UserPosts = ({ author }) => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const postsRef = query(
      collection(db, "posts"),
      where("author", "==", author)
    )

    const unsubscribe = onSnapshot(
      postsRef,
      (docs) => {
        let postsArray = []

        docs.forEach((post) => {
          postsArray.push({
            id: post.id,
            post_id: post.data().id,
            data: post.data(),
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
  }, [author])

  if (loading) return <AllPostsSkeleton />

  if (!posts) return <div className="no-posts">User has no posts</div>

  const RenderPosts = () => {
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.data.date.seconds) - new Date(a.data.date.seconds)
    )

    return sortedPosts.map(({ id, post_id, data }) => (
      <PostPreview
        postData={data}
        postId={id}
        key={post_id}
        userCtrl
        showAvatar={false}
      />
    ))
  }

  return <div className="posts-list">{<RenderPosts />}</div>
}

export default UserPosts
