var mainBody = document.body;
//Dropdow list
let artArray = [
  "Web Dev Stuff",
  "Artwork Stuff",
  "Animation stuff",
  "Pixel Art stuff",
];
let dropD;

if (document.getElementById("portfolioContainer")) {
  dropD = document.createElement("select");
  dropD.setAttribute("id", "portfolioSelc");
  document.getElementById("portfolioContainer").appendChild(dropD);
}

if (dropD) {
  for (var i = 0; i < artArray.length; i++) {
    var option = document.createElement("option");
    option.value = artArray[i];
    option.text = artArray[i];
    dropD.appendChild(option);
  }
}

//takes you to different pages
function goToThis(select) {
  const url = select.value;
  if (url) {
    window.location.href = url;
  }
}

// function to flip through pictures (buttons)
function initShowcaseCarousel(container) {
  const buttons = container.querySelectorAll("[data-showcaseslide-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.showcaseslideButton === "next" ? 1 : -1;
      const pics = container.querySelector("[data-pics]");
      
      // If the HTML structure is missing <ul data-pics>, this will stop the error
      if (!pics) return;

      const activeSlide = pics.querySelector("[data-active]");
      if (!activeSlide) return;

      const slides = [...pics.children];
      let newIndex = slides.indexOf(activeSlide) + offset;

      if (newIndex < 0) newIndex = slides.length - 1;
      if (newIndex >= slides.length) newIndex = 0;

      slides[newIndex].dataset.active = true;
      slides[newIndex].classList.add("just-activated");
      delete activeSlide.dataset.active;

      setTimeout(() => {
        slides[newIndex].classList.remove("just-activated");
      }, 600);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Carousel
  document
    .querySelectorAll("[data-showcaseslide]")
    .forEach(initShowcaseCarousel);

  // UPDATED LINK LOGIC
  document.querySelectorAll(".showcaseslide a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const anchor = e.currentTarget;

      // Check if the link is meant to open in a new tab
      if (anchor.target === "_blank") {
        // Stop the click from triggering carousel movement, 
        // but DON'T preventDefault so the new tab opens.
        e.stopPropagation();
        return; 
      }

      // For standard links, handle the redirect manually
      e.stopPropagation();
      e.preventDefault();
      window.location.href = anchor.href;
    });
  });
});


