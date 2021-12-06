import { useState } from "react"
import { useForm, useFormState } from "react-hook-form"
import useAuth from "hooks/useAuth"
import { Link } from "react-router-dom"

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
    <form
      className="signupForm"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      {firebaseError && (
        <p className="form-top-error has-text-danger">{firebaseError}</p>
      )}

      <div className="field">
        <input
          type="text"
          className="input formInput"
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
          <span className="is-block has-text-danger is-size-7">
            {errors.email?.message}
          </span>
        )}
      </div>
      <div className="field">
        <input
          type="password"
          className="input formInput"
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
          <span className="is-block has-text-danger is-size-7">
            {errors.password?.message}
          </span>
        )}
      </div>
      <Link to="/account/reset-password">Forgotten password?</Link>
      <input
        type="submit"
        className="button is-info"
        disabled={isSubmitting}
        value={isSubmitting ? "Signing In..." : "Sign In"}
      />
    </form>
  )
}

export default SignInForm
