import { Link, useLocation } from "react-router-dom"
import { Menu, MessageSquare, X, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"

const navLinks = [
  { name: "Beranda", path: "/" },
  { name: "Profil", path: "/tentang-kami" },
  { name: "Produk", path: "/produk" },
  { name: "Artikel", path: "/artikel" },
  { name: "Hubungi Kami", path: "/hubungi-kami" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile on route change via key prop
  const mobileMenuKey = location.pathname

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-primary/80 backdrop-blur-md shadow-soft-sm border-b border-white/5"
          : "bg-primary"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="CV Globalindo Teknik Mandiri" className="h-8 md:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Nav - centered */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(link.path)
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-white/5 h-9 w-9 rounded-lg"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4.5 w-4.5 text-warning transition-all" />
              ) : (
                <Moon className="h-4.5 w-4.5 transition-all" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-white/5 gap-1.5 text-sm"
              asChild
            >
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-warning hover:bg-warning/90 text-warning-foreground font-semibold text-sm px-4"
              asChild
            >
              <Link to="/hubungi-kami">Hubungi Kami</Link>
            </Button>
          </div>

          {/* Mobile: Sheet trigger — key forces close on route change */}
          <Sheet key={mobileMenuKey} open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden text-slate-400 hover:text-white p-2 rounded-md transition-colors">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[#0F172A] border-l border-slate-800 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="px-6 py-5 border-b border-slate-800">
                  <span className="text-white font-semibold text-sm">
                    CV Globalindo Teknik Mandiri
                  </span>
                </div>

                {/* Mobile nav links */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isActive(link.path)
                          ? "bg-accent/10 text-accent"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="px-4 pb-6 space-y-3 border-t border-slate-800 pt-4">
                  <div className="flex items-center justify-between px-4 py-1.5 bg-white/5 rounded-lg">
                    <span className="text-xs text-slate-400 font-medium">Mode Gelap</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white hover:bg-white/5 h-8 w-8 rounded-md"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      aria-label="Toggle theme"
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-4 w-4 text-warning" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-slate-400 border-slate-700 bg-transparent hover:bg-white/5 hover:text-white gap-2 text-sm"
                    asChild
                  >
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
                      <MessageSquare className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-semibold text-sm" asChild>
                    <Link to="/hubungi-kami">Hubungi Kami</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}
