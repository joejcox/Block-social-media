import { useEffect, useState } from "react"
import { db } from "lib/firebase"
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore"
import useFirestore from "hooks/useFirestore"
import { Link } from "react-router-dom"

const PostsListLimited = () => {
  const { userData } = useFirestore()
  const [posts, setPosts] = useState()

  useEffect(() => {
    if (!userData) return null
    const getPosts = async () => {
      let postsArray = []
      const postsRef = collection(db, "posts")
      const postsQuery = query(
        postsRef,
        where("author_id", "==", userData.uid),
        orderBy("date", "desc"),
        limit(5)
      )
      const postsSnap = await getDocs(postsQuery)

      postsSnap.forEach((post) => {
        postsArray.push({
          doc_id: post.id,
          ...post.data(),
        })
      })

      setPosts(postsArray)
    }

    getPosts()
  }, [userData])

  if (!userData) return null

  const postsList = posts
    ? posts.map((post) => {
        const title =
          post.content.title.length > 28
            ? `${post.content.title.substring(0, 28)}...`
            : post.content.title
        return (
          <article key={post.id}>
            <Link
              className="block py-4 border-b border-gray-200 text-gray-400 hover:text-main-700"
              to={`/user/${post.author}/posts/${post.slug}`}
            >
              {title}
            </Link>
          </article>
        )
      })
    : null

  return (
    <div className="px-6 font-bold text-sm text-gray-500">
      {postsList}
      <div className="flex justify-end my-4">
        <Link
          className="text-xs text-main-700 hover:underline"
          to={`/user/${userData.username}`}
        >
          View All
        </Link>
      </div>
    </div>
  )
}

export default PostsListLimited
