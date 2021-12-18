import { useEffect, useState } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "lib/firebase"
import useAuth from "hooks/useAuth"

import PostPreview from "components/Posts/PostPreview"
import LoadingDots from "components/Skeletons/LoadingDots"
import ButtonLink from "components/Layout/ButtonLink"

const UserPosts = ({ author }) => {
  const { currentUser } = useAuth()
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

  if (loading) return <LoadingDots />

  if (posts && posts.length === 0)
    return (
      <section className="flex px-6">
        <div className="container mx-auto max-w-2xl">
          <h4 className="text-2xl text-main-700 mt-8 text-center">
            User has no posts
            <br />
            {currentUser && (
              <ButtonLink route="/dashboard">Back to dashboard</ButtonLink>
            )}
          </h4>
        </div>
      </section>
    )

  const RenderPosts = () => {
    if (!posts) return null
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

  return (
    <div className="px-6 mx-auto max-w-4xl">
      <RenderPosts />
    </div>
  )
}

export default UserPosts
