import useAuth from "hooks/useAuth"
import Posts from "components/Posts"
import SiteTitle from "components/SiteTitle"
import Section from "components/Layout/Section"
import PageTitle from "components/Layout/PageTitle"

const Dashboard = () => {
  const { displayName, logout } = useAuth()

  return (
    <Section>
      <SiteTitle title="Dashboard | Block." />
      <div className="container mx-auto max-w-2xl">
        <PageTitle>Welcome back {displayName}</PageTitle>
        <button className="mb-10 hidden" onClick={logout}>
          Logout
        </button>
        <Posts />
      </div>
    </Section>
  )
}

export default Dashboard
