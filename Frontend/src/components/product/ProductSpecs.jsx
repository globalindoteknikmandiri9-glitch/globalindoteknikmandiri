export default function ProductSpecs({ specification }) {
  if (!specification) return null

  // Deteksi apakah konten adalah HTML (dari WYSIWYG)
  const isHtml = /<[a-z][\s\S]*>/i.test(specification)

  if (isHtml) {
    return (
      <div className="space-y-4 text-left">
        <h2 className="text-lg font-bold text-foreground tracking-tight">Spesifikasi Teknis</h2>
        <div className="bg-card border border-border rounded-2xl shadow-sm p-5 sm:p-6">
          <div 
            className="prose prose-sm md:prose-base prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: specification }}
          />
        </div>
      </div>
    )
  }

  // Fallback untuk spesifikasi teks biasa (versi lama)
  const lines = specification.split("\n").filter(l => l.trim())
  const specsList = lines.map(line => {
    const parts = line.split(":")
    if (parts.length >= 2) {
      return { label: parts[0].trim(), value: parts.slice(1).join(":").trim() }
    }
    return { label: "Spesifikasi", value: line.trim() }
  })

  return (
    <div className="space-y-4 text-left">
      <h2 className="text-lg font-bold text-foreground tracking-tight">Spesifikasi Teknis</h2>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="px-4 sm:px-6 py-3 sm:py-3.5 font-bold text-foreground uppercase tracking-wider w-1/3">
                  Parameter
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-3.5 font-bold text-foreground uppercase tracking-wider">
                  Nilai Spesifikasi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {specsList.map((spec, idx) => (
                <tr
                  key={idx}
                  className="even:bg-muted/10 odd:bg-card hover:bg-muted/5 transition-colors"
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-3.5 font-bold text-foreground/90 whitespace-nowrap">
                    {spec.label}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-3.5 text-muted-foreground font-medium">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
