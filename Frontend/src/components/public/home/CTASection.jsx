import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { companyData } from "@/data/company";
import { Mail, MessageSquare } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-navy py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl mx-auto bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-900 rounded-2xl p-8 lg:p-12 text-center lg:text-left shadow-modal"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">
                Butuh Penawaran Harga Resmi untuk Kebutuhan Pengadaan/Tender?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hubungi tim tender dan engineering kami untuk berkonsultasi spesifikasi teknis peralatan jalan, pertanian, serta pengujian laboratorium sipil. Dapatkan dokumen penawaran harga resmi (RFQ) lengkap.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full sm:w-auto shrink-0 justify-center">
              <Button
                className="bg-warning hover:bg-warning/90 text-warning-foreground gap-2 h-11 px-6 text-sm font-semibold rounded-lg w-full sm:w-auto justify-center"
                asChild
              >
                <a href={companyData.contacts.whatsappLink} target="_blank" rel="noreferrer">
                  <MessageSquare className="h-4.5 w-4.5" />
                  Hubungi via WhatsApp
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 bg-transparent hover:bg-white/5 hover:text-white h-11 px-6 text-sm font-semibold rounded-lg w-full sm:w-auto justify-center"
                asChild
              >
                <Link to="/hubungi-kami">
                  <Mail className="mr-2 h-4 w-4" />
                  Minta Penawaran (RFQ)
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
