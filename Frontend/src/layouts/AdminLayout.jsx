import { Navigate, Outlet, useLocation } from "react-router-dom"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminTopbar from "@/components/admin/AdminTopbar"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminLayout() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background dark:bg-slate-950 text-foreground">
      <AdminSidebar className="hidden lg:flex" />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminTopbar />
        <main key={location.pathname} className="flex-1 p-6 overflow-y-auto overflow-x-hidden min-w-0 animate-page-fade custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
