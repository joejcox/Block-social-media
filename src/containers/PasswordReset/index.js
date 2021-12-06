import { useState } from "react"
import useAuth from "hooks/useAuth"
import { Link } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"

const PasswordReset = () => {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")

  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  return (
    <section className="section password-reset">
      <div className="container">
        <div className="password-reset-form">
          <Link to="/account/sign-in" className="is-size-6">
            <AiOutlineArrowLeft /> Back to sign in
          </Link>
          <h1 className="title is-2">Reset Password</h1>
          <span className="has-text-info is-size-7 is-inline-block">
            A password reset link will be sent to your email if an email exists
          </span>
          <input
            type="text"
            className="input rounded"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
          <button
            type="button"
            className="button is-link has-text-white"
            onClick={() => resetPassword(email)}
          >
            Reset Password
          </button>
        </div>
      </div>
    </section>
  )
}

export default PasswordReset
