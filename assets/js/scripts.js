filterSelection("all");

function filterSelection(category) {
  const cards = document.querySelectorAll(".card");
  const normalized = category === "all" ? "" : category;
  let enterIndex = 0;

  cards.forEach(card => {
    const matches = normalized === "" || card.classList.contains(normalized);
    const wasVisible = !card.classList.contains("hidden") && !card.classList.contains("slide-out");

    if (matches) {
      if (wasVisible) return; // already on screen, leave it be so it doesn't flicker

      const delay = enterIndex * 70;
      enterIndex++;

      // Reset to the "about to appear" state instantly (no transition)
      card.classList.remove("hidden", "slide-out", "slide-in");
      card.classList.add("slide-in-prep");
      card.style.transitionDelay = "0ms";

      // Force a reflow so the browser registers the prep state before animating
      void card.offsetWidth;

      setTimeout(() => {
        card.style.transitionDelay = `${delay}ms`;
        card.classList.remove("slide-in-prep");
        card.classList.add("slide-in");
      }, 20);

    } else {
      if (!wasVisible) return; // already hidden, nothing to do

      // Fade/slide the non-matching cards out together
      card.classList.remove("slide-in", "slide-in-prep");
      card.style.transitionDelay = "0ms";
      card.classList.add("slide-out");

      // Remove from layout once the fade-out finishes
      setTimeout(() => {
        card.classList.add("hidden");
      }, 400);
    }

  });
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("btncontainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// JavaScript to clone the first set of team cards and append them to create an infinite loop
const teamSlider = document.querySelector('.team-slider');
const firstSet = teamSlider.innerHTML;
teamSlider.innerHTML += firstSet;

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.innerHTML = isOpen
    ? '<i class="ri-close-line"></i>'
    : '<i class="ri-menu-line"></i>';
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", false);
    navToggle.innerHTML = '<i class="ri-menu-line"></i>';
  });
});

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxThumbs = document.getElementById("lightboxThumbs");

const galleryImages = Array.from(document.querySelectorAll("#galleryGrid .gallery-item img"));
let currentImageIndex = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));

  const thumb = document.createElement("img");
  thumb.src = img.src;
  thumb.alt = img.alt;
  thumb.addEventListener("click", () => showImage(index));
  lightboxThumbs.appendChild(thumb);
});

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add("open");
}

function showImage(index) {
  currentImageIndex = (index + galleryImages.length) % galleryImages.length;
  const img = galleryImages[currentImageIndex];

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;

  lightboxThumbs.querySelectorAll("img").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentImageIndex);
  });

  lightboxThumbs.children[currentImageIndex]?.scrollIntoView({ block: "nearest", inline: "center" });
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => showImage(currentImageIndex - 1));
lightboxNext.addEventListener("click", () => showImage(currentImageIndex + 1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(currentImageIndex - 1);
  if (e.key === "ArrowRight") showImage(currentImageIndex + 1);
});
