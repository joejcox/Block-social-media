import ModalPortal from "./ModalPortal"
import FocusTrap from "focus-trap-react"

const Modal = ({ overlayClick, children, title, isOpen }) => {
  if (!isOpen) return null
  return (
    <ModalPortal>
      <FocusTrap>
        <div
          className="px-6 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
          style={{ zIndex: "9999" }}
        >
          <div className="bg-white rounded-lg shadow p-12 w-full sm:w-2/3 lg:w-2/5 z-50">
            {title && <h4 className="text-main-700 text-3xl mb-4">{title}</h4>}
            {children}
          </div>
          <div
            className="absolute overlay bg-gray-800 bg-opacity-60 w-full h-full z-40"
            onClick={overlayClick}
          ></div>
        </div>
      </FocusTrap>
    </ModalPortal>
  )
}

export default Modal
