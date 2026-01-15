import { RiHome6Line } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";
import { IoIosList } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  
  const sidebarlinks = [
    { text: "Dashboard", icon: <RiHome6Line />, to: "/admin" },
    { text: "Add Blog", icon: <BiAddToQueue />, to: "/admin/add" },
    { text: "Blog List", icon: <IoIosList />, to: "/admin/bloglist" },
    { text: "Comments", icon: <LiaCommentSolid />, to: "/admin/comments" },
  ]

  return (
    <div className="fixed top-0 left-0 h-full z-40">
      <div className="hidden md:flex min-h-screen w-64 bg-white border-r border-gray-200 pt-20">
        <nav className="w-full px-3 py-6">
          <ul className="space-y-1">
            {sidebarlinks.map((link, index) => {
              const isActive = location.pathname === link.to;
              
              return (
                <li key={index}>
                  <Link
                    to={link.to}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.text}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <div className="md:hidden flex flex-col items-center h-full w-16 bg-white border-r border-gray-200 pt-20">
        <nav className="w-full px-1 py-6">
          <ul className="space-y-4">
            {sidebarlinks.map((link, index) => {
              const isActive = location.pathname === link.to;
              
              return (
                <li key={index}>
                  <Link
                    to={link.to}
                    className={`
                      flex items-center justify-center p-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    title={link.text}
                  >
                    <span className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {link.icon}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default AdminSidebar;