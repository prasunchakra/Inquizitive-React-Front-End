import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchQuestions } from '../services/quizService'


const initialQuestions = [
  { id: 1, subject: 'Initial Question', type: 'numeric', text: `Initial Question` } 
]

// Convert HH:MM:SS to seconds
function timeToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

export const loadQuestions = createAsyncThunk(
    'quiz/loadQuestions',
    async () => {
      const data = await fetchQuestions()
      return {
        questions: data.questions,
        quizInfo: {
          name: data.title,
          duration: data.duration,
          totalMarks: data.total_marks,
          instructions: data.description
        }
      }
    }
  )

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: initialQuestions,
    quizInfo: {
      name: '',
      duration: '01:00:00', // Default duration in HH:MM:SS
      totalMarks: 0,
      instructions: ''
    },
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
      const seconds = timeToSeconds(action.payload)
      state.timer.totalSeconds = seconds
      state.timer.remaining = seconds
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
        state.questions = action.payload.questions
        state.quizInfo = action.payload.quizInfo
        // Configure timer based on quiz duration
        const seconds = timeToSeconds(action.payload.quizInfo.duration)
        state.timer.totalSeconds = seconds
        state.timer.remaining = seconds
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
