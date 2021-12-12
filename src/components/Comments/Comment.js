import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useFirestore from "hooks/useFirestore"
import utilities from "hooks/utilities"
import MediaAvatar from "components/MediaAvatar"

const Comment = ({ comment }) => {
  const { getAvatar } = useFirestore()
  const [avatar, setAvatar] = useState(null)
  const { formatDate } = utilities()

  useEffect(() => {
    getAvatar(comment.author).then((res) => setAvatar(res))
  }, [comment, getAvatar])

  if (!comment) return null

  const { date, time } = formatDate(comment.date.seconds)

  return (
    <article className="flex bg-purple-100 mb-4 py-6 px-4 rounded-2xl">
      <MediaAvatar author={comment.author} avatar={avatar} />
      <div className="flex-1">
        <div className="content">
          <h4 className="text-md">
            <Link
              className="capitalise text-purple-700"
              to={`/user/${comment.author}`}
            >
              {comment.author}
            </Link>
          </h4>
          <p className="my-4">{comment.content}</p>
        </div>
        <footer className="mt-6 text-xs">
          <span className="is-size-7">
            Posted on {date} at {time}
          </span>
        </footer>
      </div>
    </article>
  )
}

export default Comment
