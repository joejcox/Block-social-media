import { useState } from "react"
import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"
import Button from "components/Layout/Button"
import { useForm, useFormState } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import MediaAvatar from "components/MediaAvatar"

const CommentForm = ({ post_id, post_author, comment_count }) => {
  const { currentUser } = useAuth()
  const { addComment, userData } = useFirestore()
  const [charCount, setCharCount] = useState(0)

  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const commentData = {
      author: userData.username,
      content: data.content,
      id: uuidv4(),
      parent_id: post_id,
      reply_to: post_author,
    }
    await addComment(commentData, comment_count)
      .then(() => {
        setCharCount(0)
        resetField("content")
      })
      .catch((error) => console.log(error))
  }

  const { isSubmitting } = useFormState({ control })

  if (!currentUser) return null

  return (
    <section className="flex flex-col py-20 border-b border-t border-gray-200 lg:border-0">
      <div className="container rounded-xl lg:bg-gray-50 lg:p-12 mx-auto max-w-6xl flex flex-col">
        <h3 className="text-2xl inline-block mb-4 md:mb-10 pb-2 mx-auto px-2 text-main-700 font-primary">
          Add Comment
        </h3>
        <article className="flex">
          <MediaAvatar author={post_author} avatar={userData.avatar} />

          <form
            className="flex-1"
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
          >
            <div className="form-field w-full relative">
              <textarea
                className="border border-gray-100 rounded-xl shadow p-2 px-4 resize-none h-20 lg:h-32 w-full text-sm"
                type="text"
                placeholder="Your comment..."
                {...register("content", {
                  required: {
                    value: true,
                    message: "Comment can not be blank",
                  },
                  maxLength: {
                    value: 2000,
                    message: "Comment must be less than 2000 characters",
                  },
                })}
                onChange={(e) => {
                  setCharCount(e.target.value.length)
                }}
              />
              <div className="flex justify-end mt-2 pr-4">
                <span
                  className={`text-xs ${
                    charCount > 1980 ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {charCount}/2000
                </span>
              </div>
              {errors.content && (
                <span className="is-block has-text-danger is-size-7">
                  {errors.content.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              click={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Comment..." : "Add Comment"}
            </Button>
          </form>
        </article>
      </div>
    </section>
  )
}

export default CommentForm
