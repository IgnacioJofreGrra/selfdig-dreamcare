import { sql } from '@vercel/postgres'

export const db = sql

export async function ensureSchema() {
  // Idempotente: crea tablas si no existen
  try {
    await db`CREATE EXTENSION IF NOT EXISTS pgcrypto;`
  } catch {}
  await db`CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`
  await db`CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id),
    quiz_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    interpretation TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`
  await db`CREATE TABLE IF NOT EXISTS responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID REFERENCES assessments(id),
    item_index INTEGER NOT NULL,
    value INTEGER NOT NULL
  );`
}
