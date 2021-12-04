import { Link } from "react-router-dom"
import Navbar from "./Navbar"

const Header = () => (
  <header className="site_header">
    <div className="navbar">
      <div className="navbar-start">
        <Link to="/" className="logo">
          BLOCK.
        </Link>
      </div>
      <Navbar />
    </div>
  </header>
)

export default Header
