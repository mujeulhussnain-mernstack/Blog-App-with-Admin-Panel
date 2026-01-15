import './App.css'
import MainContainer from './components/MainContainer'
import Home from './pages/Home'
import Header from "./components/Header"
import IndividualPost from './pages/IndividualPost'
import SignupOrLogin from './pages/SignupOrLogin'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Footer from './components/Footer'
import { Subscribe } from './components/Subscribe'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import AdminDashboard from './components/AdminDashboard'
import AdminAddBlog from './components/AdminAddBlog'
import AdminBlogList from './components/AdminBlogList'
import AdminManageComments from './components/AdminManageComments'
import "quill/dist/quill.snow.css"
const router = createBrowserRouter([
  {
    path: '/',
    element:
      <>
        <MainContainer>
          <Header />
          <Home />
          <Subscribe />
          <Footer />
        </MainContainer>
      </>
  },
  {
    path: '/register',
    element: <>
      <Header />
      <SignupOrLogin />
    </>
  },
  {
    path: '/post/:id',
    element: <>
      <MainContainer>
        <Header />
        <IndividualPost />
        <Footer />
      </MainContainer>
    </>
  },
  {
    path: '/admin/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <AdminPanel />,
    children: [
      {path: "/admin", element: <AdminDashboard />},
      {path: "/admin/add", element: <AdminAddBlog />},
      {path: "/admin/bloglist", element: <AdminBlogList />},
      {path: "/admin/comments", element: <AdminManageComments />},
    ]
  },

])
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
