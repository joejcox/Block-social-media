import useAuth from "hooks/useAuth"
import Posts from "components/Posts"
import PageTitle from "components/Layout/PageTitle"
import ThreeColLayout from "components/Layout/ThreeColLayout"

const Dashboard = () => {
  const { displayName } = useAuth()

  return (
    <ThreeColLayout siteTitle="Dashboard">
      <PageTitle>Welcome back {displayName}</PageTitle>
      <Posts />
    </ThreeColLayout>
  )
}

export default Dashboard
