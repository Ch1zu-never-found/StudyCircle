import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { INITIAL_MESSAGES } from '@/lib/mock-data'

const AUTO_REPLIES = [
  'Great point — let me pull that up.',
  'Agreed, we can start there.',
  'Nice, sharing the notes now.',
  'Sounds good to me!',
]

function nowLabel() {
  return new Date().toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function ChatBox() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const mine = {
      id: `m-${Date.now()}`,
      author: 'Ava Chen',
      initials: 'AC',
      self: true,
      time: nowLabel(),
      text,
    }
    setMessages((prev) => [...prev, mine])
    setDraft('')

    // Simulate a teammate replying.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}-r`,
          author: 'Marcus Lee',
          initials: 'ML',
          self: false,
          time: nowLabel(),
          text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        },
      ])
    }, 1100)
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || e.shiftKey) return
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    e.preventDefault()
    send()
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-serif text-base font-semibold text-foreground">
          Session chat
        </h2>
        <p className="text-xs text-muted-foreground">
          Messages are visible to all members
        </p>
      </div>

      {/* Message history */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-5 py-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-end gap-2.5 ${m.self ? 'flex-row-reverse' : ''}`}
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                m.self
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {m.initials}
            </span>
            <div className={`max-w-[78%] ${m.self ? 'text-right' : ''}`}>
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                {!m.self && <span className="font-medium text-foreground">{m.author}</span>}
                <span>{m.time}</span>
              </div>
              <div
                className={`inline-block rounded-2xl px-3.5 py-2 text-sm ${
                  m.self
                    ? 'rounded-br-sm bg-primary text-primary-foreground'
                    : 'rounded-bl-sm bg-muted text-foreground'
                }`}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="border-t border-border p-3">
        <div className="flex items-end gap-2">
          <label htmlFor="chat-input" className="sr-only">
            Type a message
          </label>
          <textarea
            id="chat-input"
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim()}
            aria-label="Send message"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
