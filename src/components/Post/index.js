import { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "lib/firebase"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Tags from "components/Tags"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"
import Comments from "components/Comments"
import PageTitle from "components/Layout/PageTitle"

const Post = () => {
  const [thePost, setThePost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { post } = useParams()

  useEffect(() => {
    const getPost = async () => {
      const docSnap = await getDocs(
        query(collection(db, "posts"), where("slug", "==", post))
      )

      docSnap.forEach((doc) => {
        setThePost({ id: doc.id, ...doc.data() })
      })
    }

    getPost()
    setLoading(false)
  }, [post])

  if (loading) return <AllPostsSkeleton />

  if (!thePost) return null

  const {
    author,
    id,
    content: { title, body },
    date: { seconds },
    tags,
    comment_count,
  } = thePost

  const timestamp = seconds
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const fullDate = `${day}/${month}/${year}`
  const postTime = `${hours}:${minutes}`

  return (
    <>
      <section className="px-6 flex flex-col">
        <div className="container mx-auto max-w-2xl text-center">
          <header className="mb-8">
            <PageTitle mb={8}>{title}</PageTitle>
            <div className="tags">
              <Tags data={tags} />
            </div>
          </header>
        </div>
        <div className="container mx-auto max-w-2xl">
          <p className="bg-gray-50 rounded-xl p-8 text-gray-700">{body}</p>
          <footer className="text-center py-8 text-xs text-gray-600">
            Created by{" "}
            <Link
              to={`/user/${author}`}
              className="text-purple-700 hover:underline"
            >
              {author}
            </Link>{" "}
            on {fullDate} at {postTime}
          </footer>
        </div>
      </section>
      <Comments
        collection_id={thePost.id}
        post_id={id}
        post_author={author}
        comment_count={comment_count}
      />
    </>
  )
}

export default Post
