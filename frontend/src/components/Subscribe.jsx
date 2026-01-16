import { Link } from "react-router-dom"
export const Subscribe = () => {
    return (
        <div className="px-4 py-20 flex flex-col items-center gap-5">
            <h1 className="text-2xl md:text-4xl py font-semibold poppins bg-gradient-to-l from-blue-600 to-purple-600  text-transparent bg-clip-text">
                Never Miss a Blog!
            </h1>
            <p className="text-xs sm:text-sm md:text-md text-gray-500 text-center">
                Subscribe to get the latest blog, new tech, and exclusive news.
            </p>
            <div className="w-full max-w-120 border h-12 border-black shadow-[-8px_8px_0px_0px_black] flex">
                <input type="text" className="focus:outline-none h-full w-full px-2" placeholder="Enter you email id .." />
                <Link to="/register" className="border-l h-full border-black px-4 flex-center font-medium hover:bg-black hover:text-white transition-colors duration-300">Subscribe</Link>
            </div>
        </div>
    )
}
