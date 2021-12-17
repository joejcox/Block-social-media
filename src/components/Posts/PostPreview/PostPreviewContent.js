import { Link } from "react-router-dom"
import Tags from "components/Tags"

const PostPreviewContent = ({ postData }) => {
  const { author, slug, tags, content } = postData
  const excerpt =
    content.body.length > 100
      ? content.body.substring(0, 100) + "..."
      : content.body

  return (
    <div className="content px-6">
      <header className="post-header">
        <h2 className="text-2xl mb-3 break-words font-primary">
          <Link
            className="text-main-700 hover:text-main-800 hover:underline"
            to={`/user/${author}/posts/${slug}`}
          >
            {content.title}
          </Link>
        </h2>
        <div className="tags mb-6">
          <Tags data={tags} />
        </div>
      </header>
      <p className="post-excerpt pb-6 break-words text-md leading-6">
        {excerpt}
      </p>
    </div>
  )
}

export default PostPreviewContent
