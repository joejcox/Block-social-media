// import { useState } from "react"
// import useModal from "hooks/useModal"
import useFirestore from "hooks/useFirestore"
import { useForm, useFormState } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import SiteTitle from "components/SiteTitle"
import Section from "components/Layout/Section"
import PageTitle from "components/Layout/PageTitle"

const CreatePost = () => {
  const { createPost, userData } = useFirestore()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    createPost(
      userData.username,
      userData.uid,
      data.body,
      "",
      data.title,
      uuidv4(),
      ["todo"]
    )
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
          <div className="form-field">
            <input
              type="text"
              className="rounded-lg px-4 py-2 w-full shadow border border-gray-100 text-gray-700"
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
          <div className="form-field my-6">
            <textarea
              className="rounded textarea shadow border border-gray-100 w-full p-8 text-gray-700"
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
              <span className="is-block has-text-danger is-size-7">
                {errors.body.message}
              </span>
            )}
          </div>
          <input
            type="submit"
            className="bg-purple-700 text-white text-sm py-3 rounded-full w-full lg:w-auto lg:px-8 cursor-pointer hover:bg-purple-800"
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
