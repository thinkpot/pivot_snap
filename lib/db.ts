import { sql } from '@vercel/postgres'

let ensured: Promise<unknown> | null = null

function ensureSignupsTable() {
  if (!ensured) {
    ensured = sql`
      CREATE TABLE IF NOT EXISTS signups (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        source TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
  }
  return ensured
}

export async function saveSignup(email: string, source?: string) {
  await ensureSignupsTable()
  await sql`
    INSERT INTO signups (email, source)
    VALUES (${email}, ${source ?? null})
    ON CONFLICT (email) DO UPDATE SET source = EXCLUDED.source
  `
}
