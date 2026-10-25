const emptyLog = {
  version: 1,
  weights: [],
  sleeps: [],
  meals: [],
  workouts: [],
}

const createTable = `CREATE TABLE IF NOT EXISTS life_log (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL
)`

const upsert = `INSERT INTO life_log (id, payload, updated_at)
  VALUES (1, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    payload = excluded.payload,
    updated_at = excluded.updated_at`

async function ensureTable(db) {
  await db.prepare(createTable).run()
}

export async function onRequestGet(context) {
  const db = context.env.LIFE_DB
  await ensureTable(db)
  const row = await db.prepare('SELECT payload FROM life_log WHERE id = 1').first()
  if (!row?.payload) return Response.json(emptyLog)
  return Response.json(JSON.parse(row.payload))
}

export async function onRequestPut(context) {
  const db = context.env.LIFE_DB
  const payload = await context.request.json()
  if (!payload || payload.version !== 1) {
    return Response.json({ error: 'Expected a version 1 life log.' }, { status: 400 })
  }
  await ensureTable(db)
  await db
    .prepare(upsert)
    .bind(JSON.stringify(payload), new Date().toISOString())
    .run()
  return Response.json({ ok: true })
}
