import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  type LifeData,
  type MealName,
  emptyLife,
  formatDay,
  inLastDays,
  newId,
  parseLife,
  sortNewest,
  todayISO,
} from './store'

type Tab = 'weight' | 'sleep' | 'meals' | 'workouts'

const tabs: { id: Tab; label: string }[] = [
  { id: 'weight', label: 'Weight' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'meals', label: 'Meals' },
  { id: 'workouts', label: 'Workouts' },
]

const meals: MealName[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
const qualities = ['Restless', 'Light', 'Okay', 'Solid', 'Great']

const fieldClass =
  'w-full rounded-xl border border-fog bg-paper px-3 py-2.5 text-sm text-ink outline-none transition focus:border-orange'

function useLife() {
  const [data, setData] = useState<LifeData>(emptyLife)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch('/log/data')
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not load the log.')
        const parsed = parseLife(await response.json())
        if (!parsed) throw new Error('The saved log was not readable.')
        if (!cancelled) setData(parsed)
      })
      .catch((reason: unknown) => {
        if (!cancelled) setError(reason instanceof Error ? reason.message : 'Could not load the log.')
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function update(next: LifeData) {
    setData(next)
    setError('')
    const response = await fetch('/log/data', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(next),
    })
    if (!response.ok) setError('Could not save.')
  }

  return [data, update, ready, error] as const
}

export function LifeLog() {
  const [data, update, ready, error] = useLife()
  const [tab, setTab] = useState<Tab>('weight')
  const [message, setMessage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const latestWeight = sortNewest(data.weights)[0]
  const previousWeight = sortNewest(data.weights)[1]
  const weekSleep = data.sleeps.filter((entry) => inLastDays(entry.date, 7))
  const sleepAvg = weekSleep.length
    ? weekSleep.reduce((sum, entry) => sum + entry.hours, 0) / weekSleep.length
    : null
  const weekMeals = data.meals.filter((entry) => inLastDays(entry.date, 7))
  const weekWorkouts = data.workouts.filter((entry) => inLastDays(entry.date, 7))
  const weekMinutes = weekWorkouts.reduce((sum, entry) => sum + entry.minutes, 0)

  function exportLog() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `simon-life-log-${todayISO()}.json`
    link.click()
    URL.revokeObjectURL(url)
    setMessage('Backup downloaded.')
  }

  function importLog(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = parseLife(JSON.parse(String(reader.result)))
        if (!parsed) {
          setMessage('That file is not a life log backup.')
          return
        }
        update(parsed)
        setMessage('Backup restored.')
      } catch {
        setMessage('Could not read that file.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="pt-10 md:pt-14">
      <p className="text-sm font-medium tracking-[0.12em] text-ink-soft uppercase">
        — Life log
      </p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl tracking-tight text-ink md:text-5xl">
        Workouts, sleep, meals, and weight.
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
        Entries are saved to your private log. They are here on this phone and on your laptop after you sign in.
      </p>
      {!ready && <p className="mt-6 text-sm text-ink-soft">Loading your log.</p>}
      {error && <p className="mt-6 text-sm text-orange">{error}</p>}

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          label="Latest weight"
          value={latestWeight ? `${trimNum(latestWeight.pounds)} lb` : '—'}
          detail={weightDelta(latestWeight?.pounds, previousWeight?.pounds)}
        />
        <Stat
          label="Sleep, 7 days"
          value={sleepAvg === null ? '—' : `${trimNum(sleepAvg)} h`}
          detail={weekSleep.length ? `${weekSleep.length} nights` : 'No nights yet'}
        />
        <Stat
          label="Meals, 7 days"
          value={String(weekMeals.length)}
          detail={weekMeals.length ? 'logged' : 'None yet'}
        />
        <Stat
          label="Training, 7 days"
          value={weekWorkouts.length ? `${weekMinutes} min` : '—'}
          detail={weekWorkouts.length ? `${weekWorkouts.length} sessions` : 'No sessions yet'}
        />
      </div>

      {tab === 'weight' && data.weights.length > 1 && (
        <WeightChart entries={sortNewest(data.weights).slice(0, 14).reverse()} />
      )}

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === item.id
                ? 'bg-ink text-paper'
                : 'border border-fog bg-card text-ink hover:border-ink/20'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-fog bg-card shadow-[0_12px_40px_-24px_rgba(28,25,23,0.35)]">
        {tab === 'weight' && (
          <WeightPane
            data={data}
            onAdd={(entry) => update({ ...data, weights: [entry, ...data.weights] })}
            onRemove={(id) =>
              update({ ...data, weights: data.weights.filter((entry) => entry.id !== id) })
            }
          />
        )}
        {tab === 'sleep' && (
          <SleepPane
            data={data}
            onAdd={(entry) => update({ ...data, sleeps: [entry, ...data.sleeps] })}
            onRemove={(id) =>
              update({ ...data, sleeps: data.sleeps.filter((entry) => entry.id !== id) })
            }
          />
        )}
        {tab === 'meals' && (
          <MealsPane
            data={data}
            onAdd={(entry) => update({ ...data, meals: [entry, ...data.meals] })}
            onRemove={(id) =>
              update({ ...data, meals: data.meals.filter((entry) => entry.id !== id) })
            }
          />
        )}
        {tab === 'workouts' && (
          <WorkoutsPane
            data={data}
            onAdd={(entry) => update({ ...data, workouts: [entry, ...data.workouts] })}
            onRemove={(id) =>
              update({
                ...data,
                workouts: data.workouts.filter((entry) => entry.id !== id),
              })
            }
          />
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={exportLog}
          className="rounded-full border border-fog bg-card px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/20"
        >
          Download backup
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-full border border-fog bg-card px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/20"
        >
          Restore backup
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Clear every entry saved on this device?')) {
              update(emptyLife())
              setMessage('Log cleared.')
            }
          }}
          className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          Clear
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) importLog(file)
            event.target.value = ''
          }}
        />
        {message && <p className="text-sm text-ink-soft">{message}</p>}
      </div>
    </div>
  )
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-fog bg-card px-4 py-4">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{detail}</p>
    </div>
  )
}

