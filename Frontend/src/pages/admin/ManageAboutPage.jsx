import { AutosizeTextarea } from "@/components/ui/autosize-textarea"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/services/axios"
import { invalidateProfileCache } from "@/hooks/useCompanyProfile"
import { getAssetUrl } from "@/lib/utils"
import {
  Loader2, Save, ChevronDown, ChevronUp,
  LayoutTemplate, BookOpen, Eye, Heart, Image as ImageIcon, Award, Users, Package, MapPin
} from "lucide-react"

// Parse Helper
function parseOrFallback(jsonStr, fallback) {
  if (!jsonStr) return fallback
  try {
    const parsed = JSON.parse(jsonStr)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
  } catch {
    // ignore
  }
  return fallback
}

const defaultAboutCredentials = [
  { label: "Tahun Berdiri", value: "2009", icon: "Award" },
  { label: "Mitra Aktif B2B", value: "50+ Perusahaan", icon: "Users" },
  { label: "Katalog Produk", value: "500+ SKU", icon: "Package" },
  { label: "Layanan Pengiriman", value: "Nasional", icon: "MapPin" },
];

const defaultAboutCoreValues = [
  { title: "Integritas & Transparansi", desc: "Menjunjung tinggi kejujuran hukum dalam setiap transaksi, penerbitan faktur pajak resmi, dan dokumen dukungan tender." },
  { title: "Kapasitas & Presisi", desc: "Memastikan seluruh barang hasil fabrikasi lokal diproduksi presisi menggunakan mesin CNC dan las argon handal." },
  { title: "Kepatuhan Regulasi", desc: "Mengedepankan kepatuhan penuh terhadap standar mutu SNI, spesifikasi teknis Kementerian Perhubungan, dan komitmen TKDN." },
  { title: "Layanan Purna Jual", desc: "Tidak sekadar menjual, kami mengirim teknisi internal untuk supervisi instalasi, kalibrasi berkala, dan training operator." }
];

