# 🚌 Rajendra Tours - Premium Shuttle Booking System

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg)](https://nodejs.org/)
[![Modern UI](https://img.shields.io/badge/UI-Premium%20Glassmorphism-orange.svg)](#)

**Rajendra Tours** adalah sistem pemesanan tiket shuttle modern yang menggabungkan antarmuka web premium dengan bot otomatisasi WhatsApp. Dirancang untuk memberikan pengalaman pemesanan yang cepat, elegan, dan terintegrasi bagi pelanggan travel.

---

## ✨ Fitur Utama

### 🌐 Frontend (Web Application)
- **Premium UI/UX**: Desain modern menggunakan konsep *Glassmorphism* yang bersih dan elegan.
- **Mobile First**: Antarmuka yang dioptimalkan sepenuhnya untuk pengguna perangkat seluler.
- **Fixed Navigation**: Menu navigasi bawah yang intuitif dengan indikator halaman aktif.
- **Interactive Booking**: Alur pemilihan rute, tanggal, hingga posisi kursi yang visual dan informatif.
- **Smooth Animations**: Transisi halus dan carousel promo yang dinamis.

### 🤖 Backend (WhatsApp Automation)
- **Auto-Reply Bot**: Otomatisasi respon pesan untuk pengecekan jadwal dan instruksi pemesanan.
- **Dynamic Data Support**: Bot terintegrasi langsung dengan data jadwal JSON terbaru.
- **Auto-Reconnect**: Sistem pemulihan koneksi otomatis untuk menjaga bot tetap online.
- **Session Management**: Pengelolaan sesi WhatsApp yang aman dan efisien.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+).
- **Backend Bot**: Node.js, [Baileys](https://github.com/WhiskeySockets/Baileys) (WhatsApp Socket Library).
- **Icons & Fonts**: Font Awesome, Google Fonts (Poppins).

---

## 📂 Struktur Proyek

```text
RajendraTours/
├── assets/
│   ├── css/
│   │   ├── global.css          # Design system & shared styles
│   │   ├── style.css           # Home page specific styles
│   │   └── ...                 # Other page styles
│   ├── js/
│   │   └── script.js           # Core frontend logic & navigation
│   └── img/                    # Image assets & logo
├── data/
│   └── jadwal.json             # Centralized schedule database
├── index.html                  # Landing page / Booking start
├── jadwal.html                 # Schedule view page
├── pilih_duduk.html            # Seat selection UI
├── form_pemesanan.html         # Final booking details form
├── script-bot.js               # WhatsApp bot core logic
└── package.json                # Project dependencies & scripts
```

---

## 🚀 Cara Menjalankan

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### 2. Instalasi
Clone repository ini dan instal dependensi yang diperlukan:
```bash
git clone https://github.com/HilmanSyahid007/RajendraTours.git
cd RajendraTours
npm install
```

### 3. Menjalankan Bot WhatsApp
Gunakan perintah berikut untuk memulai bot:
```bash
npm start
```
> Scan QR Code yang muncul di terminal menggunakan aplikasi WhatsApp Anda untuk menghubungkan bot.

---

## 🔐 Tips Keamanan & Penggunaan
- **Nomor CS**: Gunakan nomor khusus Customer Service untuk menjalankan bot agar terhindar dari pemblokiran.
- **Anti-Spam**: Bot dikonfigurasi untuk hanya membalas chat pribadi, hindari penggunaan di grup besar.
- **Deployment**: Untuk penggunaan 24/7, sangat disarankan menjalankan bot di VPS menggunakan Process Manager seperti `pm2`.

---

## 📞 Kontak & Bantuan
Jika Anda memiliki pertanyaan atau ingin bekerja sama, silakan hubungi tim **Rajendra Tours**.

---
*Dibuat dengan ❤️ untuk kemajuan transportasi digital Indonesia.*
