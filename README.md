# 🎨 Theme Customizer — Live Storefront Prototyping

A **real-time visual dashboard** for merchants to design and customize a mock e-commerce storefront. Change colors, typography, layout, and button styles — see every change **instantly** without page reloads.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**, **Zustand**, and **Prisma**.

---

## ✨ Features

### 🎛️ Control Panel (20+ Controls)
| Section | Controls |
|---------|----------|
| **Brand** | Store name, tagline |
| **Colors** | 8 color pickers — primary, secondary, accent, background, text, card background, hero gradient |
| **Typography** | 8 Google Fonts, base font size slider, heading weight slider |
| **Layout** | Grid columns (2/3/4), card style (flat/elevated/bordered), header style (centered/split/minimal), border radius, section spacing |
| **Buttons** | Shape (rounded/squared/pill), variant (filled/outlined/ghost), live button preview |

### 🏪 Live Mock Storefront Preview
- **Navbar** with 3 layout modes (centered, split, minimal)
- **Hero banner** with gradient and CTA buttons
- **8 product cards** with ratings, categories, prices, and "Add to Cart"
- **Promo banner**, trust badges, newsletter signup
- **Full footer** with links, social icons, and contact info
- **Smooth CSS transitions** on all theme changes

### ⚡ Extra Features
- **5 Built-in Presets**: Modern Minimal, Elegant Boutique, Playful Pop, Dark Luxury, Nature Fresh
- **Save/Load Custom Presets** — persisted to database via API
- **Export CSS** — downloads a production-ready `theme.css` file
- **Responsive Device Preview** — desktop, tablet, and mobile frame sizes
- **Panel Toggle** — show/hide the control panel
- **Dynamic Google Font Loading** — fonts load on-demand when selected

---

## 📸 Screenshots

The dashboard features a **split-panel layout**:
- **Left sidebar** — all customization controls in collapsible sections
- **Right panel** — live mock storefront that updates in real-time

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/theme-customizer.git
cd theme-customizer

# Install dependencies
bun install

# Push database schema
bun run db:push

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI Components | shadcn/ui (New York style, 46 components) |
| Styling | Tailwind CSS 4, Framer Motion |
| State Management | Zustand |
| Database | SQLite + Prisma ORM |
| Icons | Lucide React |
| Fonts | Google Fonts (8 families) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main page — Theme Customizer
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles & theme variables
│   └── api/
│       └── themes/
│           └── route.ts            # CRUD API for theme presets
├── components/
│   ├── theme-customizer/
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── defaults.ts             # Default theme, presets, mock data
│   │   ├── store.ts                # Zustand state management
│   │   ├── control-panel.tsx       # Customization sidebar
│   │   ├── storefront-preview.tsx  # Live mock storefront
│   │   └── theme-customizer.tsx    # Main layout + header + export
│   └── ui/                         # 46 shadcn/ui components
├── hooks/                          # Custom React hooks
└── lib/
    ├── db.ts                       # Prisma database client
    └── utils.ts                    # Utility functions
prisma/
├── schema.prisma                   # Database schema (User, Post, ThemePreset)
db/
└── custom.db                       # SQLite database file
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/themes` | List all saved theme presets |
| `POST` | `/api/themes` | Save a new theme preset |
| `DELETE` | `/api/themes?id=xxx` | Delete a theme preset |

### Example: Save a Preset
```bash
curl -X POST http://localhost:3000/api/themes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Custom Theme",
    "config": {
      "storeName": "MY STORE",
      "primaryColor": "#1a1a2e",
      "accentColor": "#e94560",
      ...
    }
  }'
```

---

## 🎨 How It Works

1. **Zustand Store** holds the current theme configuration (colors, fonts, layout, etc.)
2. **Control Panel** updates the store on every user interaction
3. **Storefront Preview** reads from the store and applies changes via inline styles + CSS custom properties
4. **CSS transitions** (`transition: all 0.3s ease`) ensure smooth visual changes
5. **Google Fonts** are dynamically loaded via `<link>` injection when selected
6. **Export CSS** generates a production-ready stylesheet from the current configuration

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Dev | `bun run dev` | Start development server (port 3000) |
| Lint | `bun run lint` | Run ESLint |
| DB Push | `bun run db:push` | Push Prisma schema to database |
| DB Generate | `bun run db:generate` | Generate Prisma client |
| DB Reset | `bun run db:migrate reset` | Reset database |

---

## 📄 License

MIT License — feel free to use this in your own projects.

---

<p align="center">
  Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
</p>
