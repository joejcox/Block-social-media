import { Outlet } from "react-router-dom"

const FormPage = () => (
  <section className="bg-purple-100 w-full h-screen fixed bg-signup-bg flex items-center justify-center p-6">
    <Outlet />
  </section>
)

export default FormPage
