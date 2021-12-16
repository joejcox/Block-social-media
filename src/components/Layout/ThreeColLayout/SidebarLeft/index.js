import SidebarLayout from "components/Layout/ThreeColLayout/SidebarLayout"
import QuickLinks from "components/QuickLinks"
import UserBadge from "components/Layout/ThreeColLayout/SidebarLeft/UserBadge"

const SidebarLeft = () => {
  return (
    <SidebarLayout>
      <UserBadge />
      <QuickLinks />
    </SidebarLayout>
  )
}

export default SidebarLeft
