# CV Globalindo Teknik Mandiri — Struktur & Cara Kerja Proyek

## Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Node.js, Express 5, Prisma 6 (ORM), MySQL, JWT, Multer + Sharp |
| Frontend | React 19, Vite 8, Tailwind CSS 4, shadcn/ui, React Router 7, Axios, Framer Motion |
| Arsitektur | **Decoupled SPA** — Frontend static SPA, Backend REST API terpisah |

---

## Struktur Folder

```
globalindoteknikmandiri/
├── readme.md                        # Panduan deploy utama
├── general.md                       # Dokumen ini
│
├── Backend/
│   ├── .env                         # DATABASE_URL, JWT_SECRET, PORT
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma            # Skema database (8 tabel)
│   ├── public/uploads/              # Folder penyimpanan gambar upload
│   └── src/
│       ├── index.js                 # Entry point Express (CORS, routes, static)
│       ├── seed.js                  # Seeder user SUPERADMIN
│       ├── seed-profile.js          # Seeder CompanyProfile
│       ├── config/
│       │   └── db.js                # Prisma client singleton
│       ├── controllers/             # Logika bisnis tiap resource
│       │   ├── authController.js
│       │   ├── publicController.js
│       │   ├── dashboardController.js
│       │   ├── profileController.js
│       │   ├── userController.js
│       │   ├── categoryController.js
│       │   ├── productController.js
│       │   ├── articleController.js
│       │   └── messageController.js
│       ├── middlewares/             # Middleware Express
│       │   ├── authMiddleware.js    # Verifikasi JWT
│       │   ├── superAdminMiddleware.js
│       │   ├── uploadMiddleware.js  # Multer (gambar, max 5MB)
│       │   └── compressionMiddleware.js  # Sharp (resize 1200px, quality 80)
│       └── routes/
│           ├── authRoutes.js        # /api/auth/*
│           ├── adminRoutes.js       # /api/admin/* (protected)
│           └── publicRoutes.js      # /api/public/* (public)
│
└── Frontend/
    ├── .env                         # VITE_API_URL=http://localhost:5000/api
    ├── package.json
    ├── vite.config.js               # React plugin + @ alias
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── components.json              # shadcn/ui config
    ├── public/                      # Favicon, logo
    └── src/
        ├── main.jsx                 # Entry React
        ├── App.jsx                  # Router, providers, error boundary
        ├── index.css                # Tailwind + CSS variables (light/dark)
        ├── lib/
        │   └── utils.js             # cn(), getAssetUrl()
        ├── hooks/
        │   └── useCompanyProfile.js # Fetch + cache company profile
        ├── services/
        │   └── axios.js             # Axios instance + JWT interceptor
        ├── contexts/
        │   ├── AuthContext.jsx       # State login/logout/user/token
        │   └── ThemeContext.jsx      # Light/dark/system
        ├── layouts/
        │   ├── PublicLayout.jsx      # Navbar + Footer + animasi halaman
        │   └── AdminLayout.jsx       # Sidebar + Topbar + auth guard
        ├── components/
        │   ├── ui/                  # shadcn/ui (button, card, dialog, table, dll)
        │   ├── public/              # Navbar, Footer
        │   │   └── home/            # Hero, FeaturedProducts, Divisions, dll
        │   ├── admin/               # AdminSidebar, AdminTopbar
        │   └── product/             # ProductGallery, ProductInfo, Specs, dll
        ├── data/                    # Data statis (company, divisions, products, articles, procurement)
        └── pages/
            ├── public/              # Home, Products, ProductDetail, About, Articles, Contact, NotFound
            └── admin/               # Login, Dashboard, CRUD pages, Settings, ChangePassword
```

---

## Alur Routing

### Backend (prefix `/api`)

| Group | Path | Auth | Fungsi |
|-------|------|------|--------|
| Auth | `/api/auth/login` | — | Login (public) |
| | `/api/auth/me` | JWT | Profile user saat ini |
| | `/api/auth/change-password` | JWT | Ganti password |
| Admin | `/api/admin/*` | JWT + SuperAdmin | CRUD: dashboard, profile, users, categories, products, articles, messages |
| Public | `/api/public/*` | — | GET: profile, categories, products, articles; POST: contact |

### Frontend (client-side)

| Path | Halaman | Layout |
|------|---------|--------|
| `/` | Home | Public |
| `/produk` | Products | Public |
| `/products/:slug` | ProductDetail | Public |
| `/artikel` | Articles | Public |
| `/tentang-kami` | About | Public |
| `/hubungi-kami` | Contact | Public |
| `/admin/login` | Login | Standalone |
| `/admin/*` | Dashboard & CRUD | Admin |

---

## Alur Data

1. **Halaman publik** → panggil `GET /api/public/...` langsung dari komponen React
2. **Halaman admin** → dicek AuthContext (token di localStorage), Axios interceptor otomatis attach `Bearer <token>`, backend verifikasi JWT
3. **Upload gambar** → Multer → Sharp (resize + kompres) → controller simpan path ke DB
4. **Dashboard** → `GET /api/admin/dashboard` → aggregasi statistik dari DB
5. **Contact form** → `POST /api/public/contact` → validasi backend → simpan ke ContactMessage

---

## Auth Flow

1. Login di `/admin/login` → `POST /api/auth/login`
2. Backend verifikasi username + bcrypt password → return JWT (exp: 1 hari)
3. Frontend simpan token di localStorage, simpan user di context
4. Setiap request admin → Axios interceptor attach token
5. `authMiddleware` verify JWT → attach `req.user`
6. `superAdminMiddleware` cek role (untuk operasi sensitif)

---

## Database (8 tabel)

| Tabel | Fungsi |
|-------|--------|
| User | Admin auth (username, password_hash, role) |
| CompanyProfile | Single-row config perusahaan |
| Banner | Banner homepage |
| Category | Kategori produk |
| Product | Produk (dengan slug, spesifikasi, status) |
| ProductImage | Banyak gambar per produk |
| Article | Artikel (dengan slug, status, author) |
| ContactMessage | Pesan dari form kontak |

---

## Catatan Penting

- **Decoupled SPA**: Backend dan Frontend fully terpisah. Deploy backend pakai Node.js (cPanel), frontend di-build static (`dist/`) + `.htaccess` untuk SPA fallback.
- **Lazy loading**: Semua page pake `React.lazy()` + `Suspense` biar code-split.
- **Dark mode**: CSS custom properties di `:root` dan `.dark`, class toggle via ThemeContext.
- **Bahasa**: UI pakai Bahasa Indonesia.
- **Seeder**: `seed.js` (buat admin) + `seed-profile.js` (isi company profile) jalan sekali di awal.
