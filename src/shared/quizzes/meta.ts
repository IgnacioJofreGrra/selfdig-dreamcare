export type QuizId = 'bai' | 'epds' | 'bdi2'

export interface QuizMeta {
  id: QuizId
  title: string
  description: string
  items: number
}

export const quizzes: QuizMeta[] = [
  { id: 'bai', title: 'Inventario de Ansiedad de Beck (BAI)', description: '21 ítems, evalúa severidad de ansiedad', items: 21 },
  { id: 'epds', title: 'Escala de Depresión Postparto de Edimburgo (EPDS)', description: '10 ítems, tamizaje de depresión posparto', items: 10 },
  { id: 'bdi2', title: 'Inventario de Depresión de Beck (BDI-II)', description: '21 grupos, severidad de depresión', items: 21 }
]
