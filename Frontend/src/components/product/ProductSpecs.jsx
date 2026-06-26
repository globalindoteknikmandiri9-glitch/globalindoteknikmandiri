export default function ProductSpecs({ specification }) {
  if (!specification) return null

  let col1 = "Parameter";
  let col2 = "Nilai Spesifikasi";
  let content = specification;

  try {
    const parsed = JSON.parse(specification);
    if (parsed && typeof parsed === 'object' && parsed.content !== undefined) {
      col1 = parsed.col1 || "Parameter";
      col2 = parsed.col2 || "Nilai Spesifikasi";
      content = parsed.content;
    }
  } catch(e) {}

  // Ekstrak teks dari HTML yang dihasilkan WYSIWYG
  let text = content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '') // Hapus tag HTML yang tersisa
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const specsList = [];
  
  lines.forEach(line => {
    const parts = line.split(":");
    // Jika baris memiliki titik dua, anggap sebagai parameter baru
    if (parts.length >= 2 && parts[0].length > 0) {
      specsList.push({
        label: parts[0].trim(),
        value: parts.slice(1).join(":").trim()
      });
    } else {
      // Jika tidak ada titik dua, gabungkan sebagai paragraf ke nilai parameter sebelumnya
      if (specsList.length > 0) {
        specsList[specsList.length - 1].value += "\n" + line.trim();
      } else {
        // Jika ini baris pertama dan tidak punya parameter
        specsList.push({
          label: "Spesifikasi",
          value: line.trim()
        });
      }
    }
  });

  return (
    <div className="space-y-4 text-left">
      <h2 className="text-lg font-bold text-foreground tracking-tight">Spesifikasi Teknis</h2>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="px-4 sm:px-6 py-3 sm:py-3.5 font-bold text-foreground uppercase tracking-wider w-1/3">
                  {col1}
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-3.5 font-bold text-foreground uppercase tracking-wider">
                  {col2}
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
                  <td className="px-4 sm:px-6 py-3 sm:py-3.5 text-muted-foreground font-medium whitespace-pre-wrap">
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
