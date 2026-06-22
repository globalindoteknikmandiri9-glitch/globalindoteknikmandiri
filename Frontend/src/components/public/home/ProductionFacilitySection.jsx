import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hammer, Flame, Settings, Cpu, ShieldAlert, CheckCircle2 } from "lucide-react"

const facilities = [
  {
    id: "fabrication",
    title: "1. Fabrikasi Logam (Metal Fabrication)",
    short: "Fabrikasi",
    icon: Hammer,
    specs: [
      { label: "Kapasitas Shearing", value: "Tebal plat hingga 12 mm" },
      { label: "Mesin Potong Laser", value: "Fiber Laser 3000W" },
      { label: "Bending Pressure", value: "100 Ton Hydraulic" },
      { label: "Bahan Baku", value: "Baja Karbon, Stainless Steel 304/316" }
    ],
    desc: "Lini pemotongan, pembentukan, dan penekukan plat baja tebal sebagai bahan utama bodi mesin marka jalan GTM-Sprayer, tiang rambu delineator post, serta rangka kabinet lemari asam laboratorium.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "welding",
    title: "2. Pengelasan Presisi (Industrial Welding)",
    short: "Welding",
    icon: Flame,
    specs: [
      { label: "Metode Las", value: "MIG (Metal Inert Gas), TIG (Tungsten Inert Gas)" },
      { label: "Media Gas Proteksi", value: "Argon & CO2 Murni" },
      { label: "Sertifikasi Welder", value: "Kualifikasi Kelas 3 Depnaker" },
      { label: "Pemeriksaan Sambungan", value: "Penetrant Testing (NDT)" }
    ],
    desc: "Pekerjaan penyambungan konstruksi logam berat dengan presisi tinggi. Menjamin integritas struktural bodi sprayer bertekanan tinggi dan kompresor agar bebas dari kebocoran mikro.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "machining",
    title: "3. Permesinan & Bubut CNC (Machining Department)",
    short: "Machining",
    icon: Settings,
    specs: [
      { label: "Toleransi Bubut", value: "Hingga ±0.01 mm" },
      { label: "Pusat Bubut CNC", value: "3-Axis Machining Center" },
      { label: "Kapasitas Bubut Manual", value: "Benda kerja diameter max 500 mm" },
      { label: "Komponen Diproduksi", value: "As Pompa, Gearbox, Nozzle Kuningan" }
    ],
    desc: "Pembuatan suku cadang mekanis presisi tinggi yang digunakan pada unit mesin pertanian (sadap karet baterai) serta katup hidrolik concrete compression machine.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "assembly",
    title: "4. Perakitan & Finishing (Assembly Line)",
    short: "Perakitan",
    icon: Cpu,
    specs: [
      { label: "Kapasitas Lini", value: "15 unit mesin marka per minggu" },
      { label: "Instalasi Furniture", value: "Presisi phenolic resin tahan zat asam" },
      { label: "Metode Finishing", value: "Sandblasting & Powder Coating Oven" },
      { label: "Instalasi Kelistrikan", value: "Standar IP65 Waterproof Control Box" }
    ],
    desc: "Lini perakitan komponen mekanis, kelistrikan, motor penggerak, serta finishing pelapisan anti-korosi. Di sini, meja lab tengah (island bench) dirakit presisi dengan top-table anti asam.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "qc",
    title: "5. QC & Kalibrasi Uji (Quality Control)",
    short: "QC & Kalibrasi",
    icon: ShieldAlert,
    specs: [
      { label: "Kapasitas Uji Tekan", value: "Kalibrator Hidrolik 2000 kN" },
      { label: "Standar Pengujian", value: "ASTM C-39 & SNI 1974-2011" },
      { label: "Instrumen Kalibrasi", value: "Load Cell bersertifikat KAN" },
      { label: "Dokumentasi", value: "Sertifikat Kalibrasi & Laporan QC Internal" }
    ],
    desc: "Proses verifikasi dimensi fisik, uji kekuatan hidrolik, dan kalibrasi akurasi manometer digital untuk memastikan setiap Concrete Compression Machine yang dikirim bekerja 100% akurat.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop"
  }
]

export default function ProductionFacilitySection() {
  const [activeTab, setActiveTab] = useState(facilities[0])

  return (
    <section className="bg-muted/10 py-16 lg:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-warning uppercase tracking-widest block mb-2">
            Pabrikasi Langsung (Bukan Distributor)
          </span>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Fasilitas Workshop & Kemampuan Produksi Mandiri
          </h2>
          <p className="text-muted-foreground mt-2 text-base max-w-2xl">
            Sebagai pabrikator langsung di Bogor, kami menjamin kualitas bahan baku, presisi permesinan, dan layanan purna jual tanpa pihak ketiga.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Facility Tabs Selector */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {facilities.map((fac) => {
              const isActive = activeTab.id === fac.id
              const Icon = fac.icon
              return (
                <button
                  key={fac.id}
                  onClick={() => setActiveTab(fac)}
                  className={`flex items-center gap-4 p-4 text-left rounded-xl border transition-all duration-250 cursor-pointer ${
                    isActive
                      ? "bg-card border-warning shadow-card"
                      : "bg-card/50 border-border hover:bg-card hover:border-border/80"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? "bg-warning/10 border-warning text-warning"
                      : "bg-background border-border text-muted-foreground"
                  }`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-bold block transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {fac.short}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60 block mt-0.5 line-clamp-1">
                      {fac.title.split(' (')[1]?.replace(')', '') || fac.title}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Column: Display Panel */}          <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-card flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {activeTab.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                    {activeTab.desc}
                  </p>

                  {/* Technical Parameters Table */}
                  <div className="mt-6">
                    <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-2.5">
                      Spesifikasi & Kapasitas Teknis
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      {activeTab.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="bg-background border border-border p-3 rounded-lg flex flex-col justify-center">
                          <span className="text-[10px] text-muted-foreground/80 font-bold uppercase tracking-wide">
                            {spec.label}
                          </span>
                          <span className="text-xs text-foreground font-semibold mt-1 flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-warning shrink-0" />
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Photo displaying department */}
                <div className="mt-6 aspect-[16/8] w-full overflow-hidden border border-border rounded-xl relative shadow-card">
                  <img
                    src={activeTab.image}
                    alt={activeTab.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent flex items-end p-4">
                    <span className="text-[10px] text-slate-200 bg-slate-950/40 px-2 py-0.5 rounded font-medium border border-white/5 backdrop-blur-xs">
                      Dokumentasi Fisik Workshop Cibadak, Bogor
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
