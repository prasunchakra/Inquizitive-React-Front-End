import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { navigate, endTest } from '../../store/quizSlice'
import EndTestConfirm from './EndTestConfirm'

export default function QuestionNavigator() {
  const dispatch = useDispatch()
  const router = useNavigate()
  const { currentQ, questions } = useSelector(s => s.quiz)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const onConfirm = () => {
    dispatch(endTest())
    router('/results')
  }

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
          onClick={() => setConfirmOpen(true)}
          className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded"
        >
          End Test
        </button>
      )}
      <EndTestConfirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      />
    </div>
  )
}
