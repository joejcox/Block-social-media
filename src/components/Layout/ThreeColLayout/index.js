import SiteTitle from "components/SiteTitle"
import SidebarLeft from "components/Layout/ThreeColLayout/SidebarLeft"
import SidebarRight from "./SidebarRight"

const ThreeColLayout = ({ children, siteTitle }) => (
  <div className="flex">
    <SiteTitle title={`${siteTitle} | Block.`} />
    <SidebarLeft />
    <div className="container w-full px-6 max-w-3xl xl:px-0 xl:w-2/4 mx-auto">
      {children}
    </div>
    <SidebarRight />
  </div>
)

export default ThreeColLayout
