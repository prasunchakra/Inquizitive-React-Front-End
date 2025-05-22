import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswer } from '../../store/quizSlice'

export default function OptionsList({ question }) {
  const dispatch = useDispatch()
  const answer = useSelector(s => s.quiz.answers[question.id]?.answer)

  return (
    <ul className="space-y-3 mt-4">
      {question.options.map((opt) => (
        <li key={opt.id}>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name={`q${question.id}`}
              checked={answer === opt.id}
              onChange={() => dispatch(setAnswer({ qId: question.id, answer: opt.id }))}
              className="form-radio"
            />
            <span>{opt.text}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}
