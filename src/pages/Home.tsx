import { useMemo, useState } from 'react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import FilterBar from '@/sections/FilterBar'
import ListView from '@/sections/ListView'
import CalendarView from '@/sections/CalendarView'
import { FeaturedCard } from '@/sections/EventCard'
import { CATEGORIES, EVENTS } from '@/data/events'
import type { Category } from '@/types/event'

type View = 'list' | 'calendar'

export default function Home() {
  const [view, setView] = useState<View>('list')
  const [search, setSearch] = useState('')
  const [active, setActive] = useState<Set<Category>>(new Set())
  const [freeOnly, setFreeOnly] = useState(false)

  const counts = useMemo(() => {
    const c = Object.fromEntries(CATEGORIES.map((k) => [k, 0])) as Record<Category, number>
    for (const e of EVENTS) c[e.category] += 1
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return EVENTS.filter((e) => {
      if (active.size > 0 && !active.has(e.category)) return false
      if (freeOnly && e.price !== 0) return false
      if (q && !`${e.title} ${e.venue} ${e.description} ${e.category}`.toLowerCase().includes(q))
        return false
      return true
    })
  }, [search, active, freeOnly])

  const featured = useMemo(() => EVENTS.filter((e) => e.featured).slice(0, 3), [])
  const isDefaultView = active.size === 0 && !freeOnly && search.trim() === ''

  const toggleCategory = (c: Category) =>
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(c)) next.delete(c)
      else next.add(c)
      return next
    })

  return (
    <div className="min-h-screen bg-[#faf9f7] text-stone-900">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pb-8 pt-14 sm:pt-20">
        <h1 className="font-display max-w-3xl text-[44px] leading-[1.05] text-stone-900 sm:text-6xl">
          What&rsquo;s on in <em className="italic">Riverton</em> this&nbsp;week
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-500">
          Gigs, markets, family days and late nights — every local event, curated in one
          place.
        </p>
        <div className="mt-8">
          <FilterBar
            search={search}
            onSearch={setSearch}
            active={active}
            onToggleCategory={toggleCategory}
            onClearCategories={() => setActive(new Set())}
            freeOnly={freeOnly}
            onToggleFree={() => setFreeOnly((v) => !v)}
            counts={counts}
          />
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-5 pb-24">
        {/* Featured */}
        {isDefaultView && (
          <section className="pt-6">
            <h2 className="font-display px-1 text-2xl italic text-stone-900">
              Editors&rsquo; picks
            </h2>
            <div className="mt-5 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((e) => (
                <FeaturedCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        )}

        {/* All events */}
        <div className="mt-14 flex items-center justify-between" id="events">
          <h2 className="font-display text-2xl italic text-stone-900">
            {isDefaultView ? 'Everything else' : `${filtered.length} result${filtered.length === 1 ? '' : 's'}`}
          </h2>
          <div className="flex rounded-full border border-stone-200 bg-white p-1">
            {(['list', 'calendar'] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium capitalize transition ${
                  view === v ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {view === 'list' ? <ListView events={filtered} /> : <CalendarView events={filtered} />}
        </div>
      </main>

      <Footer />
    </div>
  )
}
