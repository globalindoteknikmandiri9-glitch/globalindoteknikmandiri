import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { divisionsData } from "@/data/divisions";
import { ArrowUpRight } from "lucide-react";

export default function BusinessDivisionSection() {
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest block mb-2">
            Spesialisasi Teknik
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Divisi Unit Bisnis Manufaktur & Suplai Utama
          </h2>
          <p className="text-slate-500 mt-2 text-base max-w-2xl">
            CV Globalindo Teknik Mandiri mengelompokkan spesialisasi produksinya menjadi 6 divisi teknik terstruktur guna memenuhi kebutuhan tender khusus.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200"
        >
          {divisionsData.map((div, idx) => {
            const Icon = div.icon;

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                }}
                className="border-r border-b border-slate-200 p-8 flex flex-col justify-between hover:bg-slate-50/50 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-md flex items-center justify-center group-hover:bg-[#059669]/10 group-hover:border-[#059669]/20 transition-all">
                      <Icon className="h-6 w-6 text-slate-600 group-hover:text-[#059669] transition-colors" />
                    </div>
                    <Link
                      to="/produk"
                      className="text-slate-400 hover:text-[#059669] transition-colors"
                      title="Lihat katalog divisi"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Link>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#059669] transition-colors">
                    {div.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {div.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Suplai Utama:
                  </h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {div.keyProducts.map((prod, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#059669]" />
                        {prod}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
