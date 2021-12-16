import { useEffect } from "react"
import { Link } from "react-router-dom"
import useAuth from "hooks/useAuth"
import UserNav from "./UserNav"
import { GrAddCircle } from "react-icons/gr"
import ReactTooltip from "react-tooltip"

const Navbar = () => {
  const { currentUser } = useAuth()

  useEffect(() => ReactTooltip.rebuild())

  if (currentUser) {
    return (
      <div className="nav-right flex items-stretch">
        <Link
          className="hidden lg:flex text-base items-center px-4 font-sans hover:bg-gray-100"
          to="/dashboard"
        >
          Home
        </Link>
        <Link
          className="flex items-center px-4 font-sans hover:bg-gray-100 create-post-link"
          to="/create-post"
          data-tip="Create Post"
        >
          <GrAddCircle className="stroke-1 group-hover:stroke-white" />
        </Link>
        <UserNav />
      </div>
    )
  }

  return (
    <nav className="flex items-center pr-4 lg:pr-0" role="navigation">
      <Link
        className="flex rounded-full text-base py-2 px-6 items-center font-sans bg-gray-100 text-main-700 hover:bg-main-400 hover:text-white"
        to="/account/sign-in"
      >
        Sign In
      </Link>
      <Link
        className="rounded-full flex text-base py-2 px-6 items-center ml-2 font-sans hover:bg-main-800 bg-main-700 text-white"
        to="/account/sign-up"
      >
        Sign Up
      </Link>
    </nav>
  )
}

export default Navbar
