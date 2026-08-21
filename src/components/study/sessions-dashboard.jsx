import { useMemo, useState } from 'react'
import { Plus, SearchX } from 'lucide-react'
import FilterBar from './filter-bar'
import SessionCard from './session-card'

const DEFAULT_FILTERS = { subject: 'all', topic: '', level: 'all', time: 'any' }

export default function SessionsDashboard({
  sessions,
  joinStates,
  onJoin,
  onOpen,
  onCreate,
}) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    const topic = filters.topic.trim().toLowerCase()
    return sessions.filter((s) => {
      if (filters.subject !== 'all' && s.subject !== filters.subject) return false
      if (filters.level !== 'all' && s.level !== filters.level) return false
      if (filters.time !== 'any' && s.timeWindow !== filters.time) return false
      if (topic && !s.topic.toLowerCase().includes(topic)) return false
      return true
    })
  }, [sessions, filters])

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">
            Find a study session
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse verified sessions and send a join request.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus size={17} aria-hidden="true" />
          Create session
        </button>
      </header>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'session' : 'sessions'} found
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchX size={24} aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-medium text-foreground">
            No sessions match your filters
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try widening your search or create your own session.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              joinState={joinStates[session.id]}
              onJoin={() => onJoin(session.id)}
              onOpen={() => onOpen(session.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
