import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '@/lib/auth'

export function RequireAuth({ children }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

export function RedirectIfAuthed({ children }) {
  if (isAuthenticated()) return <Navigate to="/" replace />
  return children
}
