# Baid Stock Broking Services — Digital Lending Website

Official website for **Baid Stock Broking Services Pvt Ltd**, an RBI-Registered NBFC offering collateral-free digital loans to salaried professionals across India.

🌐 **Live Site:** https://baidstock-loans.vercel.app  
⚙️ **Admin Panel:** https://baidstock-loans.vercel.app/admin.html

---

## Features

- **Dynamic Content** — All sections (Hero, Products, FAQs, Testimonials, Steps, Footer, etc.) are managed via the Admin Panel and stored in Supabase
- **Loan Calculator** — Real-time EMI calculator with product tabs (Salary Advance, Emergency, Personal)
- **Admin Panel** — Password-protected panel to update all website content without touching code
- **Feature Detail Pages** — Individual pages for each "Why Choose Us" card (`feature.html?id=X`)
- **Fully Responsive** — Mobile-first design with hamburger nav
- **RBI Compliant** — Fair Practices Code, transparent APR, grievance policy

---

## Products Offered

| Product | Amount |
|---|---|
| Salary Advance Loan | ₹5,000 – ₹1 Lakh |
| Personal Loan | ₹50,000 – ₹5 Lakh |
| Business Loan | ₹1 Lakh – ₹10 Lakh |
| Emergency Loan | ₹10,000 – ₹2 Lakh |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL — JSONB config storage) |
| Hosting | Vercel |
| Fonts | Google Fonts (Inter) |

---

## Project Structure

```
Badstockbsp/
├── index.html          # Main website
├── admin.html          # Admin panel
├── feature.html        # Feature detail page (Why Choose Us)
├── style.css           # All styles
├── script.js           # Dynamic rendering + loan calculator
├── data.json           # Default config (fallback)
├── api/
│   └── config.js       # Vercel serverless function — reads/writes Supabase
├── server.js           # Local dev server
├── vercel.json         # Vercel routing config
└── package.json
```

---

## Admin Panel Sections

- **Company Info** — Name, tagline, phone, address
- **Hero** — Badge, title, subtitle, note
- **FFT** — Fast / Paperless / Trusted section
- **Steps** — How It Works loan process steps
- **Why Choose Us** — Feature cards with title & description
- **Eligibility** — Checklist items + eligibility card details
- **Testimonials** — Add / edit / delete customer reviews
- **FAQ** — Frequently asked questions
- **Footer** — Quick Links, Legal, Service Area, Copyright, Brand

---

## Local Development

```bash
npm install
node server.js
```

Open `http://localhost:3000`

---

## Deployment

```bash
npx vercel --prod
```

---

## Contact

📞 +91-9355753533  
📍 Wazirpur Industrial Area, Delhi, India  
🏦 RBI-Registered NBFC
