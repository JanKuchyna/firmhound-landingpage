'use strict';

/* =============================================
   ROUTING
   ============================================= */
function handleRouting() {
  const path = window.location.pathname;
  
  if (path === '/register') {
    window.location.href = 'http://app.firmhound.cz/register';
  } else if (path === '/login') {
    window.location.href = 'http://app.firmhound.cz/login';
  }
}

// Check routing on page load
handleRouting();

// Also handle route changes (for SPA scenarios)
window.addEventListener('popstate', handleRouting);

/* =============================================
   MOBILE NAV TOGGLE
   ============================================= */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

/* =============================================
   SMOOTH SCROLL (fallback for older browsers)
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================================
   CONTACT FORM — BASIC VALIDATION
   ============================================= */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Odesílám…';
    submitBtn.disabled = true;

    fetch('http://localhost:5000/api/sendInfoMail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        showStatus('Zpráva odeslána! Brzy se vám ozveme.', 'success');
        contactForm.reset();
      })
      .catch(() => {
        showStatus('Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.', 'error');
      })
      .finally(() => {
        submitBtn.textContent = 'Odeslat zprávu';
        submitBtn.disabled = false;
      });
  });
}

function showStatus(msg, type) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.style.color = type === 'error' ? '#c0392b' : '#C8601A';
  setTimeout(() => { formStatus.textContent = ''; }, 5000);
}

/* =============================================
   NAVBAR — ADD SHADOW ON SCROLL
   ============================================= */
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(28,16,9,0.10)'
      : 'none';
  }, { passive: true });
}
