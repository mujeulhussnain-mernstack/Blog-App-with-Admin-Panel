import './App.css'
import MainContainer from './components/MainContainer'
import Home from './pages/Home'
import Header from "./components/Header"
import IndividualPost from './pages/IndividualPost'
import SignupOrLogin from './pages/SignupOrLogin'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Footer from './components/Footer'
import { Subscribe } from './components/Subscribe'
const router = createBrowserRouter([
  { path: '/', element: <><MainContainer><Header /><Home /><Subscribe /><Footer /></MainContainer></> },
  { path: '/register', element: <><Header /><SignupOrLogin /></> },
  { path: '/post/:id', element: <><MainContainer><Header /><IndividualPost /><Footer /></MainContainer></> }
])
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
