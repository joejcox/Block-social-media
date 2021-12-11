import { useEffect } from "react"
import SignUpForm from "components/SignUpForm"
import useAuth from "hooks/useAuth"
import { useNavigate } from "react-router-dom"
import LandingForm from "components/LandingForm"

const SignUp = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard")
    }
  })

  return (
    <LandingForm siteTitle="Sign Up | Block." title="Sign Up" page="sign-up">
      <SignUpForm />
    </LandingForm>
  )
}

export default SignUp
