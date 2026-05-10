# MatrixTM26 — Cybersecurity Portfolio

A professional, responsive cybersecurity portfolio built with **React + Vite**.  
Dark neon aesthetic with Matrix rain animation, terminal UI, and smooth scroll sections.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js **v18+** — [Download here](https://nodejs.org)
- npm or yarn

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### 3. Build for production
```bash
npm run build
```
Output → `dist/` folder

---

## ☁️ Deploy to Vercel (Recommended)

### Option A — Via Vercel CLI (fastest)
```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? → Y
# - Which scope? → (your account)
# - Link to existing project? → N
# - Project name? → matrixtm26-portfolio (or custom)
# - Directory? → ./  (press Enter)
# - Override settings? → N

# 4. For production deployment:
vercel --prod
```

### Option B — Via GitHub (auto-deploy)
1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deploy"
   git remote add origin https://github.com/MatrixTM26/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Every `git push` auto-deploys ✅

---

## 📁 Project Structure

```
matrixtm26-portfolio/
├── public/
│   └── favicon.svg          # Custom shield favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed navigation bar
│   │   ├── Hero.jsx         # Landing + Matrix rain + terminal
│   │   ├── About.jsx        # Profile + stats
│   │   ├── Skills.jsx       # Skill categories + bars + tools
│   │   ├── Projects.jsx     # Project cards
│   │   ├── Contact.jsx      # Contact form + social links
│   │   └── Footer.jsx       # Footer
│   ├── styles/
│   │   ├── global.css       # Variables, reset, utilities
│   │   ├── Navbar.css       # Navbar styles
│   │   ├── Hero.css         # Hero section styles
│   │   └── sections.css     # About, Skills, Projects, Contact styles
│   ├── App.jsx              # Root component
│   └── main.jsx             # React entry point
├── index.html               # HTML shell
├── vite.config.js           # Vite config
├── vercel.json              # Vercel SPA routing
└── package.json
```

---

## ✏️ Customization

| What to edit | File |
|---|---|
| Name, bio, social links | `About.jsx`, `Hero.jsx` |
| Skills & categories | `Skills.jsx` |
| Projects | `Projects.jsx` |
| Contact channels | `Contact.jsx` |
| Color scheme | `src/styles/global.css` (`:root` variables) |
| Fonts | `index.html` + `global.css` |

### Change accent color
In `global.css` → `:root`, change:
```css
--neon-green: #00ff88;   /* Primary accent */
--neon-cyan:  #00ccff;   /* Secondary accent */
```

---

## 🧰 Tech Stack

- **React 18** — UI framework  
- **Vite 5** — Build tool (lightning fast HMR)  
- **CSS Custom Properties** — Theming system  
- **Canvas API** — Matrix rain animation  
- **Google Fonts** — Orbitron, Share Tech Mono, Rajdhani  

---

## ⚠️ Disclaimer

All security research and tools featured in this portfolio are conducted **ethically** and with **proper authorization**. This portfolio is for educational and professional demonstration purposes only.

---

Built by **MatrixTM26** — Stay Ethical, Hack Responsibly 🛡️
