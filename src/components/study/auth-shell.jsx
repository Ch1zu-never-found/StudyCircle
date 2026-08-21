import { GraduationCap } from 'lucide-react'
import ThemeToggle from './theme-toggle'

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center bg-background px-4 py-10">
      <div className="absolute right-4 top-4">
        <ThemeToggle className="border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground" />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap size={26} aria-hidden="true" />
          </span>
          <h1 className="font-serif text-2xl font-semibold text-foreground text-balance">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
            {subtitle}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>
    </main>
  )
}
