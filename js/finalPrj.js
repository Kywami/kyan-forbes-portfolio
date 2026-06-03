var mainBody = document.body;

//  CAROUSEL INITIALIZATION FUNCTION
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

      slides.forEach(s => s.classList.remove("just-activated"));

      delete activeSlide.dataset.active;
      slides[newIndex].dataset.active = true;

      slides[newIndex].classList.add("just-activated");

      setTimeout(() => {
        slides[newIndex].classList.remove("just-activated");
      }, 650); 
    });
  });
}

// 2. SECURE SINGLE ENTRY POINT
document.addEventListener("DOMContentLoaded", () => {
  //  Initialize Carousels
  document.querySelectorAll("[data-showcaseslide]").forEach(initShowcaseCarousel);

  //  Handle Slide Links
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

  //  Navbar updates
  const currentPath = window.location.pathname.split('/').pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    const linkFile = linkHref.split('/').pop();
    
    if (linkFile === currentPath) {
        link.style.display = "none"; 
    }
  });
});








