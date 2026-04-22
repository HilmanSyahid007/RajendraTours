/**
 * Rajendra Tours - WhatsApp Bot (Baileys)
 * Features: Auto-reconnect, Dynamic Schedule, Session Management, Modular Logic.
 */

const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion 
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require('path');

// --- Helper: Load Schedules ---
function getSchedules() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'jadwal.json'), 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("❌ Gagal membaca jadwal.json:", err.message);
        return {};
    }
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false // We use qrcode-terminal for more control
    });

    sock.ev.on('creds.update', saveCreds);

    // --- Connection Monitoring ---
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('📱 Silakan scan QR Code di bawah untuk login:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) 
                ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut 
                : true;

            console.log('❌ Koneksi terputus karena:', lastDisconnect.error?.message, '. Reconnect:', shouldReconnect);

            if (shouldReconnect) {
                setTimeout(startBot, 5000); // Reconnect after 5 seconds
            } else {
                console.log('🚫 Sesi dikeluarkan. Hapus folder "session" untuk scan ulang.');
            }
        } else if (connection === 'open') {
            console.log('✅ Rajendra Tours Bot berhasil online!');
        }
    });

    // --- Message Handling ---
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const pengirim = msg.key.remoteJid;
        const text = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').toLowerCase().trim();

        // Filter: Hanya tanggapi chat pribadi
        if (pengirim.endsWith('@g.us') || pengirim.includes('broadcast')) return;

        console.log(`📩 Pesan masuk dari ${pengirim}: ${text}`);

        try {
            if (text === 'menu' || text === 'halo' || text === 'p' || text === 'hi') {
                await sock.sendMessage(pengirim, {
                    text: `Halo! Selamat datang di *Rajendra Tours* 🚌\n\nKetik kata kunci berikut untuk bantuan:\n👉 *jadwal* : Lihat jadwal keberangkatan\n👉 *pesan* : Cara melakukan pemesanan\n👉 *lokasi* : Info alamat kantor`
                });
            } 
            else if (text.includes('jadwal')) {
                const schedules = getSchedules();
                let reply = `*Jadwal Keberangkatan Rajendra Tours* 🕒\n\n`;
                
                Object.keys(schedules).forEach(rute => {
                    const dataRute = schedules[rute].data[0]; // Ambil jadwal pertama sebagai contoh
                    if (dataRute) {
                        reply += `📍 *${rute}*\n⏰ Jam: ${dataRute.jam}\n💰 Harga: ${dataRute.harga}\n\n`;
                    }
                });

                reply += `Untuk detail lengkap dan pilih kursi, kunjungi:\nhttps://rajendratours.com/jadwal`;
                await sock.sendMessage(pengirim, { text: reply });
            } 
            else if (text.includes('pesan') || text.includes('order')) {
                await sock.sendMessage(pengirim, {
                    text: `Cara Pemesanan Tiket:\n1. Buka website kami: https://rajendratours.com\n2. Pilih rute dan tanggal.\n3. Pilih kursi favorit Anda.\n4. Isi data diri dan konfirmasi.\n\nAtau balas chat ini dengan format:\n*Nama # Dari # Tujuan # Tanggal*`
                });
            }
            else if (text.includes('lokasi') || text.includes('alamat')) {
                await sock.sendMessage(pengirim, {
                    text: `📍 *Kantor Pusat Rajendra Tours*\nJl. Sudirman No. 123, Pekanbaru, Riau.\n\nJam Operasional: 07:00 - 22:00 WIB`
                });
            }
            else {
                // Jika user mengirim format pemesanan (Nama # Dari # Tujuan # Tanggal)
                if (text.includes('#')) {
                    await sock.sendMessage(pengirim, {
                        text: `Terima kasih! Tim kami akan segera mengecek ketersediaan untuk rute tersebut. Mohon tunggu sebentar ya Kak. 🙏`
                    });
                } else {
                    await sock.sendMessage(pengirim, {
                        text: `Maaf, saya tidak mengerti. Ketik *menu* untuk melihat daftar bantuan.`
                    });
                }
            }
        } catch (err) {
            console.error("❌ Gagal mengirim pesan:", err.message);
        }
    });
}

// Jalankan bot
console.log('🚀 Memulai Rajendra Tours Bot...');
startBot().catch(err => console.error("🔥 Critical Error:", err.message));

