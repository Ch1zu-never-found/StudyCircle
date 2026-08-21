import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import AuthShell from './auth-shell'
import Field, { controlClass } from './field'

export default function AuthLogin({ onAuth, onSwitch }) {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid university email address.'
    }
    if (values.password.length < 6) {
      next.password = 'Password must be at least 6 characters.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onAuth()
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to find and join verified study groups."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field label="University email" htmlFor="login-email" error={errors.email}>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={setField('email')}
            placeholder="you@university.edu"
            className={controlClass(errors.email)}
          />
        </Field>

        <Field label="Password" htmlFor="login-password" error={errors.password}>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={values.password}
              onChange={setField('password')}
              placeholder="Enter your password"
              className={`${controlClass(errors.password)} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        New to StudyCircle?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </button>
      </p>
    </AuthShell>
  )
}
