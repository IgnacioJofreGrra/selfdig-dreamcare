import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export function signToken(payload: object, expiresIn: string = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyTokenFromHeader(authHeader?: string): any {
  if (!authHeader) throw new Error('No autorizado')
  const [type, token] = authHeader.split(' ')
  if (type !== 'Bearer' || !token) throw new Error('No autorizado')
  try { return jwt.verify(token, JWT_SECRET) } catch {
    throw new Error('Token inválido')
  }
}
