import { Outlet, useNavigate } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import AdminHeader from "../components/AdminHeader"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const AdminPanel = () => {
 const navigate = useNavigate()
  const admin = useSelector(store => store.admin.admin)
  useEffect(() => {
    if (!admin) {
      navigate("/admin/login")
    }
  })
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminSidebar />
      <div className="pt-16 pl-16 md:pl-64">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminPanel