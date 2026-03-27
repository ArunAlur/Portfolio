# Arun Alur — Portfolio

[![Deploy to GitHub Pages](https://github.com/ArunAlur/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/ArunAlur/Portfolio/actions/workflows/deploy.yml)

A modern, performant portfolio for **Arun Alur**, a backend-focused software engineer building cloud-native services, CI orchestration systems, and AI-powered developer tooling.

## ✨ Features

- **Scrolly-canvas hero** — 100-frame image sequence synced to scroll position
- **Anime.js loading screen** — step-by-step initialisation with real asset-load progress
- **Framer Motion animations** — scroll-driven overlays, fade-ups, stagger reveals
- **Tubelight navbar** — floating pill nav with active-section tracking
- **Radial orbital timeline** — interactive skills graph
- **Glowing project cards** — 3-D tilt with proximity glow effect
- **Smooth scroll** — Lenis-powered inertia scroll (respects `prefers-reduced-motion`)
- **Custom cursor** — dot + trailing ring with hover/click states
- **Resume download** — animated download flow with progress indicator
- **Fully responsive** — mobile-first, tested across sm / md / lg / xl breakpoints
- **Accessible** — WCAG AA contrast, `aria-*` attributes, keyboard navigable

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion · anime.js v3 · Lenis |
| Icons | Lucide React |
| UI Primitives | Radix UI |
| Font | Inter (Google Fonts) |
| Deployment | Vercel |

## 📦 Getting Started

```bash
# 1. Clone
git clone https://github.com/ArunAlur/Portfolio.git
cd Portfolio

# 2. Install
npm install

# 3. Develop
npm run dev
# → http://localhost:3000

# 4. Build
npm run build
```

## 🚀 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build (static export) |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
Portfolio/
├── public/
│   ├── Resume.pdf          # Resume (downloaded on click)
│   └── sequence/           # 100-frame .webp image sequence for hero
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout + metadata
│   │   ├── page.tsx        # Home page — section composition
│   │   └── globals.css     # Design tokens, z-index ladder, animations
│   ├── components/
│   │   ├── ui/             # Reusable primitives (navbar, cards, timeline…)
│   │   ├── LoadingScreen.tsx
│   │   ├── ScrollyCanvas.tsx
│   │   ├── Overlay.tsx
│   │   ├── About.tsx
│   │   ├── TimelineDemo.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Logo.tsx
│   │   └── …
│   └── lib/
│       └── utils.ts
├── tailwind.config.js
├── next.config.js
└── package.json
```

## 🎨 Design System

### Z-Index Ladder
| Layer | Value |
|---|---|
| Content sections | 10 – 20 |
| Logo | 55 |
| Navigation | 50 |
| Scroll progress bar | 60 |
| Back-to-top | 70 |
| Custom cursor glow | 75 |
| Custom cursor ring | 80 |
| Custom cursor dot | 85 |
| Noise grain overlay | 90 |
| Loading screen | 9999 |

### Color Tokens
- **Background** `#000000` pure black
- **Foreground** `hsl(0 0% 98%)`
- **Accent white** `#ffffff`
- **Accent gray** `#cccccc`

## 🔗 Links

- **Live site**: [portfolio-pa8m-arunalurs-projects.vercel.app](https://portfolio-pa8m-arunalurs-projects.vercel.app)
- **LinkedIn**: [linkedin.com/in/arun-basavaraj-alur](https://www.linkedin.com/in/arun-basavaraj-alur/)
- **GitHub**: [github.com/ArunAlur](https://github.com/ArunAlur)
- **Email**: aalur2@asu.edu

## 📄 License

Personal portfolio — all rights reserved © Arun Alur.
