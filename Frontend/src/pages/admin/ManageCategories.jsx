import { useState, useMemo } from "react"
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Tags } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const mockCategories = [
  { id: 1, name: "Alat Marka Jalan", slug: "alat-marka-jalan", productCount: 12, createdAt: "2026-05-10" },
  { id: 2, name: "Peralatan Safety Jalan", slug: "peralatan-safety-jalan", productCount: 15, createdAt: "2026-05-12" },
  { id: 3, name: "Laboratorium & Alat Uji", slug: "laboratorium-alat-uji", productCount: 22, createdAt: "2026-05-15" },
  { id: 4, name: "Mesin Pertanian & Sadap", slug: "mesin-pertanian-sadap", productCount: 8, createdAt: "2026-05-18" },
  { id: 5, name: "Bor Tanah & Pertambangan", slug: "bor-tanah-pertambangan", productCount: 6, createdAt: "2026-05-20" },
]

const ITEMS_PER_PAGE = 5

export default function ManageCategories() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return mockCategories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Kelola Kategori</h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-450 mt-0.5">Manajemen kategori produk untuk klasifikasi katalog.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white font-bold gap-2 h-10 px-4 text-sm shrink-0 rounded-lg cursor-pointer shadow-card">
          <Plus className="h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-550" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Cari kategori berdasarkan nama atau slug..."
            className="pl-9 h-10 text-xs border-border bg-background focus-visible:ring-accent"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-b border-border">
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-16">ID</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Nama Kategori</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Slug URL</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Jumlah Produk</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Tanggal Dibuat</th>
                <th className="text-center px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-500">
                    <Tags className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-bold text-slate-700 dark:text-slate-350">Kategori tidak ditemukan</p>
                  </td>
                </tr>
              ) : paginated.map((category) => (
                <tr key={category.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-slate-500 dark:text-slate-400">{category.id}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-slate-100">{category.name}</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 font-mono text-xs">{category.slug}</td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 font-semibold">{category.productCount} Produk</td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">{category.createdAt}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        aria-label="Edit Kategori"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                        aria-label="Hapus Kategori"
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
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-border flex items-center justify-between">
            <p className="text-slate-500 dark:text-slate-450 text-xs font-semibold">
              Menampilkan <span className="text-slate-900 dark:text-white">{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span> – <span className="text-slate-900 dark:text-white">{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> dari <span className="text-slate-900 dark:text-white">{filtered.length}</span> kategori
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
        )}
      </div>
    </div>
  )
}
