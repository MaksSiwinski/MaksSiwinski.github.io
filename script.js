const photos = [...document.querySelectorAll('.photo')];
const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightboxFrame');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const nav = document.getElementById('nav');

let currentPhoto = 0;
let lastFocusedElement = null;

function openLightbox(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const photo = photos[currentPhoto];
  const ph = photo.querySelector('.photo__ph');
  const img = photo.querySelector('img');
  const caption = photo.querySelector('figcaption')?.textContent.trim() || '';

  if (img) {
    lightboxFrame.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
  } else if (ph) {
    lightboxFrame.style.backgroundImage = getComputedStyle(ph).backgroundImage;
  }

  lightboxCaption.textContent = caption;
  lightboxCounter.textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  lightboxFrame.style.backgroundImage = '';
  if (lastFocusedElement) lastFocusedElement.focus();
}

function showPrevious() {
  openLightbox(currentPhoto - 1);
}

function showNext() {
  openLightbox(currentPhoto + 1);
}

photos.forEach((photo, index) => {
  photo.addEventListener('click', () => {
    lastFocusedElement = photo;
    openLightbox(index);
  });

  photo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      lastFocusedElement = photo;
      openLightbox(index);
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevious);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') showPrevious();
  if (event.key === 'ArrowRight') showNext();
});

// Delikatniejsze, zwarte menu po przewinięciu.
function updateNav() {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}

updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// Prosta obsługa swipe na urządzeniach dotykowych.
let touchStartX = 0;

lightbox.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 50) return;
  if (distance > 0) showPrevious();
  else showNext();
}, { passive: true });