// ── Collapsible Section ─────────────────────────────────────────────────────
function Section({ icon: Icon, title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-sm text-foreground">{title}</span>
        </div>
        {open
          ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
          : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 border-t border-border space-y-4 animate-page-fade">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Field helpers ───────────────────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="text-xs font-bold text-foreground block">{label}</label>
      {children}
      {hint && <p className="text-[10px] text-muted-foreground font-medium">{hint}</p>}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, className = "" }) {
  return (
    <Input
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`text-xs h-9 border-border rounded-lg bg-background ${className}`}
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <AutosizeTextarea
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
    />
  )
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function ManageAboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Hero / Header
  const [name, setName] = useState("")
  const [established, setEstablished] = useState("")
  const [tagline, setTagline] = useState("")

  // Sejarah
  const [history, setHistory] = useState("")

  // Visi & Misi
  const [vision, setVision] = useState("")
  const [mission, setMission] = useState("")

  // Foto About Header
  const [aboutImageFile, setAboutImageFile] = useState(null)
  const [aboutImagePreview, setAboutImagePreview] = useState("")

  // Dynamic Lists
  const [aboutCredentials, setAboutCredentials] = useState([])
  const [aboutCoreValues, setAboutCoreValues] = useState([])

  // ── Load profile ──────────────────────────────────────────────────────
  useEffect(() => {
    api.get("/admin/profile")
      .then(res => {
        const d = res.data || {}
        setName(d.name || "")
        setEstablished(d.established || "")
        setTagline(d.tagline || "")
        setHistory(d.history || "")
        setVision(d.vision || "")
        setMission(d.mission || "")
        if (d.about_image_url) {
          setAboutImagePreview(getAssetUrl(d.about_image_url))
        }
        
        setAboutCredentials(parseOrFallback(d.about_credentials, defaultAboutCredentials))
        setAboutCoreValues(parseOrFallback(d.about_core_values, defaultAboutCoreValues))
      })
      .catch(() => {
        toast.error("Gagal memuat data halaman Tentang Kami.")
        setAboutCredentials(defaultAboutCredentials)
        setAboutCoreValues(defaultAboutCoreValues)
      })
      .finally(() => setLoading(false))
  }, [])

  // ── Save ──────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("established", established)
      formData.append("tagline", tagline)
      formData.append("history", history)
      formData.append("vision", vision)
      formData.append("mission", mission)
      formData.append("about_credentials", JSON.stringify(aboutCredentials))
      formData.append("about_core_values", JSON.stringify(aboutCoreValues))
      if (aboutImageFile) {
        formData.append("about_image", aboutImageFile)
      }

      await api.put("/admin/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      invalidateProfileCache()
      toast.success("Konten halaman Tentang Kami berhasil disimpan!")
    } catch (err) {
      console.error(err)
      toast.error("Gagal menyimpan konten.")
    } finally {
      setSaving(false)
    }
  }

  const updateAboutCredential = (idx, field, val) => {
    setAboutCredentials(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [field]: val }
      return next
    })
  }

  const updateCoreValue = (idx, field, val) => {
    setAboutCoreValues(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [field]: val }
      return next
    })
  }

  // ── Loading ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm font-semibold text-muted-foreground">Memuat data halaman Tentang Kami...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-page-fade max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">Kelola Halaman Tentang Kami</h1>
          <p className="text-xs font-semibold text-muted-foreground mt-0.5">
            Edit konten halaman /tentang-kami. Klik seksi untuk membuka editor.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs h-10 px-5 rounded-lg gap-2 cursor-pointer"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Menyimpan..." : "Simpan Semua"}
        </Button>
      </div>

      {/* ── IDENTITAS PERUSAHAAN ─────────────────────────────────────────── */}
      <Section icon={LayoutTemplate} title="Identitas Perusahaan" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nama Perusahaan" hint="Digunakan di judul halaman dan meta SEO.">
            <TextInput value={name} onChange={setName} placeholder="CV Globalindo Teknik Mandiri" />
          </Field>
          <Field label="Tahun Berdiri" hint="Digunakan untuk hitung 'X+ Tahun Pengalaman'.">
            <TextInput value={established} onChange={setEstablished} placeholder="2009" />
          </Field>
        </div>
        <Field label="Tagline Perusahaan" hint="Label kecil yang muncul di berbagai halaman.">
          <TextInput value={tagline} onChange={setTagline} placeholder="Pabrikator & Supplier Peralatan Teknik Industri Nasional" />
        </Field>
      </Section>

      {/* ── FOTO HEADER ─────────────────────────────────────────────────── */}
      <Section icon={ImageIcon} title="Foto Background Header Tentang Kami">
        <Field
          label="Upload Foto Header"
          hint="Foto ini digunakan sebagai background transparan di bagian atas halaman Tentang Kami. Rekomendasi: landscape, min. 1920px lebar."
        >
          <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4">
            <div className="w-40 h-20 shrink-0 bg-muted border border-border border-dashed rounded-lg overflow-hidden flex items-center justify-center">
              {aboutImagePreview
                ? <img src={aboutImagePreview} alt="Preview" className="w-full h-full object-cover" />
                : <ImageIcon className="h-5 w-5 text-muted-foreground" />
              }
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0]
                if (file) {
                  setAboutImageFile(file)
                  const reader = new FileReader()
                  reader.onloadend = () => setAboutImagePreview(reader.result)
                  reader.readAsDataURL(file)
                }
              }}
              className="flex-1 min-w-0 w-full text-xs h-9 border-border file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-muted file:text-foreground hover:file:bg-muted/80 cursor-pointer"
            />
          </div>
        </Field>
      </Section>

      {/* ── SEJARAH & LATAR BELAKANG ─────────────────────────────────────── */}
      <Section icon={BookOpen} title="Sejarah & Latar Belakang Perusahaan">
        <Field
          label="Narasi Sejarah Perusahaan"
          hint="Pisahkan paragraf dengan baris kosong (tekan Enter dua kali). Setiap paragraf akan ditampilkan terpisah di halaman publik."
        >
          <TextArea
            value={history}
            onChange={setHistory}
            rows={10}
            placeholder={`Contoh paragraf 1: CV Globalindo Teknik Mandiri didirikan pada tahun 2009...\n\nContoh paragraf 2: Melalui pengalaman lebih dari 15 tahun...`}
          />
        </Field>
      </Section>

      {/* ── VISI & MISI ──────────────────────────────────────────────────── */}
      <Section icon={Eye} title="Visi Perusahaan">
        <Field label="Pernyataan Visi" hint="Satu kalimat visi utama perusahaan yang ditampilkan di kartu Visi.">
          <TextArea
            value={vision}
            onChange={setVision}
            rows={3}
            placeholder="Menjadi mitra pengadaan peralatan industri dan manufaktur yang paling terpercaya, inovatif, dan berkontribusi pada pembangunan infrastruktur serta kemandirian teknologi di Indonesia."
          />
        </Field>
      </Section>

      <Section icon={Heart} title="Misi Perusahaan">
        <Field
          label="Daftar Misi"
          hint="Tulis setiap poin misi di baris baru. Setiap baris akan ditampilkan sebagai item di daftar misi."
        >
          <TextArea
            value={mission}
            onChange={setMission}
            rows={8}
            placeholder={`1. Memproduksi peralatan teknik yang memenuhi standar kualitas nasional dan internasional.\n2. Memberikan layanan purna jual yang responsif dan solutif bagi seluruh klien.\n3. Terus berinovasi dalam desain produk untuk meningkatkan efisiensi dan keamanan kerja.\n4. Membangun kemitraan jangka panjang yang saling menguntungkan dengan seluruh pemangku kepentingan.`}
          />
        </Field>
      </Section>

      {/* ── STATISTIK & NILAI INTI ─────────────────────────────────────────── */}
      <Section icon={Award} title="Statistik & Nilai Inti">
        <div className="space-y-2">
          <p className="text-xs font-bold text-foreground">Statistik Singkat (4 Item)</p>
          <div className="grid md:grid-cols-2 gap-3">
            {aboutCredentials.map((cred, idx) => (
              <div key={idx} className="p-3 border border-border rounded-lg bg-muted/20 space-y-2 flex flex-col">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Statistik #{idx + 1}</p>
                <TextInput value={cred.value} onChange={v => updateAboutCredential(idx, "value", v)} placeholder="Nilai (Misal: 50+ Perusahaan)" />
                <TextInput value={cred.label} onChange={v => updateAboutCredential(idx, "label", v)} placeholder="Label (Misal: Mitra Aktif B2B)" />
                <div className="text-xs text-muted-foreground">Ikon: <span className="font-mono bg-background px-1 rounded border">{cred.icon}</span> (Ubah di source code jika perlu)</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 pt-4 border-t border-border">
          <p className="text-xs font-bold text-foreground">Nilai Inti (4 Item)</p>
          <div className="grid md:grid-cols-2 gap-3">
            {aboutCoreValues.map((val, idx) => (
              <div key={idx} className="p-3 border border-border rounded-lg bg-muted/20 space-y-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Nilai #{idx + 1}</p>
                <TextInput value={val.title} onChange={v => updateCoreValue(idx, "title", v)} placeholder="Judul Nilai Inti" />
                <TextArea value={val.desc} onChange={v => updateCoreValue(idx, "desc", v)} rows={2} placeholder="Deskripsi nilai inti..." />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bottom save */}
      <div className="flex justify-end pt-2 pb-8">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs h-10 px-6 rounded-lg gap-2 cursor-pointer"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
        </Button>
      </div>
    </div>
  )
}
