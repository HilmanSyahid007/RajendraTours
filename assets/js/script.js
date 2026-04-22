/**
 * Rajendra Tours - Main Script
 * Handles: Carousel, Tab Navigation, Schedule Fetching, OTP Simulation, and Navigation.
 */

document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initCarousel();
    initDateInput();
    initSchedulePage();
    initSeatSelection();
});

// --- Navigation ---
function initNavigation() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = {
        "index.html": "nav-home",
        "jadwal.html": "nav-schedule",
        "profile.html": "nav-profile"
    };

    const activeId = navLinks[currentPath];
    if (activeId) {
        const activeLink = document.getElementById(activeId);
        if (activeLink) activeLink.classList.add("active");
    }
}

// --- Carousel ---
let carouselIndex = 0;
function initCarousel() {
    const slides = document.querySelectorAll(".carousel img");
    const dots = document.querySelectorAll(".dot");
    if (slides.length === 0) return;

    function showSlides(n) {
        slides.forEach(slide => slide.classList.remove("active"));
        if (dots.length > 0) dots.forEach(dot => dot.classList.remove("active"));
        
        carouselIndex = (n + slides.length) % slides.length;
        
        slides[carouselIndex].classList.add("active");
        if (dots.length > 0) dots[carouselIndex].classList.add("active");
    }

    // Auto slide
    const slideInterval = setInterval(() => {
        showSlides(carouselIndex + 1);
    }, 4000);

    // Click dots to change slide
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            clearInterval(slideInterval);
            showSlides(i);
        });
    });
}

// --- Date Input Setup ---
function initDateInput() {
    const inputTanggal = document.getElementById("tanggal");
    if (inputTanggal && !inputTanggal.value) {
        const today = new Date().toISOString().split('T')[0];
        inputTanggal.value = today;
    }
}

// --- Schedule Logic ---
function initSchedulePage() {
    const tabContainer = document.querySelector('.tab-container');
    const scheduleList = document.getElementById('schedule-list');
    if (!tabContainer || !scheduleList) return;

    const berangkat = sessionStorage.getItem('berangkat');
    const tujuan = sessionStorage.getItem('tujuan');
    let tanggalDipilih = sessionStorage.getItem('tanggal');

    if (!tanggalDipilih) {
        const today = new Date();
        tanggalDipilih = today.toISOString().split('T')[0];
    }

    fetch("data/jadwal.json")
        .then(res => res.json())
        .then(semuaJadwal => {
            if (berangkat && tujuan) {
                const ruteKey = `${berangkat}-${tujuan}`;
                const ruteData = semuaJadwal[ruteKey];

                if (ruteData) {
                    renderTabs(ruteData, tanggalDipilih, tabContainer, scheduleList, berangkat, tujuan);
                } else {
                    tabContainer.innerHTML = '<p class="text-center">Rute tidak ditemukan.</p>';
                    scheduleList.innerHTML = '';
                }
            } else {
                tabContainer.innerHTML = '<p class="text-center">Silakan cari jadwal dari Beranda.</p>';
            }
        })
        .catch(err => {
            console.error("Gagal memuat jadwal:", err);
            tabContainer.innerHTML = '<p class="text-center">Terjadi kesalahan saat memuat data.</p>';
        });
}

function renderTabs(ruteData, tanggalDipilih, tabContainer, scheduleList, berangkat, tujuan) {
    tabContainer.innerHTML = '';
    
    // Ensure the selected date is in the list
    if (tanggalDipilih && !ruteData.tanggal.includes(tanggalDipilih)) {
        ruteData.tanggal.push(tanggalDipilih);
        ruteData.tanggal.sort();
    }

    ruteData.tanggal.forEach((tgl, index) => {
        const tab = document.createElement('div');
        tab.className = 'tab';
        if (tgl === tanggalDipilih) {
            tab.classList.add('active');
            tampilkanJadwalUntukTanggal(ruteData.data, tgl, scheduleList, berangkat, tujuan);
        }
        tab.innerText = formatTanggal(tgl);
        tab.setAttribute('data-tanggal', tgl);
        
        tab.addEventListener('click', function () {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            tampilkanJadwalUntukTanggal(ruteData.data, this.getAttribute('data-tanggal'), scheduleList, berangkat, tujuan);
        });
        
        tabContainer.appendChild(tab);
    });
}

