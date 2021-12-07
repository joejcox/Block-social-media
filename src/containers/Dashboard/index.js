import useAuth from "hooks/useAuth"
import Posts from "components/Posts"
import SiteTitle from "components/SiteTitle"

const Dashboard = () => {
  const { displayName } = useAuth()

  return (
    <section className="section posts">
      <SiteTitle title="Dashboard | Block." />
      <div className="container">
        <h1 className="title is-1">Welcome back {displayName}</h1>
        <Posts />
      </div>
    </section>
  )
}

export default Dashboard
