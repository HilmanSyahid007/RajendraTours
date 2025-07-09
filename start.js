const fs = require('fs');
const { exec } = require('child_process');

// Nama file session
const sessionFile = './session.json';

// Cek dan hapus session.json
if (fs.existsSync(sessionFile)) {
    fs.unlinkSync(sessionFile);
    console.log('✅ session.json berhasil dihapus.');
} else {
    console.log('ℹ️ Tidak ada session.json yang perlu dihapus.');
}

// Jalankan ulang bot
console.log('🚀 Menjalankan ulang bot...');
exec('node script-bot.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Gagal menjalankan bot: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`⚠️ STDERR: ${stderr}`);
        return;
    }
    console.log(`📄 BOT OUTPUT:\n${stdout}`);
});
