import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from '../../store/quizSlice'

export default function SubjectTabs() {
  const { questions, currentQ } = useSelector(s => s.quiz)
  const dispatch = useDispatch()
  const subjects = [...new Set(questions.map(q => q.subject))]

  return (
    <nav className="bg-blue-800 text-white px-6">
      <ul className="flex space-x-4">
        {subjects.map(subj => (
          <li
            key={subj}
            className="py-3 cursor-pointer hover:underline"
            onClick={() => {
              const idx = questions.findIndex(q => q.subject === subj)
              dispatch(navigate(idx))
            }}
          >
            {subj.toUpperCase()}
          </li>
        ))}
      </ul>
    </nav>
  )
}
