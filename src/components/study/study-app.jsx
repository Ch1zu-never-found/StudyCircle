import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from './navigation'
import ProfileView from './profile-view'
import SessionsDashboard from './sessions-dashboard'
import SessionDetails from './session-details'
import CreateSession from './create-session'
import { currentUser, SESSIONS } from '../../lib/mock-data'
import { signOut } from '@/lib/auth'

export default function StudyApp() {
  const navigate = useNavigate()
  const [user, setUser] = useState(currentUser)
  const [view, setView] = useState('sessions')
  const [sessions, setSessions] = useState(SESSIONS)
  const [joinStates, setJoinStates] = useState({})
  const [selectedId, setSelectedId] = useState(null)

  // ---- Handlers ----
  const handleJoin = (id) => {
    setJoinStates((prev) => ({ ...prev, [id]: 'requested' }))
  }

  const openSession = (id) => {
    setSelectedId(id)
    setView('details')
  }

  const handleCreate = (session) => {
    setSessions((prev) => [session, ...prev])
    setJoinStates((prev) => ({ ...prev, [session.id]: 'joined' }))
    setView('sessions')
  }

  const handleLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  const selectedSession = sessions.find((s) => s.id === selectedId)

  // ---- Views ----
  const renderView = () => {
    switch (view) {
      case 'profile':
        return (
          <ProfileView
            user={user}
            onVerified={() => setUser((u) => ({ ...u, verification: 'verified' }))}
          />
        )
      case 'create':
        return (
          <CreateSession
            onCreate={handleCreate}
            onCancel={() => setView('sessions')}
          />
        )
      case 'details':
        return (
          <SessionDetails
            session={selectedSession}
            onBack={() => setView('sessions')}
          />
        )
      case 'sessions':
      default:
        return (
          <SessionsDashboard
            sessions={sessions}
            joinStates={joinStates}
            onJoin={handleJoin}
            onOpen={openSession}
            onCreate={() => setView('create')}
          />
        )
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-background md:flex-row">
      <Navigation
        view={view}
        onNavigate={setView}
        user={user}
        onLogout={handleLogout}
      />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {renderView()}
      </main>
    </div>
  )
}
