import { Link } from "react-router-dom"
import SiteTitle from "components/SiteTitle"

const LandingForm = ({ children, siteTitle, title, page }) => {
  const SignInInfo = () => {
    if (page !== "sign-in") return null
    return (
      <span className="my-4 block text-gray-700">
        Don't have an account?{" "}
        <Link to="/account/sign-up" className="hover:underline text-purple-700">
          Register
        </Link>
      </span>
    )
  }

  const SignUpInfo = () => {
    if (page !== "sign-up") return null

    return (
      <span className="my-4 block text-gray-700">
        <Link to="/account/sign-in" className="hover:underline text-purple-700">
          Already have an account?
        </Link>
      </span>
    )
  }

  return (
    <div className="py-12 -mt-16 px-6 md:px-12 shadow bg-white rounded-lg w-full sm:w-2/3 md:w-1/2 lg:w-2/5 h-auto">
      <SiteTitle title={siteTitle} />
      <h1 className="text-4xl text-purple-700">{title}</h1>
      <SignInInfo />
      <SignUpInfo />
      {children}
    </div>
  )
}

export default LandingForm
