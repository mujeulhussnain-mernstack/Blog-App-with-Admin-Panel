import { useCallback } from "react"
import axios from "axios"
import { API_END_POINT } from "../constants/index.js"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setComments } from "../store/admin.slice.js"

const AdminManageComments = () => {
  const dispatch = useDispatch()
  const comments = useSelector(store => store.admin?.comments || [])

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/post/allcomments`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setComments(res.data.comments))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch comments")
    }
  }, [dispatch])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <div className='p-4 lg:p-6 bg-gray-50 min-h-screen'>
      <div className="mb-8">
        <h1 className='text-2xl font-semibold text-gray-800'>Latest Comments</h1>
        <p className="text-gray-600 mt-1">Manage and monitor user comments</p>
      </div>
      
      <div className="space-y-4">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div 
              key={comment._id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={comment?.user?.profilePicture || "https://via.placeholder.com/50"} 
                    alt={comment?.user?.username}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {comment?.user?.username || "Anonymous User"}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {comment?.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Recently"}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {comment?.text}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      {comment?.postId && (
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.707.707L10 13.414l-4.293 4.293A1 1 0 014 16V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">
                            Post: {comment.postId.title || "Untitled"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500 text-lg">No comments found</p>
              <p className="text-gray-400">Comments will appear here once users start engaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminManageComments;