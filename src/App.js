import { Routes, Route } from "react-router-dom"
import Layout from "components/Layout"
import Home from "containers/Home"
import FormPage from "components/FormPage"
import SignUp from "containers/SignUp"
import SignIn from "containers/SignIn"
import Dashboard from "containers/Dashboard"
import Profile from "containers/Profile"
import PrivateRoute from "containers/PrivateRoute"
import { BrowserRouter as Router } from "react-router-dom"
import Modal from "react-modal"

Modal.setAppElement("#root")

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/account" element={<FormPage />}>
            <Route path="/account/sign-up" element={<SignUp />} />
            <Route path="/account/sign-in" element={<SignIn />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/user/:user" element={<Profile />} />
          {/* <Route path="/user/posts" element={<Posts />} />
          <Route path="/user/posts/:postId" element={<Post />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
