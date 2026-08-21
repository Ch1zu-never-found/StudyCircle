import { useState } from 'react'
import {
  GraduationCap,
  LayoutGrid,
  PlusCircle,
  UserRound,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import VerificationBadge from './verification-badge'
import ThemeToggle from './theme-toggle'

const NAV_ITEMS = [
  { key: 'sessions', label: 'Sessions', Icon: LayoutGrid },
  { key: 'create', label: 'Create Session', Icon: PlusCircle },
  { key: 'profile', label: 'Profile', Icon: UserRound },
]

function NavLinks({ view, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {NAV_ITEMS.map(({ key, label, Icon }) => {
        const active = view === key || (key === 'sessions' && view === 'details')
        return (
          <button
            key={key}
            type="button"
            onClick={() => onNavigate(key)}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </nav>
  )
}

function Brand({ onHome }) {
  return (
    <button
      type="button"
      onClick={onHome}
      aria-label="StudyCircle — back to dashboard"
      className="flex items-center gap-2.5 rounded-lg text-left transition-opacity hover:opacity-80"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GraduationCap size={20} aria-hidden="true" />
      </span>
      <span className="font-serif text-lg font-semibold leading-none text-sidebar-foreground">
        StudyCircle
      </span>
    </button>
  )
}

function UserCard({ user, onLogout }) {
  return (
    <div className="rounded-xl bg-sidebar-accent/60 p-3">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
          {user.avatarInitials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-sidebar-foreground">
            {user.name}
          </p>
          <p className="truncate text-xs text-sidebar-foreground/70">
            {user.major}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <VerificationBadge status={user.verification} />
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut size={14} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function Navigation({ view, onNavigate, user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigate = (key) => {
    onNavigate(key)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col gap-6 bg-sidebar p-4 md:flex">
        <div className="flex items-center justify-between px-1 pt-2">
          <Brand onHome={() => handleNavigate('sessions')} />
          <ThemeToggle className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
        </div>
        <div className="flex-1">
          <NavLinks view={view} onNavigate={handleNavigate} />
        </div>
        <UserCard user={user} onLogout={onLogout} />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-sidebar px-4 py-3 md:hidden">
        <Brand onHome={() => handleNavigate('sessions')} />
        <div className="flex items-center gap-1">
          <ThemeToggle className="text-sidebar-foreground hover:bg-sidebar-accent" />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="flex size-9 items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sticky top-[57px] z-20 flex flex-col gap-4 bg-sidebar px-4 pb-4 md:hidden">
          <NavLinks view={view} onNavigate={handleNavigate} />
          <UserCard user={user} onLogout={onLogout} />
        </div>
      )}
    </>
  )
}
