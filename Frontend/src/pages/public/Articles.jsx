import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Search, Calendar, ChevronLeft, ChevronRight, BookOpen, Clock, ChevronRight as ChevronRightIcon } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { articlesData } from "@/data/articles"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

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
  const [selectedArticle, setSelectedArticle] = useState(null)

  const articleDetails = {
    "art-01": {
      sections: [
        {
          title: "1. Persiapan Sampel Silinder Beton",
          text: "Sampel silinder beton dengan ukuran diameter 150 mm dan tinggi 300 mm dicetak menggunakan cetakan besi standar. Sampel harus dikondisikan dalam bak perendaman air (curing tank) bersuhu konstan 23°C ± 2°C selama masa perawatan (7, 14, atau 28 hari) untuk memastikan hidrasi semen berjalan optimal."
        },
        {
          title: "2. Proses Capping Belerang (Sulfur Capping)",
          text: "Sesuai ASTM C-39, kedua ujung permukaan silinder beton harus benar-benar rata dan tegak lurus dengan sumbunya. Kami menerapkan pelapisan cap menggunakan campuran sulfur cair panas (capping belerang) setebal 2-3 mm untuk meratakan permukaan bidang tekan agar distribusi beban hidrolik merata."
        },
        {
          title: "3. Pengujian Tekan dengan Compression Machine 2000 kN",
          text: "Silinder diletakkan tepat di tengah pelat tekan mesin uji. Pembebanan diberikan secara kontinu tanpa hentakan dengan laju konstan antara 0.2 MPa/s hingga 0.3 MPa/s hingga beton mengalami keruntuhan (pecah). Catat beban maksimum dan perhatikan pola retakan spesimen."
        },
        {
          title: "4. Kalibrasi Alat Uji & Laporan Kepatuhan PUPR",
          text: "Sangat krusial untuk mengalibrasi mesin uji tekan beton secara periodik minimal 1 kali setahun oleh badan kalibrasi KAN. Laporan pengujian wajib mencantumkan dimensi aktual sampel, beban hancur maksimum, kuat tekan terhitung dalam MPa, tipe retak beton, dan sertifikat kalibrasi alat penekan."
        }
      ]
    },
    "art-02": {
      sections: [
        {
          title: "1. Komposisi Bahan Thermoplastic AASHTO M249",
          text: "Cat thermoplastic tipe AASHTO M249 terdiri dari binder resin sintetis (minimal 18% dari berat total), pigment titanium dioksida (untuk warna putih) atau timbal kromat (untuk warna kuning), pengisi kalsium karbonat, dan campuran glass beads internal (minimal 30-40%) untuk menjamin retroreflektivitas jangka panjang."
        },
        {
          title: "2. Suhu Pengadukan Preheater & Persiapan Permukaan",
          text: "Bahan kering dicairkan dalam tabung pengaduk preheater (boiler) pada suhu kerja 180°C - 200°C. Suhu tidak boleh melebihi 220°C untuk mencegah dekolorisasi resin binder. Permukaan aspal jalan harus dibersihkan dari debu, kelembapan, sisa cat lama, dan oli sebelum pengaplikasian."
        },
        {
          title: "3. Pengaplikasian & Penaburan Glass Beads Tambahan (Drop-on)",
          text: "Cat cair diaplikasikan ke permukaan jalan menggunakan mesin marka GTM-Sprayer atau marka dorong manual dengan ketebalan basah rata-rata 1.5 mm - 3.0 mm. Segera setelah cat keluar, glass beads eksternal ditaburkan di atasnya dengan laju penaburan minimal 300 g/m² menggunakan dispenser penabur otomatis."
        },
        {
          title: "4. Uji Pengeringan & Uji Retroreflektometer",
          text: "Marka jalan yang selesai diaplikasikan harus mengering sempurna dan siap dilewati kendaraan dalam waktu kurang dari 10 menit pada suhu lingkungan 32°C. Pengujian retroreflektivitas dilakukan menggunakan retroreflektometer genggam standar dengan nilai awal minimal 250 mcd/m²/lux untuk putih."
        }
      ]
    },
    "art-03": {
      sections: [
        {
          title: "1. Zonasi Area dan Alur Kerja Laboratorium",
          text: "Desain laboratorium kimia harus memisahkan area basah (wet lab), area instrumen sensitif, dan ruang administrasi/kantor. Meja tengah island bench diletakkan di pusat ruangan dengan jarak minimal 1.2 hingga 1.5 meter terhadap dinding untuk sirkulasi jalan darurat dan evakuasi."
        },
        {
          title: "2. Spesifikasi Material Top Table & Meja Lab",
          text: "Top table meja laboratorium kimia wajib menggunakan bahan tahan asam, basa kuat, pelarut organik, dan panas sedang. Kami merekomendasikan material Phenolic Resin Board (seperti Trespa Athlon) atau Epoxy Resin padat setebal 16-19 mm yang dipasang presisi tanpa celah sambungan pori."
        },
        {
          title: "3. Instalasi Lemari Asam (Fume Hood) & Ducting",
          text: "Lemari asam diletakkan jauh dari pintu masuk utama dan jalur udara AC (diffuser) untuk mencegah turbulensi udara hisap. Kecepatan aliran udara muka (face velocity) harus berkisar antara 0.3 hingga 0.5 m/s dengan sash (pintu geser kaca) terbuka setengah. Blower centrifugal berbahan Polypropylene (PP) diletakkan di luar gedung untuk meminimalkan bising."
        },
        {
          title: "4. Sistem Pengolahan Gas & Utilitas Air Bersih",
          text: "Gas buang dari lemari asam harus dinetralkan melalui unit scrubber basah (wet scrubber) sebelum dibuang ke udara bebas jika mengandung senyawa halogen. Instalasi kran air lab harus menggunakan bahan kuningan lapis epoxy (epoxy-coated brass) dengan bak cuci berbahan PP tahan korosif tinggi."
        }
      ]
    }
  }

  const filtered = useMemo(() => {
    return articlesData.filter((a) => {
      const matchCat = activeCategory === "Semua Kategori" || a.category === activeCategory
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.summary.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  const featuredArticle = useMemo(() => {
    if (page === 1 && !search && activeCategory === "Semua Kategori" && filtered.length > 0) {
      return filtered[0]
    }
    return null
  }, [page, search, activeCategory, filtered])

  const gridArticles = useMemo(() => {
    if (featuredArticle) {
      return filtered.filter((a) => a.id !== featuredArticle.id)
    }
    return filtered
  }, [filtered, featuredArticle])

  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ITEMS_PER_PAGE))
  const paginated = gridArticles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

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

      <div className="bg-background min-h-screen text-foreground">
        {/* Page Header */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <nav className="text-[11px] text-muted-foreground/60 mb-3 flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Link to="/" className="hover:text-accent transition-colors">Beranda</Link>
              <ChevronRightIcon className="h-3 w-3" />
              <span className="text-muted-foreground">Knowledge Center</span>
            </nav>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">Knowledge Center</h1>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2 max-w-xl">
              Dokumentasi teknis, panduan kalibrasi alat uji sipil, dan regulasi marka jalan dari tim engineering CV Globalindo Teknik Mandiri.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Search + Filter bar */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10 pb-6 border-b border-border">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                placeholder="Cari panduan teknis..."
                className="w-full pl-9 pr-4 h-9 border border-border rounded-lg text-xs bg-card text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
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
                      ? "bg-navy text-white border-navy"
                      : "bg-card text-muted-foreground border-border hover:border-border/80 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article Hero */}
          {featuredArticle && (
            <div className="mb-12">
              <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-4">
                Featured Publication
              </span>
              <div 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="group surface-panel overflow-hidden grid lg:grid-cols-12 hover:shadow-card-hover hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[320px] bg-muted/20 overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider shadow-md bg-card text-foreground",
                      categoryColors[featuredArticle.category] || "bg-card text-muted-foreground border-border"
                    )}>
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-4 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <time>{featuredArticle.date}</time>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{featuredArticle.readTime}</span>
                      </span>
                    </div>
                    <h2 className="font-extrabold text-foreground text-xl lg:text-2xl leading-snug mb-4 group-hover:text-accent transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {featuredArticle.summary}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5 group-hover:text-accent transition-colors">
                      Baca Selengkapnya
                      <ChevronRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles grid */}
          {paginated.length === 0 && !featuredArticle ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-muted/20 max-w-md mx-auto px-6">
              <BookOpen className="h-10 w-10 text-muted-foreground/60 mx-auto mb-4" />
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Artikel Tidak Ditemukan</h3>
              <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                Maaf, kami tidak dapat menemukan panduan teknis yang sesuai dengan pencarian atau filter kategori saat ini.
              </p>
              <Button
                variant="navy"
                onClick={() => { setActiveCategory("Semua Kategori"); setSearch(""); setPage(1) }}
                className="text-xs h-9 px-4 rounded font-semibold"
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group surface-card overflow-hidden flex flex-col h-full hover:shadow-card-hover hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-muted/20 border-b border-border shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    {/* Category badge overlaid */}
                    <div className="absolute top-3 right-3">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider shadow-soft-sm",
                        categoryColors[article.category] || "bg-card text-muted-foreground border-border"
                      )}>
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3 font-semibold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <time>{article.date}</time>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>
                      <h2 className="font-bold text-foreground text-sm leading-snug mb-3 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground flex items-center gap-1 group-hover:text-accent transition-colors">
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
                className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                        ? "bg-navy border-navy text-white"
                        : "border-border text-muted-foreground hover:bg-muted/50 hover:border-border/80"
                    )}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Article Detail Dialog Modal */}
      {selectedArticle && (
        <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
          <DialogContent className="max-w-2xl bg-card border border-border rounded-2xl p-0 overflow-hidden shadow-modal">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-card mb-2 inline-block bg-accent text-accent-foreground border-transparent",
                  categoryColors[selectedArticle.category]
                )}>
                  {selectedArticle.category}
                </span>
                <DialogTitle className="text-xl font-bold text-white leading-tight">
                  {selectedArticle.title}
                </DialogTitle>
                <div className="text-[10px] text-slate-300 mt-1">
                  Dipublikasikan: {selectedArticle.date} | Waktu Baca: {selectedArticle.readTime}
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh] text-left animate-page-fade">
              <DialogHeader className="mb-4">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Ringkasan Materi</h4>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-accent pl-3">
                  {selectedArticle.summary}
                </p>

                {articleDetails[selectedArticle.id]?.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">{sec.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {sec.text}
                    </p>
                  </div>
                ))}

                <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
                  <span>CV Globalindo Teknik Mandiri — Engineering & Quality Assurance</span>
                  <DialogClose asChild>
                    <Button variant="outline" className="text-xs h-9 rounded-lg shadow-soft-sm self-end sm:self-auto">
                      Selesai Membaca
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
