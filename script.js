// Lightbox: klik na zdjęcie w galerii otwiera powiększony podgląd.
const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightboxFrame');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.photo').forEach((photo) => {
  photo.addEventListener('click', () => {
    const ph = photo.querySelector('.photo__ph');
    const caption = photo.querySelector('figcaption')?.textContent.trim() || '';

    // Jeśli .photo__ph to placeholder (gradient), skopiuj jego tło.
    // Gdy zamienisz placeholdery na <img>, ta linijka użyje obrazka zamiast tła.
    const img = photo.querySelector('img');
    if (img) {
      lightboxFrame.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
    } else if (ph) {
      lightboxFrame.style.background = getComputedStyle(ph).backgroundImage;
    }

    lightboxCaption.textContent = caption;
    lightbox.classList.add('is-open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('is-open');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Nawigacja: delikatne tło po przewinięciu strony.
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });
