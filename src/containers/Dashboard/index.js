import useAuth from "hooks/useAuth"
import Posts from "components/Posts"
import PageTitle from "components/Layout/PageTitle"

const Dashboard = () => {
  const { displayName } = useAuth()

  return (
    <>
      <PageTitle>Welcome back {displayName}</PageTitle>
      <Posts />
    </>
  )
}

export default Dashboard
