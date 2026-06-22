import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { productsData } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function FeaturedProductsSection() {
  // Slice top 4 products as featured items
  const featuredProducts = productsData.slice(0, 4);

  return (
    <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#059669] uppercase tracking-widest block mb-2">
              Katalog Unggulan
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Peralatan Konstruksi & Laboratorium Terpopuler
            </h2>
            <p className="text-slate-500 mt-2 text-base max-w-xl">
              Daftar produk dengan volume permintaan tender tertinggi yang diproduksi sesuai standar regulasi nasional.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-sm h-10 shrink-0"
            asChild
          >
            <Link to="/produk">Lihat Semua Produk</Link>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Product Image */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Stock badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase text-slate-800 border border-slate-200 flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  {prod.status}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                    <span>{prod.category}</span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
                      {prod.sku}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-1">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {prod.spec}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    className="w-full text-xs h-9 text-slate-700 border-slate-200 hover:bg-slate-50 gap-1.5 rounded"
                    asChild
                  >
                    <Link to="/produk">
                      <Eye className="h-3.5 w-3.5" />
                      Detail Spesifikasi
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
