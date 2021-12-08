import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import SignInForm from "components/SignInForm"
import useAuth from "hooks/useAuth"
import SiteTitle from "components/SiteTitle"

const SignIn = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard")
    }
  }, [navigate, currentUser])

  return (
    <div className="form">
      <SiteTitle title="Sign In | Block." />
      <h1 className="title is-1">Sign In</h1>
      <span className="form-helper">
        Don't have an account? <Link to="/account/sign-up">Register</Link>
      </span>
      <SignInForm />
    </div>
  )
}

export default SignIn
