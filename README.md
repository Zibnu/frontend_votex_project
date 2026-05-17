# 🗳️ Votex — Frontend Documentation

Dokumentasi ini menjelaskan cara melakukan **fork**, **menjalankan secara lokal**, hingga **deploy ke Vercel** untuk project frontend Votex yang dibangun dengan **React.js** dan **Tailwind CSS**.

Important!!!
**Sebaiknya Lakukan Fork Backendnya terlebih dahulu di repository backend votex**

---

## 📋 Daftar Isi

- [Kebutuhan Awal (Prerequisites)](#-kebutuhan-awal-prerequisites)
- [Fork Project dari GitHub](#-1-fork-project-dari-github)
- [Clone Repository ke Komputer Lokal](#-2-clone-repository-ke-komputer-lokal)
- [Install Dependencies](#-3-install-dependencies)
- [Konfigurasi Environment Variable](#-4-konfigurasi-environment-variable)
- [Menjalankan Project Secara Lokal](#-5-menjalankan-project-secara-lokal)
- [Push ke GitHub Akun Sendiri](#-6-push-ke-github-akun-sendiri)
- [Deploy ke Vercel](#-7-deploy-ke-vercel)

---

## 🛠️ Kebutuhan Awal (Prerequisites)

Sebelum memulai, pastikan software berikut sudah terinstall di komputer kamu:

| Software | Kegunaan | Link Download |
|---|---|---|
| **Git Bash / GitHub Desktop** | Untuk clone, commit, dan push repository | [git-scm.com](https://git-scm.com/downloads) |
| **Node.js & npm** | Untuk menginstall library dan menjalankan project React | [nodejs.org](https://nodejs.org/) |

> **Catatan:** Untuk kebutuhan **backend** (database PostgreSQL), kamu bisa menggunakan **DBeaver** jika ingin menjalankan backend secara lokal, atau langsung menggunakan layanan deploy seperti **Railway** — namun hal tersebut bersifat opsional dan terpisah dari panduan frontend ini.

---

## 🍴 1. Fork Project dari GitHub

Fork adalah cara untuk menyalin repository ini ke akun GitHub kamu sendiri, sehingga kamu bisa bebas melakukan perubahan tanpa memengaruhi repository asli.

**Langkah-langkah:**

1. Buka repository Votex di GitHub.
2. Klik tombol **Fork** di pojok kanan atas halaman.

   ![Fork Button](https://docs.github.com/assets/cb-40742/mw-1440/images/help/repository/fork-button.webp)

3. Pilih akun GitHub kamu sebagai tujuan fork.
4. Tunggu proses fork selesai — kamu akan diarahkan ke salinan repository di akun kamu.

---

## 💻 2. Clone Repository ke Komputer Lokal

Setelah fork berhasil, clone repository tersebut ke komputer lokal kamu.

1. Di halaman repository hasil fork kamu, klik tombol **Code** (warna hijau).
2. Salin URL HTTPS yang tersedia.
3. Buka **Git Bash** dan jalankan perintah berikut:

```bash
git clone https://github.com/<username-kamu>/votex.git
```

4. Masuk ke folder project:

```bash
cd votex
```

---

## 📦 3. Install Dependencies

Project ini menggunakan berbagai library (termasuk Tailwind CSS). Install semua dependencies yang dibutuhkan dengan perintah:

```bash
npm install
```

Tunggu hingga proses selesai. Semua package yang terdaftar di `package.json` akan otomatis terunduh ke folder `node_modules`.

---

## ⚙️ 4. Konfigurasi Environment Variable

> **⚠️ Penting!** File `.env` **tidak ikut tersimpan di GitHub** karena sudah didaftarkan di `.gitignore`. Kamu perlu membuatnya secara manual.

Project frontend Votex membutuhkan satu environment variable untuk terhubung ke backend:

1. Buat file baru bernama **`.env`** di **root folder** project (sejajar dengan `package.json`).
2. Isi file `.env` dengan konfigurasi berikut:

```env
VITE_BASE_URL=https://url-backend-kamu.com
```

> Ganti `https://url-backend-kamu.com` dengan URL backend Votex yang sedang berjalan (misalnya URL dari Railway atau server lainnya).

**Tanpa file `.env` ini, project tidak dapat terhubung ke backend dan sebagian fitur tidak akan berfungsi.**

---

## ▶️ 5. Menjalankan Project Secara Lokal

Setelah install dan konfigurasi `.env` selesai, jalankan project dengan:

```bash
npm run dev
```

Project akan berjalan dan dapat diakses di browser melalui:

```
http://localhost:5173
```

> **Catatan:** Jika backend belum dijalankan, beberapa fitur seperti login, voting, atau pengambilan data mungkin tidak bekerja. Pastikan backend sudah aktif dan URL-nya sudah benar di file `.env`.

---

## 📤 6. Push ke GitHub Akun Sendiri

Jika kamu sudah melakukan perubahan dan ingin menyimpannya ke repository GitHub kamu, ikuti langkah berikut:

```bash
# Tambahkan semua perubahan ke staging
git add .

# Buat commit dengan pesan yang deskriptif
git commit -m "deskripsi perubahan yang kamu buat"

# Push ke branch utama di repository fork kamu
git push origin main
```

> Pastikan kamu sudah login ke GitHub di Git Bash. Jika diminta autentikasi, gunakan **Personal Access Token (PAT)** dari GitHub sebagai password.

---

## 🚀 7. Deploy ke Vercel

Setelah code sudah ada di repository GitHub kamu, ikuti langkah berikut untuk melakukan deploy ke **Vercel**:

### Langkah 1 — Buat Akun & Login Vercel

1. Buka [vercel.com](https://vercel.com) dan buat akun (bisa login langsung dengan akun GitHub).

### Langkah 2 — Import Repository

1. Di dashboard Vercel, klik **"Add New Project"**.
2. Pilih **"Import Git Repository"**.
3. Hubungkan akun GitHub kamu jika belum, lalu pilih repository **votex** hasil fork tadi.

### Langkah 3 — Konfigurasi Project

Vercel biasanya otomatis mendeteksi project Vite/React. Pastikan konfigurasi berikut sudah benar:

| Setting | Nilai |
|---|---|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Langkah 4 — Set Environment Variable di Vercel

Ini adalah langkah yang **sangat penting**. Karena file `.env` tidak ikut ke GitHub, kamu harus menambahkan environment variable langsung di Vercel:

1. Scroll ke bagian **"Environment Variables"** sebelum klik deploy.
2. Tambahkan variable berikut:

   | Name | Value |
   |---|---|
   | `VITE_BASE_URL` | `https://url-backend-kamu.com` |

3. Pastikan environment-nya mencakup **Production**, **Preview**, dan **Development**.

### Langkah 5 — Deploy

1. Klik tombol **"Deploy"**.
2. Tunggu proses build selesai (biasanya 1–3 menit).
3. Setelah selesai, Vercel akan memberikan URL publik untuk project kamu, contoh:

```
https://votex-username.vercel.app
```

---

## 🔄 Update Deployment Otomatis

Setelah project terhubung dengan Vercel, setiap kali kamu melakukan **`git push`** ke branch `main`, Vercel akan otomatis melakukan **re-deploy** dengan kode terbaru. Tidak perlu deploy ulang secara manual.

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---|---|
| `npm install` gagal | Pastikan Node.js sudah terinstall. Cek dengan `node -v` dan `npm -v` |
| Project jalan tapi data tidak muncul | Periksa isi file `.env`, pastikan `VITE_BASE_URL` sudah benar |
| Build Vercel gagal | Pastikan environment variable `VITE_BASE_URL` sudah diset di Vercel dashboard |
| `git push` ditolak | Gunakan Personal Access Token (PAT) GitHub sebagai autentikasi |

---
