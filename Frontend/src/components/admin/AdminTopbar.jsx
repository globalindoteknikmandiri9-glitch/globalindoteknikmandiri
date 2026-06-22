import { Bell, Menu, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Cari data..." 
            className="pl-9 bg-slate-50 border-transparent focus-visible:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-slate-500">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border border-white"></span>
        </Button>
        
        <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-700">Admin Utama</p>
            <p className="text-xs text-slate-500">Superadmin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  )
}
