// ========== LOAD CONFIG FROM data.json ==========
const PRODUCT_ICONS = [
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>',
  '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
];

function applyConfig(cfg) {
  // Hero
  if (cfg.hero) {
    const h = cfg.hero;
    const badge = document.getElementById('heroBadge');
    if (badge) badge.innerHTML = '<span class="live-dot"></span> ' + (h.badge || '');
    const hl = document.getElementById('heroHighlight');
    if (hl) hl.innerHTML = h.titleHighlight || '';
    const ht = document.getElementById('heroTitle');
    if (ht) ht.firstChild.textContent = (h.title || '') + ' ';
    const hs = document.getElementById('heroSuffix');
    if (hs) hs.innerHTML = h.titleSuffix || '';
    const sub = document.getElementById('heroSubtitle');
    if (sub) sub.innerHTML = h.subtitle || '';
    const note = document.getElementById('heroNote');
    if (note) note.innerHTML = h.note || '';
  }

  // FFT (Fast / Paperless / Trusted)
  const fftSection = document.getElementById('fftSection');
  if (fftSection && cfg.fft && cfg.fft.length) {
    fftSection.innerHTML = cfg.fft.map((f, i) => `
      <div class="fft-item${i === 1 ? ' fft-mid' : ''}">
        <h2>${f.title || ''}</h2>
        <p>${f.desc || ''}</p>
      </div>`).join('');
  }

  // Products grid
  const grid = document.getElementById('productsGrid');
  if (grid && cfg.products) {
    grid.innerHTML = cfg.products.map((p, i) => `
      <div class="product-card">
        <div class="product-card-accent"></div>
        <div class="product-card-body">
          <div class="product-icon">${PRODUCT_ICONS[i] || PRODUCT_ICONS[0]}</div>
          <div class="product-name">${p.name || ''}</div>
          <span class="product-tag">${p.badge || ''}</span>
          <div class="product-stats">
            <div class="product-stat">
              <span class="product-stat-key">Loan Amount</span>
              <span class="product-stat-val">${p.amount || ''}</span>
            </div>
            <div class="product-stat">
              <span class="product-stat-key">${p.stat1Key || ''}</span>
              <span class="product-stat-val">${p.stat1Val || ''}</span>
            </div>
          </div>
          <!-- <a href="https://web-main-main.vercel.app/apply-now" target="_blank" class="product-cta">Apply Now &rarr;</a> -->
        </div>
      </div>`).join('');
  }

  // Testimonials
  const tSlider = document.getElementById('tSlider');
  if (tSlider && cfg.testimonials && cfg.testimonials.length) {
    const starSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    tSlider.innerHTML = cfg.testimonials.map(t => `
      <div class="t-new-card">
        <div class="t-new-author">
          <div class="t-new-avatar">${(t.name||'?')[0].toUpperCase()}</div>
          <div><strong>${t.name||''}</strong><span>${t.city||''}</span></div>
        </div>
        <p>"${t.text||''}"</p>
        <div class="t-new-stars">${starSvg.repeat(Math.min(5, Math.max(1, t.stars||5)))}</div>
      </div>`).join('');
    initSlider();
  }

  // Why Choose Us features
  const FEATURE_ICONS = [
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.36 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  ];
  const featuresGrid = document.getElementById('featuresGrid');
  if (featuresGrid && cfg.features && cfg.features.length) {
    featuresGrid.innerHTML = cfg.features.map((f, i) => `
      <a href="/feature.html?id=${i}" class="feature-card" style="text-decoration:none;color:inherit;cursor:pointer;display:block">
        <div class="feature-icon-svg">${FEATURE_ICONS[i] || FEATURE_ICONS[0]}</div>
        <h3>${f.title || ''}</h3>
        <p>${f.desc || ''}</p>
      </a>`).join('');
  }

  // Steps
  const STEP_ICONS = [
    '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  ];
  const stepsGrid = document.getElementById('stepsGrid');
  if (stepsGrid && cfg.steps && cfg.steps.length) {
    stepsGrid.innerHTML = cfg.steps.map((s, i) => `
      <div class="step-card">
        <div class="step-num">Step ${i + 1}</div>
        <div class="step-icon-svg">${STEP_ICONS[i] || STEP_ICONS[0]}</div>
        <h3>${s.title || ''}</h3>
        <p>${s.desc || ''}</p>
      </div>`).join('');
  }

  // Calculator settings
  if (cfg.calculator) {
    const keys = ['salary', 'emergency', 'personal'];
    const tenures = {
      salary:    [{d:7,l:'7D'},{d:15,l:'15D'},{d:30,l:'30D'},{d:40,l:'40D'}],
      emergency: [{d:15,l:'15D'},{d:30,l:'30D'},{d:60,l:'60D'},{d:90,l:'90D'}],
      personal:  [{d:90,l:'3M'},{d:180,l:'6M'},{d:365,l:'1Y'},{d:720,l:'2Y'}],
    };
    keys.forEach(k => {
      if (cfg.calculator[k] && PRODUCTS[k]) {
        PRODUCTS[k].min  = cfg.calculator[k].min  || PRODUCTS[k].min;
        PRODUCTS[k].max  = cfg.calculator[k].max  || PRODUCTS[k].max;
        PRODUCTS[k].mult = cfg.calculator[k].mult || PRODUCTS[k].mult;
        PRODUCTS[k].rate = cfg.calculator[k].rate || PRODUCTS[k].rate;
        PRODUCTS[k].tenures = tenures[k];
      }
    });
    // Re-render calculator with updated values
    if (typeof buildTenureBtns === 'function') {
      buildTenureBtns();
      updateLoanSlider();
      calcEMI();
    }
  }

  // FAQ
  const faqList = document.getElementById('faqList');
  if (faqList && cfg.faq) {
    faqList.innerHTML = cfg.faq.map(f => `
      <div class="faq-item">
        <button class="faq-q" onclick="toggleFaq(this)">${f.q} <span>+</span></button>
        <div class="faq-a">${f.a}</div>
      </div>`).join('');
  }

  // Eligibility
  const eligList = document.getElementById('eligList');
  if (eligList && cfg.eligibility) {
    const checkSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    eligList.innerHTML = cfg.eligibility.map(e => `
      <li>
        <span class="check">${checkSvg}</span>
        <div><strong>${e.title}</strong><p>${e.desc}</p></div>
      </li>`).join('');
  }

  // Eligibility card
  if (cfg.eligCard) {
    const c = cfg.eligCard;
    const ids = { evLabel:'label', evSub:'sub', evAmount:'amount', evS1v:'s1v', evS1k:'s1k', evS2v:'s2v', evS2k:'s2k', evS3v:'s3v', evS3k:'s3k', evS4v:'s4v', evS4k:'s4k', evFooter:'footer' };
    Object.entries(ids).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el && c[key]) el.innerHTML = c[key];
    });
  }

  // Company / Footer
  if (cfg.company) {
    const fp = document.getElementById('footerPhone');
    if (fp) fp.textContent = cfg.company.phone || '';
    const fd = document.getElementById('footerDesc');
    if (fd) fd.innerHTML = cfg.company.footerDesc || '';
  }

  // Footer columns
  if (cfg.footer) {
    const f = cfg.footer;
    const ql = document.getElementById('footerQuickLinks');
    if (ql && f.quickLinks) {
      ql.innerHTML = '<h4>Quick Links</h4>' + f.quickLinks.map(l => `<a href="${l.href||'#'}" style="color:#aaa;font-size:14px;text-decoration:none;display:block;margin-bottom:8px">${l.text}</a>`).join('');
    }
    const le = document.getElementById('footerLegal');
    if (le && f.legal) {
      le.innerHTML = '<h4>Legal</h4>' + f.legal.map(l => `<a href="${l.href||'#'}" style="color:#aaa;font-size:14px;text-decoration:none;display:block;margin-bottom:8px">${l.text}</a>`).join('');
    }
    const sa = document.getElementById('footerServiceArea');
    if (sa && f.serviceArea) sa.innerHTML = f.serviceArea;
    const cp = document.getElementById('footerCopyright');
    if (cp && f.copyright) cp.innerHTML = f.copyright;
  }
}

