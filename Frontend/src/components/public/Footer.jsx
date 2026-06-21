import { Link } from "react-router-dom"
import { MapPin, Phone, Mail } from "lucide-react"

const navLinks = [
  { name: "Beranda", path: "/" },
  { name: "Profil Perusahaan", path: "/tentang-kami" },
  { name: "Katalog Produk", path: "/produk" },
  { name: "Artikel & Berita", path: "/artikel" },
  { name: "Hubungi Kami", path: "/hubungi-kami" },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h2 className="text-white font-bold text-lg">CV Globalindo Teknik Mandiri</h2>
              <p className="text-sm mt-3 text-slate-500 leading-relaxed max-w-xs">
                Mitra terpercaya dalam penyediaan peralatan industri dan manufaktur. Melayani perusahaan-perusahaan terkemuka di seluruh Indonesia.
              </p>
            </div>
            <div className="pt-2">
              <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                Est. 2009 · Bekasi, Indonesia
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-slate-600 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-500 leading-relaxed">
                  Jl. Jababeka Raya No.12,<br />Bekasi, Jawa Barat 17530
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-600 shrink-0" />
                <a href="tel:+622189831234" className="text-sm text-slate-500 hover:text-slate-200 transition-colors">
                  +62 21 8983 1234
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-600 shrink-0" />
                <a href="mailto:info@globalindoteknik.com" className="text-sm text-slate-500 hover:text-slate-200 transition-colors">
                  info@globalindoteknik.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} CV Globalindo Teknik Mandiri. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-6 text-xs text-slate-600">
            <Link to="#" className="hover:text-slate-400 transition-colors">Kebijakan Privasi</Link>
            <Link to="#" className="hover:text-slate-400 transition-colors">Syarat Layanan</Link>
            <Link to="#" className="hover:text-slate-400 transition-colors">Dukungan Teknis</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
