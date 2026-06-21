import { useState, useMemo } from "react"
import { Search, Calendar, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Semua Kategori", "Panduan Teknis", "Berita Industri", "Update Produk"]

const ARTICLES = [
  {
    id: 1,
    title: "Optimasi Kecepatan Putaran CNC untuk Material Baja Paduan",
    excerpt: "Panduan komprehensif mengenai penyesuaian parameter pemotongan untuk memaksimalkan umur alat dan efisiensi produksi pada material baja paduan tinggi.",
    category: "Panduan Teknis",
    date: "12 Oktober 2024",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
  },
  {
    id: 2,
    title: "Tren Otomatisasi Gudang Logistik Manufaktur 2025",
    excerpt: "Analisis mendalam mengenai bagaimana integrasi robotika dan sistem manajemen inventaris berbasis AI mengubah lanskap logistik manufaktur global.",
    category: "Berita Industri",
    date: "05 Oktober 2024",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    id: 3,
    title: "Rilis Seri Bantalan Beban Berat G-Series Terbaru",
    excerpt: "Memperkenalkan lini produk terbaru kami yang dirancang khusus untuk aplikasi pertambangan dan alat berat dengan ketahanan ekstra hingga 50% lebih lama.",
    category: "Update Produk",
    date: "28 September 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: 4,
    title: "Protokol Pemeliharaan Preventif untuk Sistem Hidrolik",
    excerpt: "Langkah-langkah esensial untuk mencegah downtime tidak terencana melalui jadwal pemeliharaan hidrolik yang terstruktur dan berbasis data sensor.",
    category: "Panduan Teknis",
    date: "15 September 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    id: 5,
    title: "Standar Keselamatan OSHA untuk Area Produksi Berat",
    excerpt: "Ringkasan regulasi keselamatan terbaru yang wajib dipatuhi oleh fasilitas produksi berat di Indonesia, dilengkapi dengan checklist implementasi.",
    category: "Berita Industri",
    date: "02 September 2024",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?w=600&q=80",
  },
  {
    id: 6,
    title: "Spesifikasi Teknis Pompa Sentrifugal Seri CP-1200",
    excerpt: "Dokumentasi teknis lengkap termasuk kurva kinerja, toleransi operasional, dan panduan instalasi untuk pompa sentrifugal unggulan kami.",
    category: "Update Produk",
    date: "20 Agustus 2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
]

const ITEMS_PER_PAGE = 9

const categoryColors = {
  "Panduan Teknis": "bg-blue-50 text-blue-700 border-blue-200",
  "Berita Industri": "bg-amber-50 text-amber-700 border-amber-200",
  "Update Produk": "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("Semua Kategori")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const matchCat = activeCategory === "Semua Kategori" || a.category === activeCategory
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setPage(1)
  }

  const paginationPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = [1]
    if (page > 3) pages.push("...")
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (page < totalPages - 2) pages.push("...")
    pages.push(totalPages)
    return pages
  }

  return (
    <>
      <Helmet>
        <title>Artikel & Berita — CV Globalindo Teknik Mandiri</title>
        <meta name="description" content="Wawasan industri terbaru, panduan teknis, dan pembaruan produk dari CV Globalindo Teknik Mandiri." />
      </Helmet>

      <div className="bg-white min-h-screen">
        {/* Page header */}
        <div className="border-b border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Artikel</p>
            <h1 className="text-3xl font-bold text-slate-900">Artikel & Berita Teknik</h1>
            <p className="text-slate-500 mt-2 max-w-xl leading-relaxed">
              Jelajahi wawasan industri terbaru, panduan teknis mendalam, dan pembaruan produk dari CV Globalindo Teknik Mandiri.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          {/* Search + Filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10 pb-6 border-b border-slate-100">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                placeholder="Cari artikel..."
                className="w-full pl-9 pr-4 h-9 border border-slate-200 rounded-lg text-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    activeCategory === cat
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-20 border border-slate-100 rounded-lg bg-slate-50">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-700 mb-1">Artikel tidak ditemukan</h3>
              <p className="text-sm text-slate-500">Coba ubah kata kunci atau kategori.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((article) => (
                <article
                  key={article.id}
                  className="group border border-slate-200 rounded-lg overflow-hidden bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    {/* Category badge overlaid */}
                    <div className="absolute top-3 right-3">
                      <span className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded border",
                        categoryColors[article.category] || "bg-white text-slate-600 border-slate-200"
                      )}>
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                      <Calendar className="h-3.5 w-3.5" />
                      <time>{article.date}</time>
                    </div>
                    <h2 className="font-semibold text-slate-900 text-base leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {paginationPages().map((p, i) =>
                p === "..." ? (
                  <span key={`e-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-slate-400">···</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-9 h-9 flex items-center justify-center rounded border text-sm font-medium transition-colors",
                      page === p
                        ? "bg-[#0f172a] border-[#0f172a] text-white"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
