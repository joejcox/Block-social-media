import { Link } from "react-router-dom"
import defaultAvatar from "assets/images/avatar_placeholder.png"

const PostPreviewAvatar = ({ author, alt, avatar, showAvatar }) => {
  if (!showAvatar) return null
  return (
    <figure className="media-left absolute -top-7 left-5">
      <p className="w-14 h-14 overflow-hidden rounded-full shadow-lg">
        <Link to={`/user/${author}`}>
          <img
            className="h-full w-full object-cover"
            src={avatar || defaultAvatar}
            alt={alt}
          />
        </Link>
      </p>
    </figure>
  )
}

export default PostPreviewAvatar
