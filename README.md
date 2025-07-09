# 🤖 Auto-reply WhatsApp Bot untuk Rajendra Tours

Script ini menggunakan [Baileys](https://github.com/WhiskeySockets/Baileys) untuk membuat bot WhatsApp auto-reply yang merespon kata kunci seperti `pesan` atau `jadwal`. Cocok untuk digunakan sebagai asisten pemesanan shuttle Rajendra Tours via WhatsApp.

---

## 📁 Struktur Project

```
RajendraTours-Demo/
├── assets/
│   └── js/
│       └── script.js            # Fungsi tombol "Pesan via WhatsApp"
├── session/                      # Folder session (otomatis dibuat setelah login)
├── script-bot.js                 # Bot auto-reply WhatsApp (pakai Baileys)
├── start.js                      # Alternatif launcher bot (opsional)
├── index.html                    # Tampilan landing page
├── README.md                     # Dokumentasi ini
└── ...
```

---

## ⚙️ Cara Menjalankan Bot WhatsApp

### 1. Instalasi Dependency
```bash
npm install @whiskeysockets/baileys qrcode-terminal
```

### 2. Jalankan Bot Pertama Kali
```bash
node script-bot.js
```
> QR Code akan muncul di terminal. Scan dengan aplikasi WhatsApp kamu.

### 3. Catatan Penting
- Gunakan **nomor baru atau CS Rajendra Tours** untuk menghindari `code: 515` dari WhatsApp.
- Hindari balas ke grup, broadcast, atau spam agar akun tidak terkena limit.
- Semua pesan yang masuk ke nomor CS (via tombol "Pesan WA") akan ditanggapi oleh bot.
- Untuk sementara WA Bot dari @whiskeysockets/baileys diperlukan adanya komputer yang nyala 24jam nonstop
- Jika kamu perlu auto-reply resmi, bisa pertimbangkan untuk menggunakan WA Bot: 
    1. WhatsApp Business API (berbayar)
    2. Gateway seperti Wablas, [Zenziva WA API], atau [Ultramsg]

---

## 🌐 Integrasi ke Website

### Di `index.html` tambahkan:
```html
<button onclick="pesanWA()">📱 Pesan Lewat WhatsApp</button>
```

### Di `assets/js/script.js` tambahkan fungsi:
```javascript
function pesanWA() {
    const berangkat = document.getElementById("berangkat").value;
    const tujuan = document.getElementById("tujuan").value;
    const tanggal = document.getElementById("tanggal").value;

    let text = `Halo, saya ingin pesan shuttle:\n- Berangkat dari: ${berangkat}\n- Tujuan ke: ${tujuan}\n- Tanggal: ${tanggal}`;
    let url = `https://wa.me/628xxxxxx?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
}
```
> Ganti `628xxxxxx` dengan nomor WA CS Rajendra Tours

---

## 🔐 Tips Keamanan & Anti-Banned
- Hindari broadcast
- Jangan balas pesan dari grup
- Hanya tanggapi pesan pribadi dari user ke CS
- Gunakan 1 koneksi dalam 1 waktu
- Idealnya simpan session di VPS untuk bot 24/7

---

## 🚀 Siap Deploy ke GitHub

### 1. Inisialisasi Git (jika belum)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Tambahkan Remote dan Push
```bash
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

---

## 📞 Kontak Bantuan
Jika mengalami kendala hubungi kami 

---

Sukses untuk Rajendra Tours! 🚐✨
