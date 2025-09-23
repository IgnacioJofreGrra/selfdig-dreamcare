import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    items: [
      { id: 'bai', title: 'Inventario de Ansiedad de Beck (BAI)', items: 21 },
      { id: 'epds', title: 'Escala de Depresión Postparto de Edimburgo (EPDS)', items: 10 },
      { id: 'bdi2', title: 'Inventario de Depresión de Beck (BDI-II)', items: 21 },
    ]
  })
}
