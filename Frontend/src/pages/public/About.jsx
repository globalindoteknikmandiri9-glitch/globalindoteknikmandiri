import { Helmet } from "react-helmet-async"
import { CheckCircle, Award, Users, Package, MapPin, ArrowRight, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const credentials = [
  { label: "Tahun Berdiri", value: "2009", icon: Award },
  { label: "Mitra Perusahaan B2B", value: "50+", icon: Users },
  { label: "Produk Tersedia", value: "500+", icon: Package },
  { label: "Layanan Distribusi", value: "Nasional", icon: MapPin },
]

const values = [
  {
    title: "Integritas",
    desc: "Menjunjung tinggi kejujuran dan etika bisnis dalam setiap transaksi dan kemitraan jangka panjang.",
  },
  {
    title: "Komitmen",
    desc: "Berdedikasi penuh untuk menyediakan barang berkualitas dan layanan tepat waktu sesuai kesepakatan.",
  },
  {
    title: "Kualitas",
    desc: "Memastikan setiap produk telah melewati kontrol kualitas yang ketat sebelum dikirim ke pelanggan.",
  },
  {
    title: "Inovasi",
    desc: "Terus mengadopsi perkembangan teknologi terbaru demi efisiensi rantai pasok industri modern.",
  },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>Profil Perusahaan — CV Globalindo Teknik Mandiri</title>
        <meta
          name="description"
          content="Profil lengkap CV Globalindo Teknik Mandiri — mitra terpercaya penyedia peralatan industri dan manufaktur sejak 2009."
        />
      </Helmet>

      {/* Page Header with Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <nav className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 font-semibold">Tentang Kami</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Tentang Perusahaan</h1>
          <p className="text-slate-500 max-w-xl text-base leading-relaxed mt-2">
            Mengenal lebih dekat CV Globalindo Teknik Mandiri, penyedia solusi peralatan industri dan manufaktur terpercaya di Indonesia.
          </p>
        </div>
      </div>

      {/* Company intro + image */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-5">Sejarah & Latar Belakang</h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  CV Globalindo Teknik Mandiri didirikan pada tahun 2009 dengan komitmen untuk menjadi mitra terpercaya dalam penyediaan peralatan industri dan manufaktur bagi perusahaan-perusahaan terkemuka di Indonesia.
                </p>
                <p>
                  Berawal dari perusahaan perdagangan skala menengah, kami kini telah berkembang menjadi distributor peralatan industri yang dipercaya oleh lebih dari 50 perusahaan aktif di berbagai sektor — mulai dari manufaktur, pertambangan, hingga infrastruktur nasional.
                </p>
                <p>
                  Dengan dukungan tim teknisi berpengalaman dan jaringan pemasok internasional, kami mampu menyediakan solusi pengadaan yang komprehensif, tepat waktu, dan sesuai standar industri yang ketat.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 h-10 text-sm rounded-lg" asChild>
                  <Link to="/hubungi-kami">
                    Konsultasi dengan Tim Kami
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356f12?w=800&q=80"
                alt="Fasilitas CV Globalindo Teknik Mandiri"
                className="w-full aspect-[4/3] object-cover rounded-xl shadow-sm border border-slate-200/60"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credentials / Stats */}
      <section className="bg-slate-50 border-y border-slate-200/60 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((c, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{c.value}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-8">Visi & Misi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Visi</p>
              <h3 className="font-semibold text-slate-900 text-lg mb-3 leading-snug">
                Menjadi distributor peralatan industri terkemuka di Indonesia
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Menjadi perusahaan penyedia barang dan jasa terkemuka di tingkat nasional yang mengedepankan kualitas, profesionalisme, dan kepuasan pelanggan secara berkelanjutan.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Misi</p>
              <ul className="space-y-4">
                {[
                  "Memberikan pelayanan dan produk berkualitas tinggi sesuai standar industri.",
                  "Membangun kemitraan jangka panjang yang saling menguntungkan.",
                  "Mengadopsi teknologi terbaru untuk efisiensi rantai pasok.",
                  "Memberikan solusi teknis yang tepat guna dan tepat waktu.",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" />
                    <span className="text-base text-slate-600 leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 border-t border-slate-200/60 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-8">Nilai Inti Perusahaan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
