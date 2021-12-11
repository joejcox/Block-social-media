import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import useAuth from "hooks/useAuth"

const Home = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) return navigate("/dashboard")
  }, [navigate, currentUser])

  return (
    <section className="fixed w-full h-screen bg-hero-pattern bg-purple-900 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center flex items-center justify-center">
        <div className="bg-black bg-opacity-90 p-8 md:p-20 rounded-xl">
          <h1 className="text-xl sm:text-2xl lg:text-4xl text-white mb-2">
            Are you struggling with writer's block?
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl text-purple-300 capitalize py-2 px-6">
            Find inspiration from thousands of users here at Block.
          </h2>
          <p>
            <Link
              to="account/sign-up"
              className="inline-block bg-transparent border-2 hover:bg-purple-200 hover:text-purple-700 text-white py-2 px-6 mt-8 rounded-full"
            >
              Explore Now
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Home
