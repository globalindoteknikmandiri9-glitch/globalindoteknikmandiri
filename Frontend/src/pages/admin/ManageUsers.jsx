import { useState, useMemo } from "react"
import { Plus, Search, Pencil, Trash2, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const initialUsers = [
  { id: "usr-01", name: "Budi Santoso", initials: "BS", email: "budi@globalindoteknik.co.id", role: "Superadmin", status: "Aktif" },
  { id: "usr-02", name: "Ani Rahmawati", initials: "AR", email: "ani@globalindoteknik.co.id", role: "Editor", status: "Aktif" },
  { id: "usr-03", name: "Dedi Mulyadi", initials: "DM", email: "dedi@globalindoteknik.co.id", role: "Editor", status: "Aktif" },
  { id: "usr-04", name: "Siti Aminah", initials: "SA", email: "siti@globalindoteknik.co.id", role: "Viewer", status: "Aktif" },
  { id: "usr-05", name: "Eko Prasetyo", initials: "EP", email: "eko@globalindoteknik.co.id", role: "Viewer", status: "Nonaktif" },
]

export default function ManageUsers() {
  const [users] = useState(initialUsers)
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [users, search])

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manajemen User</h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Kelola hak akses administrator, editor, dan staf internal.</p>
        </div>
        <Button className="bg-navy hover:bg-navy/90 text-white font-bold gap-2 h-10 px-4 text-sm shrink-0 rounded-lg cursor-pointer shadow-card">
          <Plus className="h-4 w-4" />
          Tambah User
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-550" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari user berdasarkan nama, email, atau peran..."
            className="pl-9 h-10 text-xs border-border bg-background focus-visible:ring-accent"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-b border-border">
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Nama Staf</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Email Resmi</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Peran Akses</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider">Status Akun</th>
                <th className="text-center px-5 py-3.5 font-semibold text-xs uppercase tracking-wider w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-slate-500">
                    <ShieldAlert className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-bold text-slate-700 dark:text-slate-350">User tidak ditemukan</p>
                  </td>
                </tr>
              ) : filtered.map((u) => (
                <tr key={u.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 shrink-0">
                        {u.initials}
                      </div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 font-medium font-mono text-xs">{u.email}</td>
                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 font-semibold">{u.role}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                      u.status === "Aktif"
                        ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/40 text-green-700 dark:text-green-450"
                        : "bg-slate-100 dark:bg-slate-800 border-slate-250 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                    )}>
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        aria-label="Edit User"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                        aria-label="Hapus User"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
