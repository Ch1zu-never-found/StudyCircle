import {
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  BarChart3,
  BadgeCheck,
} from 'lucide-react'
import ChatBox from './chat-box'
import { ROSTER, formatSessionTime } from '@/lib/mock-data'

function MetaItem({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon size={15} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default function SessionDetails({ session, onBack }) {
  if (!session) return null
  const full = session.joined >= session.capacity

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to sessions
      </button>

      <div className="grid flex-1 gap-5 lg:grid-cols-5">
        {/* Left: metadata + roster */}
        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                {session.subject}
              </span>
              <span className="rounded-md bg-primary/12 px-2 py-1 text-xs font-medium text-primary">
                {session.level}
              </span>
            </div>
            <h1 className="mt-3 font-serif text-2xl font-semibold text-foreground text-balance">
              {session.topic}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              {session.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <MetaItem
                Icon={Clock}
                label="Starts"
                value={formatSessionTime(session.startTime)}
              />
              <MetaItem Icon={MapPin} label="Mode" value={session.mode} />
              <MetaItem Icon={BarChart3} label="Level" value={session.level} />
              <MetaItem
                Icon={Users}
                label="Capacity"
                value={`${session.joined} / ${session.capacity}`}
              />
            </div>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Seats filled</span>
                <span className={full ? 'text-danger' : 'text-muted-foreground'}>
                  {full ? 'Full' : `${session.capacity - session.joined} left`}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${full ? 'bg-danger' : 'bg-primary'}`}
                  style={{
                    width: `${Math.min(100, (session.joined / session.capacity) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-serif text-base font-semibold text-foreground">
              <Users size={16} aria-hidden="true" />
              Members ({ROSTER.length})
            </h2>
            <ul className="flex flex-col gap-3">
              {ROSTER.map((m) => (
                <li key={m.name} className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                    {m.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      {m.name}
                      {m.verified && (
                        <BadgeCheck
                          size={14}
                          className="text-success"
                          aria-label="Verified"
                        />
                      )}
                    </p>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      m.role === 'Host'
                        ? 'bg-accent/25 text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {m.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right: live chat */}
        <section className="lg:col-span-3">
          <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-border bg-card lg:h-full lg:min-h-[600px]">
            <ChatBox />
          </div>
        </section>
      </div>
    </div>
  )
}
