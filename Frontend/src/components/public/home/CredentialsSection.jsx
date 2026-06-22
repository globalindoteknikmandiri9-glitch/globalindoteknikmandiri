import { motion } from "framer-motion";
import { companyData } from "@/data/company";
import { FileCheck, ShieldCheck, Scale, Award } from "lucide-react";

export default function CredentialsSection() {
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column - History and Legals */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest block mb-3">
              Kredibilitas Hukum & Legalitas
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              Menjamin Kepatuhan Administrasi dan Keamanan Pengadaan B2B Nasional
            </h2>
            
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              CV Globalindo Teknik Mandiri adalah badan usaha berbadan hukum resmi yang berkomitmen penuh mendukung kelancaran proyek konstruksi, laboratorium riset, dan permesinan sektor publik maupun swasta. Kami melengkapi setiap transaksi dengan dokumen hukum transparan untuk memudahkan audit.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <FileCheck className="h-6 w-6 text-[#059669] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Status PKP Aktif</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Kami menerbitkan Faktur Pajak E-Faktur resmi untuk setiap pembelian guna kepatuhan perpajakan badan usaha.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck className="h-6 w-6 text-[#059669] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Legalitas BKPM Lengkap</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Dilengkapi NIB & Izin Usaha Industri (IUI) resmi dari OSS BKPM untuk manufaktur baja dan permesinan.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Scale className="h-6 w-6 text-[#059669] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Dukungan TKDN Pemerintah</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Mengutamakan perakitan lokal di workshop Bogor guna memenuhi standar minimal TKDN pada tender kementerian.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Award className="h-6 w-6 text-[#059669] shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Siap Tender LPSE / LKPP</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Kami siap menerbitkan Surat Dukungan Pabrikator resmi yang diakui oleh Pejabat Pembuat Komitmen (PPK) proyek.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200/80 rounded-xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 pb-4 border-b border-slate-200">
              Fakta & Rekam Jejak Operasional
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              {companyData.stats.map((stat, idx) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-lg p-5">
                  <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
              * Seluruh statistik di atas merujuk pada rekam jejak riil pengiriman alat dan pabrikasi unit kami sejak tahun 2009.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