function tampilkanJadwalUntukTanggal(data, tanggal, scheduleList, berangkat, tujuan) {
    scheduleList.innerHTML = '';
    const jadwalPadaTanggal = data.filter(item => item.tanggal === tanggal);

    if (jadwalPadaTanggal.length === 0 || (jadwalPadaTanggal.length === 1 && jadwalPadaTanggal[0].jam === "-")) {
        scheduleList.innerHTML = `
            <div class="schedule-card text-center">
                <p>Jadwal belum tersedia untuk tanggal ini.</p>
                <a href="https://wa.me/6285175107091" class="btn btn-whatsapp mt-10">📱 Hubungi Customer Service</a>
            </div>`;
    } else {
        jadwalPadaTanggal.forEach(item => {
            scheduleList.innerHTML += `
                <div class="schedule-card">
                    <div class="schedule-header">${berangkat} → ${tujuan}</div>
                    <div class="schedule-time">🕒 ${item.jam}</div>
                    <div class="schedule-price">💰 ${item.harga}</div>
                    <div class="schedule-icons">✨ Fasilitas: ${item.fasilitas}</div>
                    <div class="schedule-actions mt-10">
                        <a href="pilih_duduk.html" class="btn btn-primary" style="flex: 1;">Pesan Sekarang</a>
                    </div>
                </div>`;
        });
    }
}

function formatTanggal(tgl) {
    const d = new Date(tgl);
    if (isNaN(d.getTime())) return tgl;
    const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]}`;
}

// --- Seat Selection ---
function initSeatSelection() {
    const selectedSeatsSpan = document.getElementById("selectedSeats");
    if (!selectedSeatsSpan) return;

    const seatButtons = document.querySelectorAll(".seat");
    const totalPriceSpan = document.getElementById("totalPrice");
    const confirmButton = document.getElementById("confirmButton");
    const pricePerSeat = 100000;
    let selectedSeats = [];

    seatButtons.forEach(seat => {
        if (!seat.classList.contains("driver") && !seat.classList.contains("unavailable")) {
            seat.addEventListener("click", function () {
                const seatNumber = this.dataset.seat;
                this.classList.toggle("selected");

                if (selectedSeats.includes(seatNumber)) {
                    selectedSeats = selectedSeats.filter(s => s !== seatNumber);
                } else {
                    selectedSeats.push(seatNumber);
                }

                selectedSeatsSpan.textContent = selectedSeats.length ? selectedSeats.join(", ") : "-";
                totalPriceSpan.textContent = (selectedSeats.length * pricePerSeat).toLocaleString('id-ID');
            });
        }
    });

    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
            if (selectedSeats.length === 0) {
                alert("Silakan pilih kursi terlebih dahulu!");
                return;
            }
            sessionStorage.setItem("kursi", selectedSeats.join(", "));
            sessionStorage.setItem("total", selectedSeats.length * pricePerSeat);
            window.location.href = "form_pemesanan.html";
        });
    }
}

// --- Global Functions ---
window.cariJadwal = function() {
    const berangkat = document.getElementById("berangkat").value;
    const tujuan = document.getElementById("tujuan").value;
    const tanggal = document.getElementById("tanggal").value;

    if (!berangkat || !tujuan || !tanggal) {
        alert("Harap lengkapi data keberangkatan, tujuan, dan tanggal!");
        return;
    }

    sessionStorage.setItem('berangkat', berangkat);
    sessionStorage.setItem('tujuan', tujuan);
    sessionStorage.setItem('tanggal', tanggal);
    window.location.href = "jadwal.html";
};

window.pesanWA = function() {
    const berangkat = document.getElementById("berangkat")?.value || sessionStorage.getItem('berangkat');
    const tujuan = document.getElementById("tujuan")?.value || sessionStorage.getItem('tujuan');
    const tanggal = document.getElementById("tanggal")?.value || sessionStorage.getItem('tanggal');

    if (!berangkat || !tujuan || !tanggal) {
        alert("Harap lengkapi data perjalanan terlebih dahulu.");
        return;
    }

    const pesan = `Halo Rajendra Tours, saya ingin pesan tiket shuttle:\n📍 Dari: ${berangkat}\n📍 Ke: ${tujuan}\n📅 Tanggal: ${tanggal}`;
    window.open(`https://wa.me/6285175107091?text=${encodeURIComponent(pesan)}`, "_blank");
};

