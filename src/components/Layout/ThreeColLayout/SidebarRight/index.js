import SidebarLayout from "components/Layout/ThreeColLayout/SidebarLayout"
import SidebarWidget from "components/Layout/ThreeColLayout/SidebarWidget"
import PostsListLimited from "components/Sidebar/PostsListLimited"

const SidebarRight = () => {
  return (
    <SidebarLayout right>
      <h4 className="px-4 font-bold text-main-700 font-primary text-md pt-4 mb-3">
        Your Posts
      </h4>
      <SidebarWidget py={4}>
        <PostsListLimited />
      </SidebarWidget>
    </SidebarLayout>
  )
}

export default SidebarRight
