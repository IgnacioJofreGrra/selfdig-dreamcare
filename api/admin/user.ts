import type { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'
import { db, ensureSchema } from '../_lib/db'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed')
  const auth = req.headers.authorization
  try { jwt.verify((auth || '').split(' ')[1] || '', JWT_SECRET) } catch { return res.status(401).send('No autorizado') }
  await ensureSchema()
  const userId = (req.query.id as string) || ''
  if (!userId) return res.status(400).send('Falta id')
  const patient = await db`SELECT id, email, created_at FROM patients WHERE id=${userId} LIMIT 1;`
  if (!patient.rowCount) return res.status(404).send('No encontrado')
  const assessments = await db`SELECT id, quiz_id, score, interpretation, created_at FROM assessments WHERE patient_id=${userId} ORDER BY created_at DESC;`
  const assessmentIds = assessments.rows.map((r: any) => r.id)
  let responses: any[] = []
  if (assessmentIds.length) {
    const resp = await db`SELECT assessment_id, item_index, value FROM responses WHERE assessment_id = ANY(${assessmentIds});`
    responses = resp.rows
  }
  return res.status(200).json({
    patient: patient.rows[0],
    assessments: assessments.rows,
    responses,
  })
}
