// ========== TYPEWRITER LOGO ==========
const logoEl = document.getElementById('typewriterLogo');
const logoText = 'Baid Stock Broking';
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const typed = logoText.slice(0, charIndex);
  const plain = typed.slice(0, typed.lastIndexOf(' ') + 1);
  const colored = typed.slice(typed.lastIndexOf(' ') + 1);
  logoEl.innerHTML = plain + '<span>' + colored + '</span>';

  if (!isDeleting && charIndex === logoText.length) {
    setTimeout(() => { isDeleting = true; typeWriter(); }, 1500);
    return;
  } else if (isDeleting && charIndex === 0) {
    setTimeout(() => { isDeleting = false; typeWriter(); }, 500);
    return;
  }

  charIndex += isDeleting ? -1 : 1;
  setTimeout(typeWriter, isDeleting ? 60 : 100);
}

typeWriter();

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// ========== LOAN CALCULATOR ==========
const salaryRange = document.getElementById('salaryRange');
const loanRange = document.getElementById('loanRange');
const salaryVal = document.getElementById('salaryVal');
const loanVal = document.getElementById('loanVal');
const emiVal = document.getElementById('emiVal');
let selectedDays = 7;

function formatINR(num) {
  return Number(num).toLocaleString('en-IN');
}

function calcEMI() {
  const P = parseInt(loanRange.value);
  // short-term flat interest approx 2% per month = 0.067% per day
  const dailyRate = 0.00067;
  const interest = Math.round(P * dailyRate * selectedDays);
  const total = P + interest;
  emiVal.textContent = '₹' + formatINR(total) + ' total';
}

salaryRange.addEventListener('input', () => {
  salaryVal.textContent = formatINR(salaryRange.value);
});

loanRange.addEventListener('input', () => {
  loanVal.textContent = formatINR(loanRange.value);
  calcEMI();
});

document.querySelectorAll('.tenure-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tenure-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDays = parseInt(btn.dataset.months);
    calcEMI();
  });
});

calcEMI();

// ========== FAQ ACCORDION ==========
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // close all
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ========== FORM SUBMIT ==========
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('successModal').classList.add('show');
  return false;
}

function closeModal() {
  document.getElementById('successModal').classList.remove('show');
}

// close modal on backdrop click
document.getElementById('successModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ========== SMOOTH SCROLL FOR NAV ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      mobileMenu.classList.remove('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========== STEP CARDS ANIMATION ==========
const stepCards = document.querySelectorAll('.step-card');
const isMobile = window.innerWidth <= 768;

function typewriterText(el, text, cb) {
  el.textContent = '';
  let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) { clearInterval(t); if (cb) cb(); }
  }, 35);
}

function animateCardSequence(cards, index) {
  if (index >= cards.length) return;
  const card = cards[index];

  card.classList.add('animate-in');

  const h3 = card.querySelector('h3');
  const p  = card.querySelector('p');
  const h3Text = h3.textContent;
  const pText  = p.textContent;

  if (isMobile) {
    p.style.opacity = '1';
    setTimeout(() => animateCardSequence(cards, index + 1), 0);
    return;
  }

  h3.textContent = '';
  p.textContent  = '';
  p.style.opacity = '0';

  // Step 2: after card appears, typewrite h3
  setTimeout(() => {
    typewriterText(h3, h3Text, () => {
      // Step 3: after h3 done, typewrite p
      p.style.opacity = '1';
      typewriterText(p, pText, () => {
        // Step 4: after p done, wait a bit then next card
        setTimeout(() => animateCardSequence(cards, index + 1), 300);
      });
    });
  }, 500);
}

const stepsSection = document.querySelector('#how-it-works');

if (window.innerWidth > 768 && stepsSection) {
  const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCardSequence(Array.from(stepCards), 0);
        stepsObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  stepsObserver.observe(stepsSection);
} else {
  // Mobile: show all cards with full content, no animation
  stepCards.forEach(card => {
    card.classList.add('animate-in');
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    if (p) p.style.opacity = '1';
  });
}

// ========== TESTIMONIAL SLIDER ==========
(function() {
  const wrap = document.querySelector('.t-slider-wrap');
  const track = document.getElementById('tSlider');
  const dotsContainer = document.getElementById('tDots');
  if (!track || !dotsContainer || !wrap) return;

  const cards = Array.from(track.querySelectorAll('.t-new-card'));
  const total = cards.length;
  let current = 0;
  const gap = 20;

  function getPerPage() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function setCardWidths() {
    const perPage = getPerPage();
    const wrapWidth = wrap.offsetWidth;
    const cardW = (wrapWidth - gap * (perPage - 1)) / perPage;
    cards.forEach(c => {
      c.style.width = cardW + 'px';
      c.style.minWidth = cardW + 'px';
    });
  }

  function totalPages() {
    return Math.ceil(total / getPerPage());
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const d = document.createElement('button');
      d.className = 't-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    }
  }

  function goTo(index) {
    const pages = totalPages();
    current = (index + pages) % pages;
    const perPage = getPerPage();
    const cardW = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${current * perPage * cardW}px)`;
    dotsContainer.querySelectorAll('.t-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function init() {
    setCardWidths();
    buildDots();
    goTo(0);
  }

  init();
  window.addEventListener('resize', init);
  setInterval(() => goTo(current + 1), 4000);
})();

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      // Format with Indian number system
      el.textContent = Math.floor(current).toLocaleString('en-IN');
    }, 16);
  });
}

// Trigger counter when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsEl = document.querySelector('.stats-strip');
if (statsEl) statsObserver.observe(statsEl);

// ========== NAVBAR SHADOW ON SCROLL ==========
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
