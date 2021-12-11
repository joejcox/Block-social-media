import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import mobileLogo from "assets/images/block-icon.png"

const Header = () => (
  //site_header px-6
  <header className="px-0 lg:px-4 xl:px-16 3xl:px-32 shadow">
    <nav
      className="nav flex justify-between is-align-items-center"
      role="navigation"
    >
      <div className="nav-left flex is-align-items-stretch">
        <Link
          to="/"
          className="logo pl-3 pr-2.5 py-4 text-white hover:text-white font-bold text-2xl bg-purple-700 hover:bg-purple-800 leading-10"
        >
          <span className="md:hidden">
            <img src={mobileLogo} alt="Block mobile logo" className="w-10" />
          </span>
          <span className="hidden md:block">BLOCK.</span>
        </Link>
      </div>
      <Navbar />
    </nav>
  </header>
)

export default Header
