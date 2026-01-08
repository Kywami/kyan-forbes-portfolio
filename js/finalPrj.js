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

// Function to flip through pictures
function initShowcaseCarousel(container) {
  const buttons = container.querySelectorAll("[data-showcaseslide-button]");
  const pics = container.querySelector("[data-pics]");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Prevent any parent link triggers
      e.stopPropagation(); 
      
      const offset = button.dataset.showcaseslideButton === "next" ? 1 : -1;
      const activeSlide = pics.querySelector("[data-active]");
      if (!activeSlide) return;

      const slides = [...pics.children];
      let newIndex = slides.indexOf(activeSlide) + offset;

      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;

      // Switch active status
      delete activeSlide.dataset.active;
      slides[newIndex].dataset.active = true;

      // Animation trigger
      slides[newIndex].classList.add("just-activated");
      setTimeout(() => {
        slides[newIndex].classList.remove("just-activated");
      }, 600);
    });
  });
}

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Carousels
  document.querySelectorAll("[data-showcaseslide]").forEach(initShowcaseCarousel);

  // 2. Handle Links (Allow target="_blank" to work)
  document.querySelectorAll(".showcaseslide a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // If the link has target="_blank", we let the browser handle it naturally
      if (link.target === "_blank") {
        e.stopPropagation(); // Stops carousel from flipping when clicking the link
        return; 
      }

      // For normal internal links
      e.preventDefault();
      e.stopPropagation();
      window.location.href = link.href;
    });
  });
});



