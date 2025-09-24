import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useQuizStore } from '../store/quizStore'
import { BAI_ITEMS, BAI_OPTIONS, scoreBAI } from '../shared/quizzes/bai'
import { EPDS_ITEMS, scoreEPDS } from '../shared/quizzes/epds'
import { BDI2_ITEMS, scoreBDI2 } from '../shared/quizzes/bdi2'
import { api } from '../services/api'
import { ProgressHeader } from '../components/ProgressHeader'
import { OptionCard } from '../components/OptionCard'
import { ThemeToggle } from '../components/ThemeToggle'

export function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quizId = (id ?? 'bai') as 'bai' | 'epds' | 'bdi2'
  const { answers, setAnswer, setCurrentQuiz, resetQuiz } = useQuizStore()
  const [index, setIndex] = useState(0)

  const { totalItems, renderQuestion, calcScore } = useMemo(() => {
    if (quizId === 'bai') {
      return {
        totalItems: BAI_ITEMS.length,
        renderQuestion: (i: number) => ({ prompt: BAI_ITEMS[i], options: BAI_OPTIONS }),
        calcScore: (vals: number[]) => scoreBAI(vals)
      }
    }
    if (quizId === 'epds') {
      return {
        totalItems: EPDS_ITEMS.length,
        renderQuestion: (i: number) => ({ prompt: EPDS_ITEMS[i].prompt, options: EPDS_ITEMS[i].options }),
        calcScore: (vals: number[]) => scoreEPDS(vals)
      }
    }
    return {
      totalItems: BDI2_ITEMS.length,
      renderQuestion: (i: number) => ({ prompt: BDI2_ITEMS[i].prompt, options: BDI2_ITEMS[i].options.map((t, idx) => ({ label: t, value: idx })) }),
      calcScore: (vals: number[]) => scoreBDI2(vals)
    }
  }, [quizId])

  const my = useMemo(() => answers[quizId] ?? {}, [answers, quizId])
  const hasAnswer = (my[index] ?? undefined) !== undefined
  const [saving, setSaving] = useState(false)

  async function onNext() {
    if (index < totalItems - 1) setIndex(index + 1)
    else {
      // finish
      const vals = Array.from({ length: totalItems }, (_, i) => my[i] ?? 0)
      const result = calcScore(vals as number[])
      // guardar en backend (sin email)
      try {
        setSaving(true)
        await api.post('/api/results', { quizId, score: result.total, interpretation: result.interpretation, answers: vals })
      } catch (e) {
        // continuar aunque falle
        console.warn('No se pudo guardar el resultado', e)
      } finally {
        setSaving(false)
      }
      navigate('/result', { state: { quizId, vals, result } })
    }
  }

  function onPrev() {
    if (index > 0) setIndex(index - 1)
  }

  // ensure state quiz id
  useMemo(() => setCurrentQuiz(quizId), [quizId, setCurrentQuiz])

  const q = renderQuestion(index)

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight' && hasAnswer) onNext()
    if (e.key === 'ArrowLeft') onPrev()
  }

  // confirmación al salir si hay respuestas
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      const answered = Object.keys(my).length > 0
      if (answered) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [my])

  // El tema se gestiona globalmente con ThemeToggle; sin estado local de 'dark' aquí.

  return (
    <div>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white text-slate-900 px-3 py-2 rounded shadow">Saltar al contenido</a>
      <main id="contenido" role="main" className={`max-w-xl mx-auto p-4 space-y-6 pb-24 dark:text-slate-100 min-h-screen app-bg-light dark:app-bg-dark`} onKeyDown={onKeyDown} tabIndex={-1}>
        <ProgressHeader current={index + 1} total={totalItems} />
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Cuestionario</h1>
          <ThemeToggle />
        </div>

  <fieldset className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm question-enter ${index % 2 === 0 ? 'slide-left-in' : 'slide-right-in'}`}>
          <legend className="font-medium mb-4 px-1">{q.prompt}</legend>
          <div className="space-y-2">
            {q.options.map((opt: any) => (
              <OptionCard
                key={opt.value}
                name={`q-${index}`}
                value={opt.value}
                label={opt.label}
                checked={(my[index] ?? null) === opt.value}
                onChange={() => setAnswer(quizId, index, opt.value)}
              />
            ))}
          </div>
        </fieldset>

        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-[0_-4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.35)] pb-[max(env(safe-area-inset-bottom),0px)]">
          <div className="max-w-xl mx-auto p-3 flex items-center justify-between gap-2">
          <button
            className="btn-outline min-h-[44px]"
            onClick={onPrev}
            disabled={index === 0}
          >
            Anterior
          </button>
          <div className="flex gap-2">
            <button
              className="btn-outline min-h-[44px]"
              onClick={() => { resetQuiz(quizId); setIndex(0) }}
            >
              Reiniciar
            </button>
            <button
              className="btn-primary min-h-[44px]"
              onClick={onNext}
              disabled={!hasAnswer}
            >
              {saving ? 'Guardando…' : (index === totalItems - 1 ? 'Finalizar' : 'Siguiente')}
            </button>
          </div>
          </div>
        </div>
      </main>
    </div>
  )
}
