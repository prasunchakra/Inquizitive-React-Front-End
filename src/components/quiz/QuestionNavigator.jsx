import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate, endTest } from '../../store/quizSlice'

export default function QuestionNavigator() {
  const dispatch = useDispatch()
  const { currentQ, questions } = useSelector(s => s.quiz)

  return (
    <div className="flex justify-between">
      <button
        onClick={() => dispatch(navigate(Math.max(currentQ - 1, 0)))}
        className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded"
      >
        ‹ Back
      </button>
      {currentQ < questions.length - 1 ? (
        <button
          onClick={() => dispatch(navigate(currentQ + 1))}
          className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded"
        >
          Next ›
        </button>
      ) : (
        <button
          onClick={() => dispatch(endTest())}
          className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded"
        >
          End Test
        </button>
      )}
    </div>
  )
}
