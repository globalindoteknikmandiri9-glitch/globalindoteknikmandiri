import { Mail, Phone, MapPin, CheckCircle, Headphones, Truck, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import * as z from "zod"
import { cn } from "@/lib/utils"

const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter" }),
  email: z.string().email({ message: "Alamat email tidak valid" }),
  phone: z.string().min(8, { message: "Nomor telepon tidak valid" }),
  message: z.string().min(10, { message: "Pesan terlalu singkat, minimal 10 karakter" }),
})

const contactItems = [
  {
    icon: MapPin,
    label: "Kantor & Workshop",
    lines: [
      "Kawasan Industri Cikarang",
      "Jl. Jababeka Raya No.12",
      "Bekasi, Jawa Barat 17530",
    ],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["info@globalindoteknik.com", "sales@globalindoteknik.com"],
    href: ["mailto:info@globalindoteknik.com", "mailto:sales@globalindoteknik.com"],
  },
  {
    icon: Phone,
    label: "Telepon & WhatsApp",
    lines: ["+62 21 8983 1234 (Kantor)", "+62 811 1234 5678 (WhatsApp)"],
    href: ["tel:+622189831234", "https://wa.me/6281112345678"],
  },
]

const trustItems = [
  { icon: CheckCircle, title: "Respon Cepat", desc: "Kami merespons setiap pertanyaan dalam 1×24 jam kerja." },
  { icon: Shield, title: "Produk Berkualitas", desc: "Seluruh produk memenuhi standar industri nasional." },
  { icon: Headphones, title: "Dukungan Teknis", desc: "Tim teknisi siap membantu konsultasi spesifikasi." },
  { icon: Truck, title: "Pengiriman Nasional", desc: "Layanan pengiriman ke seluruh wilayah Indonesia." },
]

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000))
    console.log("Contact form:", data)
    toast.success("Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda.")
    reset()
  }

  return (
    <>
      <Helmet>
        <title>Hubungi Kami — CV Globalindo Teknik Mandiri</title>
        <meta
          name="description"
          content="Hubungi CV Globalindo Teknik Mandiri untuk pertanyaan teknis, spesifikasi produk, atau dukungan operasional."
        />
      </Helmet>

      {/* Page Header (Consistent with About/Products/Articles) */}
      <div className="border-b border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <nav className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 font-semibold">Hubungi Kami</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Hubungi Kami</h1>
          <p className="text-slate-500 text-base leading-relaxed mt-2 max-w-xl">
            Hubungi tim kami untuk pertanyaan teknis, spesifikasi produk, permintaan penawaran, atau dukungan operasional.
          </p>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Informasi Kontak</h2>
                <div className="space-y-6">
                  {contactItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{item.label}</p>
                        {item.lines.map((line, j) =>
                          item.href ? (
                            <a
                              key={j}
                              href={item.href[j]}
                              target={item.href[j].startsWith("http") ? "_blank" : undefined}
                              rel="noreferrer"
                              className="block text-sm text-slate-700 hover:text-primary transition-colors leading-relaxed font-medium"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={j} className="text-sm text-slate-700 leading-relaxed font-medium">{line}</p>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office hours */}
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl shadow-sm">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Jam Operasional</p>
                <p className="text-sm text-slate-700 font-medium">Senin – Jumat: 08.00 – 17.00 WIB</p>
                <p className="text-sm text-slate-700 font-medium mt-1">Sabtu: 08.00 – 13.00 WIB</p>
              </div>
            </div>

            {/* Right: Form Form Column (max-w-2xl for Governance) */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Kirim Pesan</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-sm font-semibold text-slate-700 block">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="fullName"
                        placeholder="Nama Anda"
                        {...register("fullName")}
                        className={cn(
                          "h-10 text-sm border-slate-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary",
                          errors.fullName && "border-red-400 focus-visible:ring-red-400"
                        )}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-slate-700 block">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@perusahaan.com"
                        {...register("email")}
                        className={cn(
                          "h-10 text-sm border-slate-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary",
                          errors.email && "border-red-400 focus-visible:ring-red-400"
                        )}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700 block">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+62 812 3456 7890"
                      {...register("phone")}
                      className={cn(
                        "h-10 text-sm border-slate-200 rounded-lg focus-visible:ring-primary focus-visible:border-primary",
                        errors.phone && "border-red-400 focus-visible:ring-red-400"
                      )}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 block">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      placeholder="Jelaskan kebutuhan atau pertanyaan Anda..."
                      className={cn(
                        "w-full px-3 py-2 text-sm border rounded-lg bg-white text-slate-900 placeholder-slate-400 resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors",
                        errors.message ? "border-red-400 focus:ring-red-400" : "border-slate-200"
                      )}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  </Button>

                  {/* Trust signal */}
                  <p className="text-center text-xs text-slate-400 font-medium">
                    🔒 Aman · Rahasia · Tanggapan dalam 1×24 Jam Kerja
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-slate-50 border-t border-slate-200/60 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Komitmen untuk Setiap Pelanggan</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Jaminan standar layanan CV Globalindo Teknik Mandiri</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
