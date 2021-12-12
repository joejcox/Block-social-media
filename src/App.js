import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "components/Layout"
import Home from "containers/Home"
import FormPage from "components/FormPage"
import SignUp from "containers/SignUp"
import SignIn from "containers/SignIn"
import Dashboard from "containers/Dashboard"
import Profile from "containers/Profile"
import PrivateRoute from "containers/PrivateRoute"
import Post from "components/Posts/Post"
import CreatePost from "containers/CreatePost"
import PasswordReset from "containers/PasswordReset"
import SiteTitle from "components/SiteTitle"

const App = () => {
  return (
    <Router>
      <Layout>
        <SiteTitle title="Block. | A creative writing community for writer's block. Explore, Create, Inspire" />
        <Routes>
          <Route path="/account" element={<FormPage />}>
            <Route path="/account/sign-up" element={<SignUp />} />
            <Route path="/account/sign-in" element={<SignIn />} />
            <Route path="/account/reset-password" element={<PasswordReset />} />
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
          <Route path="/user/:user/posts/:post" element={<Post />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
