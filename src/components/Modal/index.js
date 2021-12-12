import ModalPortal from "./ModalPortal"
import FocusTrap from "focus-trap-react"

const Modal = ({ children, title, isOpen }) => {
  if (!isOpen) return null
  return (
    <ModalPortal>
      <FocusTrap>
        <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-12 w-2/5">
            {title && (
              <h4 className="text-purple-700 text-3xl mb-4">{title}</h4>
            )}
            {children}
          </div>
        </div>
      </FocusTrap>
    </ModalPortal>
  )
}

export default Modal
