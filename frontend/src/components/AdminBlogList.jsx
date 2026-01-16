import { useCallback, useEffect, useState } from "react";
import { MdDelete, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { API_END_POINT } from "../constants/index.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setBlogList } from "../store/admin.slice";

const AdminBlogList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(store => store?.admin?.blogList || []);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_END_POINT}/post/allposts`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setBlogList(res.data.posts));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const postStatusHandler = async (id, currentStatus) => {
    try {
      const endpoint = currentStatus === true ? 
        `${API_END_POINT}/post/${id}/unpublish` : 
        `${API_END_POINT}/post/${id}/publish`;
      
      const res = await axios.get(endpoint, { withCredentials: true });
      
      if (res.data.success) {
        toast.success(res.data.message);
        fetchPosts();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update post status");
    }
  };

  const deletePostHandler = async (id) => {
    try {
      const res = await axios(`${API_END_POINT}/post/${id}/delete`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchPosts(); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Manage Your Posts</h1>
        <p className="text-gray-600">View and manage all your blog posts</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : posts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Blog Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post, index) => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-gray-500 font-medium">P{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {post.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {post.category || "Uncategorized"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      post.isPublished 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => postStatusHandler(post._id, post.isPublished)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                          post.isPublished 
                            ? "bg-red-50 text-red-700 hover:bg-red-100" 
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        {post.isPublished ? (
                          <>
                            
                            <MdVisibilityOff className="w-4 h-4 cursor-pointer" />
                            <span className="cursor-pointer">Unpublish</span>
                          
                          </>
                        ) : (
                          <>
                            
                            <MdVisibility className="w-4 h-4 cursor-pointer" />
                            <span className="cursor-pointer">Publish</span>
                            
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => deletePostHandler(post._id)}
                        className="flex items-center space-x-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded text-sm transition-colors  cursor-pointer"
                      >
                        <MdDelete className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No blog posts found</p>
            <p className="text-gray-400">Create your first post to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;