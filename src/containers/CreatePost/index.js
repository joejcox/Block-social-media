import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useFirestore from "hooks/useFirestore"
import { useForm, useFormState } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import SiteTitle from "components/SiteTitle"
import Section from "components/Layout/Section"
import PageTitle from "components/Layout/PageTitle"

const CreatePost = () => {
  const navigate = useNavigate()
  const { createPost, userData } = useFirestore()
  const [createPostError, setCreatePostError] = useState(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (!userData) return setCreatePostError("No active user")

    const response = await createPost(
      data.body,
      "",
      data.title,
      uuidv4(),
      ["todo"],
      userData.uid
    )

    if (response.error) {
      return setCreatePostError(response.error)
    }

    navigate(`/user/${userData.username}/posts/${response}`)
  }

  const { isSubmitting } = useFormState({ control })

  return (
    <Section>
      <SiteTitle title="Create Post | Block." />
      <div className="container mx-auto max-w-xl">
        <PageTitle mb={10}>Create Post</PageTitle>
        <form
          className="max-w-2xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
          autoComplete="off"
        >
          {createPostError && (
            <span className="text-red-500 text-sm block pl-2 mb-4">
              {createPostError}
            </span>
          )}
          <div className="form-field">
            <input
              type="text"
              className="rounded-lg px-4 py-2 w-full shadow border border-gray-100 text-gray-700 outline-white"
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
              <span className="text-red-500 block text-xs pt-2">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="form-field my-6">
            <textarea
              className="rounded textarea shadow border border-gray-100 w-full p-8 text-gray-700 outline-white pt-2"
              placeholder="Once upon a time..."
              rows="10"
              {...register("body", {
                required: {
                  value: true,
                  message: "Post body must contain text",
                },
                minLength: {
                  value: 5,
                  message: "Post must contain more than 5 characters",
                },
              })}
            ></textarea>
            {errors.body && (
              <span className="text-red-500 block text-xs">
                {errors.body.message}
              </span>
            )}
          </div>
          <input
            type="submit"
            className="bg-main-700 text-white text-sm py-3 rounded-full w-full lg:w-auto lg:px-8 cursor-pointer hover:bg-main-800"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            value={isSubmitting ? "Creating Post..." : "Create Post"}
          />
        </form>
      </div>
    </Section>
  )
}

export default CreatePost
