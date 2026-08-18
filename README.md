# 🗄️ Sundry — A Cabinet of Considered Goods

> **An artisanal considered-goods storefront structured as an architectural cabinet of natural materials. Engineered with zero external component bloat, pure CSS 3D physics, an authentic 50-object catalog in Indian Rupees (₹), 9-language Indic localization with GPS detection, and automated Docker/Azure cloud deployment.**

**Author**: **Raj Gupta** ([@rajgupta04](https://github.com/rajgupta04))  
**Repository**: [https://github.com/rajgupta04/sundry](https://github.com/rajgupta04/sundry)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx&logoColor=white)](https://nginx.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![WCAG](https://img.shields.io/badge/WCAG-2.1_AA-blue.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## ✨ Key Features & Architectural Highlights

- **🏛️ 50-Piece Real Material Catalog (₹ INR)**:
  - 5 Dedicated Drawers: **01 · Brass**, **02 · Glass**, **03 · Linen**, **04 · Wax**, and **05 · Paper** (10 objects per drawer).
  - Authentic technical specifications: alloy compositions, gram weights, millimeter dimensions, and genuine workshop provenance (Aligarh, Firozabad, Lithuania, Jaipur).
- **📦 Slide-Out Cabinet Tray & Dispatch Confirmation**:
  - Full cart state management with `localStorage` persistence.
  - Bespoke **On-Theme Dispatch Confirmation Sheet** with brass wax seal mark (`✓`), reference ID generation (`SND-XXXXXX`), and automatic cart clearing.
- **🌐 9-Language Indic Localization & GPS Detection**:
  - Languages: **English, हिन्दी (Hindi), বাংলা (Bengali), मराठी (Marathi), اردو (Urdu with RTL layout), ਪੰਜਾਬੀ (Punjabi), ಕನ್ನಡ (Kannada), தமிழ் (Tamil), and తెలుగు (Telugu)**.
  - Browser Geolocation (`navigator.geolocation`) automatically matches Indian coordinates to regional state languages with native greeting popups.
  - Dedicated multi-script Google Indic webfonts (`Noto Serif Devanagari`, `Noto Serif Bengali`, `Noto Sans Gurmukhi`, `Noto Sans Kannada`, `Noto Sans Tamil`, `Noto Sans Telugu`, `Noto Nastaliq Urdu`) eliminating character cropping.
- **📐 Pure CSS 3D Drawer Interaction**:
  - 3D physical hinging using `perspective: 1000px`, `transform-style: preserve-3d`, and `rotateX(-83deg)` with custom cubic-bezier spring physics.
  - `@media (prefers-reduced-motion: reduce)` crossfade fallback for complete accessibility.
- **🥚 Interactive Easter Egg & Golden Egg Cracking**:
  - Secret 5-tap physical lock on the footer brand logo.
  - 3D Golden Egg break animation with celebratory brass confetti blast.
  - Functional reward: **15% Lifetime Atelier Voucher (`ATELIER15`)** with automatic cart application + **51st Secret Master Artifact** gift.
- **📱 Pixel-Perfect Mobile Responsiveness**:
  - Audited down to 320px (iPhone SE) up to 1440px+ ultra-wide viewports with guaranteed `overflow-x: hidden` and zero layout shift.
- **🌓 Complete Daylight / Lamplight Dark Mode**:
  - Bone / Walnut / Muted Brass ➔ Espresso / Parchment / Bright Brass with system preference detection and zero-flicker persistence.
- **🛡️ Strict Honesty Constraint**:
  - Zero fabricated testimonials, zero fake reviewer counters, zero synthetic partner badges.

---

## 🚀 Quick Start & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or v20 LTS)
- [Docker](https://www.docker.com/) (Optional, for containerized run)

### Installation
```bash
# Clone the repository
git clone https://github.com/rajgupta04/sundry.git
cd sundry

# Install dependencies
npm install

# Start Vite development server with HMR
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🐳 Docker & Azure VM Deployment

This repository includes a multi-stage `Dockerfile` and `docker-compose.yml` pre-configured with Nginx Alpine, gzip compression, SPA routing fallback, security headers, and static asset cache controls.

### 1. Run with Docker Compose Locally
```bash
docker-compose up -d --build
```
Access at `http://localhost:7777`.

### 2. Deploy on Azure Linux VM (Ubuntu) in 2 Minutes
```bash
# SSH into your Azure VM
ssh azureuser@<YOUR_AZURE_VM_IP>

# Clone repository
git clone https://github.com/rajgupta04/sundry.git
cd sundry

# Launch containerized production build
sudo docker-compose up -d --build

# Verify container health
sudo docker ps
```
> **Note**: Ensure Port 7777 (HTTP) is allowed in your Azure Network Security Group (NSG) inbound rules.

---

## 📁 Repository Structure

```
sundry/
├── Dockerfile                      # Multi-stage production build (Node 20 -> Nginx Alpine)
├── docker-compose.yml              # 1-command container orchestration (Port 7777:80)
├── nginx.conf                      # Optimized Nginx config (gzip, cache-control, SPA fallback)
├── index.html                      # Entry HTML with preconnected Indic & Latin webfonts
├── package.json                    # Scripts and zero-bloat dependencies
├── DECISIONS.md                    # Senior staff engineering architectural defense
├── src/
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Top-level composition & layout
│   ├── global.css                  # Global styles, containers, accessibility utilities
│   ├── tokens.css                  # Design tokens, color palette, responsive typography
│   ├── reset.css                   # Modern CSS reset (box-sizing, overflow-x defense)
│   ├── context/
│   │   ├── CartContext.jsx         # Cart state, discount vouchers, ₹ subtotal engine
│   │   └── LanguageContext.jsx     # 9-language switcher & RTL text direction engine
│   ├── data/
│   │   ├── products.js             # 50-item master catalog across 5 material drawers
│   │   ├── translations.js         # Core UI dictionary across 9 languages
│   │   └── productTranslations.js  # Full catalog localization for 50 products
│   ├── components/
│   │   ├── Header/                 # Brand, nav, compact language switcher, cart badge
│   │   ├── HeroDrawer/             # Pure CSS 3D physical hinging drawer
│   │   ├── CategoryGrid/           # 5 material drawer top tabs, 50 product grid, spec modal
│   │   ├── ProductDetail/          # "Inside the Collection" featured cards
│   │   ├── ProductShape/           # 50 bespoke vector CSS illustrations
│   │   ├── CraftSection/           # Verifiable workshop provenance stories
│   │   ├── CartDrawer/             # Slide-out shopping tray & brass seal dispatch receipt
│   │   ├── LocationLanguagePrompt/ # Geolocation GPS state-language detection modal
│   │   ├── EasterEggReward/        # 3D egg breaking animation, confetti & 15% voucher
│   │   └── Footer/                 # False bottom compartment & brand footer
└── dist/                           # Production static assets (generated by Vite)
```

---

## 🧪 Verification & Production Build

```bash
# Type-check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 👤 Author & Architecture Defense

**Raj Gupta**  
GitHub: [@rajgupta04](https://github.com/rajgupta04)  
Architectural trade-offs and decision defense document: [DECISIONS.md](./DECISIONS.md)

---

## 📄 License

MIT © 2026 Raj Gupta (Sundry). Built with considered craftsmanship.
