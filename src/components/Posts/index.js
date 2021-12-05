import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "lib/firebase"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"
import Tags from "components/Tags"

const Posts = () => {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const getPosts = async () => {
      let postsArray = []
      const querySnapshot = await getDocs(collection(db, "posts"))
      querySnapshot.forEach((post) => {
        postsArray.push({
          id: post.id,
          data: post.data(),
        })
      })

      setPosts(postsArray)
      setLoading(false)
    }

    getPosts()
  }, [])

  if (loading) return <AllPostsSkeleton />

  if (!posts) return <div className="no-posts">No posts to show</div>

  const RenderPosts = () => {
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.data.date.seconds) - new Date(a.data.date.seconds)
    })

    return sortedPosts.map(({ id, data }) => (
      <article className="post-preview" key={id}>
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
          Posted by <Link to={`/user/${data.author}`}>{data.author}</Link> |{" "}
          <Link to={`/user/${data.author}/posts/${data.slug}`}>View Post</Link>
        </footer>
      </article>
    ))
  }

  return (
    <div className="posts-list">
      <RenderPosts />
    </div>
  )
}

export default Posts
