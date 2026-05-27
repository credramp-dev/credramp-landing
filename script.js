// Rotating hero word
const rotatingWords = ['rent', 'childcare', 'adult care', 'care fees', 'contractors', 'suppliers'];
let wordIdx = 0;
const rotatingEl = document.getElementById('rotating-word');

if (rotatingEl) {
  setInterval(() => {
    rotatingEl.classList.add('leaving');
    setTimeout(() => {
      wordIdx = (wordIdx + 1) % rotatingWords.length;
      rotatingEl.textContent = rotatingWords[wordIdx];
      rotatingEl.classList.remove('leaving');
      rotatingEl.classList.add('entering');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        rotatingEl.classList.remove('entering');
      }));
    }, 260);
  }, 2600);
}

// Nav scroll shadow
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

