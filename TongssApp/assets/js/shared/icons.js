/*
  Renders every <i data-lucide="..."> on the page. Runs once for icons
  already in the static markup, and again after components inject theirs.
*/
(function () {
  function initIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  document.addEventListener('DOMContentLoaded', initIcons);
  document.addEventListener('components:ready', initIcons);
})();
