export interface BDIItem {
  prompt: string
  options: string[] // opciones ordenadas 0..3
}

export const BDI2_ITEMS: BDIItem[] = [
  { prompt: 'Tristeza', options: ['No me siento triste.', 'Me siento triste gran parte del tiempo.', 'Estoy triste todo el tiempo.', 'Estoy tan triste o soy tan infeliz que no puedo soportarlo.'] },
  { prompt: 'Pesimismo', options: ['No estoy desanimado respecto a mi futuro.', 'Me siento más desanimado respecto a mi futuro que lo que solía estarlo.', 'No espero que las cosas mejoren.', 'Siento que mi futuro es desesperanzador y que solo empeorará.'] },
  { prompt: 'Fracaso Pasado', options: ['No me siento como un fracasado.', 'He fracasado más de lo que debería.', 'Cuando miro hacia atrás, veo muchos fracasos.', 'Siento que como persona soy un completo fracasado.'] },
  { prompt: 'Pérdida de Placer', options: ['Obtengo tanto placer como siempre por las cosas que disfruto.', 'No disfruto de las cosas tanto como solía hacerlo.', 'Obtengo muy poco placer de las cosas que solía disfrutar.', 'No puedo obtener ningún placer de las cosas que solía disfrutar.'] },
  { prompt: 'Sentimientos de Culpa', options: ['No me siento particularmente culpable.', 'Me siento culpable por muchas cosas que he hecho o que debería haber hecho.', 'Me siento bastante culpable la mayor parte del tiempo.', 'Me siento culpable todo el tiempo.'] },
  { prompt: 'Sentimientos de Castigo', options: ['No siento que esté siendo castigado.', 'Siento que puedo ser castigado.', 'Espero ser castigado.', 'Siento que estoy siendo castigado.'] },
  { prompt: 'Disconformidad con uno mismo', options: ['Siento acerca de mí lo mismo que siempre.', 'He perdido la confianza en mí mismo.', 'Estoy decepcionado conmigo mismo.', 'No me gusto a mí mismo.'] },
  { prompt: 'Autocrítica', options: ['No me critico ni me culpo más de lo habitual.', 'Soy más crítico conmigo mismo de lo que solía serlo.', 'Critico todos mis defectos.', 'Me culpo por todo lo malo que sucede.'] },
  { prompt: 'Pensamientos o Deseos Suicidas', options: ['No tengo ningún pensamiento de suicidio.', 'A veces pienso en suicidarme, pero no lo haría.', 'Desearía suicidarme.', 'Me suicidaría si tuviese la oportunidad.'] },
  { prompt: 'Llanto', options: ['No lloro más de lo que solía hacerlo.', 'Lloro más que antes.', 'Lloro por cualquier pequeñez.', 'Siento ganas de llorar, pero no puedo.'] },
  { prompt: 'Agitación', options: ['No estoy más inquieto o tenso que lo habitual.', 'Me siento más inquieto o tenso que lo habitual.', 'Estoy tan inquieto o agitado que me es difícil quedarme quieto.', 'Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo.'] },
  { prompt: 'Pérdida de Interés', options: ['No he perdido el interés en otras personas o actividades.', 'Estoy menos interesado que antes en otras personas o cosas.', 'He perdido casi todo el interés en otras personas o cosas.', 'Me es difícil interesarme por algo.'] },
  { prompt: 'Indecisión', options: ['Tomo decisiones tan bien como siempre.', 'Me resulta más difícil tomar decisiones que de costumbre.', 'Tengo mucha más dificultad para tomar decisiones que antes.', 'Tengo problemas para tomar cualquier decisión.'] },
  { prompt: 'Desvalorización', options: ['No siento que yo no sea valioso.', 'No me considero tan valioso y útil como solía serlo.', 'Me siento menos valioso en comparación con otras personas.', 'Siento que no valgo nada.'] },
  { prompt: 'Pérdida de Energía', options: ['Tengo tanta energía como siempre.', 'Tengo menos energía que la que solía tener.', 'No tengo suficiente energía para hacer muchas cosas.', 'No tengo energía suficiente para hacer nada.'] },
  { prompt: 'Cambios en los hábitos de sueño', options: ['No he experimentado ningún cambio en mis hábitos de sueño.', 'Duermo un poco más o un poco menos que lo habitual.', 'Duermo mucho más o mucho menos que lo habitual.', 'Duermo la mayor parte del día o me despierto muy temprano y no puedo volver a dormir.'] },
  { prompt: 'Irritabilidad', options: ['No estoy más irritable de lo que suelo estarlo.', 'Estoy más irritable de lo que solía estarlo.', 'Estoy mucho más irritable que lo habitual.', 'Estoy irritable todo el tiempo.'] },
  { prompt: 'Cambios en el apetito', options: ['No he experimentado ningún cambio en mi apetito.', 'Mi apetito es un poco menor o mayor que lo habitual.', 'Mi apetito es mucho menor o mayor que lo habitual.', 'No tengo apetito en absoluto o quiero comer todo el día.'] },
  { prompt: 'Dificultad de Concentración', options: ['Puedo concentrarme tan bien como siempre.', 'No puedo concentrarme tan bien como habitualmente.', 'Me es difícil mantener la mente en algo por mucho tiempo.', 'Encuentro que no puedo concentrarme en nada.'] },
  { prompt: 'Cansancio o Fatiga', options: ['No estoy más cansado o fatigado que lo habitual.', 'Me fatigo o me canso más fácilmente que lo habitual.', 'Estoy demasiado fatigado o cansado para hacer muchas de las cosas que solía hacer.', 'Estoy demasiado fatigado o cansado para hacer la mayoría de las cosas que solía hacer.'] },
  { prompt: 'Pérdida de Interés en el Sexo', options: ['No he notado ningún cambio reciente en mi interés por el sexo.', 'Estoy menos interesado en el sexo de lo que solía estarlo.', 'Estoy mucho menos interesado en el sexo ahora.', 'He perdido por completo el interés en el sexo.'] },
]

export function scoreBDI2(answers: number[]) {
  const total = answers.reduce((a, b) => a + (b ?? 0), 0)
  let interpretation = 'Depresión mínima'
  if (total >= 14 && total <= 19) interpretation = 'Depresión leve'
  else if (total >= 20 && total <= 28) interpretation = 'Depresión moderada'
  else if (total >= 29) interpretation = 'Depresión grave'
  const alertItem9 = (answers[8] ?? 0) > 0
  return { total, interpretation, alertItem9 }
}
