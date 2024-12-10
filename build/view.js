/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
(function () {
  if (window.megaMenuInitialized) return;
  document.addEventListener("DOMContentLoaded", function () {
    const megaMenus = document.querySelectorAll(".wp-block-create-block-mega-menu");
    megaMenus.forEach(menu => {
      const trigger = menu.querySelector(".mega-menu-trigger");
      const content = menu.querySelector(".mega-menu-content");
      const arrow = menu.querySelector(".dropdown-arrow");

      // Handle trigger button clicks
      if (trigger) {
        trigger.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();
          const isOpen = content.classList.contains("open");
          content.classList.toggle("open");
          arrow.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
        });
      }

      // Remove any click handlers from navigation items
      const navigationLinks = menu.querySelectorAll(".wp-block-navigation-link");
      navigationLinks.forEach(link => {
        const anchor = link.querySelector("a");
        if (anchor) {
          // Remove any existing click handlers
          const newAnchor = anchor.cloneNode(true);
          anchor.parentNode.replaceChild(newAnchor, anchor);
        }
      });
    });

    // Simplified outside click handler
    document.addEventListener("click", function (e) {
      // Don't handle if clicking a link
      if (e.target.closest("a")) return;

      // Don't handle if clicking the trigger
      if (e.target.closest(".mega-menu-trigger")) return;

      // Close menus if clicking outside
      if (!e.target.closest(".mega-menu-content")) {
        megaMenus.forEach(menu => {
          const content = menu.querySelector(".mega-menu-content");
          const arrow = menu.querySelector(".dropdown-arrow");
          const trigger = menu.querySelector(".mega-menu-trigger");
          if (content) content.classList.remove("open");
          if (arrow) arrow.style.transform = "rotate(0deg)";
          if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
      }
    });
    window.megaMenuInitialized = true;
  });
})();
/******/ })()
;
//# sourceMappingURL=view.js.map