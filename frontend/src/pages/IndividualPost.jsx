import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { Heart } from 'lucide-react';
import { FaFacebookF } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useParams } from "react-router-dom"
const IndividualPost = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const contentContainer = useRef(null)
  const post = useSelector(store => store.inidPost.post)
  const links = [
    { id: 'facebook', icons: <FaFacebookF /> },
    { id: 'twitter', icons: <FaTwitter /> },
    { id: 'google', icons: <FaGooglePlusG size={22} /> }
  ]
  console.log(id)
  useEffect(() => {
    if (!post) {
      toast.error("Invalid Post Id.")
      navigate("/")
      return
    }

    if (contentContainer.current && post.content) {
      contentContainer.current.innerHTML = post.content
    }
  }, [post, navigate])

  if (!post) return null

  return (
    <div className="min-h-screen pt-15 bg-gray-50">

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8 py-10">
          <p className="text-sm text-blue-600 font-medium poppins text-center">
            Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>

          <div className="">
            <h1 className="text-center text-4xl font-bold poppins">
              {post.title}
            </h1>
          </div>
          {post.subTitle && (
            <p className="text-center text-md text-gray-800">
              {post.subTitle}
            </p>
          )}

          <span className="text-xs w-fit px-2 py-1 border border-[#505dea] rounded-full  bg-gray-200 font-semibold text-[#5049e6]">Solo Writer</span>
        </div>
        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop"
            }}
          />
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div
            ref={contentContainer}
            className="prose max-w-none"
          />
        </div>
        <div className="flex gap-2">
          <span className="cursor-pointer"><Heart /></span> {post.likes.length}
        </div>
        <div className="py-2">
          <h1 className="font-semibold poppins underline ">Comments ({post.comments.length})</h1>
          <p className="py-2 poppins text-sm text-gray-600">Add comment</p>
          <form className="flex flex-col w-full max-w-1/2 gap-2">
            <textarea name="" id=""
              className="border border-gray-500 rounded-sm focus:outline-none min-h-40 px-2"
              placeholder="Comment"
            ></textarea>
            <button type="submit" className="text-white bg-[#5049e6] w-25 py-2 rounded-xl cursor-pointer hover:scale-105 transition-all duration-200">Submit</button>
          </form>
        </div>
        <div className="py-4">
          <h1 className="text-md font-bold">Share this article on social media</h1>
          <ul className="flex items-center gap-2 py-10">
            {
              links.map(link => <li key={link.id} className="px-2 py-2 rounded-full text-[#5049e6] shadow-lg cursor-pointer">{link.icons}</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IndividualPost