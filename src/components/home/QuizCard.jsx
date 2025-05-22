import React from 'react'
import { Link } from 'react-router-dom'

export default function QuizCard({ quiz }) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4">{quiz.tagline}</p>
      <Link
        to={quiz.path}
        className="inline-block px-5 py-2 bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded-full"
      >
        Start Test
      </Link>
    </div>
  )
}
