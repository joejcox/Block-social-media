import { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "lib/firebase"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Tags from "components/Tags"
import AllPostsSkeleton from "components/Skeletons/AllPostsSkeleton"
import Comments from "components/Comments"
import PageTitle from "components/Layout/PageTitle"
import { formatDate } from "lib/utils"
import EditPost from "components/EditPost"
import useAuth from "hooks/useAuth"

const Post = () => {
  const { currentUser } = useAuth()
  const [thePost, setThePost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const { post } = useParams()

  useEffect(() => {
    const getPost = async () => {
      const docSnap = await getDocs(
        query(collection(db, "posts"), where("slug", "==", post))
      )

      docSnap.forEach((doc) => {
        setThePost({ post_ref: doc.id, ...doc.data() })
      })
    }

    getPost()
    setLoading(false)
  }, [post])

  const handleEditMode = () => {
    setIsEditing(!isEditing)
  }

  if (loading) return <AllPostsSkeleton />

  if (!thePost) return null

  const {
    author,
    author_id,
    post_ref,
    content: { title, body },
    date: { seconds },
    tags,
  } = thePost

  const { date, time } = formatDate(seconds)

  return (
    <>
      {isEditing ? (
        <EditPost
          initialState={{ ...thePost }}
          editMode={handleEditMode}
          editing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <section className="px-6 flex flex-col">
          <div className="container mx-auto max-w-2xl text-center">
            <header className="mb-8 relative">
              {currentUser !== null && author_id === currentUser.uid && (
                <span
                  onClick={handleEditMode}
                  className="text-main-700 cursor-pointer absolute right-0 top-0"
                >
                  Edit Post
                </span>
              )}
              <PageTitle mb={8}>{title}</PageTitle>
              <div className="tags">
                <Tags data={tags} />
              </div>
            </header>
          </div>
          <div className="container mx-auto max-w-2xl">
            <div className="bg-white rounded-xl p-8 text-gray-700 break-words text-md leading-6">
              {body}
            </div>
            <footer className="text-center py-8 text-xs text-gray-600">
              Created by{" "}
              <Link
                to={`/user/${author}`}
                className="text-main-700 hover:underline"
              >
                {author}
              </Link>{" "}
              on {date} at {time}
            </footer>
          </div>
        </section>
      )}
      <Comments post_id={post_ref} post_author={author} />
    </>
  )
}

export default Post
