var mainBody = document.body;

// function to flip through pictures (buttons)
function initShowcaseCarousel(container) {
  const buttons = container.querySelectorAll("[data-showcaseslide-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.showcaseslideButton === "next" ? 1 : -1;
      const pics = container.querySelector("[data-pics]");
      
      if (!pics) return; // Safety check for the data-pics attribute

      const activeSlide = pics.querySelector("[data-active]");
      if (!activeSlide) return;

      const slides = [...pics.children];
      let newIndex = slides.indexOf(activeSlide) + offset;

      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;

      // 1. Clean up: Remove animation class from ALL slides to prevent sticking
      slides.forEach(s => s.classList.remove("just-activated"));

      // 2. Update Active State
      slides[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;

      // 3. Trigger Animation
      slides[newIndex].classList.add("just-activated");

      // 4. Clear class after animation finishes (matches CSS duration)
      setTimeout(() => {
        slides[newIndex].classList.remove("just-activated");
      }, 650); 
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Carousels
  document.querySelectorAll("[data-showcaseslide]").forEach(initShowcaseCarousel);

  // 2. Handle Slide Links
  document.querySelectorAll(".showcaseslide a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.target === "_blank") {
        e.stopPropagation();
        return; 
      }
      
      e.stopPropagation();
      e.preventDefault();
      
      const anchor = e.target.closest("a");
      if (anchor && anchor.href) {
        window.location.href = anchor.href;
      }
    });
  });

  // --- NAVBAR LOGIC: SUBTRACT CURRENT PAGE ---
  
  // Added a fallback in case pop() returns empty (like on a root domain)
  // --- NAVBAR LOGIC: SUBTRACT CURRENT PAGE ---
  
  // 1. Get the current filename and handle empty strings for homepages
  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    // 2. Get only the filename from the href (ignoring ./ or /)
    const linkHref = link.getAttribute("href");
    const linkFile = linkHref ? linkHref.split("/").pop() : "";
    
    // 3. Compare filenames only
    if (linkFile === currentPage) {
        link.style.display = "none"; 
    }
  });