function WeightChart({
  entries,
}: {
  entries: { date: string; pounds: number }[]
}) {
  const values = entries.map((entry) => entry.pounds)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const width = 320
  const height = 72
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width
      const y = height - ((value - min) / span) * (height - 8) - 4
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="mt-4 rounded-2xl border border-fog bg-card px-5 py-4">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold text-ink">Recent weight</p>
        <p className="text-xs text-ink-soft">
          {formatDay(entries[0].date)} – {formatDay(entries[entries.length - 1].date)}
        </p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-20 w-full" role="img" aria-label="Weight trend">
        <polyline
          fill="none"
          stroke="#ff4d1a"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
      </svg>
    </div>
  )
}

function WeightPane({
  data,
  onAdd,
  onRemove,
}: {
  data: LifeData
  onAdd: (entry: LifeData['weights'][number]) => void
  onRemove: (id: string) => void
}) {
  const [date, setDate] = useState(todayISO())
  const [pounds, setPounds] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = Number(pounds)
    if (!date || !Number.isFinite(value) || value <= 0 || value > 1000) {
      setError('Enter a weight in pounds.')
      return
    }
    onAdd({ id: newId(), date, pounds: value, note: note.trim(), createdAt: Date.now() })
    setPounds('')
    setNote('')
    setError('')
  }

  const rows = sortNewest(data.weights)

  return (
    <>
      <form onSubmit={submit} className="grid gap-3 border-b border-fog p-5 md:grid-cols-[10rem_8rem_1fr_auto] md:items-end md:p-7">
        <Label text="Date">
          <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </Label>
        <Label text="Pounds">
          <input className={fieldClass} inputMode="decimal" placeholder="172.4" value={pounds} onChange={(event) => setPounds(event.target.value)} />
        </Label>
        <Label text="Note">
          <input className={fieldClass} placeholder="Morning, fasted" value={note} onChange={(event) => setNote(event.target.value)} />
        </Label>
        <SaveButton />
        {error && <p className="text-sm text-orange md:col-span-4">{error}</p>}
      </form>
      <EntryList
        empty="No weigh-ins yet. Add today’s number and it stays on this device."
        rows={rows.map((entry) => ({
          id: entry.id,
          title: `${trimNum(entry.pounds)} lb`,
          meta: formatDay(entry.date),
          detail: entry.note,
        }))}
        onRemove={onRemove}
      />
    </>
  )
}

