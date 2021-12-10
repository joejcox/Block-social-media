import { Link } from "react-router-dom"
import Tags from "components/Tags"

const PostPreviewContent = ({ postData }) => {
  const { author, slug, tags, content } = postData

  return (
    <div className="content px-6">
      <header className="post-header">
        <h2 className="text-2xl mb-3">
          <Link
            className="text-purple-700 hover:text-purple-800 hover:underline"
            to={`/user/${author}/posts/${slug}`}
          >
            {content.title}
          </Link>
        </h2>
        <div className="tags mb-6">
          <Tags data={tags} />
        </div>
      </header>
      <p className="post-excerpt pb-6 text-sm">{content.excerpt}</p>
    </div>
  )
}

export default PostPreviewContent
