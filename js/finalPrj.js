var mainBody = document.body;

// function to flip through pictures (buttons)
function initShowcaseCarousel(container) {
  const buttons = container.querySelectorAll("[data-showcaseslide-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.showcaseslideButton === "next" ? 1 : -1;
      const pics = container.querySelector("[data-pics]");
      
      if (!pics) return; 

      const activeSlide = pics.querySelector("[data-active]");
      if (!activeSlide) return;

      const slides = [...pics.children];
      let newIndex = slides.indexOf(activeSlide) + offset;

      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;

      // 1. Clean up: Remove animation class from ALL slides
      slides.forEach(s => s.classList.remove("just-activated"));

      // 2. Update Active State
      // Fix: Delete old active before setting new one to avoid double-active bugs
      delete activeSlide.dataset.active;
      slides[newIndex].dataset.active = true;

      // 3. Trigger Animation
      slides[newIndex].classList.add("just-activated");

      // 4. Clear class after animation finishes
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
  
  // Use location.href and a URL object for the most accurate filename extraction
  const currentPath = window.location.pathname.split('/').pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    const linkFile = linkHref.split('/').pop();
    
    // Check if the current page filename matches the link filename
    if (linkFile === currentPath) {
        link.style.display = "none"; 
       
    }
  });
});









