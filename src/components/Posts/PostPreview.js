import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"
import { TrashIcon } from "@heroicons/react/outline"
import PostPreviewFooter from "./PostPreviewFooter"
import PostPreviewAvatar from "./PostPreviewAvatar"
import PostPreviewContent from "./PostPreviewContent"

const PostPreview = ({ avatar, postData, postId, userCtrl, showAvatar }) => {
  const { currentUser } = useAuth()
  const { deletePost } = useFirestore()
  const { content, author, author_id, slug, comment_count } = postData

  return (
    <article className="bg-orange-50 w-full p-0 mb-20 border-b border-gray-200">
      <div className="relative">
        {currentUser && currentUser.uid === author_id
          ? userCtrl && (
              <div className="absolute right-4 top-4">
                <button
                  className="text-gray-800"
                  onClick={() => deletePost(postId)}
                >
                  <TrashIcon className="text-gray-500 w-5 h-5" />
                </button>
              </div>
            )
          : null}
        <PostPreviewAvatar
          author={author}
          alt={content.title}
          avatar={avatar}
          showAvatar={showAvatar}
        />

        <div className="media-content mt-1 pt-12 rounded-lg rounded-tl-none overflow-hidden bg-gray-100 flex-1">
          <PostPreviewContent postData={{ ...postData }} />

          <PostPreviewFooter
            postData={{
              author: author,
              slug: slug,
              comment_count: comment_count,
            }}
          />
        </div>
      </div>
    </article>
  )
}

export default PostPreview
