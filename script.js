(() => {
  const links = Array.from(document.querySelectorAll('.navigation a'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;

    links.forEach((link) => {
      link.classList.toggle(
        'is-active',
        link.getAttribute('href') === `#${active.target.id}`
      );
    });
  }, {
    rootMargin: '-25% 0px -60%',
    threshold: [0.08, 0.25, 0.5]
  });

  sections.forEach((section) => observer.observe(section));
})();
