import { Bell, Menu, Search, User, Sun, Moon, Monitor } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/ThemeContext"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export default function AdminTopbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 text-foreground">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/60" />
          <Input 
            placeholder="Cari data..." 
            className="pl-9 bg-muted border-transparent focus-visible:bg-background text-xs text-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Subtle Theme Toggle Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground h-9 w-9 rounded-lg shrink-0 cursor-pointer"
              aria-label="Pilih Tema"
            >
              {theme === 'dark' && <Moon className="h-4.5 w-4.5 text-warning" />}
              {theme === 'light' && <Sun className="h-4.5 w-4.5 text-warning" />}
              {theme === 'system' && <Monitor className="h-4.5 w-4.5 text-warning" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border border-border text-foreground w-32 shadow-dropdown">
            <DropdownMenuItem onClick={() => setTheme('light')} className="focus:bg-muted focus:text-foreground gap-2 cursor-pointer text-xs py-2">
              <Sun className="h-3.5 w-3.5" />
              <span>Terang</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')} className="focus:bg-muted focus:text-foreground gap-2 cursor-pointer text-xs py-2">
              <Moon className="h-3.5 w-3.5" />
              <span>Gelap</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')} className="focus:bg-muted focus:text-foreground gap-2 cursor-pointer text-xs py-2">
              <Monitor className="h-3.5 w-3.5" />
              <span>Sistem</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border border-card"></span>
        </Button>
        
        <div className="flex items-center gap-3 border-l pl-4 border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-muted-foreground">Admin Utama</p>
            <p className="text-xs text-muted-foreground/60">Superadmin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  )
}
