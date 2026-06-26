import { Button } from "@/components/ui/button"
import { CheckCircle2, FileText } from "lucide-react"
import { Icons } from "@/components/icons"
import { Link } from "react-router-dom"
import { useCompanyProfile } from "@/hooks/useCompanyProfile"

export default function ProductInfo({ name, sku, category, stockStatus, shortDescription, description }) {
  const { getWhatsappLink } = useCompanyProfile()

  const stockConfig = {
    available: {
      label: "Tersedia",
      classes: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10",
      dot: "bg-emerald-500"
    },
    preorder: {
      label: "Siap Produksi (Pre-Order)",
      classes: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10",
      dot: "bg-amber-500"
    },
    custom: {
      label: "Custom Made",
      classes: "text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-slate-800",
      dot: "bg-slate-500"
    }
  }

  const currentStock = stockConfig[stockStatus] || stockConfig.available

  // WA Link Generation
  const waMessage = `Halo,\nSaya ingin konsultasi terkait produk:\n\n${name}\nSKU: ${sku}\n\nMohon informasi spesifikasi dan penawaran harga.`
  const waUrl = getWhatsappLink(waMessage)

  // RFQ Link Generation
  const rfqUrl = `/hubungi-kami?product=${encodeURIComponent(name)}&sku=${encodeURIComponent(sku)}`

  const trustIndicators = [
    "Produk Industri",
    "Dukungan Teknis",
    "Pengiriman Nasional",
    "Dokumen Tender"
  ]

  return (
    <div className="space-y-6 text-left">
      {/* Product Title & Category */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-primary/80 uppercase tracking-wider">
          {category}
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight leading-snug">
          {name}
        </h1>
      </div>

      {/* Meta Info: SKU and Stock Status */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-4 border-b border-border/60">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="font-mono font-medium">SKU: {sku}</span>
        </div>

        <div className="w-1 h-1 rounded-full bg-border" />

        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${currentStock.classes}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${currentStock.dot} animate-pulse-slow`} />
          {currentStock.label}
        </div>
      </div>
        <p className="text-xs text-muted-foreground leading-relaxed mt-3 font-semibold">
          {shortDescription}
        </p>
      {/* Divider */}
      <div className="border-t border-border" />

      {/* Long Description */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Deskripsi Lengkap</h3>
        {description && /<[a-z][\s\S]*>/i.test(description) ? (
          <div 
            className="prose prose-sm prose-slate dark:prose-invert max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>

      {/* Trust Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {trustIndicators.map((t, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0" />
            <span>{t}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="warning"
          className="flex-1 font-bold text-xs h-11 rounded-lg gap-2 shadow-sm cursor-pointer"
          asChild
        >
          <Link to={rfqUrl}>
            <FileText className="h-4 w-4" />
            Minta Penawaran Harga (RFQ)
          </Link>
        </Button>
        
        <Button
          variant="outline"
          className="flex-1 font-semibold text-xs h-11 rounded-lg gap-2 cursor-pointer"
          asChild
        >
          <a href={waUrl} target="_blank" rel="noreferrer">
            <Icons.whatsapp className="h-4.5 w-4.5 text-emerald-500" />
            Konsultasi Teknis
          </a>
        </Button>
      </div>
    </div>
  )
}
