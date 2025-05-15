import { createSlice } from '@reduxjs/toolkit'


const initialQuestions = [
  { id: 1, subject: 'General Studies Paper - I', type: 'mcq', text: `According to the Environmental Protection
Agency (EPA), which one of the following is
the largest source of sulphur dioxide
emissions ?`, options: [' Locomotives using fossil fuels','Ships using fossil fuels',' Extraction of metals from ores',' Power plants using fossil fuels'] },
  { id: 2, subject: 'General Studies Paper - I', type: 'numeric', text: 'Q2 text...' },
  { id: 3, subject: 'General Studies Paper - I', type: 'mcq', text: 'Q3 text...', options: ['A','B','C','D'] },
  { id: 4, subject: 'General Studies Paper - I', type: 'mcq', text: 'Q4 text...', options: ['A','B','C','D'] },
  { id: 5, subject: 'General Studies Paper - I', type: 'mcq', text: `According to the Environmental Protection
    Agency (EPA), which one of the following is
    the largest source of sulphur dioxide
    emissions ?`, options: [' Locomotives using fossil fuels','Ships using fossil fuels',' Extraction of metals from ores',' Power plants using fossil fuels'] },
  { id: 6, subject: 'General Studies Paper - I', type: 'mcq', text: 'Q6 text...', options: ['A','B','C','D'] },
  { id: 7, subject: 'General Studies Paper - I', type: 'mcq', text: 'Q7 text...', options: ['A','B','C','D'] },
  { id: 8, subject: 'General Studies Paper - I', type: 'mcq', text: 'Q8 text...', options: ['A','B','C','D'] },
  { id: 9, subject: 'General Studies Paper - I', type: 'mcq', text: 'Q9 text...', options: ['A','B','C','D'] },
  { id: 10, subject: 'General Studies Paper - I', type: 'mcq', text: 'Q10 text...', options: ['A','B','C','D'] },
  
]

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
    },
    showInstructions: false,
  },
  reducers: {
    startTimer(state) {
      state.timer.running = true
    },
    tick(state) {
      if (state.timer.running && state.timer.remaining > 0) {
        state.timer.remaining--
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
})

export const {
  startTimer, tick, configureTimer, pauseTimer,
  setAnswer, markReview, unmarkReview, navigate,
  openInstructions, closeInstructions, endTest
} = quizSlice.actions

export default quizSlice.reducer
