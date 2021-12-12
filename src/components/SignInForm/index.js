import { useState } from "react"
import { useForm, useFormState } from "react-hook-form"
import useAuth from "hooks/useAuth"
import { Link } from "react-router-dom"
import Button from "components/Layout/Button"

const SignInForm = () => {
  const [firebaseError, setFirebaseError] = useState(null)
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors },
  } = useForm()

  const { isSubmitting } = useFormState({ control })

  const onSubmit = async (data) => {
    await signIn(data.email, data.password)
      .then((response) => console.log(response))
      .catch((error) => {
        let message = null

        if (error.code === "auth/too-many-requests") {
          message =
            "Too many unsuccessful attempts, please reset password or try again later"
        }

        if (error.code === "auth/wrong-password") {
          message = "Incorrect password, please try again"
        }

        if (error.code === "auth/user-not-found") {
          message = "User does not exist, please try again"
        }

        resetField("password")
        setFirebaseError(message)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {firebaseError && (
        <p className="my-4 text-red-500 text-sm">{firebaseError}</p>
      )}

      <div className="form-field">
        <input
          type="email"
          className="block placeholder-purple-700 text-purple-700 mb-2 bg-purple-100 w-full p-4 rounded-lg focus:bg-purple-200 outline-white"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Field can not be empty",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <span className="block text-red-500 text-xs pl-2 my-2">
            {errors.email?.message}
          </span>
        )}
      </div>
      <div className="field">
        <input
          type="password"
          className="block placeholder-purple-700 text-purple-700 mb-2 bg-purple-100 w-full p-4 rounded-lg focus:bg-purple-200 outline-white"
          placeholder="Password"
          {...register("password", {
            required: "Field can not be empty",
            minLength: {
              value: 6,
              message: "Must be longer than 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="block text-red-500 text-xs pl-2 my-2">
            {errors.password?.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        click={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>

      <div className="w-full flex justify-end">
        <Link
          to="/account/reset-password"
          className="text-purple-700 mt-6 inline-block hover:underline"
        >
          Forgotten password?
        </Link>
      </div>
    </form>
  )
}

export default SignInForm
