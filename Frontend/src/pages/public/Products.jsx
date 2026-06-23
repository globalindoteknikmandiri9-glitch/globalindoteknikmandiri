import { useState, useMemo, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, Package, CheckCircle2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import { cn, getAssetUrl } from "@/lib/utils"
import api from "@/services/axios"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"

const STOCK_STATUS_MAP = {
  available: "Tersedia",
  preorder: "Pre-Order",
  custom: "Custom Made"
}

const STOCK_OPTIONS = Object.values(STOCK_STATUS_MAP)
const ITEMS_PER_PAGE = 9

export default function Products() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedStock, setSelectedStock] = useState([])
  const [page, setPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productsData, setProductsData] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get("/public/products"),
          api.get("/public/categories")
        ])
        setProductsData(prodRes.data)
        setCategories(catRes.data.map(c => c.name))
      } catch (err) {
        console.error("Gagal memuat produk", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const toggleFilter = (val, list, setList) => {
    setList(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
    setPage(1)
  }

  const filtered = useMemo(() => {
    return productsData.filter(p => {
      const catName = p.category?.name || ""
      const spec = p.specification || ""
      const statusLabel = STOCK_STATUS_MAP[p.status] || p.status
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        spec.toLowerCase().includes(search.toLowerCase()) ||
        catName.toLowerCase().includes(search.toLowerCase())
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(catName)
      const matchStock = selectedStock.length === 0 || selectedStock.includes(statusLabel)
      return matchSearch && matchCat && matchStock
    })
  }, [productsData, search, selectedCategories, selectedStock])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const paginationPages = () => {
    const pages = []
    const delta = 1
    const left = Math.max(2, page - delta)
    const right = Math.min(totalPages - 1, page + delta)
    pages.push(1)
    if (left > 2) pages.push("...")
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < totalPages - 1) pages.push("...")
    if (totalPages > 1) pages.push(totalPages)
    return pages
  }

  const getProductImage = (product) => {
    const img = product.images?.find(i => i.is_primary)?.image_url || product.images?.[0]?.image_url
    return img ? getAssetUrl(img) : null
  }

  const getProductSku = (product) => `GTM-PD-${String(product.id).padStart(3, "0")}`

  const getYouTubeId = (url) => {
    if (!url) return null
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const handleInquiry = (product) => {
    setSelectedProduct(null)
    navigate(`/hubungi-kami?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(getProductSku(product))}`)
  }

  const renderFilters = () => (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">Cari Katalog</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Cari nama, spesifikasi, SKU..."
            className="pl-9 h-9 text-xs border-slate-200 bg-white"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">Kategori</label>
        <div className="space-y-2.5">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                className="border-slate-300 data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669] rounded h-4 w-4"
              />
              <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">Status Ketersediaan</label>
        <div className="space-y-2.5">
          {STOCK_OPTIONS.map(s => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                id={`stock-${s}`}
                checked={selectedStock.includes(s)}
                onCheckedChange={() => toggleFilter(s, selectedStock, setSelectedStock)}
                className="border-slate-300 data-[state=checked]:bg-[#059669] data-[state=checked]:border-[#059669] rounded h-4 w-4"
              />
              <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">{s}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedStock.length > 0 || search) && (
        <button
          onClick={() => { setSelectedCategories([]); setSelectedStock([]); setSearch(""); setPage(1) }}
          className="text-xs text-[#059669] hover:text-[#059669]/80 font-semibold transition-colors"
        >
          Hapus semua filter
        </button>
      )}
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Katalog Pengadaan Alat Teknik & Manufaktur — CV Globalindo Teknik Mandiri</title>
        <meta
          name="description"
          content="Katalog resmi pengadaan alat marka jalan, perlengkapan keselamatan jalan, meja laboratorium, dan mesin pertanian perkebunan CV Globalindo Teknik Mandiri."
        />
      </Helmet>

      <div className="bg-white min-h-screen">
        {/* Page Header */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <nav className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Link to="/" className="hover:text-[#059669] transition-colors">Beranda</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-700">Produk</span>
            </nav>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Katalog Produk B2B</h1>
            <p className="text-slate-500 text-sm leading-relaxed mt-2 max-w-xl">
              Spesifikasi peralatan industri resmi siap suplai untuk tender kementerian, proyek konstruksi nasional, BUMN, dan laboratorium riset universitas.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar Desktop */}
            <aside className="w-60 shrink-0 hidden lg:block">
              <div className="sticky top-24 border border-slate-200/80 rounded-xl p-6 bg-slate-50/50">
                <h2 className="text-xs font-bold text-slate-900 mb-5 pb-3 border-b border-slate-200 uppercase tracking-wider">Filter Katalog</h2>
                {renderFilters()}
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <p className="text-xs text-slate-500 font-medium">
                  {isLoading ? "Memuat produk..." : (
                    <>Menampilkan <span className="font-bold text-slate-900">{filtered.length}</span> produk aktif</>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden flex items-center gap-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors h-9"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter
                  </button>
                  <div className="text-xs text-slate-500 font-medium border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 select-none">
                    Status: Siap Tender
                  </div>
                </div>
              </div>

              {/* Mobile filter drawer */}
              {sidebarOpen && (
                <div className="lg:hidden mb-6 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Filter Pencarian</h3>
                    <button onClick={() => setSidebarOpen(false)} className="text-xs text-slate-500 font-semibold hover:text-slate-900">Tutup</button>
                  </div>
                  {renderFilters()}
                </div>
              )}

              {/* Product Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                      <Skeleton className="w-full aspect-[4/3] bg-slate-100 animate-pulse" />
                      <div className="p-5 space-y-3">
                        <Skeleton className="h-5 w-3/4 bg-slate-100 animate-pulse" />
                        <Skeleton className="h-3 w-1/3 bg-slate-100 animate-pulse" />
                        <Skeleton className="h-4 w-full bg-slate-100 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : paginated.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 max-w-lg mx-auto px-6">
                  <Package className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Produk Tidak Ditemukan</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Maaf, tidak ada produk aktif yang cocok dengan kata kunci pencarian atau filter saat ini.
                  </p>
                  <Button
                    onClick={() => { setSelectedCategories([]); setSelectedStock([]); setSearch(""); setPage(1) }}
                    className="bg-[#0f172a] hover:bg-slate-800 text-white text-xs h-9 px-4 rounded font-semibold"
                  >
                    Atur Ulang Filter
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginated.map(product => (
                      <div
                        key={product.id}
                        className="group bg-white border border-slate-200/80 rounded-xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 border-b border-slate-100 shrink-0">
                          {getProductImage(product) ? (
                            <img
                              src={getProductImage(product)}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-12 w-12 text-slate-200" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-white/95 px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase text-slate-800 border border-slate-200 flex items-center gap-1 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                            {STOCK_STATUS_MAP[product.status] || product.status}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1 justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                              <span>{product.category?.name || "Lainnya"}</span>
                              <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">{getProductSku(product)}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-[#059669] transition-colors line-clamp-1">{product.name}</h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{product.specification || product.description || "-"}</p>
                          </div>
                          <div className="pt-4 border-t border-slate-100">
                            <Button
                              variant="outline"
                              className="w-full text-xs h-9 text-slate-700 border-slate-200 hover:bg-slate-50 gap-1.5 rounded"
                              onClick={() => setSelectedProduct(product)}
                            >
                              Detail Spesifikasi
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-1">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
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
                              page === p ? "bg-[#0f172a] border-[#0f172a] text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                            )}
                          >
                            {p}
                          </button>
                        )
                      )}
                      <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={open => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-lg bg-white border border-slate-200 rounded-xl p-0 overflow-hidden shadow-lg max-h-[90vh] flex flex-col">

            {/* Header: full image, no crop, capped height */}
            <div className="relative w-full shrink-0 bg-slate-900 border-b border-slate-100 overflow-hidden">
              {getProductImage(selectedProduct) ? (
                <div className="w-full aspect-[4/3] max-h-48">
                  <img
                    src={getProductImage(selectedProduct)}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-slate-100">
                  <Package className="h-14 w-14 text-slate-200" />
                </div>
              )}
              {/* Gradient overlay + title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#059669] text-white px-2 py-0.5 rounded inline-block mb-1.5">
                  {selectedProduct.category?.name || "Lainnya"}
                </span>
                <DialogTitle className="text-base font-bold text-white leading-snug line-clamp-2 drop-shadow">
                  {selectedProduct.name}
                </DialogTitle>
                <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                  {getProductSku(selectedProduct)} · {STOCK_STATUS_MAP[selectedProduct.status] || selectedProduct.status}
                </div>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">

              {/* YouTube embed — fluid 16:9 */}
              {getYouTubeId(selectedProduct.youtube_url) && (
                <div className="rounded-lg overflow-hidden border border-slate-100 bg-black">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedProduct.youtube_url)}?rel=0&modestbranding=1`}
                      title={selectedProduct.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {selectedProduct.specification && (
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg">
                  <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">Spesifikasi Teknis</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-line">{selectedProduct.specification}</p>
                </div>
              )}

              <div>
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-1.5">Deskripsi Produk</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{selectedProduct.description || "-"}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" /> Surat Dukungan</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" /> Sertifikasi TKDN</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-100 shrink-0">
              <DialogClose asChild>
                <Button variant="ghost" className="text-xs text-slate-500 hover:text-slate-900 h-8">Tutup</Button>
              </DialogClose>
              <Button
                className="bg-[#059669] hover:bg-[#059669]/90 text-white text-xs h-8 px-3 font-semibold rounded gap-1.5"
                onClick={() => handleInquiry(selectedProduct)}
              >
                <FileText className="h-3.5 w-3.5" />
                Minta Penawaran (RFQ)
              </Button>
            </div>

          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
