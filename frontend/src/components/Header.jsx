import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-hot-toast"
import { API_END_POINT } from "../constants"
import { setAuthUser } from "../store/user.slice"
const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user.user)
    console.log(user)
    const logoutHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`${API_END_POINT}/user/logout`)
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setAuthUser(null))
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="w-full h-20 fixed inset-x-0">
            <div className="max-w-5xl h-full mx-auto flex justify-between items-center px-2 lg:px-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold poppins">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Quick
                    </span>
                    <span className="text-gray-800">Blog</span>
                </h1>
                {user ? (
                    <form onSubmit={logoutHandler}>

                        <button to={"/register"} className="border border-black px-2 py-1 md:px-4 md:py-2 shadow-[-7px_7px_0px_0px_black] hover:scale-105 transition-all duration-300 cursor-pointer font-semibold poppins">
                            Logout</button>
                    </form>
                ) : (<Link to={"/register"} className="border border-black px-2 py-1 md:px-4 md:py-2 shadow-[-7px_7px_0px_0px_black] hover:scale-105 transition-all duration-300 font-semibold poppins">
                    Get Started
                </Link>)}
            </div>
        </div>
    )
}

export default Header