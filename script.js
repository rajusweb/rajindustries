const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  note.textContent = "Thank you! Your enquiry has been recorded. Please connect your preferred email/WhatsApp service to receive live enquiries.";
  form.reset();
});
