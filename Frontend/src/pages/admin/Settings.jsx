import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"

const settingsSchema = z.object({
  companyName: z.string().min(3, { message: "Nama perusahaan minimal 3 karakter" }),
  address: z.string().min(5, { message: "Alamat minimal 5 karakter" }),
  email: z.string().email({ message: "Alamat email tidak valid" }),
  phone: z.string().min(8, { message: "Nomor telepon tidak valid" }),
  whatsapp: z.string().min(8, { message: "Nomor WhatsApp tidak valid" }),
  officeHours: z.string().min(3, { message: "Jam kerja harus diisi" }),
})

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: "CV Globalindo Teknik Mandiri",
      address: "Jl. Jababeka Raya No.12, Kawasan Industri Cikarang, Bekasi, Jawa Barat 17530",
      email: "info@globalindoteknik.com",
      phone: "+62 21 8983 1234",
      whatsapp: "+62 811 1234 5678",
      officeHours: "Senin – Jumat: 08.00 – 17.00 WIB, Sabtu: 08.00 – 13.00 WIB",
    },
  })

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000))
    console.log("Save Settings:", data)
    toast.success("Pengaturan sistem berhasil disimpan secara lokal.")
  }

  return (
    <div className="space-y-6 animate-page-fade">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Pengaturan Sistem</h1>
        <p className="text-xs font-semibold text-muted-foreground mt-0.5">Konfigurasi data profil perusahaan resmi untuk dinamisasi halaman publik.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm max-w-3xl">
        <h2 className="text-lg font-bold text-foreground mb-6 tracking-tight">Profil Perusahaan</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="companyName" className="text-sm font-semibold text-foreground block">
              Nama Perusahaan <span className="text-red-500">*</span>
            </label>
            <Input
              id="companyName"
              {...register("companyName")}
              className={errors.companyName ? "border-red-400 focus-visible:ring-red-400 rounded-lg bg-background text-foreground" : "border-border rounded-lg bg-background text-foreground"}
            />
            {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="address" className="text-sm font-semibold text-foreground block">
              Alamat Lengkap Kantor & Workshop <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              {...register("address")}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-foreground block">
                Email Perusahaan <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-400 focus-visible:ring-red-400 rounded-lg bg-background text-foreground" : "border-border rounded-lg bg-background text-foreground"}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-sm font-semibold text-foreground block">
                Nomor Telepon Kantor <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                {...register("phone")}
                className={errors.phone ? "border-red-400 focus-visible:ring-red-400 rounded-lg bg-background text-foreground" : "border-border rounded-lg bg-background text-foreground"}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="whatsapp" className="text-sm font-semibold text-foreground block">
                Nomor WhatsApp Bisnis <span className="text-red-500">*</span>
              </label>
              <Input
                id="whatsapp"
                {...register("whatsapp")}
                className={errors.whatsapp ? "border-red-400 focus-visible:ring-red-400 rounded-lg bg-background text-foreground" : "border-border rounded-lg bg-background text-foreground"}
              />
              {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="officeHours" className="text-sm font-semibold text-foreground block">
                Jam Operasional Kerja <span className="text-red-500">*</span>
              </label>
              <Input
                id="officeHours"
                {...register("officeHours")}
                className={errors.officeHours ? "border-red-400 focus-visible:ring-red-400 rounded-lg bg-background text-foreground" : "border-border rounded-lg bg-background text-foreground"}
              />
              {errors.officeHours && <p className="text-xs text-red-500 mt-1">{errors.officeHours.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-navy hover:bg-navy/90 text-white font-bold text-sm h-10 px-5 rounded-lg cursor-pointer"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Pengaturan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
