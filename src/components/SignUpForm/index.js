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
      {error && <p className="form-top-error has-text-danger">{error}</p>}
      <div className="field">
        <input
          type="text"
          className="input formInput"
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
          <span className="is-block has-text-danger is-size-7">
            {errors.username.message}
          </span>
        )}
      </div>
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
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="field">
        <input
          type="password"
          className="input formInput"
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
          <span className="is-block has-text-danger is-size-7">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="field">
        <input
          type="password"
          name="passwordDuplicate"
          className="input formInput"
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
          <span className="is-block has-text-danger is-size-7">
            {errors.passwordDuplicate.message}
          </span>
        )}
      </div>
      <input
        type="submit"
        className="button is-info"
        value={isSubmitting ? "Signing up..." : "Sign up"}
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </form>
  )
}

export default SignUpForm
