import { useRef, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios"
import { useDispatch } from "react-redux"
import { API_END_POINT } from "../constants";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../store/user.slice";
import { Loader2 } from "lucide-react"
const SignupOrLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(false)
  const [isLogin, setIsLogin] = useState(false);
  const userName = useRef()
  const email = useRef()
  const password = useRef()
  const inputDataHandler = async (e) => {
    e.preventDefault()
    try {
      setSpinner(true)
      if (isLogin) {
        // Login logic
        const userInput = {
          email: email.current.value.trim(),
          password: password.current.value.trim(),
        }
        const res = await axios.post(`${API_END_POINT}/user/login`, userInput, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        if (res.data.success) {
          toast.success(res.data.message)
          dispatch(setAuthUser(res.data.user))
          navigate("/")
          email.current.value = ""
          password.current.value = ""
        }
      } else {
        // signup logic
        let username = userName.current.value.trim()
        username = username.slice(0, 1).toUpperCase() + username.slice(1)
        const userInput = {
          username,
          email: email.current.value.trim(),
          password: password.current.value.trim(),
        }
        const res = await axios.post(`${API_END_POINT}/user/register`, userInput, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        if (res.data.success) {
          toast.success(res.data.message)
          setIsLogin(!isLogin)
          userName.current.value = ""
          email.current.value = ""
          password.current.value = ""
        }
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div className='w-full min-h-screen flex-center'>
      <form onSubmit={inputDataHandler} className='w-90 mx-2 md:mx-0 px-3 py-2 shadow-[-8px_8px_0px_0px_black] border border-black flex flex-col items-center space-y-3'>
        <h1 className='text-3xl font-bold poppins'>{isLogin ? "Login" : "Signup"}</h1>
        {!isLogin && <p>Signup to like, share and comment.</p>}
        {!isLogin && (<input type="text" className='w-full h-12 px-2 focus:outline-none border border-black rounded-lg' placeholder="Username" ref={userName} />)}
        <input
          type="email"
          className='w-full h-12 px-2 focus:outline-none border border-black rounded-lg'
          placeholder='Email'
          ref={email}
          email="current-email"
        />
        <input
          type="password"
          className='w-full h-12 px-2 focus:outline-none border border-black rounded-lg' placeholder='Password'
          ref={password}
          password="current-password" />
        <button
          type="submit"
          className='w-full h-12 bg-black rounded-lg text-white font-semibold cursor-pointer flex-center'>
          {
            isLogin ? (
              spinner ? <Loader2 className="animate-spin" /> : "Login"
            ) : (
              spinner ? <Loader2 className="animate-spin" /> : "Signup"
            )
          }
        </button>
        <p className='text-md w-full text-left'>{isLogin ? "New on this app?" : "Already have an account?"} <span className='text-blue-950 underline font-bold cursor-pointer' onClick={() => setIsLogin(!isLogin)}>{!isLogin ? "Login" : "Signup"}</span></p>
      </form>
    </div>
  )
}

export default SignupOrLogin