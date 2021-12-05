// import { useState } from "react"
// import useModal from "hooks/useModal"
import useFirestore from "hooks/useFirestore"
import { useForm, useFormState } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"

// react hook form

const CreatePost = () => {
  const { createPost, username, uid } = useFirestore()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await createPost(
      username,
      uid,
      "This is the body text",
      "This is just an excerpt",
      "",
      data.title,
      uuidv4(),
      ["entertainment", "lifestyle", "inspiration", "poem"]
    )
  }

  const { isSubmitting } = useFormState({ control })

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-2">Create Post</h1>
        <form
          className="create-post-form"
          onSubmit={(e) => e.preventDefault()}
          autoComplete="off"
        >
          <div className="field">
            <input
              type="text"
              className="input formInput"
              placeholder="Post title"
              {...register("title", {
                required: {
                  value: true,
                  message: "Field can not be empty",
                },
                maxLength: {
                  value: 61,
                  message: "Title can not be longer than 61 characters",
                },
              })}
            />
            {errors.title && (
              <span className="is-block has-text-danger is-size-7">
                {errors.title.message}
              </span>
            )}
          </div>
          <input
            type="submit"
            className="button is-info"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            value={isSubmitting ? "Creating Post..." : "Create Post"}
          />
        </form>
      </div>
    </section>
  )
}

export default CreatePost

/*fb structure

{
    author, 
    author_id, 
    content: {
        body,
        excerpt,
        image,
        title
    },
    date,
    id,
    slug,
    tags: []
}

*/
