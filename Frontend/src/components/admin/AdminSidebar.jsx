import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  Tags,
  FileText,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Kelola Produk", path: "/admin/produk", icon: Package },
  { label: "Kelola Kategori", path: "/admin/kategori", icon: Tags },
  { label: "Kelola Artikel", path: "/admin/artikel", icon: FileText },
  { label: "Manajemen User", path: "/admin/user", icon: Users },
  { label: "Pengaturan", path: "/admin/pengaturan", icon: Settings },
]

export default function AdminSidebar() {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path || pathname.startsWith(path + "/")

  return (
    <aside className="w-60 bg-navy text-slate-400 flex flex-col hidden md:flex shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center">
          <img src="/logo.png" alt="CV Globalindo Teknik Mandiri" className="h-7 w-auto object-contain" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 mb-3">
          Menu Utama
        </p>
        <ul className="space-y-0.5">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-accent/15 text-accent"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-800">
        <Link
          to="/admin/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors w-full"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Keluar
        </Link>
      </div>
    </aside>
  )
}
