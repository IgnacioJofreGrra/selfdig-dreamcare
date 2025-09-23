import type { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'
import { db, ensureSchema } from '../_lib/db'
import { toCSVWithBOM, formatFechaHora } from '../_lib/csv'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed')
  const auth = req.headers.authorization
  try { jwt.verify((auth || '').split(' ')[1] || '', JWT_SECRET) } catch { return res.status(401).send('No autorizado') }
  await ensureSchema()
  const rows = await db`SELECT id, patient_id, quiz_id, score, interpretation, created_at FROM assessments ORDER BY created_at DESC;`
  const headers = ['id', 'paciente', 'test', 'puntaje', 'interpretacion', 'fecha', 'hora']
  const data = rows.rows.map((r: any) => {
    const { fecha, hora } = formatFechaHora(r.created_at)
    return [r.id, r.patient_id, r.quiz_id, r.score, r.interpretation, fecha, hora]
  })
  const csv = toCSVWithBOM(headers, data)
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="resultados.csv"')
  return res.status(200).send(csv)
}
