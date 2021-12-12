import Button from "components/Layout/Button"
import { useForm, useFormState } from "react-hook-form"

const ConfirmDeleteForm = ({ string, deletePost, close }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { isSubmitting } = useFormState({ control })

  const onSubmit = async (data) => {
    console.log(data)
    await deletePost()
  }

  return (
    <>
      <form
        className="mt-4"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <input
          type="text"
          className="mt-2 block placeholder-purple-700 text-purple-700 mb-2 bg-purple-100 w-full p-4 rounded-lg focus:bg-purple-200 outline-white"
          {...register("confirm", {
            required: "Please copy the above text to confirm deletion",
            validate: {
              matches: (value) =>
                value === string.toLowerCase() ||
                "Please ensure what you type matches the given instruction",
            },
          })}
        />
        {errors.confirm && (
          <span className="block text-red-500 text-xs pl-2 my-2">
            {errors.confirm.message}
          </span>
        )}
      </form>
      <div className="flex justify-end mt-6">
        <Button type="button" click={() => close()} outline>
          Cancel
        </Button>
        <Button
          type="submit"
          click={handleSubmit(onSubmit)}
          submitting={isSubmitting}
        >
          {isSubmitting ? "Deleting post..." : "Delete Post"}
        </Button>
      </div>
    </>
  )
}

export default ConfirmDeleteForm
