import { Search, SlidersHorizontal } from 'lucide-react'
import { SUBJECTS, LEVELS, TIME_WINDOWS } from '@/lib/mock-data'

const selectClass =
  'w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40'

export default function FilterBar({ filters, onChange, onReset }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value })

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filter sessions
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <label htmlFor="f-subject" className="sr-only">
            Subject
          </label>
          <select
            id="f-subject"
            value={filters.subject}
            onChange={update('subject')}
            className={selectClass}
          >
            <option value="all">All subjects</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="f-topic" className="sr-only">
            Topic
          </label>
          <input
            id="f-topic"
            type="text"
            value={filters.topic}
            onChange={update('topic')}
            placeholder="Search topic…"
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>

        <div>
          <label htmlFor="f-level" className="sr-only">
            Level
          </label>
          <select
            id="f-level"
            value={filters.level}
            onChange={update('level')}
            className={selectClass}
          >
            <option value="all">All levels</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-time" className="sr-only">
            Time
          </label>
          <select
            id="f-time"
            value={filters.time}
            onChange={update('time')}
            className={selectClass}
          >
            {TIME_WINDOWS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
        >
          Clear all filters
        </button>
      </div>
    </div>
  )
}
