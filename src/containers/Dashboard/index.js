import useAuth from "hooks/useAuth"
import Posts from "components/Posts"
import SiteTitle from "components/SiteTitle"

const Dashboard = () => {
  const { displayName } = useAuth()

  return (
    <section className="px-6">
      <SiteTitle title="Dashboard | Block." />
      <div className="container">
        <div className="page-title text-center py-8 border-b mb-20">
          <h1 className="text-3xl text-purple-700 py-2 px-6 inline-block">
            Welcome back {displayName}
          </h1>
        </div>{" "}
        <Posts />
      </div>
    </section>
  )
}

export default Dashboard
