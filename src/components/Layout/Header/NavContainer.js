import { Link } from "react-router-dom"
import mobileLogo from "assets/images/block-icon.png"
import useAuth from "hooks/useAuth"

const NavContainer = ({ children }) => {
  const { currentUser } = useAuth()

  return (
    <nav
      className="nav flex justify-between is-align-items-center"
      role="navigation"
    >
      <div className="nav-left flex is-align-items-stretch font-primary">
        <Link
          to={currentUser ? "/dashboard" : "/"}
          className="logo pl-3 pr-2.5 py-4 text-white hover:text-white font-bold text-2xl bg-main-700 hover:bg-main-800 leading-10"
        >
          <span className="md:hidden">
            <img src={mobileLogo} alt="Block mobile logo" className="w-10" />
          </span>
          <span className="hidden md:block">Block.</span>
        </Link>
      </div>
      {children}
    </nav>
  )
}

export default NavContainer
