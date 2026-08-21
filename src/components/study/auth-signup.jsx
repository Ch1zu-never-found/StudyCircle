

import { useState } from 'react'
import { Check } from 'lucide-react'
import AuthShell from './auth-shell'
import Field, { controlClass } from './field'

export default function AuthSignup({ onAuth, onSwitch }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    university: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [agree, setAgree] = useState(false)

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (values.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid university email address.'
    }
    if (values.university.trim().length < 2) {
      next.university = 'Enter your university name.'
    }
    if (values.password.length < 8) {
      next.password = 'Use at least 8 characters for security.'
    }
    if (!agree) next.agree = 'You must accept the verification policy.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onAuth()
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join with your university email to get verified."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Field label="Full name" htmlFor="su-name" error={errors.name}>
          <input
            id="su-name"
            type="text"
            value={values.name}
            onChange={setField('name')}
            placeholder="Ava Chen"
            className={controlClass(errors.name)}
          />
        </Field>

        <Field label="University email" htmlFor="su-email" error={errors.email}>
          <input
            id="su-email"
            type="email"
            value={values.email}
            onChange={setField('email')}
            placeholder="you@university.edu"
            className={controlClass(errors.email)}
          />
        </Field>

        <Field label="University" htmlFor="su-uni" error={errors.university}>
          <input
            id="su-uni"
            type="text"
            value={values.university}
            onChange={setField('university')}
            placeholder="Redwood State University"
            className={controlClass(errors.university)}
          />
        </Field>

        <Field
          label="Password"
          htmlFor="su-password"
          error={errors.password}
          hint="At least 8 characters."
        >
          <input
            id="su-password"
            type="password"
            value={values.password}
            onChange={setField('password')}
            placeholder="Create a password"
            className={controlClass(errors.password)}
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => {
              setAgree((v) => !v)
              setErrors((prev) => ({ ...prev, agree: undefined }))
            }}
            className="flex items-start gap-2.5 text-left"
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                agree
                  ? 'border-primary bg-primary text-primary-foreground'
                  : errors.agree
                    ? 'border-danger'
                    : 'border-input'
              }`}
            >
              {agree && <Check size={14} aria-hidden="true" />}
            </span>
            <span className="text-sm text-muted-foreground">
              I agree to verify my student status by uploading a valid student ID.
            </span>
          </button>
          {errors.agree && (
            <p className="text-xs font-medium text-danger">{errors.agree}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Create account
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </button>
      </p>
    </AuthShell>
  )
}
