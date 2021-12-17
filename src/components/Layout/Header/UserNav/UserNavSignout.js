import { LogoutIcon } from "@heroicons/react/outline"
import useAuth from "hooks/useAuth"

const UserNavSignout = () => {
  const { logout } = useAuth()

  return (
    <button
      className="w-full leading-2 flex m-0 px-4 py-4 lg:py-3 items-center hover:bg-gray-100 text-sm"
      onClick={logout}
    >
      <LogoutIcon className="mr-2 text-md mb-0 w-4" />
      Sign Out
    </button>
  )
}

export default UserNavSignout
