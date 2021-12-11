import { Link } from "react-router-dom"

const ButtonLink = ({ children, route }) => {
  return (
    <Link
      to={route}
      className="inline-block bg-purple-700 mt-4 text-white text-sm py-3 rounded-full w-full md:w-auto md:px-8 cursor-pointer hover:bg-purple-800"
    >
      {children}
    </Link>
  )
}

export default ButtonLink
