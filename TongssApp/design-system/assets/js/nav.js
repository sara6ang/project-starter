document.addEventListener('components:ready', () => {
  const current = window.location.pathname;
  document.querySelectorAll('.ds-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && current === href) {
      link.classList.add('is-active');
    }
  });

  // 사이드바 안의 아이콘(Lucide)도 이 시점에 그려줘야 함
  if (window.lucide) lucide.createIcons();
});
