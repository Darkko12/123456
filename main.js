const slides = Array.from(document.querySelectorAll(".activity-slide"));
const progressBar = document.getElementById("activityProgress");
const slideDuration = 10000;

let activeSlide = 0;
let slideStart = 0;

function showActivitySlide(index) {
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
  });
}

function animateActivityCarousel(timestamp) {
  if (!slideStart) {
    slideStart = timestamp;
  }

  const elapsed = timestamp - slideStart;
  const progress = Math.min(elapsed / slideDuration, 1);

  if (progressBar) {
    progressBar.style.width = `${progress * 100}%`;
  }

  if (elapsed >= slideDuration && slides.length > 0) {
    activeSlide = (activeSlide + 1) % slides.length;
    showActivitySlide(activeSlide);
    slideStart = timestamp;

    if (progressBar) {
      progressBar.style.width = "0%";
    }
  }

  requestAnimationFrame(animateActivityCarousel);
}

function openModal() {
  const modal = document.getElementById("modalOverlay");

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("nombre").focus(), 250);
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

function handleOverlayClick(event) {
  if (event.target.id === "modalOverlay") {
    closeModal();
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("reserveForm");
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const dia = document.getElementById("dia").value;
  const diaTexto = dia === "24" ? "jueves 24 de julio" : "viernes 25 de julio";

  document.getElementById("successText").innerHTML =
    `Tu reserva para el <strong>${diaTexto}</strong> quedó registrada. ` +
    `La confirmación va a llegar a <strong>${email}</strong>.`;

  form.hidden = true;
  document.getElementById("successMessage").hidden = false;
  document.getElementById("successMessage").querySelector("h3").textContent =
    `¡Listo, ${nombre.split(" ")[0]}!`;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

if (slides.length > 0) {
  showActivitySlide(activeSlide);
  requestAnimationFrame(animateActivityCarousel);
}
