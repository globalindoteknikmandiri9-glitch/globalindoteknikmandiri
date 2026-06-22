import { motion } from "framer-motion";
import { Wrench, Truck, ShieldCheck, Cpu } from "lucide-react";

const items = [
  {
    icon: Cpu,
    title: "Kalibrasi & Akurasi Terjamin",
    desc: "Setiap peralatan pengujian sipil dan instrumen ukur melalui proses QC internal yang ketat dan dapat dikalibrasi untuk keandalan data proyek."
  },
  {
    icon: Wrench,
    title: "Dukungan Teknisi Onsite",
    desc: "Tim teknisi ahli kami siap dikirim ke lapangan untuk melayani instalasi mesin, komisioning tes, dan pelatihan operator instansi Anda."
  },
  {
    icon: Truck,
    title: "Mobilisasi Kargo Nasional",
    desc: "Kerja sama dengan jaringan ekspedisi logistik khusus kargo berat menjamin pengiriman alat berat aman hingga ke pelosok Indonesia."
  },
  {
    icon: ShieldCheck,
    title: "Garansi Pabrikator Resmi",
    desc: "Kami memberikan garansi purna jual penuh langsung dari pabrikator, memastikan ketersediaan sparepart orisinil kapan saja dibutuhkan."
  }
];

export default function WhyUsSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950/40 py-16 lg:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-2">
            Standar Layanan
          </span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Jaminan Mutu Dan Layanan Purna Jual Pabrikator
          </h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
              }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-soft-sm hover:shadow-soft-md hover:border-slate-200 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-300 rounded-xl p-6 flex flex-col justify-between cursor-default group"
            >
              <div>
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:border-accent/30 dark:group-hover:border-accent/30">
                  <item.icon className="h-5 w-5 text-slate-600 dark:text-slate-350" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
