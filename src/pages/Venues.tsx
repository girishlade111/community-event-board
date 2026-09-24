import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { format, parseISO } from 'date-fns'
import { ArrowRight, MapPin, Search } from 'lucide-react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import { CATEGORY_META, EVENTS } from '@/data/events'

interface VenueInfo {
  name: string
  address: string
  events: typeof EVENTS
  cover: string
}

export default function Venues() {
  const [query, setQuery] = useState('')

  const venues = useMemo<VenueInfo[]>(() => {
    const map = new Map<string, VenueInfo>()
    for (const e of EVENTS) {
      if (!map.has(e.venue)) {
        map.set(e.venue, {
          name: e.venue,
          address: e.address,
          events: [],
          cover: CATEGORY_META[e.category].cover,
        })
      }
      map.get(e.venue)!.events.push(e)
    }
    return [...map.values()].sort((a, b) => b.events.length - a.events.length)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return venues
    return venues.filter((v) => `${v.name} ${v.address}`.toLowerCase().includes(q))
  }, [venues, query])

  return (
    <div className="min-h-screen bg-[#faf9f7] text-stone-900">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-14 sm:pt-20">
        <h1 className="font-display max-w-2xl text-[44px] leading-[1.05] text-stone-900 sm:text-6xl">
          The rooms, parks &amp; <em className="italic">pier</em> where it happens
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-500">
          {venues.length} venues host events on townhall — from basement bars to the
          harbourfront.
        </p>

        <div className="relative mt-8 max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search venues…"
            className="h-11 w-full rounded-full border border-stone-200 bg-white pl-11 pr-4 text-sm text-stone-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition placeholder:text-stone-400 focus:border-stone-400"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-sm text-stone-400">
            No venues match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v) => {
              const next = [...v.events].sort((a, b) => a.date.localeCompare(b.date))[0]
              return (
                <article key={v.name} className="group">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                    <img
                      src={v.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-stone-900 backdrop-blur-md">
                      {v.events.length} upcoming
                    </span>
                  </div>
                  <div className="px-1 pt-3">
                    <h2 className="text-lg font-semibold tracking-tight text-stone-900">
                      {v.name}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-stone-500">
                      <MapPin className="h-3.5 w-3.5 text-stone-400" />
                      {v.address}
                    </p>
                    {next && (
                      <Link
                        to={`/events/${next.id}`}
                        className="mt-3 flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white p-3 transition hover:border-stone-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      >
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">
                            Next up
                          </p>
                          <p className="mt-0.5 truncate text-sm font-medium text-stone-900">
                            {next.title}
                          </p>
                          <p className="text-xs text-stone-500">
                            {format(parseISO(next.date), 'EEE, MMM d')} · {next.time}
                          </p>
                        </div>
                        <ArrowRight className="ml-3 h-4 w-4 shrink-0 text-stone-300 transition group-hover:text-stone-500" />
                      </Link>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
