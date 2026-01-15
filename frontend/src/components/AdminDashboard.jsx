import { BiAddToQueue } from "react-icons/bi";
import { ImUsers } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from 'axios';
import { API_END_POINT } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUsers } from "../store/admin.slice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector(store => store.admin.posts);
  const users = useSelector(store => store.admin.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        axios.defaults.withCredentials = true;
        const res = await Promise.all([
          axios.get(`${API_END_POINT}/post/allposts`),
          axios.get(`${API_END_POINT}/post/allusers`),
        ]);
        
        if (res[0].data.success) {
          dispatch(setPosts(res[0].data.posts));
        }
        
        if (res[1].data.success) {
          dispatch(setUsers(res[1].data.users));
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]); // Added dependency

  // Calculate statistics
  const totalBlogs = posts?.length || 0;
  const totalUsers = users || 0;
  
  // Filter published and draft posts
  const publishedPosts = posts?.filter(post => post.isPublished === true) || [];
  const draftPosts = posts?.filter(post => post.isPublished === false) || [];
  
  // Get latest published posts (max 5)
  const latestBlogs = publishedPosts.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Stats Cards */}
      <div className="flex gap-5 flex-wrap py-6">
        <div className="inline-flex items-center justify-center gap-5 h-22 w-50 border border-gray-200 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm">
          <span className="h-12 w-12 inline-flex justify-center items-center bg-blue-50 rounded-lg text-blue-600">
            <BiAddToQueue size={24} />
          </span>
          <div>
            <p className="font-semibold text-2xl">{totalBlogs}</p>
            <p className="text-sm text-gray-500">Total Blogs</p>
          </div>
        </div>
        
        <div className="inline-flex items-center justify-center gap-5 h-22 w-50 border border-gray-200 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm">
          <span className="h-12 w-12 inline-flex justify-center items-center bg-green-50 rounded-lg text-green-600">
            <ImUsers size={24} />
          </span>
          <div>
            <p className="font-semibold text-2xl">{totalUsers}</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
        </div>
        
        <div className="inline-flex items-center justify-center gap-5 h-22 w-50 border border-gray-200 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm">
          <span className="h-12 w-12 inline-flex justify-center items-center bg-yellow-50 rounded-lg text-yellow-600">
            <FiEdit size={24} />
          </span>
          <div>
            <p className="font-semibold text-2xl">{draftPosts.length}</p>
            <p className="text-sm text-gray-500">Draft Posts</p>
          </div>
        </div>
      </div>

      {/* Published vs Draft Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold text-lg mb-3">Published Posts</h3>
          <p className="text-3xl font-bold text-blue-600">{publishedPosts.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {totalBlogs > 0 ? `${Math.round((publishedPosts.length / totalBlogs) * 100)}% of total blogs` : 'No blogs yet'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="font-semibold text-lg mb-3">Draft Posts</h3>
          <p className="text-3xl font-bold text-yellow-600">{draftPosts.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {totalBlogs > 0 ? `${Math.round((draftPosts.length / totalBlogs) * 100)}% of total blogs` : 'No drafts'}
          </p>
        </div>
      </div>

      {/* Latest Blogs Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Latest Published Blogs</h2>
          <p className="text-sm text-gray-500">
            Showing {latestBlogs.length} of {publishedPosts.length} published blogs
          </p>
        </div>
        
        {latestBlogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestBlogs.map((post, index) => (
                  <tr key={post._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      {post.subTitle && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {post.subTitle}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No published blogs yet.</p>
            <p className="text-sm text-gray-400 mt-1">Start creating your first blog post!</p>
          </div>
        )}
        
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Published:</span> {publishedPosts.length} posts
            {draftPosts.length > 0 && (
              <span className="ml-4">
                <span className="font-medium">Total Drafts:</span> {draftPosts.length} posts
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;