import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { markReview, unmarkReview, setAnswer } from '../../store/quizSlice'

export default function QuestionActions() {
  const dispatch = useDispatch()
  const { currentQ, questions } = useSelector(s => s.quiz)
  const currentQuestion = questions[currentQ]
  const isReviewed = useSelector(s => s.quiz.answers[currentQuestion.id]?.reviewed)

  return (
    <div className="flex space-x-4 my-6">
      <button
        onClick={() => dispatch(isReviewed ? unmarkReview(currentQuestion.id) : markReview(currentQuestion.id))}
        className={`px-4 py-2 cursor-pointer border rounded ${
          isReviewed 
            ? 'border-yellow-400 text-yellow-400 bg-yellow-50' 
            : 'border-blue-400 text-blue-400'
        }`}
      >
        {isReviewed ? 'Unmark Review' : 'Review Later'}
      </button>
      <button
        onClick={() => dispatch(setAnswer({ qId: currentQuestion.id, answer: null }))}
        className="px-4 py-2 cursor-pointer border border-gray-300 text-gray-600 rounded"
      >
        Clear Selection
      </button>
    </div>
  )
}
