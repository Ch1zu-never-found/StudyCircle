import { useEffect, useRef, useState } from 'react'
import {
  UploadCloud,
  FileImage,
  ScanLine,
  CheckCircle2,
  Loader2,
  RotateCcw,
} from 'lucide-react'

// Stages: idle -> uploading -> scanning -> review -> submitted
export default function IdUpload({ onVerified }) {
  const [stage, setStage] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState('')
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  const runProgress = (onDone) => {
    setProgress(0)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timerRef.current)
          onDone()
          return 100
        }
        return p + 8
      })
    }, 120)
  }

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)

    setStage('uploading')
    runProgress(() => {
      setStage('scanning')
      runProgress(() => setStage('review'))
    })
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const reset = () => {
    clearInterval(timerRef.current)
    setStage('idle')
    setProgress(0)
    setPreview(null)
    setFileName('')
  }

  const submit = () => {
    setStage('submitted')
    if (onVerified) onVerified()
  }

  const busy = stage === 'uploading' || stage === 'scanning'

  return (
    <div className="flex flex-col gap-4">
      {stage === 'idle' && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragging
              ? 'border-primary bg-primary/5'
              : 'border-border bg-muted/40 hover:border-primary/50 hover:bg-muted/70'
          }`}
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UploadCloud size={24} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              Drag &amp; drop your Student ID here
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              or click to browse — PNG or JPG, up to 10MB
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      )}

      {stage !== 'idle' && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-start gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview || '/placeholder.svg'}
                  alt="Student ID preview"
                  className="size-full object-cover"
                />
              ) : (
                <FileImage size={22} className="text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {fileName || 'student-id.png'}
              </p>

              {busy && (
                <div className="mt-2">
                  <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    {stage === 'uploading' ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        Uploading image…
                      </>
                    ) : (
                      <>
                        <ScanLine size={13} className="animate-pulse text-primary" />
                        Running OCR — reading ID fields…
                      </>
                    )}
                    <span className="ml-auto tabular-nums">{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-150 ${
                        stage === 'scanning' ? 'bg-accent' : 'bg-primary'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {stage === 'review' && (
                <div className="mt-2">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                    <CheckCircle2 size={14} />
                    OCR complete — fields extracted
                  </p>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Name</dt>
                      <dd className="font-medium text-foreground">Ava Chen</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Student ID</dt>
                      <dd className="font-medium text-foreground">RSU-2029-44817</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">University</dt>
                      <dd className="font-medium text-foreground">Redwood State</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Valid thru</dt>
                      <dd className="font-medium text-foreground">05 / 2029</dd>
                    </div>
                  </dl>
                </div>
              )}

              {stage === 'submitted' && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-success">
                  <CheckCircle2 size={14} />
                  Submitted — your ID was matched and verified.
                </p>
              )}
            </div>
          </div>

          {(stage === 'review' || stage === 'submitted') && (
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                <RotateCcw size={13} />
                Replace
              </button>
              {stage === 'review' && (
                <button
                  type="button"
                  onClick={submit}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Submit for verification
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
