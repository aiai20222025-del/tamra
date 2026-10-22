(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      toggle.textContent = open ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '메뉴 열기');
      toggle.textContent = '☰';
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Add varied, staggered entrance effects to the content while preserving the original images.
  const revealGroups = [
    ['.welcome-grid > div:first-child', 'reveal-left'],
    ['.value-card', 'reveal-up'],
    ['.director-frame', 'reveal-zoom'],
    ['.greeting-copy', 'reveal-right'],
    ['.section-heading', 'reveal-up'],
    ['.service-card', 'reveal-up'],
    ['.guide-grid > div:first-child', 'reveal-left'],
    ['.step', 'reveal-right'],
    ['.activity-heading > div', 'reveal-left'],
    ['.activity-card', 'reveal-zoom'],
    ['.contact-box > div:first-child', 'reveal-left'],
    ['.contact-action', 'reveal-right']
  ];
  revealGroups.forEach(([selector, effect]) => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('scroll-reveal', effect);
      el.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 100}ms`);
    });
  });

  const revealItems = document.querySelectorAll('.js-reveal, .scroll-reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  // Header shadow and small progress indicator respond to scrolling.
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  let ticking = false;
  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', scrollTop > 12);
    if (progress) progress.style.transform = `scaleX(${maxScroll > 0 ? scrollTop / maxScroll : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();
})();
