import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  Tags,
  FileText,
  Users,
  Settings,
  LogOut,
  KeyRound,
  Image as ImageIcon,
} from "lucide-react"
import { cn, getAssetUrl } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useCompanyProfile } from "@/hooks/useCompanyProfile"

const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Kelola Produk", path: "/admin/produk", icon: Package },
  { label: "Kelola Kategori", path: "/admin/kategori", icon: Tags },
  { label: "Kelola Artikel", path: "/admin/artikel", icon: FileText },
  { label: "Kelola Banner", path: "/admin/banner", icon: ImageIcon },
  { label: "Manajemen User", path: "/admin/user", icon: Users },
  { label: "Pengaturan", path: "/admin/pengaturan", icon: Settings },
]

export default function AdminSidebar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const { profile } = useCompanyProfile()
  const isActive = (path) => pathname === path || pathname.startsWith(path + "/")

  // Filter menus based on user role
  const visibleMenuItems = menuItems.filter(item => {
    if (item.path === '/admin/user' || item.path === '/admin/pengaturan') {
      return user?.role === 'SUPERADMIN';
    }
    return true;
  });

  return (
    <aside className="w-60 bg-navy text-slate-400 flex flex-col hidden md:flex shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <img 
            src={profile.logo_url ? getAssetUrl(profile.logo_url) : "/logo.svg"} 
            alt="CV Globalindo Teknik Mandiri" 
            className="h-7 w-auto object-contain" 
          />
          <span className="font-bold text-warning text-xs tracking-tight">
            {profile.name}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-3 mb-3">
          Menu Utama
        </p>
        <ul className="space-y-0.5">
          {visibleMenuItems.map((item) => (
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

      {/* Bottom links */}
      <div className="p-3 border-t border-slate-800 space-y-0.5">
        <Link
          to="/admin/ganti-password"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
            isActive('/admin/ganti-password')
              ? "bg-accent/15 text-accent"
              : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
          )}
        >
          <KeyRound className="h-4 w-4 shrink-0" />
          Ganti Password
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
