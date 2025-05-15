import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer } from '../../store/quizSlice'

export default function NumericInput({ question }) {
  const dispatch = useDispatch()
  const answer = useSelector(s => s.quiz.answers[question.id]?.answer || '')

  return (
    <input
      type="number"
      value={answer}
      onChange={e => dispatch(setAnswer({ qId: question.id, answer: e.target.value }))}
      className="mt-4 border px-3 py-2 w-32"
      placeholder="Enter value"
    />
  )
}
