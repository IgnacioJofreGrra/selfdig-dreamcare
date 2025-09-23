export const BAI_OPTIONS = [
  { value: 0, label: 'Poco o nada' },
  { value: 1, label: 'Más o menos' },
  { value: 2, label: 'Moderadamente' },
  { value: 3, label: 'Severamente' },
]

export const BAI_ITEMS: string[] = [
  'Torpe o entumecido.',
  'Acalorado (Bochornos).',
  'Debilitamiento o temblor en las piernas.',
  'Incapacidad para relajarse.',
  'Miedo a que ocurra lo peor.',
  'Mareado o que se le va la cabeza.',
  'Palpitaciones o ritmo cardíaco acelerado.',
  'Inestable o inseguro.',
  'Aterrado o asustado.',
  'Nervioso.',
  'Sensación de ahogo o falta de aliento.',
  'Temblores en las manos.',
  'Inestable, tembloroso.',
  'Miedo a perder el control.',
  'Dificultad para respirar.',
  'Miedo a morir.',
  'Asustado.',
  'Indigestión o molestias en el abdomen.',
  'Sensación de desmayo o desvanecimiento.',
  'Rubor facial (sonrojarse).',
  'Sudoración (no debida al calor).',
]

export function scoreBAI(answers: number[]): { total: number; interpretation: string } {
  const total = answers.reduce((a, b) => a + (b ?? 0), 0)
  let interpretation = ''
  if (total <= 7) interpretation = 'Nivel mínimo de ansiedad'
  else if (total <= 15) interpretation = 'Ansiedad leve'
  else if (total <= 25) interpretation = 'Ansiedad moderada'
  else interpretation = 'Ansiedad severa'
  return { total, interpretation }
}
