# 🎨 Theme Customizer — Live Storefront Prototyping

A **real-time visual dashboard** for merchants to design and customize a mock e-commerce storefront. Change colors, typography, layout, and button styles — see every change **instantly** without page reloads.

Built with **HTML5**, **CSS3**, **Bootstrap 5**, **jQuery**, **JavaScript**, and **PHP**.

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
- **Save/Load Custom Presets** — persisted via localStorage and PHP API
- **Export CSS** — downloads a production-ready `theme.css` file
- **Responsive Device Preview** — desktop, tablet, and mobile frame sizes
- **Panel Toggle** — show/hide the control panel
- **Dynamic Google Font Loading** — fonts load on-demand when selected

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure & semantic markup |
| **CSS3** | Custom styling, transitions, scrollbar |
| **Bootstrap 5** | Responsive layout, accordion, modals, buttons |
| **jQuery 3.7** | Live DOM manipulation, event handling, AJAX |
| **JavaScript (ES6+)** | Theme logic, state management, presets |
| **PHP** | REST API for server-side preset persistence |
| **Bootstrap Icons** | Icon library |

---

## 📁 Project Structure

```
theme-customizer/
├── index.html                    # Main page (HTML + Bootstrap)
├── css/
│   └── custom.css                # Custom CSS styles
├── js/
│   └── theme-customizer.js       # jQuery + JS logic (DOM manipulation)
└── api/
    ├── save_preset.php           # PHP — Save theme preset
    ├── load_presets.php          # PHP — Load all presets
    └── delete_preset.php         # PHP — Delete a preset
```

---

## 🚀 Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Edge)
- For PHP API: [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/), or any PHP server

### Quick Start (No Server Needed)

The theme customizer works with just a browser! localStorage is used for preset persistence by default.

```bash
# Clone the repository
git clone https://github.com/bhuvneshstark/theme-customizer.git
cd theme-customizer

# Open in browser — just double-click index.html!
open public/theme-customizer/index.html
# Or use Live Server in VS Code
```

### With PHP Backend

For server-side preset persistence, run with a PHP server:

```bash
# Using PHP built-in server
cd public/theme-customizer
php -S localhost:8000

# Open http://localhost:8000
```

> **Note:** The PHP API stores presets in `data/presets.json`. Make sure the `data/` directory is writable.

---

## 🔌 PHP API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/save_preset.php` | Save a new theme preset |
| `GET` | `/api/load_presets.php` | Load all saved presets |
| `DELETE` | `/api/delete_preset.php?id=xxx` | Delete a preset |

### Example: Save a Preset via PHP API
```bash
curl -X POST http://localhost:8000/api/save_preset.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Theme",
    "config": {
      "storeName": "MY STORE",
      "primaryColor": "#1a1a2e",
      "accentColor": "#e94560"
    }
  }'
```

---

## 🎨 How It Works

1. **jQuery** listens for every user interaction (color picker change, slider move, button click)
2. Theme state is stored in a JavaScript object
3. On every change, jQuery rebuilds the storefront HTML and injects it via `$('#storefront').html()`
4. **CSS transitions** ensure smooth visual changes between states
5. **Google Fonts** are preloaded via `<link>` tags in the HTML head
6. **Presets** are saved to localStorage (client-side) or via PHP API (server-side)
7. **Export CSS** generates a production-ready stylesheet from the current state

---

## 📜 Resume Description

> **Theme Customizer — Live E-Commerce Storefront Prototyping Tool**
> Built a real-time visual dashboard using **HTML5, CSS3, Bootstrap 5, jQuery, and PHP** enabling merchants to customize mock storefronts with instant live preview. Implemented 20+ customization controls with jQuery-powered DOM manipulation, dynamic Google Font integration, preset persistence via PHP REST API, and responsive device preview modes.

---

## 📄 License

MIT License — feel free to use this in your own projects.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/bhuvneshstark">Bhuvnesh</a> using HTML, CSS, Bootstrap, jQuery & PHP
</p>
