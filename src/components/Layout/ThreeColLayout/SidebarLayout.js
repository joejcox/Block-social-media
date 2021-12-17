const SidebarLayout = ({ children, right }) => (
  <aside
    className={`w-1/4 px-8 mt-6 hidden xl:block ${right && "right-0"} fixed`}
  >
    {children}
  </aside>
)
export default SidebarLayout
