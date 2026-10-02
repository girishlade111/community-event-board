# Community Event Board

A modern, responsive web application for discovering and sharing local community events. Browse events in list or calendar view, filter by category, explore venues, view event details, and submit your own events — all built with React, TypeScript, and Vite.

## Features

- **Home** — Discover upcoming community events at a glance
- **Event Listing** — Browse events as cards with filtering by category and keywords
- **Calendar View** — See events laid out on a monthly calendar
- **Event Detail** — Full information page for each event
- **Venues** — Browse locations where events are held
- **Submit an Event** — Form to propose new community events
- **About** — Learn about the project
- **404 Page** — Friendly not-found handling for unknown routes
- **Fully Responsive** — Works on desktop, tablet, and mobile (with a mobile-specific sidebar hook)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript ~5.9 |
| Build Tool | Vite 7 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` / `tw-animate-css` |
| UI Components | shadcn/ui (Radix UI primitives + `class-variance-authority`, `clsx`, `tailwind-merge`) |
| Forms | React Hook Form + Zod validation (`@hookform/resolvers`) |
| Charts | Recharts |
| Carousel | Embla Carousel |
| Toasts | Sonner |
| Drawer | Vaul |
| Linting | ESLint 9 (flat config) + `typescript-eslint` |

## Project Structure

```
project/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   └── ui/             # shadcn/ui components (button, card, dialog, ...)
│   ├── data/
│   │   └── events.ts       # Sample event data
│   ├── hooks/
│   │   └── use-mobile.ts   # Mobile viewport detection hook
│   ├── lib/
│   │   └── utils.ts        # cn() helper and shared utilities
│   ├── pages/              # Route-level pages
│   │   ├── Home.tsx
│   │   ├── EventDetail.tsx
│   │   ├── CalendarPage.tsx
│   │   ├── Venues.tsx
│   │   ├── Submit.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── sections/           # Composed page sections
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FilterBar.tsx
│   │   ├── EventCard.tsx
│   │   ├── ListView.tsx
│   │   └── CalendarView.tsx
│   ├── types/
│   │   └── event.ts        # Event type definitions
│   ├── App.tsx             # Route definitions
│   └── main.tsx            # App entry point
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── eslint.config.js
```

## Routes

| Path | Page |
|---|---|
| `/` | Home (event listing) |
| `/events/:id` | Event detail |
| `/calendar` | Calendar view |
| `/venues` | Venues |
| `/submit` | Submit an event |
| `/about` | About |
| `*` | 404 Not Found |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/girishlade111/community-event-board.git
cd community-event-board
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server with Hot Module Replacement (HMR). Open the printed local URL (typically `http://localhost:5173`) in your browser.

### Build

```bash
npm run build
```

Type-checks with `tsc -b` and produces an optimized production bundle in `dist/`.

### Preview Production Build

```bash
npm run preview
```

Serves the built `dist/` output locally to verify the production build.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

## Scripts Reference

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Configuration

- **Tailwind** — `tailwind.config.js` + `postcss.config.js`; theme extensions and animation plugins are configured there.
- **TypeScript** — Split configs: `tsconfig.app.json` (application code) and `tsconfig.node.json` (Vite config), referenced by `tsconfig.json`.
- **Vite** — `vite.config.ts` with the React plugin and path aliases (see config for alias definitions).
- **ESLint** — Flat config in `eslint.config.js`.

## Ignored Files

`node_modules/`, build output (`dist/`), logs, editor files, and `.env` are excluded from version control via `.gitignore`.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

This project is open source and available for use under the repository's license terms.

---

**Built by [Girish Lade](https://ladestack.in)** — Founder of [LadeStack](https://ladestack.in)
