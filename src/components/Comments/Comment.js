import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import defaultAvatar from "assets/images/avatar_placeholder.png"
import useFirestore from "hooks/useFirestore"

const Comment = ({ comment, username }) => {
  const { getAvatar } = useFirestore()
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    getAvatar(comment.author).then((res) => setAvatar(res))
  }, [comment, getAvatar])

  if (!comment) return null

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64 comment-avatar">
          <img src={avatar || defaultAvatar} alt={username} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <Link className="capitalise" to={`/user/${comment.author}`}>
              {comment.author}
            </Link>
            <br />
            <span className="comment-tag">
              <Link to={`/user/${comment.reply_to}`}>@{comment.reply_to}</Link>
            </span>
            {comment.content}
          </p>
        </div>
      </div>
    </article>
  )
}

export default Comment
