import { useMemo } from 'react'
import { Link, useParams } from 'react-router'
import { format, isSameDay, parseISO } from 'date-fns'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
} from 'lucide-react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import { EventRow } from '@/sections/EventCard'
import { CATEGORY_META, EVENTS } from '@/data/events'

export default function EventDetail() {
  const { id } = useParams()
  const event = EVENTS.find((e) => e.id === id)

  const related = useMemo(() => {
    if (!event) return []
    const sameDay = EVENTS.filter((e) => e.id !== event.id && isSameDay(parseISO(e.date), parseISO(event.date)))
    const sameCat = EVENTS.filter(
      (e) => e.id !== event.id && e.category === event.category && !sameDay.includes(e),
    )
    return [...sameDay, ...sameCat].slice(0, 3)
  }, [event])

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col bg-[#faf9f7]">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
          <p className="font-display text-3xl italic text-stone-900">Event not found</p>
          <p className="mt-3 text-sm text-stone-500">
            It may have been cancelled, or the link is out of date.
          </p>
          <Link
            to="/"
            className="mt-8 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            Browse all events
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const meta = CATEGORY_META[event.category]
  const date = parseISO(event.date)
  const mapQuery = encodeURIComponent(`${event.venue}, ${event.address}, Riverton`)

  return (
    <div className="min-h-screen bg-[#faf9f7] text-stone-900">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" />
          All events
        </Link>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_340px]">
          {/* Main column */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-3xl">
              <img src={meta.cover} alt="" className="aspect-[3/2] w-full object-cover" />
            </div>

            <p className="mt-6 flex items-center gap-1.5 text-[13px] font-medium text-stone-500">
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {event.category}
              {event.featured && (
                <span className="ml-2 rounded-full bg-stone-900 px-2 py-0.5 text-[11px] font-semibold text-white">
                  Editors&rsquo; pick
                </span>
              )}
            </p>
            <h1 className="font-display mt-2 text-4xl leading-[1.08] text-stone-900 sm:text-5xl">
              {event.title}
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-stone-600">
              {event.description}
            </p>

            <dl className="mt-10 space-y-5 border-t border-stone-200/80 pt-8">
              <div className="flex gap-4">
                <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-stone-500 ring-1 ring-stone-200">
                  <CalendarDays className="h-4 w-4" />
                </dt>
                <dd>
                  <p className="text-[13px] font-medium text-stone-400">Date</p>
                  <p className="mt-0.5 text-[15px] font-medium text-stone-900">
                    {format(date, 'EEEE, MMMM d, yyyy')}
                  </p>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-stone-500 ring-1 ring-stone-200">
                  <Clock className="h-4 w-4" />
                </dt>
                <dd>
                  <p className="text-[13px] font-medium text-stone-400">Time</p>
                  <p className="mt-0.5 text-[15px] font-medium text-stone-900">{event.time}</p>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-stone-500 ring-1 ring-stone-200">
                  <MapPin className="h-4 w-4" />
                </dt>
                <dd>
                  <p className="text-[13px] font-medium text-stone-400">Venue</p>
                  <p className="mt-0.5 text-[15px] font-medium text-stone-900">{event.venue}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-sm text-stone-500 underline decoration-stone-300 underline-offset-2 transition hover:text-stone-900"
                  >
                    {event.address}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Ticket panel */}
          <aside className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] lg:sticky lg:top-24">
            <p className="text-[13px] font-medium text-stone-400">
              {event.price === 0 ? 'Admission' : 'Tickets from'}
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </p>
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              <Ticket className="h-4 w-4" />
              {event.price === 0 ? 'RSVP — free entry' : 'Get tickets'}
            </a>
            <p className="mt-3 text-center text-xs text-stone-400">
              Sold by the venue · opens in a new tab
            </p>
            <div className="mt-6 space-y-2.5 border-t border-stone-100 pt-5 text-[13px] text-stone-500">
              <p className="flex justify-between">
                <span>Date</span>
                <span className="font-medium text-stone-800">{format(date, 'EEE, MMM d')}</span>
              </p>
              <p className="flex justify-between">
                <span>Doors</span>
                <span className="font-medium text-stone-800">{event.time}</span>
              </p>
              <p className="flex justify-between">
                <span>Venue</span>
                <span className="max-w-[55%] truncate text-right font-medium text-stone-800">
                  {event.venue}
                </span>
              </p>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display px-0.5 text-2xl italic text-stone-900">
              You might also like
            </h2>
            <div className="mt-4 flex flex-col gap-1">
              {related.map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
