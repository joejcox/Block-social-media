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
        <article
          className=" bg-orange-50 w-full p-0 mb-20 border-b border-gray-200"
          key={id}
        >
          <div className="relative">
            <figure className="media-left absolute -top-7 left-5">
              <p className="w-14 h-14 overflow-hidden rounded-full shadow-lg">
                <img
                  className="h-full w-full object-cover"
                  src={avatar || defaultAvatar}
                  alt={content.title}
                />
              </p>
            </figure>
            <div className="media-content mt-1 pt-12 rounded-lg rounded-tl-none overflow-hidden bg-gray-100 flex-1">
              <div className="content px-6">
                <header className="post-header">
                  <h2 className="text-2xl mb-3">
                    <Link
                      className="text-purple-700 hover:text-purple-800 hover:underline"
                      to={`/user/${author}/posts/${slug}`}
                    >
                      {content.title}
                    </Link>
                  </h2>
                  <div className="tags mb-6">
                    <Tags data={tags} />
                  </div>
                </header>
                <p className="post-excerpt pb-6 text-sm">{content.excerpt}</p>
              </div>
              <footer className="post-footer px-6 py-4 flex justify-between bg-purple-600 text-purple-200">
                <div className="footer-left">
                  Posted by{" "}
                  <Link
                    to={`/user/${author}`}
                    className="capitalise underline hover:text-purple-100"
                  >
                    {author}
                  </Link>
                </div>
                <div className="footer-right">
                  <Link
                    to={`/user/${author}/posts/${slug}#comments`}
                    className="underline hover:text-purple-100"
                  >
                    Comments ({comment_count})
                  </Link>
                </div>
              </footer>
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
