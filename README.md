<div align="center">

# ⛅ Weather Today

**A responsive, API-driven weather dashboard built with vanilla JavaScript and Webpack.**

Built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](./package.json)
[![Webpack](https://img.shields.io/badge/webpack-5-8DD6F9.svg?logo=webpack)](https://webpack.js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E.svg?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Code Style](https://img.shields.io/badge/code_style-Biome-60A5FA.svg?logo=biome)](https://biomejs.dev/)

</div>

---

## 📖 Overview

**Weather Today** fetches live weather data and renders a clean, mobile-first dashboard — current conditions, a 7-day outlook, and an hour-by-hour breakdown — for any city or zip code. It geolocates the visitor on first load, supports °C/°F and km/h/mph unit toggles, and remembers recently searched locations.

## ✨ Features

- **📍 Automatic location** — detects the visitor's city via IP geolocation (falls back to London).
- **🔍 Debounced city search** — live autocomplete for cities and zip codes, with keyboard/click selection.
- **🌡️ Current conditions** — temperature, description, and "feels like" at a glance.
- **📅 7-day forecast** — daily high/low, conditions, and precipitation probability.
- **🕐 Hourly forecast** — hour-by-hour cards with a day-selector dropdown.
- **🌗 Unit conversion** — toggle between Celsius ↔ Fahrenheit and km/h ↔ mi/h in place.
- **🗂️ Recent locations** — recent searches persisted to `localStorage`, managed via a hamburger menu with delete support.
- **🎨 Dynamic theming** — weather icons and background images swap based on current conditions.
- **💬 Toast notifications** — styled, responsive error alerts via `toastify-js`.
- **💀 Skeleton loading** — placeholder shimmer states while data loads.

## 🧰 Tech Stack

| Layer        | Technology                                                              |
| ------------ | ----------------------------------------------------------------------- |
| Language     | Vanilla JavaScript (ES modules)                                          |
| Bundler      | [Webpack 5](https://webpack.js.org/) + `webpack-dev-server`              |
| Templating   | `html-webpack-plugin`                                                    |
| Styling      | Plain CSS (bundled via `style-loader` / `css-loader`)                    |
| Date handling| [`date-fns`](https://date-fns.org/)                                      |
| Toasts       | [`toastify-js`](https://apvarun.github.io/toastify-js/)                  |
| Tooling      | [Biome](https://biomejs.dev/) (format + lint)                            |

### Data sources

| API                                                            | Used for                                |
| -------------------------------------------------------------- | --------------------------------------- |
| [Visual Crossing Timeline](https://www.visualcrossing.com/)    | Weather conditions, forecast, hourly    |
| [WeatherAPI](https://www.weatherapi.com/)                      | City / zip-code autocomplete search     |
| [ipapi.co](https://ipapi.co/)                                  | IP-based geolocation on first load      |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18+** (includes `npm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ntshabalala-dev/Odin-weather-app.git
cd Odin-weather-app

# 2. Install dependencies
npm install
```

### Run locally

```bash
# Start the development server (opens the app in your browser)
npm start
```

`npm start` launches `webpack-dev-server` with hot reload. The app is served at `http://localhost:8080` by default.

### Production build

```bash
# Build an optimized bundle into ./dist
npm run build
```

## 📜 Available Scripts

| Command            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `npm start`        | Start the dev server with hot reload (`--open`).        |
| `npm run build`    | Production build into `dist/`.                          |
| `npm run build-dev`| Development build into `dist/`.                         |
| `npm run deploy`   | Build + commit `dist/` and push to `gh-pages`.          |
| `npm run format`   | Format the codebase with Biome.                         |
| `npm run lint`     | Lint the codebase with Biome.                           |
| `npm run check`    | Format **and** lint (write mode) with Biome.            |

## 🧭 Project Structure

```
.
├── src/
│   ├── Assets/              # Icons, background images, favicon
│   │   ├── air_conditions/  # Feels-like / wind / precipitation icons
│   │   ├── weather_icons/   # Condition-specific SVG icons
│   │   └── bg/              # Dynamic background images
│   ├── Helpers/             # Date/time, icon mapping, asset loading, toasts
│   ├── Modules/             # Search, unit converter, forecast dropdown, nav menu
│   ├── Service/             # API clients (weather, geolocation)
│   ├── index.html           # App shell / markup
│   ├── main.css             # Global styles
│   └── script.js            # Entry point
├── webpack.common.js        # Shared build config
├── webpack.dev.js           # Development overrides
├── webpack.prod.js          # Production overrides
└── biome.js                 # Biome (formatter + linter) config
```

## 📄 License

Distributed under the **ISC License**. See [`package.json`](./package.json) for details.

---

<div align="center">

Made with ☕ for [The Odin Project](https://www.theodinproject.com/) · © Weather Today 2026

</div>
