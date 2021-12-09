import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "lib/firebase"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Tags from "components/Tags"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"
import Comments from "components/Comments"

const Post = () => {
  const [thePost, setThePost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { post } = useParams()

  useEffect(() => {
    const getPost = async () => {
      const query = await getDocs(collection(db, "posts"))
      query.forEach(async (doc) => {
        doc.data().slug === post && setThePost({ id: doc.id, ...doc.data() })
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
      <section className="section single-post">
        <div className="container">
          <header className="single-post--header post-header">
            <h1 className="title is-1">{title}</h1>
            <div className="tags">
              <Tags data={tags} />
            </div>
          </header>
          <p className="content">{body}</p>
          <footer className="post-footer">
            Created by <Link to={`/user/${author}`}>{author}</Link> on{" "}
            {fullDate} at {postTime}
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
