import type { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'
import { db, ensureSchema } from '../_lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed')
  const auth = req.headers.authorization
  try { jwt.verify((auth || '').split(' ')[1] || '', JWT_SECRET) } catch { return res.status(401).send('No autorizado') }
  await ensureSchema()
  const limit = Math.min(parseInt((req.query.limit as string) || '50', 10), 200)
  const offset = Math.max(parseInt((req.query.offset as string) || '0', 10), 0)
  const rows = await db`SELECT id, patient_id, quiz_id, score, interpretation, created_at FROM assessments ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`
  return res.status(200).json({ items: rows.rows })
}
