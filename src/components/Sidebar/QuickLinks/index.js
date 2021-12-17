import SidebarWidget from "components/Layout/ThreeColLayout/SidebarWidget"
import SidebarLink from "components/Layout/ThreeColLayout/SidebarLink"
import { HomeIcon, CogIcon, PlusIcon } from "@heroicons/react/outline"

const QuickLinks = () => {
  return (
    <SidebarWidget py={6}>
      <SidebarLink route="/dashboard" icon={HomeIcon}>
        Home
      </SidebarLink>
      <SidebarLink route="/create-post" icon={PlusIcon}>
        Create Post
      </SidebarLink>
      <SidebarLink route="/settings" icon={CogIcon}>
        Settings
      </SidebarLink>
    </SidebarWidget>
  )
}

export default QuickLinks
