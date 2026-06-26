# 🏭 Frontend Web - CV Globalindo Teknik Mandiri

Selamat datang di repositori Frontend untuk website profil perusahaan dan katalog e-commerce B2B **CV Globalindo Teknik Mandiri**. 

Dokumen ini memuat panduan komprehensif mengenai teknologi yang digunakan, cara instalasi, fitur utama, dan struktur direktori.

---

## 🛠️ Teknologi & *Library* Utama

Proyek ini dibangun dengan standar arsitektur modern (tahun 2026+) untuk menjamin performa, aksesibilitas, dan kemudahan pemeliharaan:

### Core Stack
* **[React.js (v19)](https://react.dev/)**: *Library* utama pembuat antarmuka (UI).
* **[Vite (v8)](https://vitejs.dev/)**: *Build tool* yang sangat cepat untuk *development server*.
* **[React Router (v7)](https://reactrouter.com/)**: Sistem *routing* (perpindahan halaman) berkinerja tinggi.

### UI & Styling
* **[Tailwind CSS (v4)](https://tailwindcss.com/)**: *Framework* CSS berbasis *utility-first* untuk penataan gaya visual yang dinamis.
* **[Framer Motion](https://www.framer.com/motion/)**: Animasi *micro-interactions* dan transisi perpindahan halaman yang halus.
* **[Radix UI](https://www.radix-ui.com/)**: Komponen dasar (*primitives*) yang *headless* dan mematuhi standar aksesibilitas (WAI-ARIA). Dipakai untuk *Dialog/Modal*, *Dropdown*, dan elemen UI kompleks lainnya.
* **[Lucide React](https://lucide.dev/)**: Koleksi ikon minimalis, modern, dan ringan.

### Interaksi & Fungsionalitas Khusus
* **[Embla Carousel](https://www.embla-carousel.com/)**: Pustaka *slider* geser (*swipe*) yang sangat ringan dan mulus untuk perangkat sentuh (*mobile*).
* **[Yet Another React Lightbox (YARL)](https://yet-another-react-lightbox.com/)**: Penampil gambar layar penuh yang mendukung *zoom* dan navigasi (*keyboard/swipe*).
* **React Portals**: Digunakan untuk arsitektur **Video Modal Khusus** guna menembus *CSS Containment* dan memastikan video YouTube selalu bisa disentuh dan proporsional di peramban seluler.
* **[React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)**: Manajemen *form input* dan validasi data berkinerja tinggi (digunakan pada form login & kontak).
* **[React Quill](https://github.com/zenoamaro/react-quill)**: *Rich Text Editor* (WYSIWYG) untuk panel Admin menulis artikel.
* **[Recharts](https://recharts.org/)**: Visualisasi grafik data untuk *Dashboard* Admin.

---

## 📋 Prasyarat Instalasi

Sebelum memulai, pastikan komputer/server Anda telah memasang:
1. **Node.js**: Versi `18.x` atau yang lebih baru (sangat disarankan menggunakan Node v20+ LTS).
2. **NPM** atau **Yarn**: Sebagai *package manager*.
3. **Git**: Untuk mengelola repositori.

---

## 🚀 Cara Instalasi & Menjalankan Aplikasi

Ikuti panduan ini langkah demi langkah untuk menjalankan *Frontend* di komputer lokal Anda:

### 1. Buka Direktori Frontend
Gunakan Terminal atau Command Prompt (CMD) dan pastikan Anda berada di dalam folder `Frontend`.
```bash
cd path/ke/folder/Frontend
```

### 2. Instal Dependensi
Jalankan perintah berikut untuk mengunduh semua *library* (seperti React, Tailwind, Framer Motion) ke dalam folder `node_modules`:
```bash
npm install
```

### 3. Buat File Konfigurasi Lingkungan (`.env`)
Aplikasi ini membutuhkan informasi ke mana harus mengirimkan data (ke sistem *Backend*).
Buat file bernama `.env` tepat di direktori utama `Frontend/` dan isi dengan:
```env
# Ganti port 5000 jika Backend Anda berjalan di port yang berbeda
VITE_API_URL="http://localhost:5000/api"
```

### 4. Jalankan Development Server
Mulai *server* pengembangan lokal dengan fitur *Hot Module Replacement (HMR)*:
```bash
npm run dev
```
Setelah berjalan, terminal akan menampilkan tautan lokal (contoh: `http://localhost:5173`). Klik atau buka tautan tersebut di peramban Anda.

---

## ✨ Pembaruan Fitur & Desain Terkini

Website ini dilengkapi dengan antarmuka B2B Premium (*Soft Enterprise Design*) yang dirancang secara cermat:

* **Pemisahan Logika (Separation of Concerns) pada Galeri Produk**: 
  * Foto menggunakan **YARL Lightbox** agar pengguna leluasa melakukan gestur pembesaran (pinch-to-zoom).
  * Video YouTube diputar menggunakan **Video Modal Khusus (berbasis React Portals)** agar 100% interaktif, antarmukanya responsif 16:9, bebas dari pembajakan sentuhan (*event hijacking*) di iOS/Android, dan tidak terpotong oleh batasan tata letak CSS apa pun.
* **Animasi "Liquid" Transisi**: Elemen-elemen memudar dan bergeser secara natural saat pengguna melakukan *scroll*, dikendalikan oleh Framer Motion.
* **Pintasan Konversi**: Terdapat tombol yang langsung menghubungkan pelanggan ke WhatsApp resmi atau format pengajuan Penawaran Harga (RFQ).

---

## 📂 Struktur Folder Proyek

Pemahaman mendasar untuk bernavigasi di *source code*:

```text
Frontend/
├── public/                 # Gambar logo, favicon, dan aset statis yang tidak perlu diolah
├── src/
│   ├── assets/             # Berkas CSS global (index.css) dan gambar-gambar utama
│   ├── components/         # Komponen UI modular (bisa dipakai berulang kali)
│   │   ├── admin/          # Komponen khusus untuk Dashboard Admin (Topbar, Sidebar)
│   │   ├── product/        # Komponen khusus produk (Galeri, Tabel Spek, dll)
│   │   └── ui/             # Komponen primitif dari Radix UI (Tombol, Input, Modal)
│   ├── contexts/           # Penyedia status global seperti Theme (Gelap/Terang) dan Auth (Sesi Login)
│   ├── hooks/              # Custom React Hooks (misalnya useCompanyProfile, dll)
│   ├── lib/                # Fungsi pembantu (utils.js) untuk menggabungkan class (Tailwind Merge)
│   ├── pages/              # Halaman-halaman penuh (Views)
│   │   ├── admin/          # Halaman portal Admin (Login, Kelola Produk, Pengaturan, dll)
│   │   └── public/         # Halaman sisi pengguna (Katalog, Detail Produk, Artikel, Tentang Kami)
│   ├── services/           # Konfigurasi komunikasi data dengan Backend (seperti Axios interceptor)
│   ├── App.jsx             # Pengatur rute (React Router) untuk semua halaman
│   └── main.jsx            # Titik masuk utama aplikasi React (Entry point)
├── .env                    # Variabel konfigurasi API lokal (JANGAN di-commit ke Git)
├── package.json            # Daftar library dan metadata proyek
└── tailwind.config.js      # Pengaturan tema visual, warna kustom perusahaan, dan animasi
```

---

## 📜 Daftar Perintah (Scripts)

Anda dapat menggunakan perintah berikut di terminal:

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan aplikasi untuk pengembangan (*Development Server*). Segala perubahan kode akan langsung terlihat. |
| `npm run build` | Menggabungkan dan mengompres seluruh *source code* menjadi file HTML/JS/CSS murni untuk diterbitkan (di- *deploy*) ke *server production*. |
| `npm run preview` | Menjalankan *server* lokal sementara untuk melihat hasil dari perintah `build`. |
| `npm run lint` | Melakukan pemindaian kualitas kode menggunakan ESLint (mencari penulisan yang rentan *error*). |

---

## 🧠 Manajemen *State* & Data (Data Flow)
* **AuthContext**: Menyimpan status *login* token (JWT) Admin. Jika token tidak valid/kadaluarsa, pengguna akan dialihkan kembali ke halaman login secara otomatis melalui *interceptor* di Axios.
* **ThemeContext**: Mengatur mode Gelap (*Dark Mode*) dan Terang (*Light Mode*) dengan cara menyisipkan atau mencabut *class* `dark` pada *tag* HTML utama.
* **Axios Interceptor (`src/services/axios.js`)**: File ini sangat vital. Setiap *request* keluar menuju *Backend* akan secara otomatis disisipi *header* `Authorization` berupa token JWT. Jika menerima respons `401 Unauthorized`, sesi lokal langsung dihapus untuk keamanan.

---

## 🎨 Panduan *Styling* (Tailwind & CSS)
Aplikasi ini memanfaatkan arsitektur **Tailwind CSS v4** sehingga Anda sangat jarang perlu menulis file `.css` manual. 
Meskipun begitu, *Design System* tingkat tinggi disimpan dalam `src/index.css` menggunakan **CSS Variables**:
* Variabel warna inti (seperti `--background`, `--foreground`, `--accent`, `--navy`) dideklarasikan secara global dan terbagi dalam blok khusus `:root` dan `.dark` agar transisi tema warna berjalan seketika.
* Animasi kustom global (seperti efek kemunculan halaman perlahan) dibuat dalam blok `@keyframes page-fade-in` dan dibungkus dalam *utility class* Tailwind seperti `.animate-page-fade`.

---

## 🚀 Panduan *Deployment* (Rilis Produksi)
Untuk memublikasikan aplikasi ini ke *server* publik (misalnya menggunakan Vercel, Netlify, atau VPS Nginx/Apache):
1. Pastikan *Backend* Anda sudah diunggah dan memiliki URL publik (contoh: `https://api.perusahaananda.com`).
2. Atur *Environment Variable* `VITE_API_URL` di pengaturan *hosting* produksi Anda dengan URL tersebut.
3. Jalankan perintah `npm run build` di terminal atau biarkan sistem CI/CD (seperti GitHub Actions / Vercel) menjalankannya secara otomatis.
4. Perintah ini akan menghasilkan folder bernama `dist/`. Folder inilah (yang berisi HTML, JS minified, dan CSS yang super kecil) yang akan diunggah ke internet.
5. **(Penting untuk VPS Nginx/Apache)**: Karena ini adalah *Single Page Application (SPA)* berbasis React Router, Anda **wajib** mengatur *routing fallback* server Anda (seperti `.htaccess` pada Apache atau `try_files` pada Nginx) agar semua alamat URL mengarah ke `index.html`. Jika tidak, ketika pengguna memuat ulang (*refresh*) halaman apa pun selain beranda, mereka akan mendapat pesan *Error 404 Not Found*.

---

*Dikembangkan secara eksklusif dengan standar rekayasa (engineering standard) yang berfokus pada kecepatan (performance), skalabilitas kelas enterprise, keamanan data, dan keandalan lintas-perangkat (Cross-Device Reliability).*