import Header from "./Header"
import AuthContextProvider from "context/AuthContext"
import UserContextProvider from "context/UserContext"
import ReactTooltip from "react-tooltip"

const Layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <div className="wrapper">
          <Header />
          <main className="main" role="main">
            {children}
          </main>

          <ReactTooltip effect="solid" />
        </div>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default Layout
