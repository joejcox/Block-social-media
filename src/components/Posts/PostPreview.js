import useAuth from "hooks/useAuth"
import { useEffect } from "react"
import { TrashIcon } from "@heroicons/react/outline"
import PostPreviewFooter from "./PostPreviewFooter"
import PostPreviewAvatar from "./PostPreviewAvatar"
import PostPreviewContent from "./PostPreviewContent"
import Modal from "components/Modal"
import useModal from "hooks/useModal"
import ConfirmDeleteForm from "components/ConfirmDeleteForm"
import useFirestore from "hooks/useFirestore"

const PostPreview = ({ avatar, postData, postId, userCtrl, showAvatar }) => {
  const { deletePost } = useFirestore()
  const { currentUser } = useAuth()
  const { content, author, author_id, slug, comment_count } = postData
  const { closeModal, openModal, modalIsOpen } = useModal()
  const confirmationString = `${author}/${slug}`

  useEffect(() => {
    const checkKeyPress = (e) => {
      if (e.keyCode === 27) {
        closeModal()
      }
    }

    document.addEventListener("keydown", checkKeyPress)

    return () => {
      document.removeEventListener("keydown", checkKeyPress)
    }
  })

  const handleDelete = () => {
    deletePost(postId)
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
              <Modal
                title="Delete Post"
                isOpen={modalIsOpen}
                overlayClick={closeModal}
              >
                <p className="text-sm">
                  Please type{" "}
                  <strong>{confirmationString.toLowerCase()}</strong> below to
                  remove the post.
                </p>
                <ConfirmDeleteForm
                  deletePost={() => handleDelete()}
                  close={() => closeModal()}
                  string={confirmationString}
                />
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
