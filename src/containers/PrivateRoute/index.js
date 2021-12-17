import { Navigate, Outlet } from "react-router-dom"
import useAuth from "hooks/useAuth"
import ThreeColLayout from "components/Layout/ThreeColLayout"

const PrivateRoute = () => {
  const { currentUser } = useAuth()

  if (!currentUser) return <Navigate to="/account/sign-in" />
  return (
    <ThreeColLayout siteTitle="Settings">
      <Outlet />
    </ThreeColLayout>
  )
}

export default PrivateRoute
