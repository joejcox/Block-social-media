import { Link } from "react-router-dom"

const PostPreviewFooter = ({ postData }) => {
  const { author, slug, comment_count } = postData

  return (
    <footer className="post-footer px-6 py-4 flex justify-between bg-white text-gray-400 border-t border-gray-100">
      <div className="footer-left">
        Posted by{" "}
        <Link
          to={`/user/${author}`}
          className="text-main-500 font-primary hover:underline"
        >
          {author}
        </Link>
      </div>
      <div className="footer-right">
        <Link
          to={`/user/${author}/posts/${slug}`}
          className="text-main-500 font-primary hover:underline"
        >
          Comments ({comment_count})
        </Link>
      </div>
    </footer>
  )
}

export default PostPreviewFooter
