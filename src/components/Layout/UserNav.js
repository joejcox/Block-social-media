import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import useAuth from "hooks/useAuth"
import useFirestore from "hooks/useFirestore"
import { BsChevronDown } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { RiLogoutCircleFill } from "react-icons/ri"
import defaultAvatar from "assets/images/avatar_placeholder.png"

import Modal from "react-modal"
import useModal from "hooks/useModal"

// use Ref to tell if click outside of user-nav if it's open

const UserNav = () => {
  const { logout } = useAuth()
  const { userData } = useFirestore()
  const nav = useRef(null)
  const { openModal, closeModal, modalIsOpen, customStyles } = useModal()

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
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="content">SIGNING OUT IS FOR PUSSIES!</p>
        <button
          className="button is-info"
          onClick={() => {
            closeModal()
            logout()
          }}
        >
          Sign Out
        </button>
      </Modal>
      <div className="user-nav relative" ref={nav} onClick={handleClick}>
        <div className="user-nav--identity flex is-align-items-center cursor-pointer h-full px-5 border-l border-r border-gray-200">
          <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
            <img
              src={userData.avatar || defaultAvatar}
              alt={`${userData.username} profile avatar`}
              className="object-cover h-full w-full"
            />
          </div>
          <span className="user-nav--username">{userData.username}</span>
          <BsChevronDown />
        </div>
        <div className="user-nav--dropdown z-50 bg-white shadow overflow-hidden rounded-b-md absolute top-full left-0 w-full">
          <Link
            className="leading-2 flex m-0 px-4 py-2 is-align-items-center hover:bg-gray-100 text-sm"
            to={`user/${userData.username}`}
          >
            <FaUserAlt className="mr-2 text-xs mb-0.5" /> Profile
          </Link>
          <button
            className="w-full leading-2 flex m-0 px-4 py-2 is-align-items-center hover:bg-gray-100 text-sm"
            onClick={openModal}
          >
            <RiLogoutCircleFill className="mr-2 text-md mb-0" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}

export default UserNav
