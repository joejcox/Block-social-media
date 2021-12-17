import { Link } from "react-router-dom"
import defaultAvatar from "assets/images/avatar_placeholder.png"

const PostPreviewAvatar = ({ author, alt, avatar, showAvatar }) => {
  if (!showAvatar) return null
  return (
    <figure className="media-left absolute -top-6 left-10">
      <p className="w-12 h-12 overflow-hidden rounded">
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
