import Header from "components/Layout/Header"
import AuthContextProvider from "context/AuthContext"
import UserContextProvider from "context/UserContext"
import ReactTooltip from "react-tooltip"
import { HelmetProvider } from "react-helmet-async"

const Layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <HelmetProvider>
          <div
            className="mb-10 min-h-screen font-secondary bg-main-50 h-full"
            style={{ paddingTop: "70px" }}
          >
            <Header />
            <main className="main" role="main">
              {children}
            </main>

            <ReactTooltip effect="solid" />
          </div>
        </HelmetProvider>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default Layout