function SleepPane({
  data,
  onAdd,
  onRemove,
}: {
  data: LifeData
  onAdd: (entry: LifeData['sleeps'][number]) => void
  onRemove: (id: string) => void
}) {
  const [date, setDate] = useState(todayISO())
  const [hours, setHours] = useState('')
  const [quality, setQuality] = useState(4)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = Number(hours)
    if (!date || !Number.isFinite(value) || value <= 0 || value > 24) {
      setError('Enter hours slept, up to 24.')
      return
    }
    onAdd({ id: newId(), date, hours: value, quality, note: note.trim(), createdAt: Date.now() })
    setHours('')
    setNote('')
    setError('')
  }

  return (
    <>
      <form onSubmit={submit} className="grid gap-3 border-b border-fog p-5 md:p-7">
        <div className="grid gap-3 md:grid-cols-[10rem_8rem_1fr]">
          <Label text="Night of">
            <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </Label>
          <Label text="Hours">
            <input className={fieldClass} inputMode="decimal" placeholder="7.5" value={hours} onChange={(event) => setHours(event.target.value)} />
          </Label>
          <Label text="Note">
            <input className={fieldClass} placeholder="Woke once" value={note} onChange={(event) => setNote(event.target.value)} />
          </Label>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase">How it felt</p>
          <div className="flex flex-wrap gap-2">
            {qualities.map((label, index) => {
              const value = index + 1
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setQuality(value)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    quality === value ? 'bg-orange text-white' : 'border border-fog bg-paper text-ink'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
        <div>
          <SaveButton />
        </div>
        {error && <p className="text-sm text-orange">{error}</p>}
      </form>
      <EntryList
        empty="No sleep logged yet. A night’s hours and how it felt is enough."
        rows={sortNewest(data.sleeps).map((entry) => ({
          id: entry.id,
          title: `${trimNum(entry.hours)} h`,
          meta: `${formatDay(entry.date)} · ${qualities[entry.quality - 1] ?? 'Logged'}`,
          detail: entry.note,
        }))}
        onRemove={onRemove}
      />
    </>
  )
}

function MealsPane({
  data,
  onAdd,
  onRemove,
}: {
  data: LifeData
  onAdd: (entry: LifeData['meals'][number]) => void
  onRemove: (id: string) => void
}) {
  const [date, setDate] = useState(todayISO())
  const [meal, setMeal] = useState<MealName>('Lunch')
  const [description, setDescription] = useState('')
  const [calories, setCalories] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const text = description.trim()
    if (!date || !text) {
      setError('Write what you ate.')
      return
    }
    const kcal = calories.trim() === '' ? null : Number(calories)
    if (kcal !== null && (!Number.isFinite(kcal) || kcal < 0 || kcal > 10000)) {
      setError('Calories should be a number, or left blank.')
      return
    }
    onAdd({
      id: newId(),
      date,
      meal,
      description: text,
      calories: kcal,
      createdAt: Date.now(),
    })
    setDescription('')
    setCalories('')
    setError('')
  }

  return (
    <>
      <form onSubmit={submit} className="grid gap-3 border-b border-fog p-5 md:p-7">
        <div className="flex flex-wrap gap-2">
          {meals.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setMeal(name)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                meal === name ? 'bg-orange text-white' : 'border border-fog bg-paper text-ink'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-[10rem_1fr_8rem_auto] md:items-end">
          <Label text="Date">
            <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </Label>
          <Label text="What you ate">
            <input className={fieldClass} placeholder="Salmon, rice, greens" value={description} onChange={(event) => setDescription(event.target.value)} />
          </Label>
          <Label text="Calories">
            <input className={fieldClass} inputMode="numeric" placeholder="Optional" value={calories} onChange={(event) => setCalories(event.target.value)} />
          </Label>
          <SaveButton />
        </div>
        {error && <p className="text-sm text-orange">{error}</p>}
      </form>
      <EntryList
        empty="No meals yet. Log one plate and it stays in the list."
        rows={sortNewest(data.meals).map((entry) => ({
          id: entry.id,
          title: entry.description,
          meta: `${formatDay(entry.date)} · ${entry.meal}${entry.calories !== null ? ` · ${Math.round(entry.calories)} kcal` : ''}`,
          detail: '',
        }))}
        onRemove={onRemove}
      />
    </>
  )
}

function WorkoutsPane({
  data,
  onAdd,
  onRemove,
}: {
  data: LifeData
  onAdd: (entry: LifeData['workouts'][number]) => void
  onRemove: (id: string) => void
}) {
  const [date, setDate] = useState(todayISO())
  const [activity, setActivity] = useState('')
  const [minutes, setMinutes] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    const name = activity.trim()
    const value = Number(minutes)
    if (!date || !name) {
      setError('Name the session.')
      return
    }
    if (!Number.isFinite(value) || value <= 0 || value > 600) {
      setError('Enter how many minutes you trained.')
      return
    }
    onAdd({ id: newId(), date, activity: name, minutes: value, note: note.trim(), createdAt: Date.now() })
    setActivity('')
    setMinutes('')
    setNote('')
    setError('')
  }

  return (
    <>
      <form onSubmit={submit} className="grid gap-3 border-b border-fog p-5 md:grid-cols-[10rem_1fr_7rem_1fr_auto] md:items-end md:p-7">
        <Label text="Date">
          <input className={fieldClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
        </Label>
        <Label text="Session">
          <input className={fieldClass} placeholder="Upper body, easy run" value={activity} onChange={(event) => setActivity(event.target.value)} />
        </Label>
        <Label text="Minutes">
          <input className={fieldClass} inputMode="numeric" placeholder="45" value={minutes} onChange={(event) => setMinutes(event.target.value)} />
        </Label>
        <Label text="Note">
          <input className={fieldClass} placeholder="Felt strong" value={note} onChange={(event) => setNote(event.target.value)} />
        </Label>
        <SaveButton />
        {error && <p className="text-sm text-orange md:col-span-5">{error}</p>}
      </form>
      <EntryList
        empty="No workouts yet. Add a session and the minutes add up for the week."
        rows={sortNewest(data.workouts).map((entry) => ({
          id: entry.id,
          title: entry.activity,
          meta: `${formatDay(entry.date)} · ${Math.round(entry.minutes)} min`,
          detail: entry.note,
        }))}
        onRemove={onRemove}
      />
    </>
  )
}

function Label({ text, children }: { text: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase">
        {text}
      </span>
      {children}
    </label>
  )
}

function SaveButton() {
  return (
    <button
      type="submit"
      className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-deep"
    >
      Save
    </button>
  )
}

function EntryList({
  rows,
  empty,
  onRemove,
}: {
  rows: { id: string; title: string; meta: string; detail: string }[]
  empty: string
  onRemove: (id: string) => void
}) {
  if (rows.length === 0) {
    return <p className="px-5 py-10 text-sm leading-relaxed text-ink-soft md:px-7">{empty}</p>
  }

  return (
    <ul className="divide-y divide-fog">
      {rows.map((row) => (
        <li key={row.id} className="flex items-start justify-between gap-4 px-5 py-4 md:px-7">
          <div className="min-w-0">
            <p className="text-base font-semibold text-ink">{row.title}</p>
            <p className="mt-1 text-sm text-ink-soft">{row.meta}</p>
            {row.detail && <p className="mt-1 text-sm text-ink-soft">{row.detail}</p>}
          </div>
          <button
            type="button"
            onClick={() => onRemove(row.id)}
            className="shrink-0 text-sm font-medium text-ink-soft transition hover:text-orange"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

function trimNum(value: number) {
  return Number(value.toFixed(1)).toString()
}

function weightDelta(latest?: number, previous?: number) {
  if (latest === undefined) return 'No weigh-in yet'
  if (previous === undefined) return 'First weigh-in'
  const delta = latest - previous
  if (Math.abs(delta) < 0.05) return 'Same as last entry'
  const direction = delta < 0 ? 'down' : 'up'
  return `${direction} ${trimNum(Math.abs(delta))} lb from last`
}
