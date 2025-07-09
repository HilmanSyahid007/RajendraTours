function toggleMenu() {
    let menu = document.querySelector(".navbar .menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }

    menu.classList.toggle("active");
}

let index = 0;
function showSlides() {
    let slides = document.querySelectorAll(".carousel img");
    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove("active"));
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}
setInterval(showSlides, 3000);

document.addEventListener("DOMContentLoaded", function () {
    const inputTanggal = document.getElementById("tanggal");
    if (inputTanggal && !inputTanggal.value) {
        const today = new Date().toISOString().split('T')[0];
        inputTanggal.value = today;
    }

    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            console.log("Memfilter jadwal untuk:", this.innerText);
        });
    });

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const header = this.closest(".schedule-card").querySelector(".schedule-header").innerText;
            const time = this.closest(".schedule-card").querySelector(".schedule-time").innerText;
            if (time === "-") {
                alert("Jadwal belum tersedia. Silakan hubungi Customer Service.");
            } else {
                alert("Anda memilih jadwal: " + header);
            }
        });
    });
});

let otpCode = "";
let userPhone = "";

function kirimOTP() {
    const phone = document.getElementById("phoneInput").value.trim();
    if (phone === "") {
        alert("Harap masukkan nomor WhatsApp");
        return;
    }

    otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    alert("Kode OTP dikirim ke " + phone + " (Simulasi: " + otpCode + ")");
    userPhone = phone;
    document.getElementById("otpSection").classList.remove("hidden");
}

function verifikasiOTP() {
    const inputCode = document.getElementById("otpInput").value.trim();
    if (inputCode === otpCode) {
        localStorage.setItem("loggedInUser", userPhone);
        alert("Berhasil login!");
        window.location.href = "profile.html";
    } else {
        alert("Kode OTP salah!");
    }
}

function cariJadwal() {
    const berangkat = document.getElementById("berangkat").value;
    const tujuan = document.getElementById("tujuan").value;
    let tanggal = document.getElementById("tanggal").value;

    if (!berangkat || !tujuan) {
        alert("Harap lengkapi data keberangkatan dan tujuan terlebih dahulu!");
        return;
    }

    // Jika user tidak isi tanggal, pakai tanggal hari ini
    if (!tanggal) {
        const today = new Date();
        tanggal = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    }

    sessionStorage.setItem('berangkat', berangkat);
    sessionStorage.setItem('tujuan', tujuan);
    sessionStorage.setItem('tanggal', tanggal);

    window.location.href = "jadwal.html";
}


const berangkat = sessionStorage.getItem('berangkat');
const tujuan = sessionStorage.getItem('tujuan');
let tanggalDipilih = sessionStorage.getItem('tanggal');

const tabContainer = document.querySelector('.tab-container');
const scheduleList = document.getElementById('schedule-list');

function formatTanggal(tgl) {
    if (!tgl) return "Tanggal tidak valid";
    const d = new Date(tgl);
    if (isNaN(d.getTime())) return "Tanggal tidak valid";

    const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

function tampilkanJadwalUntukTanggal(data, tanggal) {
    scheduleList.innerHTML = '';
    const jadwalPadaTanggal = data.filter(item => item.tanggal === tanggal);

    if (jadwalPadaTanggal.length === 0) {
        scheduleList.innerHTML = '<p>Tidak ada jadwal untuk tanggal ini.</p>';
    } else {
        jadwalPadaTanggal.forEach(item => {
            scheduleList.innerHTML += `
                <div class="schedule-card">
                    <div class="schedule-header">${berangkat} → ${tujuan}</div>
                    <div class="schedule-time">${item.jam}</div>
                    <div class="schedule-price">${item.harga}</div>
                    <div class="schedule-icons">${item.fasilitas}</div>
                    <div class="schedule-actions">
                        ${item.jam === "-" ? 
                        `<a href="https://wa.me/6285175107091"><button class="btn" style="background: green;">📱 Hubungi CS</button></a>` :
                        `<a href="pilih_duduk.html"><button class="btn">Pesan</button></a>
                         <a href="https://wa.me/6285175107091"><button class="btn" style="background: green;">📱 WhatsApp</button></a>`}
                    </div>
                </div>`;
        });
    }
}
// Fungsi pesan melalui WA
function pesanWA() {
    const berangkat = document.getElementById("berangkat").value;
    const tujuan = document.getElementById("tujuan").value;
    const tanggal = document.getElementById("tanggal").value;

    if (!berangkat || !tujuan || !tanggal) {
        alert("Harap lengkapi data keberangkatan, tujuan, dan tanggal.");
        return;
    }

    const pesan = `Halo Rajendra Tours, saya ingin pesan tiket shuttle dengan detail berikut:\n- Dari: ${berangkat}\n- Ke: ${tujuan}\n- Tanggal: ${tanggal}`;
    const encodedPesan = encodeURIComponent(pesan);

    // Ganti nomor ini dengan nomor WhatsApp CS Rajendra Tours yang dipakai di bot
    const nomorCS = "6285175107091";

    window.open(`https://wa.me/${nomorCS}?text=${encodedPesan}`, "_blank");
}


// Fungsi pilih tanggal
if (!tanggalDipilih) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    tanggalDipilih = `${yyyy}-${mm}-${dd}`;
    console.log("Tanggal default digunakan:", tanggalDipilih);
}

fetch("data/jadwal.json")
  .then(res => res.json())
  .then(semuaJadwal => {
    if (berangkat && tujuan) {
        const ruteKey = `${berangkat}-${tujuan}`;
        const ruteData = semuaJadwal[ruteKey];

        if (ruteData) {
            if (tanggalDipilih && !ruteData.tanggal.includes(tanggalDipilih)) {
                ruteData.tanggal.push(tanggalDipilih);
            }

            if (tanggalDipilih && !ruteData.data.some(item => item.tanggal === tanggalDipilih)) {
                ruteData.data.push({
                    tanggal: tanggalDipilih,
                    jam: "-",
                    harga: "Jadwal belum tersedia, Silakan hubungi Customer Service.",
                    fasilitas: "❓ ❓ ❓"
                });
            }

            tabContainer.innerHTML = '';
            ruteData.tanggal.forEach((tgl, index) => {
                const tab = document.createElement('div');
                tab.className = 'tab';
                if (tgl === tanggalDipilih || (!tanggalDipilih && index === 0)) {
                    tab.classList.add('active');
                    tampilkanJadwalUntukTanggal(ruteData.data, tgl);
                }
                tab.innerText = formatTanggal(tgl);
                tab.setAttribute('data-tanggal', tgl);
                tabContainer.appendChild(tab);
            });

            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function () {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    const selectedTanggal = this.getAttribute('data-tanggal');
                    tampilkanJadwalUntukTanggal(ruteData.data, selectedTanggal);
                });
            });

        } else {
            tabContainer.innerHTML = '<p>Rute tidak ditemukan.</p>';
            scheduleList.innerHTML = '';
        }
    } else {
        tabContainer.innerHTML = '<p>Data tidak lengkap.</p>';
        scheduleList.innerHTML = '';
    }
  })
  .catch(err => {
    console.error("Gagal memuat data jadwal.json", err);
    tabContainer.innerHTML = '<p>Gagal memuat jadwal.</p>';
  });
