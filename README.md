# MatrixTM26 — Cybersecurity Portfolio

A professional, responsive cybersecurity portfolio built with **React + Vite**.
Dark neon aesthetic with Matrix rain animation, terminal UI, and smooth scroll sections.

---

## Quick Start

### Prerequisites

- Node.js v18+ — https://nodejs.org

### Install & run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

### Build for production

```bash
npm run build
```

Output → `dist/` folder

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B — GitHub auto-deploy

1. Push to GitHub:
    ```bash
    git init
    git add .
    git commit -m "init"
    git remote add origin https://github.com/MatrixTM26/portfolio.git
    git push -u origin main
    ```
2. Go to vercel.com → New Project → Import repo → Deploy

Every `git push` triggers an automatic redeploy.

---

## Project Structure

```
matrixtm26-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── Navbar.css
│   │   ├── Hero.css
│   │   └── sections.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Customization

| What             | File           |
| ---------------- | -------------- |
| Name, bio, links | `About.jsx`    |
| Terminal content | `Hero.jsx`     |
| Skills & tools   | `Skills.jsx`   |
| Projects         | `Projects.jsx` |
| Contact channels | `Contact.jsx`  |
| Colors & fonts   | `global.css`   |

### Change accent color

Edit `:root` in `global.css`:

```css
--neon-green: #00ff88;
--neon-cyan: #00ccff;
```

---

## Tech Stack

- React 18
- Vite 5
- CSS Custom Properties
- Canvas API (Matrix rain)
- Google Fonts: Orbitron, Share Tech Mono, Rajdhani

---

Built by **MatrixTM26** — Stay Ethical, Hack Responsibly 🛡️
