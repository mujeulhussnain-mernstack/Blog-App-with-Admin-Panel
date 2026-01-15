import { useRef, useState } from "react"
import toast from "react-hot-toast";
import axios from "axios"
import { useDispatch } from "react-redux"
import { API_END_POINT } from "../constants";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../store/admin.slice.js";
import { Loader2 } from "lucide-react"
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)
    const email = useRef()
    const password = useRef()
    const inputDataHandler = async (e) => {
        e.preventDefault()
        try {
            setSpinner(true)
            const adminInput = {
                email: email.current.value.trim(),
                password: password.current.value.trim(),
            }
            const res = await axios.post(`${API_END_POINT}/admin/login`, adminInput, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setAdmin(res.data.admin))
                navigate("/admin")
                email.current.value = ""
                password.current.value = ""
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
                <h1 className='text-3xl font-bold poppins'><span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-purple-700">Admin</span> Login</h1>
                <p className="text-md text-center">Enter your credentials to access the admin panel</p>
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
                        spinner ? <Loader2 className="animate-spin" /> : "Login"
                    }
                </button>
            </form>
        </div>
    )
}

export default Login