var mainBody = document.body;

// 1. YOUR REACT COMPONENT DEFINITION (Safe to keep globally)
function FadeInImages(props) {
  const [isVisible, setVisible] = React.useState(false);
  
  React.useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      {props.children}
    </div>
  );
}

// 2. CAROUSEL INITIALIZATION FUNCTION
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

// 3. SECURE SINGLE ENTRY POINT
document.addEventListener("DOMContentLoaded", () => {
  
  // A. Mount React safely inside the DOM event loop
  const decorationContainer = document.querySelector('.page-decorations');
  if (decorationContainer) {
    const root = ReactDOM.createRoot(decorationContainer);
    root.render(
      <React.Fragment>
        <FadeInImages>
          <img src="https://img.pokemondb.net/sprites/diamond-pearl/shiny/charmander.png" alt="Shiny Charmander sprite" />
        </FadeInImages>
        <FadeInImages>
          <img src="img/new-animation-asset2.png" alt="Fade in decorative asset" />
        </FadeInImages>
      </React.Fragment>
    );
  }

  // B. Initialize Carousels
  document.querySelectorAll("[data-showcaseslide]").forEach(initShowcaseCarousel);

  // C. Handle Slide Links
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

  // D. Navbar updates
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








