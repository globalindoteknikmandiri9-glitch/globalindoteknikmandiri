import { Outlet, useLocation } from "react-router-dom"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminTopbar from "@/components/admin/AdminTopbar"

export default function AdminLayout() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen bg-background dark:bg-slate-950 text-foreground">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar />
        <main key={location.pathname} className="flex-1 p-6 overflow-y-auto animate-page-fade">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
