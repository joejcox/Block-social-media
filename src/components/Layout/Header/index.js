import NavContainer from "components/Layout/Header/NavContainer"
import Navbar from "components/Layout/Header/Navbar"

const Header = () => {
  return (
    <header
      className="px-0 lg:px-4 xl:px-16 3xl:px-32 shadow bg-white fixed top-0 left-0 right-0"
      style={{ zIndex: "999" }}
    >
      <NavContainer>
        <Navbar />
      </NavContainer>
    </header>
  )
}

export default Header
