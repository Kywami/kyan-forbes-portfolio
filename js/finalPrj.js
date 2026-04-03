var mainBody = document.body;


// function to flip through pictures (buttons)
function initShowcaseCarousel(container) {
  const buttons = container.querySelectorAll("[data-showcaseslide-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.showcaseslideButton === "next" ? 1 : -1;
      const pics = container.querySelector("[data-pics]");
      const activeSlide = pics.querySelector("[data-active]");
      if (!activeSlide) return;

      const slides = [...pics.children];
      let newIndex = slides.indexOf(activeSlide) + offset;

      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;

      slides[newIndex].dataset.active = true;
      //this is for an animation I added
      slides[newIndex].classList.add("just-activated");
      delete activeSlide.dataset.active;

      //this keeps it from playing everythime the page is opened and only when a pic is changed
      setTimeout(() => {
        slides[newIndex].classList.remove("just-activated");
      }, 600);
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

  // --- NEW LOGIC: SUBTRACT CURRENT PAGE FROM NAVBAR ---
  
  // Get the filename of the current page (e.g., "WebDevSect.html")
  const currentPage = window.location.pathname.split("/").pop();

  // Find all links inside your navbar
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    // Check if the link's href matches the current page filename
    const linkDestination = link.getAttribute("href");
    
    if (linkDestination === currentPage) {
        link.style.display = "none"; // Hides the link entirely
    }
  });
});











