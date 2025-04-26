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
    slides.forEach(slide => slide.classList.remove("active"));
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}
setInterval(showSlides, 3000);

document.addEventListener("DOMContentLoaded", function () {
    // Fitur tab tanggal
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            // Simulasi filter berdasarkan tanggal (bisa disesuaikan dengan backend)
            console.log("Memfilter jadwal untuk:", this.innerText);
        });
    });

    // Efek klik tombol pemesanan
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Anda memilih jadwal: " + this.closest(".schedule-card").querySelector(".schedule-header").innerText);
        });
    });
});

    // Fungsi OTP untuk login
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
        window.location.href = "profile.html"; // redirect setelah login sukses
      } else {
        alert("Kode OTP salah!");
      }
    }


    // Fungsi Pilih Rute + Cari Jadwal
    function cariJadwal() {
      const berangkat = document.getElementById('berangkat').value;
      const tujuan = document.getElementById('tujuan').value;
      const tanggal = document.getElementById('tanggal').value;

      if (!berangkat || !tujuan || !tanggal) {
          alert("Harap lengkapi semua pilihan terlebih dahulu!");
          return;
      }

      // Simpan ke sessionStorage
      sessionStorage.setItem('berangkat', berangkat);
      sessionStorage.setItem('tujuan', tujuan);
      sessionStorage.setItem('tanggal', tanggal);

      // Pindah ke halaman jadwal
      window.location.href = "jadwal.html";
  }

    // Fungsi Pilih Rute + Cari Jadwal Pada Halaman Jadwal
    const semuaJadwal = {
      "Pekanbaru-Jambi": {
          tanggal: ["2025-04-05", "2025-04-06", "2025-04-07", "2025-04-08"],
          data: [
              { tanggal: "2025-04-05", jam: "09:00 - 20:00", harga: "Rp. 330.000 / orang", fasilitas: "🏨 🍔 📦 🖥️" },
              { tanggal: "2025-04-06", jam: "17:00 - 04:00", harga: "Rp. 350.000 / orang", fasilitas: "🚗 🍽️ 🎥 🎮" }
          ]
      },
      "Duri-Pekanbaru": {
          tanggal: ["2025-04-05", "2025-04-06"],
          data: [
              { tanggal: "2025-04-05", jam: "07:00 - 10:00", harga: "Rp. 150.000 / orang", fasilitas: "🚗 🍔 🎶" }
          ]
      },
      "Tembilahan-Pekanbaru": {
          tanggal: ["2025-04-06", "2025-04-07"],
          data: [
              { tanggal: "2025-04-07", jam: "06:00 - 11:00", harga: "Rp. 200.000 / orang", fasilitas: "🛌 🍛 📺" }
          ]
      }
  };

  const berangkat = sessionStorage.getItem('berangkat');
  const tujuan = sessionStorage.getItem('tujuan');

  const tabContainer = document.querySelector('.tab-container');
  const scheduleList = document.getElementById('schedule-list');

  function formatTanggal(tgl) {
      const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

      const d = new Date(tgl);
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
                      <a href="pilih_duduk.html"><button class="btn">Pesan</button></a>
                      <button class="btn" style="background: green;">📱 WhatsApp</button>
                  </div>
              </div>
              `;
          });
      }
  }

  if (berangkat && tujuan) {
      const ruteKey = `${berangkat}-${tujuan}`;
      const ruteData = semuaJadwal[ruteKey];

      if (ruteData) {
          // Buat tabs tanggal
          tabContainer.innerHTML = '';
          ruteData.tanggal.forEach((tgl, index) => {
              const tab = document.createElement('div');
              tab.className = 'tab';
              if (index === 0) tab.classList.add('active');
              tab.innerText = formatTanggal(tgl);
              tab.setAttribute('data-tanggal', tgl);
              tabContainer.appendChild(tab);
          });

          // Tampilkan default (tanggal pertama)
          tampilkanJadwalUntukTanggal(ruteData.data, ruteData.tanggal[0]);

          // Event listener tab tanggal
          const tabs = document.querySelectorAll('.tab');
          tabs.forEach(tab => {
              tab.addEventListener('click', function() {
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