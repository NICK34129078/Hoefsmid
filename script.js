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

document.addEventListener("DOMContentLoaded", () => {
  setupSmoothScroll();
  setupMobileNav();
  setCurrentYear();
});

