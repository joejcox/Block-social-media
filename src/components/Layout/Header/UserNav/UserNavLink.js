import { Link } from "react-router-dom"

const UserNavLink = ({ children, icon, route }) => {
  const Icon = icon

  return (
    <Link
      className="leading-2 flex m-0 px-4 py-4 lg:py-3 items-center hover:bg-gray-100 text-sm"
      to={route}
    >
      <Icon className="mr-2 text-xs mb-0.5 w-4" /> {children}
    </Link>
  )
}

export default UserNavLink
