/*
  Fetch-based partial loader. <div data-include="../components/sidebar.html">
  gets its innerHTML replaced with the fetched partial. Requires a real
  HTTP origin (fetch of file:// URLs is blocked by CORS) — serve with
  `python3 -m http.server` during development.
*/
(function () {
  async function includeComponents() {
    const targets = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(
      targets.map(async (el) => {
        const path = el.getAttribute('data-include');
        const res = await fetch(path);
        el.innerHTML = await res.text();
      })
    );
    document.dispatchEvent(new CustomEvent('components:ready'));
  }

  document.addEventListener('DOMContentLoaded', includeComponents);
})();
