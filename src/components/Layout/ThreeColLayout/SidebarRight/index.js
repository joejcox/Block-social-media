import SidebarLayout from "components/Layout/ThreeColLayout/SidebarLayout"
import SidebarWidget from "components/Layout/ThreeColLayout/SidebarWidget"

const SidebarRight = () => {
  return (
    <SidebarLayout>
      <h4 className="px-4 font-bold text-main-700 font-primary text-md pt-4 mb-2">
        Your Posts
      </h4>
      <SidebarWidget py={4}>
        <div className="px-6 font-bold text-sm text-gray-500">
          Nothing to see here yet
        </div>
      </SidebarWidget>
    </SidebarLayout>
  )
}

export default SidebarRight
