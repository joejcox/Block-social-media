import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import defaultAvatar from "assets/images/avatar_placeholder.png"
import useFirestore from "hooks/useFirestore"
import utilities from "hooks/utilities"

const Comment = ({ comment, username }) => {
  const { getAvatar } = useFirestore()
  const [avatar, setAvatar] = useState(null)
  const { formatDate } = utilities()

  useEffect(() => {
    getAvatar(comment.author).then((res) => setAvatar(res))
  }, [comment, getAvatar])

  if (!comment) return null

  const { date, time } = formatDate(comment.date.seconds)

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64 comment-avatar">
          <img src={avatar || defaultAvatar} alt={username} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <Link className="capitalise" to={`/user/${comment.author}`}>
            {comment.author}
          </Link>
          <p className=" my-4">
            <span className="comment-tag">
              <Link to={`/user/${comment.reply_to}`}>@{comment.reply_to}</Link>
            </span>
            {comment.content}
          </p>
        </div>
        <footer className="mt-4">
          <span className="is-size-7">
            Posted on {date} at {time}
          </span>
        </footer>
      </div>
    </article>
  )
}

export default Comment
