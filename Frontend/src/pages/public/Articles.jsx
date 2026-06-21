import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Search, Calendar, ChevronLeft, ChevronRight, BookOpen, Clock, ChevronRight as ChevronRightIcon } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { articlesData } from "@/data/articles"

const CATEGORIES = ["Semua Kategori", "Panduan Kalibrasi", "Metode Marka Jalan", "Panduan Lab & Furniture"]

const categoryColors = {
  "Panduan Kalibrasi": "bg-blue-50 text-blue-700 border-blue-200",
  "Metode Marka Jalan": "bg-amber-50 text-amber-700 border-amber-200",
  "Panduan Lab & Furniture": "bg-emerald-50 text-emerald-700 border-emerald-200",
}

const ITEMS_PER_PAGE = 6

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("Semua Kategori")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return articlesData.filter((a) => {
      const matchCat = activeCategory === "Semua Kategori" || a.category === activeCategory
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.summary.toLowerCase().includes(search.toLowerCase())
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
        <title>Knowledge Center & Panduan Teknis — CV Globalindo Teknik Mandiri</title>
        <meta
          name="description"
          content="Jelajahi panduan teknis manufaktur, metode kalibrasi alat laboratorium sipil, dan spesifikasi cat marka jalan dari tim engineering CV Globalindo Teknik Mandiri."
        />
      </Helmet>

      <div className="bg-white min-h-screen">
        {/* Page Header */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <nav className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Link to="/" className="hover:text-[#059669] transition-colors">Beranda</Link>
              <ChevronRightIcon className="h-3 w-3" />
              <span className="text-slate-700">Knowledge Center</span>
            </nav>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Knowledge Center</h1>
            <p className="text-slate-500 text-sm leading-relaxed mt-2 max-w-xl">
              Dokumentasi teknis, panduan kalibrasi alat uji sipil, dan regulasi marka jalan dari tim engineering CV Globalindo Teknik Mandiri.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Search + Filter bar */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10 pb-6 border-b border-slate-150">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                placeholder="Cari panduan teknis..."
                className="w-full pl-9 pr-4 h-9 border border-slate-200 rounded-lg text-xs bg-white text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-[#059669] focus:border-[#059669] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer",
                    activeCategory === cat
                      ? "bg-[#0f172a] text-white border-[#0f172a]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-350 hover:text-slate-900"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 max-w-md mx-auto px-6">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Artikel Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Maaf, kami tidak dapat menemukan panduan teknis yang sesuai dengan pencarian atau filter kategori saat ini.
              </p>
              <Button
                onClick={() => { setActiveCategory("Semua Kategori"); setSearch(""); setPage(1) }}
                className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs h-9 px-4 rounded font-semibold"
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((article) => (
                <article
                  key={article.id}
                  className="group bg-white border border-slate-200/80 rounded-xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-slate-50 border-b border-slate-100 shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    {/* Category badge overlaid */}
                    <div className="absolute top-3 right-3">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider shadow-xs",
                        categoryColors[article.category] || "bg-white text-slate-600 border-slate-200"
                      )}>
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-450 mb-3 font-semibold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <time>{article.date}</time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>
                      <h2 className="font-bold text-slate-900 text-sm leading-snug mb-3 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1 group-hover:text-[#059669] transition-colors">
                        Baca Selengkapnya
                        <ChevronRightIcon className="h-3.5 w-3.5" />
                      </span>
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
                      "w-9 h-9 flex items-center justify-center rounded border text-xs font-bold transition-colors",
                      page === p
                        ? "bg-[#0f172a] border-[#0f172a] text-white"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
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
