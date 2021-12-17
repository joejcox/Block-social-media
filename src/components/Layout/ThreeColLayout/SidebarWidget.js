const SidebarWidget = ({ children, py }) => (
  <div className={`bg-white border border-main-200 w-full py-${py} rounded`}>
    {children}
  </div>
)

export default SidebarWidget
