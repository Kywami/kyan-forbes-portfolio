let artArray = ["Web Dev Stuff", "Artwork Stuff", "Animation stuff", "Pixel Art stuff"];
let dropD = document.getElementById("portfolioContainer");

if (dropD) {
  let select = document.createElement("select");
  select.setAttribute("id", "portfolioSelc");
  artArray.forEach(item => {
    let option = document.createElement("option");
    option.value = item;
    option.text = item;
    select.appendChild(option);
  });
  dropD.appendChild(select);
}

// Function to flip through pictures (Carousel Logic)
function initShowcaseCarousel(container) {
  const buttons = container.querySelectorAll("[data-showcaseslide-button]");
  const pics = container.querySelector("[data-pics]");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Prevent click from affecting links or other elements
      e.stopPropagation(); 
      
      const offset = button.dataset.showcaseslideButton === "next" ? 1 : -1;
      const activeSlide = pics.querySelector("[data-active]");
      
      if (!activeSlide) return;

      const slides = [...pics.children];
      let newIndex = slides.indexOf(activeSlide) + offset;

      // Handle Infinite Loop
      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;

      // 1. Remove active status from old slide
      delete activeSlide.dataset.active;
      activeSlide.classList.remove("just-activated");

      // 2. Set active status on new slide
      slides[newIndex].dataset.active = true;

      // 3. Trigger your CSS 'bounceIn' animation
      slides[newIndex].classList.add("just-activated");
      
      // Optional: remove class after animation finishes to reset it for next time
      setTimeout(() => {
        slides[newIndex].classList.remove("just-activated");
      }, 600);
    });
  });
}

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Carousels
  document.querySelectorAll("[data-showcaseslide]").forEach(initShowcaseCarousel);

  // Handle Links specifically to allow target="_blank"
  document.querySelectorAll(".showcaseslide a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // If it's a new tab link, don't use e.preventDefault()
      if (link.target === "_blank") {
        e.stopPropagation(); // Stop carousel logic, but let tab open
        return; 
      }

      // For standard navigation
      e.preventDefault();
      e.stopPropagation();
      window.location.href = link.href;
    });
  });
});



