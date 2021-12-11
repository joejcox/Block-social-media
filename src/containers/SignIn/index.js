import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SignInForm from "components/SignInForm"
import useAuth from "hooks/useAuth"
import LandingForm from "components/LandingForm"

const SignIn = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard")
    }
  }, [navigate, currentUser])

  return (
    <LandingForm siteTitle="Sign In | Block." title="Sign In" page="sign-in">
      <SignInForm />
    </LandingForm>
  )
}

export default SignIn
