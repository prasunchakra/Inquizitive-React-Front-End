import React from 'react'
import QuizCard from './QuizCard'

export default function QuizList({ quizzes }) {
  if (quizzes.length === 0) {
    return <p className="text-center text-gray-500">No exams found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map(quiz => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  )
}
