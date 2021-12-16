import { NavLink, useResolvedPath, useMatch } from "react-router-dom"

const SidebarLink = ({ children, route, icon }) => {
  let resolved = useResolvedPath(route)
  let match = useMatch({ path: resolved.pathname, end: true })
  const IconComponent = icon

  return (
    <NavLink
      to={route}
      className={`${
        match
          ? "text-main-700 border-l-8 border-main-700 bg-gray-100"
          : "text-gray-500"
      } block px-10 group hover:bg-gray-50`}
      style={
        match && { borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd" }
      }
    >
      <span
        className={`${
          match ? "" : "border-b border-gray-200"
        } flex items-center px-4 py-5 font-bold text-sm group-hover:text-main-700`}
      >
        {icon && (
          <IconComponent
            className={`${
              match ? "text-main-700" : "text-gray-400"
            } text-sm w-6 mr-4 `}
          />
        )}
        {children}
      </span>
    </NavLink>
  )
}

export default SidebarLink
