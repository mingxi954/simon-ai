export type WeightEntry = {
  id: string
  date: string
  pounds: number
  note: string
  createdAt: number
}

export type SleepEntry = {
  id: string
  date: string
  hours: number
  quality: number
  note: string
  createdAt: number
}

export type MealName = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'

export type MealEntry = {
  id: string
  date: string
  meal: MealName
  description: string
  calories: number | null
  createdAt: number
}

export type WorkoutEntry = {
  id: string
  date: string
  activity: string
  minutes: number
  note: string
  createdAt: number
}

export type LifeData = {
  version: 1
  weights: WeightEntry[]
  sleeps: SleepEntry[]
  meals: MealEntry[]
  workouts: WorkoutEntry[]
}

const KEY = 'simon-life-log-v1'

export const emptyLife = (): LifeData => ({
  version: 1,
  weights: [],
  sleeps: [],
  meals: [],
  workouts: [],
})

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function parseLife(raw: unknown): LifeData | null {
  if (!isRecord(raw) || raw.version !== 1) return null
  const weights = Array.isArray(raw.weights) ? raw.weights.filter(isWeight) : null
  const sleeps = Array.isArray(raw.sleeps) ? raw.sleeps.filter(isSleep) : null
  const meals = Array.isArray(raw.meals) ? raw.meals.filter(isMeal) : null
  const workouts = Array.isArray(raw.workouts) ? raw.workouts.filter(isWorkout) : null
  if (!weights || !sleeps || !meals || !workouts) return null
  return { version: 1, weights, sleeps, meals, workouts }
}

function isWeight(value: unknown): value is WeightEntry {
  if (!isRecord(value)) return false
  return (
    typeof value.id === 'string' &&
    typeof value.date === 'string' &&
    typeof value.pounds === 'number' &&
    typeof value.note === 'string' &&
    typeof value.createdAt === 'number'
  )
}

function isSleep(value: unknown): value is SleepEntry {
  if (!isRecord(value)) return false
  return (
    typeof value.id === 'string' &&
    typeof value.date === 'string' &&
    typeof value.hours === 'number' &&
    typeof value.quality === 'number' &&
    typeof value.note === 'string' &&
    typeof value.createdAt === 'number'
  )
}

function isMeal(value: unknown): value is MealEntry {
  if (!isRecord(value)) return false
  return (
    typeof value.id === 'string' &&
    typeof value.date === 'string' &&
    (value.meal === 'Breakfast' ||
      value.meal === 'Lunch' ||
      value.meal === 'Dinner' ||
      value.meal === 'Snack') &&
    typeof value.description === 'string' &&
    (value.calories === null || typeof value.calories === 'number') &&
    typeof value.createdAt === 'number'
  )
}

function isWorkout(value: unknown): value is WorkoutEntry {
  if (!isRecord(value)) return false
  return (
    typeof value.id === 'string' &&
    typeof value.date === 'string' &&
    typeof value.activity === 'string' &&
    typeof value.minutes === 'number' &&
    typeof value.note === 'string' &&
    typeof value.createdAt === 'number'
  )
}

export function loadLife(): LifeData {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyLife()
    return parseLife(JSON.parse(raw)) ?? emptyLife()
  } catch {
    return emptyLife()
  }
}

export function saveLife(data: LifeData) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export function formatDay(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day) return iso
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function daysAgoISO(days: number) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function inLastDays(iso: string, days: number) {
  return iso >= daysAgoISO(days - 1) && iso <= todayISO()
}

export function sortNewest<T extends { date: string; createdAt: number }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)
}

export function newId() {
  return crypto.randomUUID()
}
