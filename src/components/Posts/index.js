import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "lib/firebase"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"
import Tags from "components/Tags"

const Posts = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
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

  if (loading) return <AllPostsSkeleton />

  if (!posts) return <div className="no-posts">No posts to show</div>

  const RenderPosts = () => {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date.seconds) - new Date(a.date.seconds)
    })

    return sortedPosts.map(
      ({ id, author, slug, content, tags, comment_count }) => (
        <article className="post-preview" key={id}>
          <header className="post-header">
            <h2 className="title is-3">
              <Link to={`/user/${author}/posts/${slug}`}>{content.title}</Link>
            </h2>
            <div className="tags">
              <Tags data={tags} />
            </div>
          </header>
          <p className="post-excerpt">{content.excerpt}</p>
          <footer className="post-footer">
            Posted by{" "}
            <Link to={`/user/${author}`} className="capitalise">
              {author}
            </Link>{" "}
            | <Link to={`/user/${author}/posts/${slug}`}>View Post</Link>
          </footer>
          <div className="content">
            <Link to={`/user/${author}/posts/${slug}#comments`}>
              Comments ({comment_count})
            </Link>
          </div>
        </article>
      )
    )
  }

  return (
    <div className="posts-list">
      <RenderPosts />
    </div>
  )
}

export default Posts
