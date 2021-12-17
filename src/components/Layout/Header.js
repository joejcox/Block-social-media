import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import mobileLogo from "assets/images/block-icon.png"

const Header = () => (
  //site_header px-6
  <header
    className="px-0 lg:px-4 xl:px-16 3xl:px-32 shadow bg-white fixed top-0 left-0 right-0"
    style={{ zIndex: "999" }}
  >
    <nav
      className="nav flex justify-between is-align-items-center"
      role="navigation"
    >
      <div className="nav-left flex is-align-items-stretch font-primary">
        <Link
          to="/"
          className="logo pl-3 pr-2.5 py-4 text-white hover:text-white font-bold text-2xl bg-main-700 hover:bg-main-800 leading-10"
        >
          <span className="md:hidden">
            <img src={mobileLogo} alt="Block mobile logo" className="w-10" />
          </span>
          <span className="hidden md:block">Block.</span>
        </Link>
      </div>
      <Navbar />
    </nav>
  </header>
)

export default Header
