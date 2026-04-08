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

  // Step 1: card slides in
  card.classList.add('animate-in');

  const h3 = card.querySelector('h3');
  const p  = card.querySelector('p');
  const h3Text = h3.textContent;
  const pText  = p.textContent;
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

const stepsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCardSequence(Array.from(stepCards), 0);
      stepsObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const stepsSection = document.querySelector('#how-it-works');
if (stepsSection) stepsObserver.observe(stepsSection);

// ========== TESTIMONIAL SLIDER ==========
let currentSlide = 0;
const totalSlides = 2;

function goToSlide(index) {
  currentSlide = index;
  const slider = document.getElementById('tSlider');
  if (slider) slider.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('.t-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

// Auto slide every 4 seconds
setInterval(() => {
  goToSlide((currentSlide + 1) % totalSlides);
}, 4000);

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
