// Script untuk menghapus folder 'session' secara otomatis

const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'session');

if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log("✅ Folder 'session' berhasil dihapus.");
} else {
    console.log("⚠️ Folder 'session' tidak ditemukan, mungkin sudah dihapus.");
}
