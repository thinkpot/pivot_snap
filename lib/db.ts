import { Pool } from 'pg'

// Reused across warm serverless invocations so we don't open a new
// connection pool on every request.
declare global {
  // eslint-disable-next-line no-var
  var _signupsPool: Pool | undefined
}

function getPool() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) return null
  if (!global._signupsPool) {
    global._signupsPool = new Pool({ connectionString, max: 1 })
  }
  return global._signupsPool
}

let ensured: Promise<unknown> | null = null

function ensureSignupsTable(pool: Pool) {
  if (!ensured) {
    ensured = pool.query(`
      CREATE TABLE IF NOT EXISTS signups (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        source TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)
  }
  return ensured
}

export async function saveSignup(email: string, source?: string) {
  const pool = getPool()
  if (!pool) return
  await ensureSignupsTable(pool)
  await pool.query(
    `INSERT INTO signups (email, source) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET source = EXCLUDED.source`,
    [email, source ?? null]
  )
}
