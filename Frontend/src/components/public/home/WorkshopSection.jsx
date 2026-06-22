import { motion } from "framer-motion";
import { procurementData } from "@/data/procurement";
import { Hammer, Settings2, ShieldCheck, MapPin } from "lucide-react";

export default function WorkshopSection() {
  const { workshop } = procurementData;

  return (
    <section className="bg-muted/20 py-20 border-b border-border text-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.25 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Workshop Details */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest block mb-3">
              Fasilitas Produksi
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight tracking-tight">
              Kapasitas Manufaktur Mandiri & Workshop Bogor
            </h2>
            <p className="text-slate-650 dark:text-slate-350 text-base leading-relaxed mb-8">
              Pabrikasi produk teknik kami dilakukan sepenuhnya di workshop fisik kami yang berlokasi di {workshop.location}. Dengan area seluas {workshop.acreage}, kami mengendalikan kualitas secara penuh dari pemotongan baja hingga kalibrasi akhir.
            </p>

            <div className="space-y-4">
              {workshop.facilities.map((fac, idx) => {
                // Return icons based on indices
                let Icon = Settings2;
                if (idx === 0) Icon = Hammer;
                if (idx === 3) Icon = ShieldCheck;

                return (
                  <div key={idx} className="surface-card p-4 hover:shadow-card-hover transition-all duration-300 cursor-default group flex gap-4">
                    <div className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{fac.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{fac.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Physical Image / Blueprint layout */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-border rounded-xl overflow-hidden shadow-card">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
                alt="Fasilitas Pabrik CV Globalindo Teknik Mandiri"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-xs border border-border rounded-lg p-3 text-foreground flex items-center gap-2 shadow-card-hover">
                <MapPin className="h-4.5 w-4.5 text-accent shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-foreground">Workshop Cibadak, Bogor</span>
                  <span className="text-muted-foreground">Akses inspeksi fisik terbuka untuk auditor pengadaan tender.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
