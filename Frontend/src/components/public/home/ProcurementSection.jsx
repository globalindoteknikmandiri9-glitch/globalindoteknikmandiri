import { motion } from "framer-motion";
import { procurementData } from "@/data/procurement";
import { Check } from "lucide-react";

export default function ProcurementSection() {
  const { workflow, tenderSupport } = procurementData;

  return (
    <section className="bg-white dark:bg-slate-900/20 py-16 lg:py-24 border-b border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.25 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: B2B Workflow */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-3">
              Alur Kerja Sama
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 leading-tight tracking-tight">
              Prosedur Pengadaan Resmi B2B & Kemitraan Kontrak
            </h2>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-slate-800">
              {workflow.map((flow, idx) => (
                <div key={idx} className="relative flex gap-6 pl-4 group">
                  {/* Step bubble */}
                  <div className="w-10 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 z-10 shadow-card group-hover:border-accent group-hover:text-accent transition-all">
                    {flow.step}
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{flow.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{flow.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tender Compliance Support */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl p-8 shadow-card">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
              Dukungan Dokumen Tender
            </h3>

            <div className="space-y-6">
              {tenderSupport.map((support, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30 rounded-full flex items-center justify-center shrink-0 mt-0.5 animate-pulse-slow">
                    <Check className="h-3 w-3 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs">{support.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {support.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
