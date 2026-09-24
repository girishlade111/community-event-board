import { useMemo } from 'react'
import { format, isToday, isTomorrow, parseISO } from 'date-fns'
import type { LocalEvent } from '@/types/event'
import { EventRow } from '@/sections/EventCard'

interface Props {
  events: LocalEvent[]
}

function dayLabel(iso: string) {
  const d = parseISO(iso)
  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  return format(d, 'EEEE')
}

export default function ListView({ events }: Props) {
  const groups = useMemo(() => {
    const map = new Map<string, LocalEvent[]>()
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, [])
      map.get(e.date)!.push(e)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [events])

  if (events.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-2xl italic text-stone-400">Nothing found</p>
        <p className="mt-2 text-sm text-stone-400">
          Try a different search or clear your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {groups.map(([date, dayEvents]) => (
        <section key={date}>
          <div className="mb-2 flex items-baseline gap-2.5 px-0.5">
            <h3 className="text-[15px] font-semibold tracking-tight text-stone-900">
              {dayLabel(date)}
            </h3>
            <span className="text-sm text-stone-400">
              {format(parseISO(date), 'MMM d')}
            </span>
            <span className="h-px flex-1 translate-y-[-3px] bg-stone-200/80" />
          </div>
          <div className="flex flex-col gap-1">
            {dayEvents.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
