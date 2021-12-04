import { Link } from "react-router-dom"
import useAuth from "hooks/useAuth"
import UserNav from "./UserNav"
import { GrAddCircle } from "react-icons/gr"

const Navbar = () => {
  const { currentUser } = useAuth()

  if (currentUser) {
    return (
      <nav className="navbar-end" role="navigation">
        <Link className="navbar-item dashboard-link" to="/dashboard">
          Home
        </Link>
        <Link className="navbar-item create-post-link" to="/create-post">
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
