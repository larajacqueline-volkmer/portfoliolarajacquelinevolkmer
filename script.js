// Einfache Lightbox für <a data-lightbox>
(() => {
  const links = [...document.querySelectorAll('a[data-lightbox]')];
  if (!links.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lb-overlay';
  overlay.innerHTML = `
    <button class="lb-close" aria-label="Schließen">×</button>
    <img class="lb-img" alt="">
    <p class="lb-caption" role="note"></p>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lb-img');
  const capEl = overlay.querySelector('.lb-caption');
  const closeBtn = overlay.querySelector('.lb-close');

  const open = (href, alt, caption) => {
    imgEl.src = href;
    imgEl.alt = alt || '';
    capEl.textContent = caption || '';
    overlay.classList.add('open');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    overlay.classList.remove('open');
    imgEl.src = '';
    document.body.style.overflow = '';
  };

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const img = a.querySelector('img');
      open(
        a.getAttribute('href'),
        img?.alt,
        a.closest('figure')?.querySelector('figcaption')?.textContent
      );
    });
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
})();