fetch('/api/config')
  .then(r => r.json())
  .then(cfg => { if (cfg && Object.keys(cfg).length) applyConfig(cfg); })
  .catch(() => fetch('/data.json').then(r => r.json()).then(applyConfig).catch(() => {}));

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
const PRODUCTS = {
  salary:    { min: 5000,  max: 100000, mult: 0.8,  rate: 0.00067, tenures: [{d:7,l:'7D'},{d:15,l:'15D'},{d:30,l:'30D'},{d:40,l:'40D'}] },
  emergency: { min: 10000, max: 200000, mult: 2,    rate: 0.00060, tenures: [{d:15,l:'15D'},{d:30,l:'30D'},{d:60,l:'60D'},{d:90,l:'90D'}] },
  personal:  { min: 50000, max: 500000, mult: 10,   rate: 0.00045, tenures: [{d:90,l:'3M'},{d:180,l:'6M'},{d:365,l:'1Y'},{d:720,l:'2Y'}] },
};

let currentProduct = 'salary';
let selectedDays = 7;

const salaryRange  = document.getElementById('salaryRange');
const loanRange    = document.getElementById('loanRange');
const salaryVal    = document.getElementById('salaryVal');
const loanVal      = document.getElementById('loanVal');
const emiVal       = document.getElementById('emiVal');
const interestVal  = document.getElementById('interestVal');
const eligBadge    = document.getElementById('eligBadge');
const maxLabel     = document.getElementById('maxLabel');
const tenureBtns   = document.getElementById('tenureBtns');
const barP         = document.getElementById('barP');
const barI         = document.getElementById('barI');

