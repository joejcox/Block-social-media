import useAuth from "hooks/useAuth"
import Posts from "components/Posts"
import SiteTitle from "components/SiteTitle"
import Section from "components/Layout/Section"
import PageTitle from "components/Layout/PageTitle"

const Dashboard = () => {
  const { displayName } = useAuth()

  return (
    <Section>
      <SiteTitle title="Dashboard | Block." />
      <div className="container mx-auto max-w-2xl">
        <PageTitle>Welcome back {displayName}</PageTitle>
        <Posts />
      </div>
    </Section>
  )
}

export default Dashboard
