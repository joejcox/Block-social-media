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
      <div className="user-nav" ref={nav} onClick={handleClick}>
        <div className="user-nav--identity">
          <div className="user-nav--avatar">
            <img
              src={userData.avatar || defaultAvatar}
              alt={`${userData.username} profile avatar`}
            />
          </div>
          <span className="user-nav--username">{userData.username}</span>
          <BsChevronDown />
        </div>
        <div className="user-nav--dropdown">
          <Link className="user-nav--link" to={`user/${userData.username}`}>
            <FaUserAlt /> Profile
          </Link>
          <button className="user-nav--link" onClick={openModal}>
            <RiLogoutCircleFill />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}

export default UserNav
