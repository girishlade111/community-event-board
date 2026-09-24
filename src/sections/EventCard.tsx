import { Link } from 'react-router'
import { format, parseISO } from 'date-fns'
import { CATEGORY_META } from '@/data/events'
import type { LocalEvent } from '@/types/event'

function PriceChip({ price, floating = false }: { price: number; floating?: boolean }) {
  const base = 'rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md'
  if (price === 0)
    return (
      <span
        className={
          floating
            ? `${base} bg-white/85 text-emerald-700`
            : 'rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700'
        }
      >
        Free
      </span>
    )
  return (
    <span
      className={
        floating
          ? `${base} bg-white/85 text-stone-900`
          : 'rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700'
      }
    >
      ${price}
    </span>
  )
}

/** Compact lu.ma-style row used in the list view */
export function EventRow({ event }: { event: LocalEvent }) {
  const meta = CATEGORY_META[event.category]
  const date = parseISO(event.date)

  return (
    <Link
      to={`/events/${event.id}`}
      className="group -mx-3 flex items-center gap-4 rounded-2xl p-3 transition hover:bg-white hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] sm:gap-5"
    >
      <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
        <img
          src={meta.cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[13px] font-medium text-stone-500">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
          {format(date, 'EEE, MMM d')} · {event.time}
        </p>
        <h3 className="mt-0.5 truncate text-[15px] font-semibold tracking-tight text-stone-900 sm:text-base">
          {event.title}
        </h3>
        <p className="mt-0.5 truncate text-sm text-stone-500">
          {event.venue} · {event.category}
        </p>
      </div>
      <div className="hidden shrink-0 sm:block">
        <PriceChip price={event.price} />
      </div>
    </Link>
  )
}

/** Large editorial card used in the featured grid */
export function FeaturedCard({ event }: { event: LocalEvent }) {
  const meta = CATEGORY_META[event.category]
  const date = parseISO(event.date)

  return (
    <Link to={`/events/${event.id}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
        <img
          src={meta.cover}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 top-3">
          <PriceChip price={event.price} floating />
        </span>
      </div>
      <div className="px-1 pt-3">
        <p className="flex items-center gap-1.5 text-[13px] font-medium text-stone-500">
          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
          {format(date, 'EEEE, MMM d')} · {event.time}
        </p>
        <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-stone-900">
          {event.title}
        </h3>
        <p className="mt-0.5 text-sm text-stone-500">{event.venue}</p>
      </div>
    </Link>
  )
}
