import { useMemo, useState } from 'react'
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CATEGORY_META } from '@/data/events'
import type { LocalEvent } from '@/types/event'
import { EventRow } from '@/sections/EventCard'

interface Props {
  events: LocalEvent[]
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function CalendarView({ events }: Props) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [selected, setSelected] = useState<Date | null>(new Date())

  const byDay = useMemo(() => {
    const map = new Map<string, LocalEvent[]>()
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, [])
      map.get(e.date)!.push(e)
    }
    return map
  }, [events])

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month))
    const end = endOfWeek(endOfMonth(month))
    const out: Date[] = []
    for (let d = start; d <= end; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
      out.push(d)
    }
    return out
  }, [month])

  const selectedEvents = selected ? byDay.get(format(selected, 'yyyy-MM-dd')) ?? [] : []

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr]">
      <div className="rounded-3xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between px-1 pb-4">
          <h3 className="font-display text-xl italic text-stone-900">
            {format(month, 'MMMM yyyy')}
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMonth((m) => addMonths(m, -1))}
              className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMonth((m) => addMonths(m, 1))}
              className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7">
          {WEEKDAYS.map((w, i) => (
            <div key={i} className="pb-2 text-center text-[11px] font-semibold text-stone-400">
              {w}
            </div>
          ))}
          {days.map((day) => {
            const key = format(day, 'yyyy-MM-dd')
            const dayEvents = byDay.get(key) ?? []
            const inMonth = isSameMonth(day, month)
            const isSelected = selected !== null && isSameDay(day, selected)
            return (
              <button
                key={key}
                onClick={() => setSelected(day)}
                className="group relative flex flex-col items-center gap-1 py-1.5"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] transition ${
                    isSelected
                      ? 'bg-stone-900 font-semibold text-white'
                      : isToday(day)
                        ? 'font-semibold text-stone-900 ring-1 ring-stone-900'
                        : inMonth
                          ? 'text-stone-700 group-hover:bg-stone-100'
                          : 'text-stone-300'
                  }`}
                >
                  {format(day, 'd')}
                </span>
                <span className="flex h-1.5 items-center gap-[3px]">
                  {dayEvents.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className={`h-1.5 w-1.5 rounded-full ${CATEGORY_META[e.category].dot} ${
                        isSelected ? 'opacity-90' : 'opacity-70'
                      }`}
                    />
                  ))}
                </span>
              </button>
            )
          })}
        </div>

        <p className="mt-4 border-t border-stone-100 px-1 pt-3 text-xs text-stone-400">
          {events.length} event{events.length === 1 ? '' : 's'} match your filters
        </p>
      </div>

      <div className="min-w-0">
        <h3 className="mb-2 px-0.5 text-[15px] font-semibold tracking-tight text-stone-900">
          {selected ? format(selected, 'EEEE, MMMM d') : 'Select a day'}
        </h3>
        {selectedEvents.length === 0 ? (
          <p className="px-0.5 pt-6 text-sm text-stone-400">
            {selected
              ? 'Nothing on this day — try another date.'
              : 'Pick a day to see what\u2019s on.'}
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {selectedEvents.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
