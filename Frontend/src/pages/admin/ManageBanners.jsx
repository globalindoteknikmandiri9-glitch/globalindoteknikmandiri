import { useState, useMemo, useEffect } from "react"
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn, getAssetUrl } from "@/lib/utils"
import api from "@/services/axios"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

const ITEMS_PER_PAGE = 5

export default function ManageBanners() {
  const [banners, setBanners] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)

  // Form state
  const [formData, setFormData] = useState({ title: "", link: "", is_active: true })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  const fetchBanners = async () => {
    try {
      Promise.resolve().then(() => setLoading(true))
      const res = await api.get("/admin/banners")
      setBanners(res.data)
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengambil data banner")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner)
      setFormData({ 
        title: banner.title || "", 
        link: banner.link || "", 
        is_active: banner.is_active 
      })
      setImagePreview(banner.image_url ? getAssetUrl(banner.image_url) : "")
      setImageFile(null)
    } else {
      setEditingBanner(null)
      setFormData({ title: "", link: "", is_active: true })
      setImagePreview("")
      setImageFile(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingBanner(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!editingBanner && !imageFile) {
      toast.error("Gambar banner wajib diunggah untuk banner baru")
      return
    }

    const data = new FormData()
    data.append("title", formData.title)
    data.append("link", formData.link)
    data.append("is_active", formData.is_active)
    if (imageFile) {
      data.append("image", imageFile)
    }

    try {
      if (editingBanner) {
        await api.put(`/admin/banners/${editingBanner.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        toast.success("Banner berhasil diperbarui")
      } else {
        await api.post("/admin/banners", data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        toast.success("Banner berhasil ditambahkan")
      }
      handleCloseModal()
      fetchBanners()
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menyimpan banner")
    }
  }

  const handleDeleteClick = (banner) => {
    setEditingBanner(banner)
    setIsDeleteOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/admin/banners/${editingBanner.id}`)
      toast.success("Banner berhasil dihapus")
      setIsDeleteOpen(false)
      fetchBanners()
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus banner")
    }
  }

  const filtered = useMemo(() => {
    return banners.filter((b) =>
      (b.title || "").toLowerCase().includes(search.toLowerCase())
    )
  }, [banners, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div className="space-y-6 text-left animate-page-fade">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Kelola Banner</h1>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">Manajemen gambar banner slider di halaman Beranda.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-navy hover:bg-navy/90 text-white font-bold gap-2 h-10 px-4 text-sm shrink-0 rounded-lg shadow-sm">
          <Plus className="h-4 w-4" />
          Tambah Banner
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Cari judul banner..."
            className="pl-9 h-10 text-xs border-slate-200"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-16">ID</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-24">Gambar</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Judul</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Tanggal Dibuat</th>
                <th className="text-center px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-500">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
                    <p className="text-sm font-semibold">Memuat banner...</p>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-500">
                    <ImageIcon className="h-10 w-10 mx-auto text-slate-300 mb-3" />
                    <p className="text-sm font-semibold text-slate-900">Tidak ada banner</p>
                    <p className="text-xs text-slate-500 mt-1">Belum ada banner yang ditambahkan atau cocok dengan pencarian.</p>
                  </td>
                </tr>
              ) : (
                paginated.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-4 text-xs font-medium text-slate-500">#{b.id}</td>
                    <td className="px-5 py-4">
                      <div className="w-16 h-10 rounded bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                        {b.image_url ? (
                          <img src={getAssetUrl(b.image_url)} alt={b.title || "Banner"} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="h-4 w-4 m-auto text-slate-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-900">{b.title || "-"}</td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                        b.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                      )}>
                        {b.is_active ? "Aktif" : "Non-Aktif"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-500">
                      {new Date(b.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(b)} className="p-1.5 text-slate-400 hover:text-accent hover:bg-accent/10 rounded transition-colors" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDeleteClick(b)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Hapus">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Halaman {page} dari {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 w-8 p-0 border-slate-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-8 w-8 p-0 border-slate-200"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-slate-200 text-left p-0 overflow-hidden shadow-xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
              {editingBanner ? "Edit Banner" : "Tambah Banner Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Judul Banner (Opsional)</label>
              <Input
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Promo Akhir Tahun"
                className="text-xs h-9 border-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">
                Gambar Banner {!editingBanner && <span className="text-red-500">*</span>}
              </label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 shrink-0 bg-slate-100 border border-slate-200 border-dashed rounded-lg flex items-center justify-center overflow-hidden relative group">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-xs h-9 border-slate-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500 mt-1.5 font-medium">Format: JPG, PNG. Ukuran ideal 1920x600px.</p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">Link Tujuan (Opsional)</label>
              <Input
                value={formData.link}
                onChange={e => setFormData({ ...formData, link: e.target.value })}
                placeholder="Contoh: /produk atau https://..."
                className="text-xs h-9 border-slate-200"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
              />
              <label htmlFor="is_active" className="text-xs font-bold text-slate-700 cursor-pointer">
                Tampilkan di Beranda
              </label>
            </div>

            <DialogFooter className="pt-6 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={handleCloseModal} className="text-xs h-9 text-slate-500 hover:text-slate-900">
                Batal
              </Button>
              <Button type="submit" className="bg-navy hover:bg-navy/90 text-white font-bold text-xs h-9 px-6 rounded-lg shadow-sm">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white border border-slate-200 text-left p-6 shadow-xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight text-center mb-2">Hapus Banner?</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trash2 className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus banner <span className="font-bold text-slate-900">"{editingBanner?.title || 'Ini'}"</span>? 
              <br/>Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <DialogFooter className="sm:justify-center gap-2">
            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} className="text-xs h-10 font-bold text-slate-500 hover:text-slate-900 px-6 rounded-lg">
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} className="text-xs h-10 font-bold bg-red-600 hover:bg-red-700 px-6 rounded-lg shadow-sm">
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
