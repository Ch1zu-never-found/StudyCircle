
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Field, { controlClass } from './field'
import { SUBJECTS, LEVELS, MODES } from '@/lib/mock-data'

const TIME_WINDOW_FROM_HOUR = (hour) => {
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

const EMPTY = {
  subject: '',
  topic: '',
  level: '',
  startTime: '',
  capacity: '',
  mode: '',
  description: '',
}

export default function CreateSession({ onCreate, onCancel }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.subject) next.subject = 'Select a subject.'
    if (values.topic.trim().length < 3) next.topic = 'Give your session a clear topic.'
    if (!values.level) next.level = 'Choose a difficulty level.'
    if (!values.startTime) next.startTime = 'Pick a start time.'
    const cap = Number(values.capacity)
    if (!cap || cap < 2 || cap > 50) next.capacity = 'Capacity must be between 2 and 50.'
    if (!values.mode) next.mode = 'Select a mode.'
    if (values.description.trim().length < 10) {
      next.description = 'Add a short description (at least 10 characters).'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const hour = new Date(values.startTime).getHours()
    onCreate({
      id: `ses-${Date.now()}`,
      subject: values.subject,
      topic: values.topic.trim(),
      level: values.level,
      mode: values.mode,
      startTime: values.startTime,
      timeWindow: TIME_WINDOW_FROM_HOUR(hour),
      capacity: Number(values.capacity),
      joined: 1,
      host: { name: 'Ava Chen', initials: 'AC', verified: true },
      description: values.description.trim(),
    })
  }

  const selectClass = (err) =>
    `${controlClass(err)} appearance-none`

  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={onCancel}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to sessions
      </button>

      <header className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          Create a study session
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Set the details and invite verified students to join.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Subject" htmlFor="cs-subject" error={errors.subject} required>
            <select
              id="cs-subject"
              value={values.subject}
              onChange={setField('subject')}
              className={selectClass(errors.subject)}
            >
              <option value="">Select subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Difficulty" htmlFor="cs-level" error={errors.level} required>
            <select
              id="cs-level"
              value={values.level}
              onChange={setField('level')}
              className={selectClass(errors.level)}
            >
              <option value="">Select level</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Topic" htmlFor="cs-topic" error={errors.topic} required>
            <input
              id="cs-topic"
              type="text"
              value={values.topic}
              onChange={setField('topic')}
              placeholder="e.g. Dynamic Programming Patterns"
              className={controlClass(errors.topic)}
            />
          </Field>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Start time" htmlFor="cs-time" error={errors.startTime} required>
            <input
              id="cs-time"
              type="datetime-local"
              value={values.startTime}
              onChange={setField('startTime')}
              className={controlClass(errors.startTime)}
            />
          </Field>

          <Field
            label="Capacity"
            htmlFor="cs-capacity"
            error={errors.capacity}
            hint="Between 2 and 50 students."
            required
          >
            <input
              id="cs-capacity"
              type="number"
              min="2"
              max="50"
              value={values.capacity}
              onChange={setField('capacity')}
              placeholder="8"
              className={controlClass(errors.capacity)}
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Mode" htmlFor="cs-mode" error={errors.mode} required>
            <select
              id="cs-mode"
              value={values.mode}
              onChange={setField('mode')}
              className={selectClass(errors.mode)}
            >
              <option value="">Select mode</option>
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-5">
          <Field
            label="Description"
            htmlFor="cs-desc"
            error={errors.description}
            required
          >
            <textarea
              id="cs-desc"
              rows={4}
              value={values.description}
              onChange={setField('description')}
              placeholder="What will you cover? What should members bring or prepare?"
              className={`${controlClass(errors.description)} resize-y`}
            />
          </Field>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Publish session
          </button>
        </div>
      </form>
    </div>
  )
}
