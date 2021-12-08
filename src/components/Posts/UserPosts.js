import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "lib/firebase"
import Tags from "components/Tags"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"
import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"

const UserPosts = ({ author }) => {
  const { currentUser } = useAuth()
  const { deletePost } = useFirestore()
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
      <article className="post-preview" key={post_id}>
        <header className="post-header">
          <h2 className="title is-3">
            <Link to={`/user/${data.author}/posts/${data.slug}`}>
              {data.content.title}
            </Link>
          </h2>
          <div className="tags">
            <Tags data={data.tags} />
          </div>
        </header>
        <p className="post-excerpt">{data.content.excerpt}</p>
        <footer className="post-footer">
          <Link
            className="button is-info"
            to={`/user/${data.author}/posts/${data.slug}`}
          >
            View Post
          </Link>
          {currentUser && currentUser.uid === data.author_id ? (
            <button
              className="button is-danger ml-space"
              onClick={() => deletePost(id)}
            >
              Remove Post
            </button>
          ) : null}
        </footer>
        Comments ({data.comment_count})
      </article>
    ))
  }

  return <div className="posts-list">{<RenderPosts />}</div>
}

export default UserPosts
