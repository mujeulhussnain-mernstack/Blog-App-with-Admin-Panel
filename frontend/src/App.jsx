import './App.css'
import Home from './pages/Home'
import IndividualPost from './pages/IndividualPost'
import SignupOrLogin from './pages/SignupOrLogin'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
const router = createBrowserRouter([
  { path: '/', element: <><Home /></> },
  { path: '/register', element: <><SignupOrLogin /></> },
  { path: '/post/:id', element: <><IndividualPost /></> }
])
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
