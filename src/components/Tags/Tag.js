import { Link } from "react-router-dom"

const Tag = ({ tag }) => {
  return (
    <Link
      className="bg-gray-50 mb-1 text-sm inline-block shadow-sm hover:shadow text-purple-500 rounded-lg p-1.5 py-0.5 mr-1 border border-gray-200 hover:bg-purple-800 hover:text-white hover:border-purple-900"
      to={`/tag/${tag}`}
    >
      {tag}
    </Link>
  )
}

export default Tag
