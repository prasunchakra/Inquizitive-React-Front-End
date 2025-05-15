import React from 'react'
import { useSelector } from 'react-redux'
import PaletteItem from './PaletteItem'

export default function QuestionPalette() {
  const { questions } = useSelector(s => s.quiz)

  return (
    <div>
      <h3 className="font-semibold mb-4">Question Palette</h3>
      <div className="grid grid-cols-4 gap-2">
        {questions.map((q, idx) => (
          <PaletteItem key={q.id} question={q} index={idx} />
        ))}
      </div>
    </div>
  )
}
