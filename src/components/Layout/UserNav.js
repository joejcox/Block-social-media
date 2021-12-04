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
  const { username, avatar } = useFirestore()
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
  })

  const handleClick = () => {
    nav.current.classList.toggle("open")
  }

  return (
    <div className="user-nav" ref={nav} onClick={handleClick}>
      <div className="user-nav--identity">
        <div className="user-nav--avatar">
          <img
            src={avatar || defaultAvatar}
            alt={`${username} profile avatar`}
          />
        </div>
        <span className="user-nav--username">{username}</span>
        <BsChevronDown />
      </div>
      <div className="user-nav--dropdown">
        <Link className="user-nav--link" to={`user/${username}`}>
          <FaUserAlt /> Profile
        </Link>
        <a
          className="user-nav--link"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            logout()
          }}
        >
          <RiLogoutCircleFill />
          Sign Out
        </a>
      </div>
    </div>
  )
}

export default UserNav
