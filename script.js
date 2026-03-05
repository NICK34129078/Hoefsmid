// Smooth scroll voor interne ankerlinks
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });
}

// Mobiele navigatie (hamburgermenu)
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (!toggle || !navList) return;

  const toggleNav = () => {
    const isOpen = navList.classList.toggle("nav-list--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  toggle.addEventListener("click", toggleNav);

  // Sluit menu bij klik op een link (op mobiel)
  navList.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement && navList.classList.contains("nav-list--open")) {
      navList.classList.remove("nav-list--open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Dynamisch jaartal in de footer
function setCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (!yearEl) return;
  const now = new Date();
  yearEl.textContent = String(now.getFullYear());
}

// Contact-sectie: animatie van onder naar boven bij in beeld scrollen
function setupContactScrollAnimation() {
  const section = document.getElementById("contact");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
        }
      });
    },
    { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
  );

  observer.observe(section);
}

// Reviews-carousel: vloeiende continue scroll van links naar rechts, geen pauze bij hover
function setupReviewsCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const cards = track.querySelectorAll(".review-card");
  const count = cards.length;
  if (count === 0) return;

  for (let i = 0; i < count; i++) {
    track.appendChild(cards[i].cloneNode(true));
  }
}

// Algemene scroll-animatie voor kaarten, tekstblokken en foto's
function setupScrollReveal() {
  const elements = document.querySelectorAll(
    ".media-card, .service-card, .why-item, .gallery-item, .section-header, .section-text"
  );

  if (!elements.length) return;

  elements.forEach((el) => el.classList.add("scroll-reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -15%", threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupMobileNav();
  setCurrentYear();
  setupContactScrollAnimation();
  setupReviewsCarousel();
  setupScrollReveal();
});

