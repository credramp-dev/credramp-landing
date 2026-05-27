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

// Map form ID → success div ID
const successMap = {
  'waitlist-form': 'waitlist-success',
  'cta-form': 'cta-success',
};

document.querySelectorAll('form[action*="formspree"]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.style.display = 'none';
        const successId = successMap[form.id];
        const successEl = successId ? document.getElementById(successId) : null;
        if (successEl) successEl.style.display = 'block';
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.errors?.map(e => e.message).join(', ') || 'Submission failed — please try again.';
        showError(form, msg);
        btn.textContent = original;
        btn.disabled = false;
      }
    } catch {
      showError(form, 'Network error — please try again.');
      btn.textContent = original;
      btn.disabled = false;
    }
  });
});

function showError(form, msg) {
  let err = form.querySelector('.form-error');
  if (!err) {
    err = document.createElement('p');
    err.className = 'form-error';
    form.appendChild(err);
  }
  err.textContent = msg;
}

// Web Share API / clipboard fallback
window.shareCredRamp = function () {
  const data = {
    title: 'CredRamp — Earn rewards on rent, childcare & bills',
    text: 'Pay rent, childcare, care fees and invoices by credit card and earn rewards — even when your recipient only accepts bank transfer.',
    url: window.location.href,
  };
  if (navigator.share) {
    navigator.share(data).catch(() => {});
  } else {
    navigator.clipboard.writeText(data.url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Share this page: ' + data.url);
    });
  }
};
