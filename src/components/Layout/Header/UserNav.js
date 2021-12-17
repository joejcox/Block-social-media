import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"
import defaultAvatar from "assets/images/avatar_placeholder.png"
import { ChevronDownIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline"

// use Ref to tell if click outside of user-nav if it's open

const UserNav = () => {
  const { logout } = useAuth()
  const { userData } = useFirestore()
  const nav = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (nav.current && !nav.current.contains(e.target)) {
        nav.current.classList.remove("open")
      }
    }

    window.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    nav.current.classList.toggle("open")
  }

  if (!userData) return null

  return (
    <div className="user-nav relative" ref={nav} onClick={handleClick}>
      <div className="user-nav--identity flex items-center cursor-pointer w-auto h-full px-5 border-l border-r border-gray-200">
        <div className="w-8 h-8 mr-0 lg:mr-2 overflow-hidden rounded">
          <img
            src={userData.avatar || defaultAvatar}
            alt={`${userData.username} profile avatar`}
            className="object-cover h-8 w-8"
          />
        </div>
        <span className="user-nav--username hidden lg:inline-block tracking-wide font-primary text-md">
          {userData.username}
        </span>
        <ChevronDownIcon className="hidden lg:inline-block w-4 ml-1 pt-0.5" />
      </div>
      <div className="user-nav--dropdown z-50 bg-white shadow overflow-hidden rounded-bl-md lg:rounded-b-md absolute top-full right-0 lg:left-0 w-48 lg:w-full border-t lg:border-t-0 border-gray-200">
        <Link
          className="leading-2 flex m-0 px-4 py-4 lg:py-3 items-center hover:bg-gray-100 text-sm"
          to={`user/${userData.username}`}
        >
          <UserIcon className="mr-2 text-xs mb-0.5 w-4" /> Profile
        </Link>
        <button
          className="w-full leading-2 flex m-0 px-4 py-4 lg:py-3 items-center hover:bg-gray-100 text-sm"
          onClick={logout}
        >
          <LogoutIcon className="mr-2 text-md mb-0 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserNav
