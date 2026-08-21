import { Mail, Building2, BookOpen, CalendarDays, IdCard } from 'lucide-react'
import VerificationBadge from './verification-badge'
import IdUpload from './id-upload'

const STATUS_COPY = {
  pending: {
    title: 'Verification in review',
    body: 'Upload a clear photo of your student ID to confirm your enrollment. Verified students get a trust badge and can host sessions.',
  },
  verified: {
    title: 'You are verified',
    body: 'Your student status is confirmed. You can host sessions and send join requests without limits.',
  },
  rejected: {
    title: 'Verification rejected',
    body: 'We could not read your last upload. Please re-upload a clearer, well-lit photo of your student ID.',
  },
}

function DetailRow({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon size={17} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default function ProfileView({ user, onVerified }) {
  const copy = STATUS_COPY[user.verification] || STATUS_COPY.pending

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          Profile &amp; Verification
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and confirm your student status.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: profile details */}
        <section className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col items-center text-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
                {user.avatarInitials}
              </span>
              <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
                {user.name}
              </h2>
              <p className="text-sm text-muted-foreground">{user.year} · {user.major}</p>
              <div className="mt-3">
                <VerificationBadge status={user.verification} size="lg" />
              </div>
            </div>

            <div className="mt-4 divide-y divide-border border-t border-border">
              <DetailRow Icon={Mail} label="Email" value={user.email} />
              <DetailRow Icon={Building2} label="University" value={user.university} />
              <DetailRow Icon={BookOpen} label="Major" value={user.major} />
              <DetailRow Icon={CalendarDays} label="Year" value={user.year} />
              <DetailRow Icon={IdCard} label="Student ID" value={user.studentId} />
            </div>
          </div>
        </section>

        {/* Right: verification + upload */}
        <section className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  {copy.title}
                </h2>
                <p className="mt-1 max-w-md text-sm text-muted-foreground text-pretty">
                  {copy.body}
                </p>
              </div>
              <VerificationBadge status={user.verification} size="lg" />
            </div>

            <div className="mt-5">
              <IdUpload onVerified={onVerified} />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Your ID is used only to confirm enrollment and is never shared with
              other students.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
