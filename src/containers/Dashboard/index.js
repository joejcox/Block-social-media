import useAuth from "hooks/useAuth"
import Posts from "components/Posts"

const Dashboard = () => {
  const { displayName } = useAuth()

  return (
    <section className="section posts">
      <div className="container">
        <h1 className="title is-1">Welcome back {displayName}</h1>
        <Posts />
      </div>
    </section>
  )
}

export default Dashboard
