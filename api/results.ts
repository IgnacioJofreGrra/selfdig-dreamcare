import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db, ensureSchema } from './_lib/db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')
  await ensureSchema()
  const { quizId, score, interpretation, answers, email } = req.body || {}
  try {
    // upsert patient by email if provided; else anonymous
    let patientId: string
    if (email) {
      const existing = await db`SELECT id FROM patients WHERE email=${email} LIMIT 1;`
      if (existing.rowCount && existing.rows[0]?.id) patientId = existing.rows[0].id as any
      else {
        const ins = await db`INSERT INTO patients (email) VALUES (${email}) RETURNING id;`
        patientId = ins.rows[0].id as any
      }
    } else {
      const ins = await db`INSERT INTO patients (email) VALUES (NULL) RETURNING id;`
      patientId = ins.rows[0].id as any
    }

    const assess = await db`INSERT INTO assessments (patient_id, quiz_id, score, interpretation) VALUES (${patientId}, ${quizId}, ${score}, ${interpretation}) RETURNING id, created_at;`
    const assessmentId = (assess.rows[0] as any).id

    if (Array.isArray(answers)) {
      for (let i = 0; i < answers.length; i++) {
        const v = answers[i]
        await db`INSERT INTO responses (assessment_id, item_index, value) VALUES (${assessmentId}, ${i}, ${v ?? 0});`
      }
    }

    return res.status(201).json({ id: assessmentId, created_at: (assess.rows[0] as any).created_at })
  } catch (e: any) {
    return res.status(500).send(e?.message ?? 'Error interno')
  }
}
