import { Link } from "react-router-dom"

const Tag = ({ tag }) => {
  return (
    <Link className="tag is-dark" to={`/tag/${tag}`}>
      {tag}
    </Link>
  )
}

export default Tag
