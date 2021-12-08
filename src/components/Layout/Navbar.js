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
      <nav className="navbar-end" role="navigation">
        <Link className="navbar-item dashboard-link" to="/dashboard">
          Home
        </Link>
        <Link
          className="navbar-item create-post-link"
          to="/create-post"
          data-tip="Create Post"
        >
          <GrAddCircle />
        </Link>
        <UserNav />
      </nav>
    )
  }

  return (
    <nav className="navbar-end" role="navigation">
      <Link className="navbar-item" to="/account/sign-in">
        Sign In
      </Link>
      <Link className="navbar-item" to="/account/sign-up">
        Sign Up
      </Link>
    </nav>
  )
}

export default Navbar
