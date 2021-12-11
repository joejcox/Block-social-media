import { useForm, useFormState } from "react-hook-form"
import useAuth from "hooks/useAuth"

const SignUpForm = () => {
  const { signUp, error } = useAuth()
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    await signUp(data.email, data.password, data.username)
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  const { isSubmitting } = useFormState({ control })

  return (
    <form
      className="signupForm"
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      {error && <p className="my-4 text-red-500 text-sm">{error}</p>}
      <div className="field">
        <input
          type="text"
          className="block placeholder-purple-700 text-purple-700 mb-2 bg-purple-100 w-full p-4 rounded-lg focus:bg-purple-200 outline-white"
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
      <div className="field">
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
          name="password"
          placeholder="Password"
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="block text-red-500 text-xs pl-2 my-2">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="field">
        <input
          type="password"
          name="passwordDuplicate"
          className="block placeholder-purple-700 text-purple-700 mb-2 bg-purple-100 w-full p-4 rounded-lg focus:bg-purple-200 outline-white"
          placeholder="Repeat password"
          {...register("passwordDuplicate", {
            required: "You must confirm your password",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
        />
        {errors.passwordDuplicate && (
          <span className="block text-red-500 text-xs pl-2 my-2">
            {errors.passwordDuplicate.message}
          </span>
        )}
      </div>
      <input
        type="submit"
        className="bg-purple-700 mt-4 text-white text-sm py-3 rounded-full w-full md:w-auto md:px-8 cursor-pointer hover:bg-purple-800"
        value={isSubmitting ? "Signing up..." : "Sign up"}
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </form>
  )
}

export default SignUpForm
