const SidebarWidget = ({ children, py }) => (
  <div
    className={`bg-white shadow-md border border-gray-100 w-full py-${py} rounded-2xl`}
  >
    {children}
  </div>
)

export default SidebarWidget
