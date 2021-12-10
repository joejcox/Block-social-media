import { Link } from "react-router-dom"
import Navbar from "./Navbar"

const Header = () => (
  //site_header px-6
  <header className="px-16 shadow">
    <nav className="nav flex">
      <div className="nav-left flex is-align-items-stretch">
        <Link
          to="/"
          className="logo pl-3 pr-2.5 py-4 text-white hover:text-white font-bold text-2xl bg-purple-700 hover:bg-purple-800 leading-10"
        >
          BLOCK.
        </Link>
      </div>
      <Navbar />
    </nav>
  </header>
)

export default Header
