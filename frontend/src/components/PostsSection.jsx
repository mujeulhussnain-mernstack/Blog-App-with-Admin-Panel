import { useState } from "react";
import { categories } from "../constants/index.js"
import { mockPosts } from "../constants/index.js"
import PostCard from "./PostCard.jsx";
const PostsSection = () => {
    const [active, setActive] = useState('All')
    return (
        <div className="w-full px-2 pt-5 md:pt-10">
            <ul className="flex md:gap-3">
                {
                    categories.map((category, index) => (
                        <li
                            key={index}
                            className={`px-3 py-1 font-medium poppins rounded-full cursor-pointer text-gray-600 transition-all duration-300 text-xs md:text-md lg:text-lg ${category === active && "bg-purple-600 text-white"}`}
                            onClick={(e) => setActive(e.target.innerText)}
                        >
                            {category}
                        </li>
                    ))
                }
            </ul>
            <div>
                <h1 className='text-center text-2xl lg:text-3xl font-medium text-blue-600 py-5'>Posts</h1>
                <div className="grid justify-center items-stretch gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        mockPosts
                            .filter((post) =>
                                active === 'All'
                                    ? post.isPublished === true
                                    : post.category === active && post.isPublished === true
                            )
                            .map(post => (
                                <PostCard key={post._id} post={post} />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostsSection;