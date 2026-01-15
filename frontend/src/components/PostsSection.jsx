import { useEffect, useState, useCallback } from "react";
import { API_END_POINT, categories } from "../constants/index.js";
import PostCard from "./PostCard.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../store/getPost.js";

const PostsSection = () => {
    const dispatch = useDispatch();
    const posts = useSelector(store => store.inidPost?.allPosts || []);
    const [active, setActive] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${API_END_POINT}/post/allposts`);
            
            if (res.data.success) {
                dispatch(setAllPosts(res.data.posts));
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to load posts. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const filteredPosts = active === 'All' 
        ? posts.filter(post => post.isPublished === true)
        : posts.filter(post => post.category === active && post.isPublished === true);

    if (loading) {
        return (
            <div className="w-full px-2 pt-5 md:pt-10">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full px-2 pt-5 md:pt-10">
                <div className="text-center py-10">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchPosts}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-2 pt-5 md:pt-10">
            {/* Category Filter */}
            <ul className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`px-3 py-1.5 md:px-4 md:py-2 font-medium poppins rounded-full cursor-pointer text-gray-600 transition-all duration-300 text-xs md:text-sm lg:text-base ${
                            category === active 
                                ? "bg-purple-600 text-white shadow-md" 
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setActive(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>

            {/* Category Info */}
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {active === 'All' ? 'All Published Posts' : `${active} Posts`}
                </h2>
                <p className="text-gray-600">
                    Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                    {active !== 'All' && ` in ${active} category`}
                </p>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg mb-2">
                        No published posts found {active !== 'All' && `in ${active} category`}
                    </p>
                    <p className="text-gray-400 text-sm">
                        Check back later or browse other categories
                    </p>
                </div>
            )}

            {/* Stats Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="bg-blue-50 px-3 py-2 rounded-lg">
                        <span className="font-medium">Total Posts:</span> {posts.length}
                    </div>
                    <div className="bg-green-50 px-3 py-2 rounded-lg">
                        <span className="font-medium">Published:</span> {posts.filter(p => p.isPublished).length}
                    </div>
                    <div className="bg-purple-50 px-3 py-2 rounded-lg">
                        <span className="font-medium">Active Category:</span> {active}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsSection;