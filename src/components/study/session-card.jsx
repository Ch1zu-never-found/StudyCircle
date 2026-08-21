import { Users, Clock, MapPin, BadgeCheck, Check, Hourglass } from 'lucide-react'
import { formatSessionTime } from '@/lib/mock-data'

const LEVEL_STYLES = {
  Beginner: 'bg-success/12 text-success',
  Intermediate: 'bg-accent/25 text-accent-foreground',
  Advanced: 'bg-primary/12 text-primary',
}

export default function SessionCard({ session, joinState, onJoin, onOpen }) {
  const full = session.joined >= session.capacity
  const pct = Math.min(100, Math.round((session.joined / session.capacity) * 100))

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          {session.subject}
        </span>
        <span
          className={`rounded-md px-2 py-1 text-xs font-medium ${
            LEVEL_STYLES[session.level] || 'bg-muted text-muted-foreground'
          }`}
        >
          {session.level}
        </span>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-3 text-left"
      >
        <h3 className="font-serif text-lg font-semibold leading-snug text-foreground text-balance hover:text-primary">
          {session.topic}
        </h3>
      </button>

      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
        {session.description}
      </p>

      <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Clock size={15} aria-hidden="true" />
          {formatSessionTime(session.startTime)}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={15} aria-hidden="true" />
          {session.mode}
        </span>
        <span className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
            {session.host.initials}
          </span>
          Hosted by {session.host.name}
          {session.host.verified && (
            <BadgeCheck size={14} className="text-success" aria-label="Verified host" />
          )}
        </span>
      </div>

      {/* Capacity counter */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Users size={14} aria-hidden="true" />
            {session.joined} / {session.capacity} joined
          </span>
          <span className={full ? 'font-medium text-danger' : 'text-muted-foreground'}>
            {full ? 'Full' : `${session.capacity - session.joined} spots left`}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${full ? 'bg-danger' : 'bg-primary'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {joinState === 'requested' ? (
          <button
            type="button"
            disabled
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-muted-foreground"
          >
            <Hourglass size={15} />
            Request sent
          </button>
        ) : joinState === 'joined' ? (
          <button
            type="button"
            disabled
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-success/15 px-4 py-2 text-sm font-medium text-success"
          >
            <Check size={15} />
            Joined
          </button>
        ) : (
          <button
            type="button"
            onClick={onJoin}
            disabled={full}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {full ? 'Session full' : 'Join Request'}
          </button>
        )}
        <button
          type="button"
          onClick={onOpen}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Details
        </button>
      </div>
    </article>
  )
}
