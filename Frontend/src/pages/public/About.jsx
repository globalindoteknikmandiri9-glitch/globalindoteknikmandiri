import { Helmet } from "react-helmet-async"
import { CheckCircle, Award, Users, Package, MapPin, ArrowRight, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { companyData } from "@/data/company"

const values = [
  {
    title: "Integritas & Transparansi",
    desc: "Menjunjung tinggi kejujuran hukum dalam setiap transaksi, penerbitan faktur pajak resmi, dan dokumen dukungan tender.",
  },
  {
    title: "Kapasitas & Presisi",
    desc: "Memastikan seluruh barang hasil fabrikasi lokal diproduksi presisi menggunakan mesin CNC dan las argon handal.",
  },
  {
    title: "Kepatuhan Regulasi",
    desc: "Mengedepankan kepatuhan penuh terhadap standar mutu SNI, spesifikasi teknis Kementerian Perhubungan, dan komitmen TKDN.",
  },
  {
    title: "Layanan Purna Jual",
    desc: "Tidak sekadar menjual, kami mengirim teknisi internal untuk supervisi instalasi, kalibrasi berkala, dan training operator.",
  },
]

export default function About() {
  const credentials = [
    { label: "Tahun Berdiri", value: companyData.established, icon: Award },
    { label: "Mitra Aktif B2B", value: "50+ Perusahaan", icon: Users },
    { label: "Katalog Produk", value: "500+ SKU", icon: Package },
    { label: "Layanan Pengiriman", value: "Nasional", icon: MapPin },
  ]

  return (
    <>
      <Helmet>
        <title>Profil Perusahaan — CV Globalindo Teknik Mandiri</title>
        <meta
          name="description"
          content="Sejarah dan kredibilitas pabrikasi CV Globalindo Teknik Mandiri — produsen lokal mesin marka jalan dan furniture lab sejak 2009 di Bogor."
        />
      </Helmet>

      {/* Page Header */}
      <div className="bg-card border-b border-border text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <nav className="text-[11px] text-muted-foreground/60 mb-3 flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <Link to="/" className="hover:text-accent transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-muted-foreground">Tentang Kami</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">Tentang Perusahaan</h1>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed mt-2">
            Mengenal rekam jejak, legalitas hukum, dan kapasitas produksi fisik CV Globalindo Teknik Mandiri sebagai pabrikator teknik nasional terpercaya.
          </p>
        </div>
      </div>

      {/* Sejarah & Latar Belakang - Editorial 2 Column */}
      <section className="bg-background py-20 text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-2">
                Rekam Jejak 15+ Tahun
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight mb-5">Sejarah & Komitmen Manufaktur</h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  CV Globalindo Teknik Mandiri didirikan pada tahun {companyData.established} di Kota Bogor, Jawa Barat dengan visi mendukung kemandirian infrastruktur permesinan dalam negeri. Kami fokus mengembangkan divisi fabrikasi logam dan perdagangan umum untuk alat uji material teknik sipil serta marka jalan.
                </p>
                <p>
                  Melalui pengalaman menyuplai pengadaan barang selama lebih dari 15 tahun, kami telah dipercaya oleh berbagai dinas kementerian, kontraktor jalan tol BUMN, serta laboratorium pengujian universitas negeri. Kami memiliki fasilitas workshop fisik terintegrasi di Bogor untuk menjamin ketersediaan sparepart dan kalibrasi alat.
                </p>
                <p>
                  Komitmen kami tertuang dalam penyediaan dokumen administrasi tender lengkap, faktur pajak resmi, serta kepatuhan TKDN guna memberikan keamanan bertransaksi bagi seluruh mitra kerja sama kami.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted/50 h-10 text-sm rounded-lg" asChild>
                  <Link to="/hubungi-kami">
                    Ajukan RFQ Formal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative border border-border rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
                alt="Proses Perakitan Mesin di Workshop Bogor"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credentials / Stats */}
      <section className="bg-muted/30 border-y border-border py-20 text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((c, i) => (
              <div key={i} className="surface-card p-8 flex flex-col items-center text-center hover:-translate-y-0.5">
                <div className="w-10 h-10 bg-muted/30 border border-border/40 rounded-xl flex items-center justify-center mb-4">
                  <c.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold text-foreground">{c.value}</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wide">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-background py-20 text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight mb-8">Visi & Misi Perusahaan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-10 shadow-md hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Visi Utama</p>
              <h3 className="font-semibold text-foreground text-lg mb-3 leading-snug">
                Menjadi pabrikator alat teknik nasional terkemuka yang tepercaya dalam kualitas dan integritas.
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kami berkomitmen menjadi pemimpin pasar industri permesinan sipil skala nasional dengan mengedepankan standardisasi mutu dan kemudahan proses administrasi B2B pemerintah maupun swasta.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-10 shadow-md hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Misi Operasional</p>
              <ul className="space-y-4">
                {[
                  "Menghasilkan produk manufaktur presisi bergaransi resmi.",
                  "Menyediakan dokumen pendukung tender (TKDN, LKPP, E-Faktur) secara transparan.",
                  "Mengutamakan purna jual meliputi kalibrasi alat dan pelatihan operator di lapangan.",
                  "Membangun hubungan kemitraan jangka panjang berlandaskan integritas hukum.",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-accent mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted/30 border-t border-border py-20 text-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight mb-8">Nilai Inti Perusahaan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="surface-card p-8 hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-xl bg-background border border-border flex items-center justify-center mb-4">
                  <span className="text-muted-foreground font-bold text-xs">{i + 1}</span>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
