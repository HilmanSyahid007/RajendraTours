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