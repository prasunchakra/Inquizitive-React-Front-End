import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchQuestions } from '../services/quizService'


const initialQuestions = [
  { id: 1, subject: 'Initial Question', type: 'numeric', text: `Initial Question` } 
]

export const loadQuestions = createAsyncThunk(
    'quiz/loadQuestions',
    async () => {
      const data = await fetchQuestions()
      return data
    }
  )

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: initialQuestions,
    answers: {},                    // { [questionId]: { answer, reviewed } }
    currentQ: 0,
    timer: {                       
      totalSeconds: 3600,
      remaining: 3600,
      running: false,
      lastTick: null
    },
    showInstructions: false,
    loading: false,
    error: null
  },
  reducers: {
    startTimer(state) {
      state.timer.running = true
      state.timer.lastTick = Date.now()
    },
    tick(state) {
      if (state.timer.running && state.timer.remaining > 0) {
        const now = Date.now()
        const elapsed = Math.floor((now - state.timer.lastTick) / 1000)
        if (elapsed >= 1) {
          state.timer.remaining = Math.max(0, state.timer.remaining - elapsed)
          state.timer.lastTick = now
        }
      }
    },
    configureTimer(state, action) {
      state.timer.totalSeconds = action.payload
      state.timer.remaining = action.payload
    },
    pauseTimer(state) {
      state.timer.running = false
    },
    setAnswer(state, { payload: { qId, answer } }) {
      state.answers[qId] = { ...(state.answers[qId] || {}), answer }
    },
    markReview(state, { payload: qId }) {
      state.answers[qId] = { ...(state.answers[qId] || {}), reviewed: true }
    },
    unmarkReview(state, { payload: qId }) {
      state.answers[qId] = { ...(state.answers[qId] || {}), reviewed: false }
    },
    navigate(state, { payload: index }) {
      state.currentQ = index
    },
    openInstructions(state) {
      state.showInstructions = true
    },
    closeInstructions(state) {
      state.showInstructions = false
    },
    endTest(state) {
      state.timer.running = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuestions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadQuestions.fulfilled, (state, action) => {
        state.loading = false
        state.questions = action.payload
      })
      .addCase(loadQuestions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const {
  startTimer, tick, configureTimer, pauseTimer,
  setAnswer, markReview, unmarkReview, navigate,
  openInstructions, closeInstructions, endTest
} = quizSlice.actions

export default quizSlice.reducer
