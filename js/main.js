/* ============================================================
   Delta TechCare — main.js
   All interactive behaviour for the prototype site.
   Every function is defensive: it only runs if the matching
   element exists on the current page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initThemeToggle();
  initActiveNav();
  initFaqAccordion();
  initEstimator();
  initPickupForm();
  initBackToTop();
});

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* ---------- Light / dark theme toggle ---------- */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!btn || !icon) return;

  const saved = localStorage.getItem('dtc-theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    icon.textContent = '☀️';
  }

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    icon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('dtc-theme', isDark ? 'dark' : 'light');
  });
}

/* ---------- Active nav highlight ---------- */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.site-nav a');
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const filename = href.split('/').pop().split('#')[0];
    if (filename === path) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  const buttons = document.querySelectorAll('.faq-question');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const parentFaq = btn.closest('.faq');
      if (parentFaq) {
        parentFaq.querySelectorAll('.faq-question[aria-expanded="true"]').forEach((other) => {
          if (other !== btn) {
            other.setAttribute('aria-expanded', 'false');
            const answer = other.nextElementSibling;
            if (answer) answer.style.maxHeight = null;
          }
        });
      }
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      const answer = btn.nextElementSibling;
      if (answer) {
        answer.style.maxHeight = expanded ? null : answer.scrollHeight + 'px';
      }
    });
  });
}

/* ---------- Repair cost estimator ---------- */
const PRICE_MATRIX = {
  laptop: {
    screen:      '₹2,500 – ₹8,000',
    battery:     '₹1,500 – ₹4,500',
    keyboard:    '₹800 – ₹2,500',
    charging:    '₹600 – ₹1,800',
    motherboard: '₹3,000 – ₹12,000',
    hinge:       '₹700 – ₹2,000',
    storage:     '₹2,000 – ₹6,000',
    other:       'Diagnosis first (₹199 – ₹399)'
  },
  smartphone: {
    screen:      '₹1,200 – ₹6,000',
    battery:     '₹800 – ₹3,000',
    keyboard:    'Not applicable to smartphones',
    charging:    '₹500 – ₹1,500',
    motherboard: '₹2,000 – ₹8,000',
    hinge:       'Not applicable to smartphones',
    storage:     'Diagnosis required',
    other:       'Diagnosis first (₹199 – ₹399)'
  }
};

function initEstimator() {
  const form = document.getElementById('estimator');
  if (!form) return;
  const deviceField = document.getElementById('estDevice');
  const problemField = document.getElementById('estProblem');
  const result = document.getElementById('estimatorResult');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const device = deviceField.value;
    const problem = problemField.value;

    if (!device || !problem) {
      result.innerHTML = '<span class="note" style="color:#ef4444;">Please choose both a device type and a problem category.</span>';
      return;
    }

    const range = PRICE_MATRIX[device] && PRICE_MATRIX[device][problem];
    if (!range) {
      result.innerHTML = '<span class="note">No illustrative range available for that combination.</span>';
      return;
    }

    result.innerHTML =
      '<span class="note">Illustrative educational estimate</span>' +
      '<span class="price">' + range + '</span>' +
      '<span class="note">Not a real quotation. No diagnosis has occurred.</span>';
  });
}

/* ---------- Pickup inquiry form ---------- */
function initPickupForm() {
  const form = document.getElementById('pickupForm');
  if (!form) return;

  const fields = {
    name:       { el: document.getElementById('pfName'),       err: document.getElementById('errName') },
    device:     { el: document.getElementById('pfDevice'),     err: document.getElementById('errDevice') },
    problem:    { el: document.getElementById('pfProblem'),    err: document.getElementById('errProblem') },
    pickupDate: { el: document.getElementById('pfPickupDate'), err: document.getElementById('errPickupDate') },
    area:       { el: document.getElementById('pfArea'),       err: document.getElementById('errArea') }
  };

  function clearError(f) {
    f.err.textContent = '';
    f.el.setAttribute('aria-invalid', 'false');
  }
  function setError(f, message) {
    f.err.textContent = message;
    f.el.setAttribute('aria-invalid', 'true');
  }

  Object.keys(fields).forEach((key) => {
    const f = fields[key];
    f.el.addEventListener('input', () => clearError(f));
    f.el.addEventListener('change', () => clearError(f));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (fields.name.el.value.trim().length < 2) {
      setError(fields.name, 'Please enter your name (at least 2 characters).');
      valid = false;
    }
    if (!fields.device.el.value) {
      setError(fields.device, 'Please select a device type.');
      valid = false;
    }
    if (!fields.problem.el.value) {
      setError(fields.problem, 'Please select a problem category.');
      valid = false;
    }
    if (!fields.pickupDate.el.value) {
      setError(fields.pickupDate, 'Please choose a preferred pickup date.');
      valid = false;
    } else {
      const today = new Date(); today.setHours(0,0,0,0);
      const chosen = new Date(fields.pickupDate.el.value);
      if (isNaN(chosen.getTime()) || chosen < today) {
        setError(fields.pickupDate, 'Please choose today or a future date.');
        valid = false;
      }
    }
    if (!fields.area.el.value) {
      setError(fields.area, 'Please select an area.');
      valid = false;
    }

    if (!valid) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    const result = document.getElementById('pickupResult');
    result.innerHTML =
      '<span class="note" style="color:#10b981; font-weight:600;">✔ Demo request recorded</span>' +
      '<span class="note">Demo request recorded for classroom demonstration. No real booking has been made and no repair service has been contacted.</span>';
    showToast('Demo submission validated. No real booking made.', 'success');
    form.reset();
  });
}

/* ---------- Back-to-top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Global toast helper (used by contact page demo buttons) ---------- */
function showToast(message, type) {
  type = type || 'info';
  const region = document.getElementById('toastRegion');
  if (!region) return;
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = message;
  region.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}