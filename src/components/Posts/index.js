import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore"
import { db } from "lib/firebase"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"
import Tags from "components/Tags"
import defaultAvatar from "assets/images/avatar_placeholder.png"

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
    return posts.map(({ id, author, slug, content, tags, comment_count }) => {
      if (!users) return null

      const user = users.filter((user) => user.id === author)
      const avatar = user[0].avatar

      return (
        <article className="post-preview media" key={id}>
          <figure className="media-left">
            <p className="comment-avatar image is-96x96">
              <img src={avatar || defaultAvatar} alt={content.title} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <header className="post-header">
                <h2 className="title is-3">
                  <Link to={`/user/${author}/posts/${slug}`}>
                    {content.title}
                  </Link>
                </h2>
                <div className="tags">
                  <Tags data={tags} />
                </div>
              </header>
              <p className="post-excerpt">{content.excerpt}</p>
              <footer className="post-footer">
                Posted by
                <Link to={`/user/${author}`} className="capitalise">
                  {author}
                </Link>
                | <Link to={`/user/${author}/posts/${slug}`}>View Post</Link>
              </footer>
              <div className="content">
                <Link to={`/user/${author}/posts/${slug}#comments`}>
                  Comments ({comment_count})
                </Link>
              </div>
            </div>
          </div>
        </article>
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
