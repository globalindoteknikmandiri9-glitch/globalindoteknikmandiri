# Panduan Deployment - CV Globalindo Teknik Mandiri

Aplikasi ini menggunakan arsitektur **decoupled** yang terdiri dari:
1. **Backend**: Express.js + Prisma ORM + MySQL Database.
2. **Frontend**: React + Vite (Single Page Application).

Dokumen ini berisi panduan langkah-demi-langkah untuk melakukan deployment aplikasi ke hosting cPanel yang memiliki dukungan **Node.js** dan **SSH/Terminal Access**.

---

## Daftar Isi
1. [Persiapan Database di cPanel](#1-persiapan-database-di-cpanel)
2. [Deploy Backend (Node.js)](#2-deploy-backend-nodejs)
3. [Deploy Frontend (Vite Static SPA)](#3-deploy-frontend-vite-static-spa)
4. [Konfigurasi Tambahan & SSL](#4-konfigurasi-tambahan--ssl)

---

## 1. Persiapan Database di cPanel

1. Masuk ke dashboard **cPanel** Anda.
2. Cari dan klik menu **MySQL Database Wizard**.
3. **Step 1: Create A Database**: Masukkan nama database baru Anda (misal: `globalindo_db`) lalu klik **Next Step**.
4. **Step 2: Create Database Users**: Buat user database baru dan buat password yang aman. Simpan password tersebut baik-baik. Klik **Create User**.
5. **Step 3: Add User to the Database**: Centang pilihan **ALL PRIVILEGES** untuk memberikan seluruh hak akses user ke database tersebut. Klik **Make Changes**.
6. Simpan detail kredensial berikut untuk konfigurasi backend:
   * **Host**: `localhost` (atau `127.0.0.1`)
   * **Port**: `3306`
   * **Database Name**: `namausercpanel_globalindo_db`
   * **Database User**: `namausercpanel_userbiasa`
   * **Database Password**: `password_anda`

---

## 2. Deploy Backend (Node.js)

Deployment backend pada cPanel disarankan menggunakan fitur bawaan **Setup Node.js App**:

### Langkah A: Upload File Project
1. Di komputer lokal Anda, masuk ke folder `Backend`.
2. Buat arsip ZIP dari folder `Backend`. **PENTING: Jangan sertakan folder `node_modules`** agar file tidak terlalu besar.
3. Masuk ke cPanel, buka **File Manager**.
4. Disarankan untuk mengunggah file backend di luar folder publik (`public_html`). Buat folder baru bernama `/repositories/backend` di root direktori Anda.
5. Unggah file ZIP backend Anda ke folder `/repositories/backend` lalu **Extract**.

### Langkah B: Daftarkan Aplikasi Node.js di cPanel
1. Buka menu **Setup Node.js App** di cPanel.
2. Klik tombol **Create Application** di sebelah kanan atas.
3. Isi konfigurasi sebagai berikut:
   * **Node.js Version**: Pilih versi terbaru (direkomendasikan versi `18.x` atau `20.x`).
   * **Application mode**: Pilih `Production`.
   * **Application root**: Isi dengan folder root backend Anda (`repositories/backend`).
   * **Application URL**: Subdomain atau domain jalur API (misal: `api.globalindoteknik.com` atau `globalindoteknik.com/api`).
   * **Application startup file**: Isi dengan startup entry point Express Anda (misal: `src/app.js` atau `src/index.js`).
4. Klik **Create**. Aplikasi Node.js akan terdaftar dan berjalan sementara.

### Langkah C: Konfigurasi Environment (`.env`)
1. Buka **File Manager** cPanel, lalu masuk ke folder `/repositories/backend`.
2. Buat file baru bernama `.env`.
3. Isi file `.env` dengan konfigurasi database cPanel dan port:
   ```env
   DATABASE_URL="mysql://namausercpanel_userbiasa:password_anda@localhost:3306/namausercpanel_globalindo_db"
   JWT_SECRET="buat_string_acak_dan_panjang_untuk_keamanan_token"
   PORT=5000
   ```

### Langkah D: Menginstal Dependencies & Sinkronisasi DB via SSH
1. Buka **SSH/Terminal** klien Anda (seperti PuTTY) atau gunakan fitur **Terminal** langsung dari cPanel.
2. Masuk ke direktori backend:
   ```bash
   cd repositories/backend
   ```
3. Jalankan instalasi seluruh library (dependencies):
   ```bash
   npm install
   ```
4. Push struktur tabel database menggunakan Prisma:
   ```bash
   npx prisma db push
   ```
5. *(Opsional)* Jika Anda ingin menginisiasi akun Admin pertama kali melalui database seeder:
   ```bash
   node src/seed.js
   ```
6. Kembali ke menu **Setup Node.js App** di cPanel, lalu klik tombol **Restart** di aplikasi Node.js Anda untuk memuat ulang konfigurasi.

---

## 3. Deploy Frontend (Vite Static SPA)

Karena React/Vite adalah aplikasi SPA statis setelah dibuild, kita hanya perlu membuild-nya secara lokal lalu mengunggah hasilnya ke folder publik cPanel (`public_html`).

### Langkah A: Build Lokal
1. Di komputer lokal Anda, buka file `.env` yang berada di root folder `Frontend`.
2. Ubah `VITE_API_URL` ke domain backend produksi Anda yang telah aktif:
   ```env
   VITE_API_URL="https://api.globalindoteknik.com/api"
   ```
3. Buka Terminal lokal Anda di dalam folder `Frontend`, lalu jalankan perintah build:
   ```bash
   npm run build
   ```
4. Perintah ini akan menghasilkan folder baru bernama `dist`.

### Langkah B: Upload dan Ekstrak ke Server
1. Masuk ke dalam folder `dist` di komputer Anda.
2. Kompres/ZIP seluruh file dan folder yang berada di **dalam** folder `dist` tersebut (seperti folder `assets`, berkas `index.html`, dll.).
3. Masuk ke **File Manager** cPanel, lalu buka folder **`public_html`** (atau folder subdomain tujuan frontend Anda).
4. Unggah file ZIP hasil build tadi ke sana.
5. Klik kanan pada file ZIP tersebut di File Manager dan klik **Extract**.

### Langkah C: Konfigurasi Fallback Routing React (`.htaccess`)
Agar halaman-halaman web yang menggunakan React Router tidak menghasilkan error *404 Not Found* saat pengguna melakukan refresh halaman secara langsung:
1. Di dalam folder `public_html` di File Manager cPanel, buat file baru bernama `.htaccess` (pastikan fitur "Show Hidden Files" diaktifkan di pengaturan File Manager).
2. Isi file `.htaccess` dengan script berikut:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```
3. Simpan berkas tersebut.

---

## 4. Konfigurasi Tambahan & SSL

1. **AutoSSL**: Pastikan fitur AutoSSL cPanel Anda aktif agar website dapat diakses secara aman melalui protokol `https://`.
2. **CORS**: Jika domain frontend dan domain backend berbeda (misal: `globalindoteknik.com` dan `api.globalindoteknik.com`), pastikan backend mengizinkan origin dari frontend di konfigurasi CORS backend Anda.
