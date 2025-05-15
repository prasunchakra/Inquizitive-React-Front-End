import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from '../../store/quizSlice'

export default function PaletteItem({ question, index }) {
  const dispatch = useDispatch()
  const ansObj = useSelector(s => s.quiz.answers[question.id]) || {}
  let bg = 'bg-gray-200'

  if (ansObj.answer != null) bg = 'bg-green-300'
  if (!ansObj.answer) bg = 'bg-red-300'
  if (ansObj.reviewed) bg = 'bg-yellow-300'

  return (
    <button
      onClick={() => dispatch(navigate(index))}
      className={`${bg} p-2 text-center rounded cursor-pointer hover:bg-blue-200 `}
    >
      { question.id }
    </button>
  )
}
