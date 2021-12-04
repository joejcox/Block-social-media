import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "hooks/useAuth"

const Home = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) return navigate("/dashboard")
  }, [navigate, currentUser])

  return (
    <section className="hero is-medium is-info-dark">
      <div className="hero-body">
        <h1 className="title is-2 has-text-white">Homepage</h1>
      </div>
    </section>
  )
}

export default Home
