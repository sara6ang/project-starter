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
