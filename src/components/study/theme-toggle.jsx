import { Moon, Sun } from 'lucide-react'
import { useAccessibility } from '@/context/AccessibilityContext'

export default function ThemeToggle({ className = '' }) {
  const { darkMode, setDarkMode } = useAccessibility()

  return (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      aria-pressed={darkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${className}`}
    >
      {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
