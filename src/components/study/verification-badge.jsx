import { BadgeCheck, Clock, XCircle } from 'lucide-react'

const CONFIG = {
  verified: {
    label: 'Verified',
    Icon: BadgeCheck,
    className: 'bg-success/12 text-success border-success/25',
  },
  pending: {
    label: 'Pending',
    Icon: Clock,
    className: 'bg-warning/15 text-warning-foreground border-warning/35',
  },
  rejected: {
    label: 'Rejected',
    Icon: XCircle,
    className: 'bg-danger/12 text-danger border-danger/25',
  },
}

export default function VerificationBadge({ status = 'pending', size = 'sm' }) {
  const { label, Icon, className } = CONFIG[status] || CONFIG.pending
  const sizing =
    size === 'lg'
      ? 'text-sm px-3 py-1.5 gap-2'
      : 'text-xs px-2.5 py-1 gap-1.5'
  const iconSize = size === 'lg' ? 16 : 13

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${sizing} ${className}`}
    >
      <Icon size={iconSize} aria-hidden="true" />
      {label}
    </span>
  )
}
