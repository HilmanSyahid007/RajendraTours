// Fungsi Reply otomatis 
// Auto-reply WhatsApp menggunakan Baileys

const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    // Tampilkan QR ke terminal
    sock.ev.on('connection.update', ({ connection, qr }) => {
        if (qr) {
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'open') {
            console.log('✅ Bot berhasil login ke WhatsApp!');
        } else if (connection === 'close') {
            console.log('❌ Koneksi ditutup. Coba ulangi login.');
        }
    });

    // Logika pesan tetap
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const pengirim = msg.key.remoteJid;

        // 🔒 Filter: Hanya tanggapi pesan pribadi (bukan grup atau broadcast)
        if (pengirim.endsWith('@g.us')) return;
        if (pengirim.includes('broadcast')) return;

        console.log(`📩 Pesan dari ${pengirim}: ${text}`);

        if (text.toLowerCase().includes('pesan')) {
            await sock.sendMessage(pengirim, {
                text: `Terima kasih telah menghubungi Rajendra Tours 🚌\nSilakan isi data berikut:\n- Nama\n- Lokasi Berangkat\n- Tujuan\n- Tanggal Keberangkatan`
            });
        } else if (text.toLowerCase().includes('jadwal')) {
            await sock.sendMessage(pengirim, {
                text: `Untuk melihat jadwal terbaru, silakan kunjungi: https://rajendratours.com/jadwal`
            });
        } else {
            await sock.sendMessage(pengirim, {
                text: `Halo! Balas dengan kata *pesan* atau *jadwal* untuk memulai.`
            });
        }
    });
}

startBot();
