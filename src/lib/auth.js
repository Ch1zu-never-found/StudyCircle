const KEY = 'studycircle.authed'

export function isAuthenticated() {
  try {
    return localStorage.getItem(KEY) === 'true'
  } catch {
    return false
  }
}

export function signIn() {
  try {
    localStorage.setItem(KEY, 'true')
  } catch {
    // storage unavailable (private mode) — session lives in memory only
  }
}

export function signOut() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
