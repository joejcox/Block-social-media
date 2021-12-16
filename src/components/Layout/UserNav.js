import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"
import { BsChevronDown } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { RiLogoutCircleFill } from "react-icons/ri"
import defaultAvatar from "assets/images/avatar_placeholder.png"

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
      <div className="user-nav--identity flex items-center cursor-pointer h-full px-5 border-l border-r border-gray-200">
        <div className="w-8 h-8 mr-0 lg:mr-2 overflow-hidden rounded-lg border border-white">
          <img
            src={userData.avatar || defaultAvatar}
            alt={`${userData.username} profile avatar`}
            className="object-cover h-full w-full"
          />
        </div>
        <span className="user-nav--username hidden lg:inline-block font-bold font-primary text-md">
          {userData.username}
        </span>
        <BsChevronDown className="hidden lg:inline-block" />
      </div>
      <div className="user-nav--dropdown z-50 bg-white shadow overflow-hidden rounded-bl-md lg:rounded-b-md absolute top-full right-0 lg:left-0 w-48 lg:w-full border-t lg:border-t-0 border-gray-200">
        <Link
          className="leading-2 flex m-0 px-4 py-4 lg:py-2 items-center hover:bg-gray-100 text-sm"
          to={`user/${userData.username}`}
        >
          <FaUserAlt className="mr-2 text-xs mb-0.5" /> Profile
        </Link>
        <button
          className="w-full leading-2 flex m-0 px-4 py-4 lg:py-2 items-center hover:bg-gray-100 text-sm"
          onClick={logout}
        >
          <RiLogoutCircleFill className="mr-2 text-md mb-0" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserNav
