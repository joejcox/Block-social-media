import SidebarLayout from "components/Layout/ThreeColLayout/SidebarLayout"
import QuickLinks from "components/Sidebar/QuickLinks"
import UserBadge from "components/Layout/ThreeColLayout/SidebarLeft/UserBadge"

const SidebarLeft = () => {
  return (
    <SidebarLayout left>
      <UserBadge />
      <QuickLinks />
    </SidebarLayout>
  )
}

export default SidebarLeft
