import { useParams } from "react-router-dom"
import useFirestore from "hooks/useFirestore"
import { useForm, useFormState } from "react-hook-form"
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore"
import { db } from "lib/firebase"

const EditUsername = () => {
  const { user } = useParams()
  const { userData } = useFirestore()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const usersRef = doc(db, "users", userData.userId)
      const userSnap = await getDoc(usersRef)

      const postsRef = collection(db, "posts")

      const postsQuery = query(
        postsRef,
        where("author_id", "==", userData.userId)
      )
      const postsSnap = await getDocs(postsQuery)

      //   const commentsRef = await getDocs(
      //     query(
      //       collection(db, "comments"),
      //       where("author_id", "==", userData.userId)
      //     )
      //   )

      if (userSnap.exists()) {
        updateDoc(usersRef, {
          username: data.username,
        })
      }

      postsSnap.forEach((post) =>
        updateDoc(post, {
          author: data.username,
        })
      )

      //   postsRef.forEach(async (post) => {
      //     const ref = doc(db, "posts", post.id)
      //     await updateDoc(ref, {
      //       author: data.username,
      //     })
      //   })

      //   commentsRef.forEach((comment) => {
      //     updateDoc(comment, {
      //       author: data.username,
      //     })
      //   })
    } catch (error) {
      console.log(error)
    }
  }

  const { isSubmitting } = useFormState({ control })

  if (!userData || userData.username.toLowerCase() !== user.toLowerCase())
    return null

  return (
    <form
      className="signupForm"
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      <div className="field">
        <input
          type="text"
          className="block placeholder-main-700 text-main-700 mb-2 bg-main-100 w-full p-4 rounded-lg focus:bg-main-200 outline-white"
          placeholder="Username"
          {...register("username", {
            required: {
              value: true,
              message: "Field can not be empty",
            },
            minLength: {
              value: 3,
              message: "Username must be 3 or more characters",
            },
            maxLength: {
              value: 30,
              message: "Username can not be longer than 30 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message:
                "Username must only contain letters and numbers (no spaces)",
            },
          })}
        />
        {errors.username && (
          <span className="block text-red-500 text-xs pl-2 my-2">
            {errors.username.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Edit"}
      </button>
    </form>
  )
}

export default EditUsername
