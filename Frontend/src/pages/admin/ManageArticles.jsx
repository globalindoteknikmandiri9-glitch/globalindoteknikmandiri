import { useState, useMemo } from "react"
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Semua", "Panduan Teknis", "Berita Industri", "Update Produk"]
const STATUSES = ["Semua", "Published", "Draft"]
const ITEMS_PER_PAGE = 8

const mockArticles = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: [
    "Optimasi Kecepatan Putaran CNC untuk Material Baja Paduan",
    "Tren Otomatisasi Gudang Logistik Manufaktur 2026",
    "Rilis Seri Bantalan Beban Berat G-Series Terbaru",
    "Protokol Pemeliharaan Preventif untuk Sistem Hidrolik",
    "Standar Keselamatan OSHA untuk Area Produksi Berat",
    "Spesifikasi Teknis Pompa Sentrifugal Seri GTM-1200",
  ][i % 6],
  category: ["Panduan Teknis", "Berita Industri", "Update Produk"][i % 3],
  author: ["Admin", "Eng. Sarah Jenkins", "Product Team", "Tim Redaksi"][i % 4],
  publishedAt: i % 5 === 1 ? null : new Date(2026, 5 - (i % 3), 12 - (i % 5)).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
  status: i % 5 === 1 ? "Draft" : "Published",
  image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=64&q=80",
}))

const statusConfig = {
  Published: { label: "Terbit", className: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-450" },
  Draft: { label: "Draf", className: "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400" },
}

export default function ManageArticles() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")
  const [status, setStatus] = useState("Semua")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return mockArticles.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.author.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === "Semua" || a.category === category
      const matchStatus = status === "Semua" || a.status === status
      return matchSearch && matchCat && matchStatus
    })
  }, [search, category, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Kelola Artikel</h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-450 mt-0.5 font-medium">Kelola penerbitan artikel panduan teknis, berita industri, dan update spesifikasi alat.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white font-bold gap-2 h-10 px-4 text-sm shrink-0 rounded-lg cursor-pointer shadow-card">
          <Plus className="h-4 w-4" />
          Tambah Artikel
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-550" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              placeholder="Cari artikel berdasarkan judul atau penulis..."
              className="pl-9 h-10 text-xs border-border bg-background focus-visible:ring-accent"
            />
          </div>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1) }}
            className="h-10 px-3 text-xs border border-border rounded-lg bg-background text-slate-750 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer font-semibold"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c === "Semua" ? "Kategori: Semua" : c}</option>)}
          </select>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1) }}
            className="h-10 px-3 text-xs border border-border rounded-lg bg-background text-slate-750 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer font-semibold"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s === "Semua" ? "Status: Semua" : s}</option>)}
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-b border-border">
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Judul Artikel</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Kategori</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Penulis</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Tanggal Terbit</th>
                <th className="text-center px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-500">
                    <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-bold text-slate-700 dark:text-slate-350">Artikel tidak ditemukan</p>
                  </td>
                </tr>
              ) : paginated.map((article) => (
                <tr key={article.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-slate-900 dark:text-slate-100 hover:text-accent cursor-pointer line-clamp-1">
                      {article.title}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold text-slate-650 dark:text-slate-450">{article.category}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 font-semibold">{article.author}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                      statusConfig[article.status].className
                    )}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {statusConfig[article.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    {article.publishedAt || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        aria-label="Edit Artikel"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                        aria-label="Hapus Artikel"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-4 border-t border-border flex items-center justify-between">
          <p className="text-slate-500 dark:text-slate-450 text-xs font-semibold">
            Menampilkan <span className="text-slate-900 dark:text-white">{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span> – <span className="text-slate-900 dark:text-white">{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> dari <span className="text-slate-900 dark:text-white">{filtered.length}</span> artikel
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-slate-550 dark:text-slate-400 hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-lg border text-xs font-bold transition-colors cursor-pointer",
                  page === i + 1
                    ? "bg-navy border-navy text-white"
                    : "border-border text-slate-600 dark:text-slate-400 hover:bg-background"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-slate-550 dark:text-slate-400 hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Halaman Selanjutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
