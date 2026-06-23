import { Link, useLocation } from "react-router-dom"
import { Menu, MessageSquare, X, Sun, Moon, Monitor } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn, getAssetUrl } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useCompanyProfile } from "@/hooks/useCompanyProfile"

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
  const { profile, getWhatsappLink } = useCompanyProfile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const mobileMenuKey = location.pathname

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy/80 backdrop-blur-md shadow-card border-b border-white/5"
          : "bg-navy"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img 
              src={profile.logo_url ? getAssetUrl(profile.logo_url) : "/logo.svg"} 
              alt={profile.name} 
              className="h-8 md:h-10 w-auto object-contain" 
            />
            <span className="font-bold text-warning text-xs md:text-sm tracking-tight">
              {profile.name}
            </span>
          </Link>

          {/* Desktop Nav - centered */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              if (link.name === "Produk") {
                return (
                  <div key={link.path} className="group relative">
                    <Link
                      to={link.path}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
                        isActive(link.path)
                          ? "text-white"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      )}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-warning rounded-full" />
                      )}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                      <div className="w-[640px] bg-navy border border-slate-800 rounded-xl shadow-dropdown p-6 grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xs font-bold text-warning uppercase tracking-wider mb-3 border-b border-slate-800 pb-1">
                            Divisi Jalan & Konstruksi
                          </h4>
                          <div className="space-y-1">
                            <Link to="/produk?cat=Alat Marka Jalan" className="block p-2 rounded-lg hover:bg-white/5 transition-colors group/item text-left">
                              <div className="text-xs font-bold text-white group-hover/item:text-warning transition-colors">Marka Jalan</div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Mesin marka jalan GTM-Sprayer, termoplastik SNI.</p>
                            </Link>
                            <Link to="/produk?cat=Peralatan Safety Jalan" className="block p-2 rounded-lg hover:bg-white/5 transition-colors group/item text-left">
                              <div className="text-xs font-bold text-white group-hover/item:text-warning transition-colors">Safety & Rambu Jalan</div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Road barrier PE Kemenhub, delineator post elastis.</p>
                            </Link>
                            <Link to="/produk?cat=Bor Tanah & Pertambangan" className="block p-2 rounded-lg hover:bg-white/5 transition-colors group/item text-left">
                              <div className="text-xs font-bold text-white group-hover/item:text-warning transition-colors">Survey & Geodesi</div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Soil auger drill hand kit, alat survey pemetaan sipil.</p>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-warning uppercase tracking-wider mb-3 border-b border-slate-800 pb-1">
                            Divisi Laboratorium & Tani
                          </h4>
                          <div className="space-y-1">
                            <Link to="/produk?cat=Laboratorium & Alat Uji" className="block p-2 rounded-lg hover:bg-white/5 transition-colors group/item text-left">
                              <div className="text-xs font-bold text-white group-hover/item:text-warning transition-colors">Laboratorium & Alat Uji</div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Concrete compression machine 2000 kN, island bench, lemari asam.</p>
                            </Link>
                            <Link to="/produk?cat=Mesin Pertanian & Sadap" className="block p-2 rounded-lg hover:bg-white/5 transition-colors group/item text-left">
                              <div className="text-xs font-bold text-white group-hover/item:text-warning transition-colors">Pertanian & Sadap Karet</div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Mesin sadap karet motorized baterai, pisau sadap latex.</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return (
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
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-warning rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-white/5 h-8 w-8 rounded-lg shrink-0 cursor-pointer"
                  aria-label="Pilih Tema"
                >
                  {theme === 'dark' && <Moon className="h-4 w-4 transition-all text-warning" />}
                  {theme === 'light' && <Sun className="h-4 w-4 transition-all text-warning" />}
                  {theme === 'system' && <Monitor className="h-4 w-4 transition-all text-warning" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-navy border border-border text-slate-300 w-32 shadow-dropdown">
                <DropdownMenuItem onClick={() => setTheme('light')} className="focus:bg-white/5 focus:text-white gap-2 cursor-pointer text-xs py-2">
                  <Sun className="h-3.5 w-3.5" />
                  <span>Terang</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="focus:bg-white/5 focus:text-white gap-2 cursor-pointer text-xs py-2">
                  <Moon className="h-3.5 w-3.5" />
                  <span>Gelap</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')} className="focus:bg-white/5 focus:text-white gap-2 cursor-pointer text-xs py-2">
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Sistem</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-white/5 gap-1.5 text-sm h-8 cursor-pointer"
              asChild
            >
              <a href={getWhatsappLink()} target="_blank" rel="noreferrer">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button
              variant="warning"
              size="sm"
              className="font-semibold text-sm px-4 h-8 rounded-lg cursor-pointer shadow-card"
              asChild
            >
              <Link to="/hubungi-kami">Hubungi Kami</Link>
            </Button>
          </div>

          {/* Mobile: Sheet trigger — key forces close on route change */}
          <Sheet key={mobileMenuKey} open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden text-slate-400 hover:text-white p-2 rounded-md transition-colors cursor-pointer">
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-navy border-l border-slate-800 p-0 shadow-modal">
              <div className="flex flex-col h-full text-left">
                {/* Mobile header */}
                <div className="px-6 py-5 border-b border-slate-800">
                  <span className="text-white font-semibold text-sm">
                    {profile.name}
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
                          ? "bg-white/5 text-warning"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="px-4 pb-6 space-y-3 border-t border-slate-800 pt-4">
                  <div className="space-y-2 px-4 py-3 bg-white/5 rounded-lg">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pilihan Tema</span>
                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        variant={theme === 'light' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className={cn(
                          "h-8 text-[11px] font-semibold rounded-md cursor-pointer",
                          theme === 'light' ? "bg-white/10 text-white hover:bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Sun className="h-3.5 w-3.5 mr-1" />
                        Terang
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className={cn(
                          "h-8 text-[11px] font-semibold rounded-md cursor-pointer",
                          theme === 'dark' ? "bg-white/10 text-white hover:bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Moon className="h-3.5 w-3.5 mr-1" />
                        Gelap
                      </Button>
                      <Button
                        variant={theme === 'system' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setTheme('system')}
                        className={cn(
                          "h-8 text-[11px] font-semibold rounded-md cursor-pointer",
                          theme === 'system' ? "bg-white/10 text-white hover:bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Monitor className="h-3.5 w-3.5 mr-1" />
                        Sistem
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-slate-400 border-slate-700 bg-transparent hover:bg-white/5 hover:text-white gap-2 text-sm cursor-pointer h-9 rounded-lg"
                    asChild
                  >
                    <a href={getWhatsappLink()} target="_blank" rel="noreferrer">
                      <MessageSquare className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="warning" className="w-full font-semibold text-sm h-9 rounded-lg cursor-pointer" asChild>
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
