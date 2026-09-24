import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/70">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-5 py-10 text-sm text-stone-400 sm:flex-row sm:items-center">
        <Link to="/" className="font-display text-lg italic text-stone-900">
          townhall
        </Link>
        <nav className="flex items-center gap-5 text-[13px]">
          <Link to="/" className="transition hover:text-stone-700">
            Events
          </Link>
          <Link to="/calendar" className="transition hover:text-stone-700">
            Calendar
          </Link>
          <Link to="/venues" className="transition hover:text-stone-700">
            Venues
          </Link>
          <Link to="/about" className="transition hover:text-stone-700">
            About
          </Link>
          <Link to="/submit" className="transition hover:text-stone-700">
            Submit
          </Link>
        </nav>
        <p className="text-xs">Demo site — events and ticket links are illustrative.</p>
      </div>
    </footer>
  )
}
