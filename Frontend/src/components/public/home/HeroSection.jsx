import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { getAssetUrl } from "@/lib/utils";
import TiltedCard from "@/components/ui/TiltedCard";

export default function HeroSection() {
  const { profile } = useCompanyProfile();

  const bgImage = profile.workshop_image_url
    ? getAssetUrl(profile.workshop_image_url)
    : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative bg-background overflow-hidden min-h-[85vh] flex items-center pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-16 lg:pb-24">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Tagline */}
            {profile.tagline && (
              <span className="inline-block text-xs font-bold text-warning uppercase tracking-widest mb-4 bg-warning/10 px-3 py-1.5 rounded-full border border-warning/20">
                {profile.tagline}
              </span>
            )}

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
              {profile.hero_title}
            </h1>

            {/* Subheadline */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              {profile.hero_subtitle}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-warning hover:bg-warning/90 text-warning-foreground px-8 h-12 text-base font-semibold rounded-xl w-full sm:w-auto justify-center shadow-lg shadow-warning/20 transition-all hover:scale-105"
                asChild
              >
                <Link to="/produk">
                  Lihat Katalog Produk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground bg-card hover:bg-muted px-8 h-12 text-base font-medium rounded-xl w-full sm:w-auto justify-center transition-all hover:scale-105"
                asChild
              >
                <Link to="/hubungi-kami">
                  <FileText className="mr-2 h-4 w-4" />
                  Minta Penawaran
                </Link>
              </Button>
            </div>

            {/* Trust Metadata */}
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground font-medium">
              {(() => {
                const defaultMetadata = ["E-Katalog LKPP", "Standar SNI", "Faktur Pajak"];
                let metadata = defaultMetadata;
                if (profile.home_trust_metadata) {
                  try {
                    const parsed = JSON.parse(profile.home_trust_metadata);
                    if (Array.isArray(parsed) && parsed.length > 0) metadata = parsed;
                  } catch (e) {}
                }
                return metadata.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-warning" /> {item}
                  </span>
                ));
              })()}
            </div>
          </motion.div>

          {/* Right Column: TiltedCard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex w-full justify-center"
          >
            <div className="w-full max-w-[400px] aspect-[4/5]">
              <TiltedCard 
                imageSrc={bgImage} 
                altText="Workshop CV Globalindo Teknik Mandiri" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
