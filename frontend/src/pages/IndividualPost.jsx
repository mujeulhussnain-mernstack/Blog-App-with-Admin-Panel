import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../constants";
import { setIndividualPost, setPostComments } from "../store/getPost";
import { FaFacebookF, FaTwitter, FaLink } from "react-icons/fa";

const IndividualPost = () => {
  const dispatch = useDispatch();
  const textRef = useRef();
  const { id } = useParams();
  
  const post = useSelector(store => store.inidPost?.individualPost || {});
  const comments = useSelector(store => store.inidPost?.postComments || []);
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [postRes, commentsRes] = await Promise.all([
        axios.get(`${API_END_POINT}/post/${id}/post`, { withCredentials: true }),
        axios.get(`${API_END_POINT}/post/${id}/comments`, { withCredentials: true })
      ]);
      
      if (postRes.data.success) {
        dispatch(setIndividualPost(postRes.data.post));
      }
      
      if (commentsRes.data.success) {
        dispatch(setPostComments(commentsRes.data?.comments || []));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetchData, id]);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const commentText = textRef.current.value.trim();
    
    if (!commentText) {
      toast.error("Please enter a comment");
      return;
    }
    
    try {
      setSubmittingComment(true);
      
      const res = await axios.post(
        `${API_END_POINT}/post/${id}/addcomment`,
        { text: commentText },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      
      if (res.data.success) {
        toast.success(res.data.message);
        textRef.current.value = "";
        
        const commentsRes = await axios.get(`${API_END_POINT}/post/${id}/comments`, {
          withCredentials: true
        });
        
        if (commentsRes.data.success) {
          dispatch(setPostComments(commentsRes.data?.comments || []));
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url)
        .then(() => toast.success("Link copied!"))
        .catch(() => toast.error("Failed to copy"));
      return;
    }

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title || 'Check this post!')}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post._id) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Post Not Found</h2>
          <p className="text-gray-600">Post doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
              {post.category || "General"}
            </span>
            <span className="text-sm text-gray-500">
              {post.author?.name || "Anonymous"}
            </span>
          </div>
          
          <h1 className="text-center text-4xl md:text-5xl font-bold text-gray-900">
            {post.title}
          </h1>
          
          {post.subTitle && (
            <p className="text-center text-xl text-gray-600 max-w-3xl">
              {post.subTitle}
            </p>
          )}

          <div className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <div className="mb-10">
          <img
            src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop"}
            alt={post.title}
            className="w-full h-72 md:h-[500px] object-cover rounded-xl shadow-lg"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop";
            }}
          />
        </div>

        <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm mb-10">
          {post.content ? (
            <div 
              className="quill-content max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No content available for this post.</p>
            </div>
          )}
        </div>

        <style jsx>{`
          .quill-content {
            line-height: 1.8;
            color: #374151;
          }
          
          .quill-content h1 {
            font-size: 2.25rem;
            font-weight: 800;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
            color: #111827;
            line-height: 1.2;
          }
          
          .quill-content h2 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #1f2937;
          }
          
          .quill-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #374151;
          }
          
          .quill-content h4 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
            color: #4b5563;
          }
          
          .quill-content p {
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
          }
          
          .quill-content ul, 
          .quill-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          
          .quill-content li {
            margin-bottom: 0.5rem;
          }
          
          .quill-content ul li {
            list-style-type: disc;
          }
          
          .quill-content ol li {
            list-style-type: decimal;
          }
          
          .quill-content a {
            color: #2563eb;
            text-decoration: underline;
          }
          
          .quill-content a:hover {
            color: #1d4ed8;
          }
          
          .quill-content blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #6b7280;
          }
          
          .quill-content code {
            background-color: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: monospace;
            font-size: 0.875rem;
          }
          
          .quill-content pre {
            background-color: #1f2937;
            color: #f9fafb;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1.5rem;
          }
          
          .quill-content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
          }
          
          .quill-content table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;
          }
          
          .quill-content th,
          .quill-content td {
            border: 1px solid #e5e7eb;
            padding: 0.75rem;
            text-align: left;
          }
          
          .quill-content th {
            background-color: #f9fafb;
            font-weight: 600;
          }
          
          .quill-content hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 2rem 0;
          }
        `}</style>

        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>
          
          <form className="mb-8" onSubmit={addCommentHandler}>
            <textarea
              ref={textRef}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              disabled={submittingComment}
            />
            <button
              type="submit"
              disabled={submittingComment}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submittingComment ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Posting...
                </>
              ) : (
                "Post Comment"
              )}
            </button>
          </form>

          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map(comment => {
                const user = comment.user || {};
                const profilePicture = user.profilePicture || '';
                const username = user.username || 'Anonymous';
                const commentText = comment.text || '';

                return (
                  <div 
                    key={comment._id}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                        {profilePicture ? (
                          <img 
                            src={profilePicture} 
                            alt={username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-blue-600 font-semibold">
                            {username.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <p className="text-gray-700">
                        {commentText}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Share this article
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaFacebookF />
              <span className="font-medium">Facebook</span>
            </button>
            
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaTwitter />
              <span className="font-medium">Twitter</span>
            </button>
            
            <button
              onClick={() => handleShare('copy')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <FaLink size={18} />
              <span className="font-medium">Copy Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPost;