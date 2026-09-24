import { Search, X } from 'lucide-react'
import { CATEGORIES, CATEGORY_META } from '@/data/events'
import type { Category } from '@/types/event'

interface Props {
  search: string
  onSearch: (v: string) => void
  active: Set<Category>
  onToggleCategory: (c: Category) => void
  onClearCategories: () => void
  freeOnly: boolean
  onToggleFree: () => void
  counts: Record<Category, number>
}

const chipBase =
  'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition'

export default function FilterBar({
  search,
  onSearch,
  active,
  onToggleCategory,
  onClearCategories,
  freeOnly,
  onToggleFree,
  counts,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search events, venues…"
          className="h-11 w-full rounded-full border border-stone-200 bg-white pl-11 pr-10 text-sm text-stone-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition placeholder:text-stone-400 focus:border-stone-400"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onClearCategories}
          className={`${chipBase} ${
            active.size === 0
              ? 'border-stone-900 bg-stone-900 text-white'
              : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c]
          const isActive = active.has(c)
          return (
            <button
              key={c}
              onClick={() => onToggleCategory(c)}
              className={`${chipBase} ${
                isActive
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-white/70' : meta.dot}`}
              />
              {c}
              <span className={isActive ? 'text-white/50' : 'text-stone-400'}>
                {counts[c] ?? 0}
              </span>
            </button>
          )
        })}
        <button
          onClick={onToggleFree}
          className={`${chipBase} ${
            freeOnly
              ? 'border-emerald-700 bg-emerald-700 text-white'
              : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
          }`}
        >
          Free
        </button>
      </div>
    </div>
  )
}
