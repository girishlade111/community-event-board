import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Events' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/venues', label: 'Venues' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // close the menu whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f7]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link to="/" className="font-display text-[26px] italic leading-none text-stone-900">
          townhall
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 text-sm text-stone-500 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="transition hover:text-stone-900">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/submit"
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            Submit event
          </Link>
          {/* mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-200/60 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile nav panel */}
      {open && (
        <nav className="border-t border-stone-200/70 bg-[#faf9f7]/95 px-5 pb-5 pt-2 backdrop-blur-md md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`block border-b border-stone-200/60 py-3.5 text-[15px] font-medium transition last:border-0 ${
                location.pathname === n.to
                  ? 'text-stone-900'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
