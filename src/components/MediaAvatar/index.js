import { Link } from "react-router-dom"
import defaultAvatar from "assets/images/avatar_placeholder.png"

const MediaAvatar = ({ avatar, author }) => (
  <figure className="bg-purple-700 mr-4 overflow-hidden h-14 w-14 rounded-full">
    <Link to={`/user/${author}`} className="block w-full h-full">
      <img
        className="h-full w-full object-cover"
        src={avatar || defaultAvatar}
        alt={author}
      />
    </Link>
  </figure>
)

export default MediaAvatar
