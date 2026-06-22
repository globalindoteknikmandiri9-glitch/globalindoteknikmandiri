import { useState, useMemo } from "react"
import { Plus, Search, Pencil, Trash2, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Semua", "Alat Marka Jalan", "Peralatan Safety Jalan", "Laboratorium & Alat Uji", "Mesin Pertanian & Sadap", "Bor Tanah & Pertambangan"]
const STATUSES = ["Semua", "In Stock", "Out of Stock"]
const ITEMS_PER_PAGE = 8

const sampleProducts = [
  { id: "p-01", sku: "GTM-MJ-01", name: "Mesin Marka Jalan GTM-Sprayer", category: "Alat Marka Jalan", stock: "In Stock", stockQty: 4, createdAt: "2026-05-10", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=150" },
  { id: "p-02", sku: "GTM-LU-20", name: "Concrete Compression Machine 2000 kN", category: "Laboratorium & Alat Uji", stock: "In Stock", stockQty: 2, createdAt: "2026-05-15", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=150" },
  { id: "p-03", sku: "GTM-LF-08", name: "Meja Laboratorium Island Bench", category: "Laboratorium & Alat Uji", stock: "In Stock", stockQty: 5, createdAt: "2026-05-20", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=150" },
  { id: "p-04", sku: "GTM-MP-12", name: "Mesin Sadap Karet Motorized", category: "Mesin Pertanian & Sadap", stock: "In Stock", stockQty: 12, createdAt: "2026-05-22", image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=150" },
  { id: "p-05", sku: "GTM-BT-03", name: "Alat Bor Tanah Manual Soil Auger", category: "Bor Tanah & Pertambangan", stock: "In Stock", stockQty: 18, createdAt: "2026-05-25", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=150" },
  { id: "p-06", sku: "GTM-PJ-02", name: "Road Barrier / Water Barrier PE SNI", category: "Peralatan Safety Jalan", stock: "In Stock", stockQty: 85, createdAt: "2026-05-26", image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=150" },
  { id: "p-07", sku: "GTM-PJ-05", name: "Delineator Post Plastik HDPE", category: "Peralatan Safety Jalan", stock: "In Stock", stockQty: 140, createdAt: "2026-05-28", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=150" },
  { id: "p-08", sku: "GTM-LF-12", name: "Lemari Asam Laboratorium Fume Hood", category: "Laboratorium & Alat Uji", stock: "Out of Stock", stockQty: 0, createdAt: "2026-06-01", image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=150" },
]

const stockConfig = {
  "In Stock": { label: "Tersedia", className: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-250 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-450" },
  "Out of Stock": { label: "Habis", className: "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400" }
}

export default function ManageProducts() {
  const [products] = useState(sampleProducts)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Semua")
  const [status, setStatus] = useState("Semua")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === "Semua" || p.category === category
      const matchStatus = status === "Semua" || p.stock === status
      return matchSearch && matchCat && matchStatus
    })
  }, [products, search, category, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manajemen Produk</h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-450 mt-0.5">Kelola data produk, spesifikasi teknis, dan jumlah stok aktif.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white font-bold gap-2 h-10 px-4 text-sm shrink-0 rounded-lg cursor-pointer shadow-card">
          <Plus className="h-4 w-4" />
          Tambah Produk
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
              placeholder="Cari produk berdasarkan nama atau SKU..."
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
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-16">Foto</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Nama Produk</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Kategori</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status Stok</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Dibuat</th>
                <th className="text-center px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-500">
                    <Package className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-bold text-slate-700 dark:text-slate-350">Produk tidak ditemukan</p>
                    <p className="text-xs mt-1 text-slate-400">Coba ubah kata kunci pencarian atau filter.</p>
                  </td>
                </tr>
              ) : paginated.map((product) => (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="w-10 h-10 rounded-lg border border-border overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "" }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{product.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">{product.sku}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 font-medium">{product.category}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                      stockConfig[product.stock].className
                    )}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {stockConfig[product.stock].label}
                      {product.stock !== "Out of Stock" && <span className="text-[10px] opacity-70"> ({product.stockQty})</span>}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">{product.createdAt}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        aria-label="Edit Produk"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                        aria-label="Hapus Produk"
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
            Menampilkan <span className="text-slate-900 dark:text-white">{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span> – <span className="text-slate-900 dark:text-white">{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> dari <span className="text-slate-900 dark:text-white">{filtered.length}</span> produk
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
