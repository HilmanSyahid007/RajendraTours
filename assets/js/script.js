function toggleMenu() {
    let menu = document.querySelector(".navbar .menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
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

document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll(".seat");
    const selectedSeatsDisplay = document.getElementById("selectedSeats");
    const totalPriceDisplay = document.getElementById("totalPrice");
    const confirmButton = document.getElementById("confirmButton");
    const seatPrice = 100000; // Harga per kursi dalam rupiah

    function updateSummary() {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        const seatNumbers = Array.from(selectedSeats).map(seat => seat.dataset.seat);
        selectedSeatsDisplay.textContent = seatNumbers.length > 0 ? seatNumbers.join(", ") : "-";
        totalPriceDisplay.textContent = seatNumbers.length * seatPrice;
        confirmButton.disabled = seatNumbers.length === 0;
    }

    seats.forEach(seat => {
        if (!seat.classList.contains("unavailable") && !seat.classList.contains("driver")) {
            seat.addEventListener("click", function () {
                seat.classList.toggle("selected");
                updateSummary();
            });
        }
    });

    confirmButton.addEventListener("click", function () {
        const selectedSeats = document.querySelectorAll(".seat.selected");
        const seatNumbers = Array.from(selectedSeats).map(seat => seat.dataset.seat);
        alert("Kursi berhasil dikonfirmasi: " + seatNumbers.join(", ") + "\nTotal Harga: Rp." + seatNumbers.length * seatPrice);
    });
});