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

## Deployment (Vercel)

```bash
npx vercel --prod
```

---

## Self-Hosting Guide (Apne Server Pe Deploy Karna)

Agar aap Vercel chhod ke apne **VPS / Dedicated Server** (e.g. AWS EC2, DigitalOcean, Hostinger VPS) pe website host karna chahte ho toh yeh steps follow karo.

### Prerequisites

- Linux server (Ubuntu 20.04+ recommended)
- Node.js 18+ installed
- PM2 (process manager)
- Nginx (reverse proxy)
- Domain pointing to your server IP

---

### Step 1 — Server pe Node.js install karo

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # should show v18+
```

---

### Step 2 — PM2 install karo (server ko background mein chalane ke liye)

```bash
sudo npm install -g pm2
```

---

### Step 3 — Code server pe clone karo

```bash
git clone https://github.com/TechSupportSTU/Baid-Stock-Site.git
cd Baid-Stock-Site
npm install
```

---

### Step 4 — Environment Variables set karo

`.env` file banao project folder mein:

```bash
nano .env
```

Yeh content paste karo:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
ADMIN_PASSWORD=baid@admin2024
PORT=3000
```

> **Note:** Supabase URL aur Key aapke Supabase dashboard → Project Settings → API mein milegi.

---

### Step 5 — `server.js` ko update karo

`server.js` pehle se included hai. Yeh `/api/config` route handle karta hai — same jo Vercel karta tha. Bas `.env` file se variables load hone chahiye.

`server.js` ke top mein yeh line add karo agar nahi hai:

```js
require('dotenv').config();
```

Aur dotenv install karo:

```bash
npm install dotenv
```

---

### Step 6 — PM2 se server start karo

```bash
pm2 start server.js --name baidstock
pm2 save
pm2 startup   # copy-paste the command it shows
```

Server ab background mein chal raha hai aur reboot ke baad bhi automatically start hoga.

---

### Step 7 — Nginx install aur configure karo

```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/baidstock
```

Yeh config paste karo (apna domain replace karo):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable karo aur restart karo:

```bash
sudo ln -s /etc/nginx/sites-available/baidstock /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Step 8 — SSL Certificate lagao (HTTPS — Free)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot automatically HTTPS configure kar dega.

---

### Step 9 — Website check karo

Browser mein apna domain open karo:

```
https://yourdomain.com
https://yourdomain.com/admin.html
```

---

### Useful PM2 Commands

```bash
pm2 status          # server status dekho
pm2 logs baidstock  # live logs dekho
pm2 restart baidstock  # restart karo
pm2 stop baidstock  # band karo
```

---

### Code Update Karne Ka Process (Future Updates)

```bash
cd Baid-Stock-Site
git pull origin main
npm install
pm2 restart baidstock
```

---

## Environment Variables (Required)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase anon/publishable key |
| `ADMIN_PASSWORD` | Admin panel login password |
| `PORT` | Server port (default: 3000) |

---

## Contact

📞 +91-9355753533  
📍 Wazirpur Industrial Area, Delhi, India  
🏦 RBI-Registered NBFC
