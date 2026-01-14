import { Link } from "react-router-dom"
import {useDispatch} from "react-redux"
import { getPost } from "../store/getPost.js";
const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const getPostHandler = (e) => {
        dispatch(getPost(e))
    }
    return (
        <div className="group h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">

            <div className="relative h-56 w-full overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60";
                    }}
                />

                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-sm ${post.category === 'Tech'
                        ? 'bg-blue-100 text-blue-800'
                        : post.category === 'Philosophy'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                        {post.category}
                    </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent" />
            </div>


            <div className="flex-1 p-5 flex flex-col">

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                </h3>


                {post.subTitle && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                        {post.subTitle}
                    </p>
                )}


                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-gray-500">
                        <span className="text-red-400">♥</span>
                        <span className="text-sm font-medium">{post.likes.length}</span>
                    </div>

                    <Link
                        to={`/post/${post._id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        onClick={() => getPostHandler(post)}
                    >
                        Read more →
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default PostCard