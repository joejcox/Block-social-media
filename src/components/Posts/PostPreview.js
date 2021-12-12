import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"
import { TrashIcon } from "@heroicons/react/outline"
import PostPreviewFooter from "./PostPreviewFooter"
import PostPreviewAvatar from "./PostPreviewAvatar"
import PostPreviewContent from "./PostPreviewContent"
import Modal from "components/Modal"
import useModal from "hooks/useModal"
import Button from "components/Layout/Button"

const PostPreview = ({ avatar, postData, postId, userCtrl, showAvatar }) => {
  const { currentUser } = useAuth()
  const { deletePost } = useFirestore()
  const { content, author, author_id, slug, comment_count } = postData
  const { closeModal, openModal, modalIsOpen } = useModal()

  const handleDelete = async () => {
    await deletePost(postId)
    closeModal()
  }

  return (
    <article
      className={`w-full p-0 relative ${
        showAvatar ? "mb-20" : "mb-6"
      } border-b border-gray-200`}
    >
      {currentUser && currentUser.uid === author_id
        ? userCtrl && (
            <>
              <Modal title="Delete Post" isOpen={modalIsOpen}>
                <p>Are you sure you want to delete this post?</p>
                <div className="flex justify-end mt-6">
                  <Button click={() => closeModal()} outline>
                    Cancel
                  </Button>
                  <Button click={() => handleDelete()}>Delete</Button>
                </div>
              </Modal>
              <div className="absolute right-4 top-4">
                <button className="text-gray-800" onClick={() => openModal()}>
                  <TrashIcon className="text-gray-500 w-5 h-5" />
                </button>
              </div>
            </>
          )
        : null}
      <PostPreviewAvatar
        author={author}
        alt={content.title}
        avatar={avatar}
        showAvatar={showAvatar}
      />

      <div className="mt-1 pt-12 rounded-lg overflow-hidden bg-gray-100 flex-1">
        <PostPreviewContent postData={{ ...postData }} />

        <PostPreviewFooter
          postData={{
            author: author,
            slug: slug,
            comment_count: comment_count,
          }}
        />
      </div>
    </article>
  )
}

export default PostPreview
