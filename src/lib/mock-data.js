// Static seed data used across the StudyCircle views.
// Everything here is client-side mock data for the frontend prototype.
export const SUBJECTS = [
  'Mathematics',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Psychology',
  'History',
]

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export const MODES = ['In-person', 'Online', 'Hybrid']

export const TIME_WINDOWS = [
  { value: 'any', label: 'Any time' },
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
]

export const currentUser = {
  name: 'Ava Chen',
  email: 'ava.chen@university.edu',
  university: 'Redwood State University',
  major: 'Computer Science',
  year: 'Junior',
  studentId: 'RSU-2029-44817',
  verification: 'pending', // 'pending' | 'verified' | 'rejected'
  avatarInitials: 'AC',
}

export const SESSIONS = [
  {
    id: 'ses-1',
    subject: 'Computer Science',
    topic: 'Dynamic Programming Patterns',
    level: 'Advanced',
    mode: 'Online',
    startTime: '2026-08-24T18:00:00',
    timeWindow: 'evening',
    capacity: 8,
    joined: 5,
    host: { name: 'Marcus Lee', initials: 'ML', verified: true },
    description:
      'Working through classic DP problems — knapsack, LCS, and interval scheduling. Bring a problem you are stuck on.',
  },
  {
    id: 'ses-2',
    subject: 'Mathematics',
    topic: 'Multivariable Calculus Review',
    level: 'Intermediate',
    mode: 'In-person',
    startTime: '2026-08-24T10:30:00',
    timeWindow: 'morning',
    capacity: 6,
    joined: 6,
    host: { name: 'Priya Nair', initials: 'PN', verified: true },
    description:
      'Midterm prep covering gradients, divergence, and Lagrange multipliers. Library room 214.',
  },
  {
    id: 'ses-3',
    subject: 'Physics',
    topic: 'Quantum Mechanics — Intro',
    level: 'Beginner',
    mode: 'Hybrid',
    startTime: '2026-08-25T14:00:00',
    timeWindow: 'afternoon',
    capacity: 10,
    joined: 3,
    host: { name: 'Diego Ramos', initials: 'DR', verified: true },
    description:
      'Gentle walkthrough of wavefunctions and the Schrodinger equation. No prior QM needed.',
  },
  {
    id: 'ses-4',
    subject: 'Chemistry',
    topic: 'Organic Reaction Mechanisms',
    level: 'Advanced',
    mode: 'In-person',
    startTime: '2026-08-26T16:30:00',
    timeWindow: 'afternoon',
    capacity: 5,
    joined: 2,
    host: { name: 'Sara Kim', initials: 'SK', verified: false },
    description:
      'Mapping out SN1/SN2 and E1/E2 pathways with practice problems from chapter 7.',
  },
  {
    id: 'ses-5',
    subject: 'Economics',
    topic: 'Game Theory Study Jam',
    level: 'Intermediate',
    mode: 'Online',
    startTime: '2026-08-24T20:00:00',
    timeWindow: 'evening',
    capacity: 12,
    joined: 9,
    host: { name: 'Tomer Aviv', initials: 'TA', verified: true },
    description:
      'Nash equilibria, dominant strategies, and a few problem sets. Casual and collaborative.',
  },
  {
    id: 'ses-6',
    subject: 'Biology',
    topic: 'Genetics & Punnett Squares',
    level: 'Beginner',
    mode: 'In-person',
    startTime: '2026-08-25T09:00:00',
    timeWindow: 'morning',
    capacity: 8,
    joined: 4,
    host: { name: 'Nina Alvarez', initials: 'NA', verified: true },
    description:
      'Foundations of Mendelian inheritance with worked examples. Great for first-years.',
  },
]

export const ROSTER = [
  { name: 'Marcus Lee', initials: 'ML', role: 'Host', verified: true },
  { name: 'Ava Chen', initials: 'AC', role: 'Member', verified: true },
  { name: 'Jordan Blake', initials: 'JB', role: 'Member', verified: true },
  { name: 'Yuki Tanaka', initials: 'YT', role: 'Member', verified: false },
  { name: 'Omar Farouk', initials: 'OF', role: 'Member', verified: true },
]

export const INITIAL_MESSAGES = [
  {
    id: 'm1',
    author: 'Marcus Lee',
    initials: 'ML',
    self: false,
    time: '5:58 PM',
    text: 'Hey everyone! We will start with the knapsack problem in a couple minutes.',
  },
  {
    id: 'm2',
    author: 'Jordan Blake',
    initials: 'JB',
    self: false,
    time: '5:59 PM',
    text: 'Perfect, I have been stuck on the bounded version all week.',
  },
  {
    id: 'm3',
    author: 'Ava Chen',
    initials: 'AC',
    self: true,
    time: '6:00 PM',
    text: 'Same here. Should we screen-share the recurrence relation first?',
  },
  {
    id: 'm4',
    author: 'Marcus Lee',
    initials: 'ML',
    self: false,
    time: '6:01 PM',
    text: 'Good call. I will drop the base cases in the whiteboard link.',
  },
]

export function formatSessionTime(iso) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