function formatINR(n) { return Number(n).toLocaleString('en-IN'); }

function getMaxLoan() {
  const p = PRODUCTS[currentProduct];
  const salary = parseInt(salaryRange.value);
  return Math.min(Math.floor(salary * p.mult / 1000) * 1000, p.max);
}

function buildTenureBtns() {
  const p = PRODUCTS[currentProduct];
  tenureBtns.innerHTML = '';
  selectedDays = p.tenures[0].d;
  p.tenures.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'tenure-btn' + (i === 0 ? ' active' : '');
    btn.textContent = t.l;
    btn.addEventListener('click', () => {
      tenureBtns.querySelectorAll('.tenure-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDays = t.d;
      calcEMI();
    });
    tenureBtns.appendChild(btn);
  });
}

function updateLoanSlider() {
  const p = PRODUCTS[currentProduct];
  const maxLoan = getMaxLoan();
  loanRange.min  = p.min;
  loanRange.max  = maxLoan;
  loanRange.step = p.min <= 10000 ? 1000 : 5000;
  let val = parseInt(loanRange.value) || p.min;
  val = Math.max(p.min, Math.min(val, maxLoan));
  loanRange.value = val;
  loanVal.textContent = formatINR(val);
  maxLabel.textContent = 'Max ₹' + formatINR(maxLoan);
}

function calcEMI() {
  const salary = parseInt(salaryRange.value);
  const P      = parseInt(loanRange.value);
  const rate   = PRODUCTS[currentProduct].rate;
  const interest = Math.round(P * rate * selectedDays);
  const total    = P + interest;

  interestVal.textContent = '₹' + formatINR(interest);
  emiVal.textContent      = '₹' + formatINR(total);

  const pPct = ((P / total) * 100).toFixed(1);
  const iPct = ((interest / total) * 100).toFixed(1);
  barP.style.width = pPct + '%';
  barI.style.width = iPct + '%';

  if (salary >= 25000) {
    eligBadge.textContent  = '✓ Eligible';
    eligBadge.className    = 'elig-badge eligible';
  } else {
    eligBadge.textContent  = '✗ Min ₹25,000';
    eligBadge.className    = 'elig-badge not-eligible';
  }
}

document.querySelectorAll('.calc-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentProduct = tab.dataset.product;
    buildTenureBtns();
    updateLoanSlider();
    calcEMI();
  });
});

salaryRange.addEventListener('input', () => {
  salaryVal.textContent = formatINR(salaryRange.value);
  updateLoanSlider();
  calcEMI();
});

loanRange.addEventListener('input', () => {
  loanVal.textContent = formatINR(loanRange.value);
  calcEMI();
});

buildTenureBtns();
updateLoanSlider();
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


// ========== TESTIMONIAL SLIDER ==========
function initSlider() {
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
}
initSlider();

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
