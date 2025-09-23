export interface EPDSItem {
  prompt: string
  options: { label: string; value: number }[]
}

// EPDS: 10 ítems, 0-3 por ítem; inversión en 1,2,4
export const EPDS_ITEMS: EPDSItem[] = [
  {
    prompt: 'He sido capaz de reír y ver el lado bueno de las cosas.',
    options: [
      { label: 'Tanto como siempre', value: 0 },
      { label: 'No tanto ahora', value: 1 },
      { label: 'Mucho menos', value: 2 },
      { label: 'No, no he podido', value: 3 },
    ],
  },
  {
    prompt: 'He disfrutado mirar hacia el futuro.',
    options: [
      { label: 'Tanto como siempre', value: 0 },
      { label: 'No tanto ahora', value: 1 },
      { label: 'Mucho menos que antes', value: 2 },
      { label: 'No, nada', value: 3 },
    ],
  },
  {
    prompt: 'Cuando las cosas han salido mal me he culpado a mí misma innecesariamente.',
    options: [
      { label: 'Sí, la mayoría de las veces', value: 3 },
      { label: 'Sí, algunas veces', value: 2 },
      { label: 'No muy a menudo', value: 1 },
      { label: 'No, nunca', value: 0 },
    ],
  },
  {
    prompt: 'He estado ansiosa y preocupada sin motivo.',
    options: [
      { label: 'Sí, a menudo', value: 3 },
      { label: 'Sí, a veces', value: 2 },
      { label: 'Casi nada', value: 1 },
      { label: 'No, para nada', value: 0 },
    ],
  },
  {
    prompt: 'He sentido miedo o pánico sin tener un buen motivo.',
    options: [
      { label: 'Sí, bastante a menudo', value: 3 },
      { label: 'Sí, a veces', value: 2 },
      { label: 'No muy a menudo', value: 1 },
      { label: 'No, para nada', value: 0 },
    ],
  },
  {
    prompt: 'Las cosas me han estado abrumando.',
    options: [
      { label: 'Sí, la mayor parte del tiempo no he podido con ellas', value: 3 },
      { label: 'Sí, a veces no he podido con ellas como de costumbre', value: 2 },
      { label: 'No, la mayoría de las veces he podido con ellas bastante bien', value: 1 },
      { label: 'No, he podido con ellas tan bien como siempre', value: 0 },
    ],
  },
  {
    prompt: 'Me he sentido tan infeliz que he tenido dificultades para dormir.',
    options: [
      { label: 'Sí, la mayoría de las veces', value: 3 },
      { label: 'Sí, a veces', value: 2 },
      { label: 'No muy a menudo', value: 1 },
      { label: 'No, para nada', value: 0 },
    ],
  },
  {
    prompt: 'Me he sentido triste o desgraciada.',
    options: [
      { label: 'Sí, la mayoría de las veces', value: 3 },
      { label: 'Sí, bastante a menudo', value: 2 },
      { label: 'No muy a menudo', value: 1 },
      { label: 'No, para nada', value: 0 },
    ],
  },
  {
    prompt: 'Me he sentido tan infeliz que he estado llorando.',
    options: [
      { label: 'Sí, la mayoría de las veces', value: 3 },
      { label: 'Sí, bastante a menudo', value: 2 },
      { label: 'Solo en ocasiones', value: 1 },
      { label: 'No, nunca', value: 0 },
    ],
  },
  {
    prompt: 'Se me ha ocurrido la idea de hacerme daño a mí misma.',
    options: [
      { label: 'Sí, bastante a menudo', value: 3 },
      { label: 'A veces', value: 2 },
      { label: 'Casi nunca', value: 1 },
      { label: 'Nunca', value: 0 },
    ],
  },
]

export function scoreEPDS(answers: number[]) {
  // inversión en preguntas 1,2,4: ya representada con valores 0..3 de forma correcta
  const total = answers.reduce((a, b) => a + (b ?? 0), 0)
  let risk = 'Bajo riesgo'
  if (total >= 10) risk = 'Posible depresión'
  const alertQ10 = (answers[9] ?? 0) > 0
  return { total, interpretation: risk, alertQ10 }
}
