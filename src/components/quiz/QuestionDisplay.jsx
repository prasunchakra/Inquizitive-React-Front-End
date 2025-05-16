import React from 'react'
import { useSelector } from 'react-redux'
import OptionsList from './OptionsList'
import NumericInput from './NumericInput'

export default function QuestionDisplay() {
  const { questions, currentQ } = useSelector(s => s.quiz)
  const q = questions[currentQ]

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-center">Q{ q.id }</h2>
      <p className="mt-2 text-gray-700 whitespace-pre-line text-left">{ q.text }</p>
      {q.type === 'mcq'
        ? <OptionsList question={q} />
        : <NumericInput question={q} />
      }
    </div>
  )
}
