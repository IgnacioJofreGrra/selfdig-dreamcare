import { create } from 'zustand'

type Answers = Record<number, number>

interface QuizState {
  currentQuizId: string | null
  answers: Record<string, Answers>
  setCurrentQuiz: (id: string | null) => void
  setAnswer: (quizId: string, index: number, value: number) => void
  resetQuiz: (quizId: string) => void
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuizId: null,
  answers: {},
  setCurrentQuiz: (id) => set({ currentQuizId: id }),
  setAnswer: (quizId, index, value) => set((state) => ({
    answers: {
      ...state.answers,
      [quizId]: { ...(state.answers[quizId] ?? {}), [index]: value }
    }
  })),
  resetQuiz: (quizId) => set((state) => {
    const next = { ...state.answers }
    delete next[quizId]
    return { answers: next }
  }),
}))
