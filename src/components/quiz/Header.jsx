// src/components/quiz/Header.jsx
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openInstructions, endTest } from '../../store/quizSlice'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle, DialogClose } from '../ui/dialog'
import EndTestConfirm from './EndTestConfirm'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { remaining } = useSelector(s => s.quiz.timer)
  const { name, instructions } = useSelector(s => s.quiz.quizInfo)
  const showInstructions = useSelector(s => s.quiz.showInstructions)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0')
  const seconds = String(remaining % 60).padStart(2, '0')

  return (
    <header className="flex items-center justify-between bg-blue-100 px-6 py-3">
      <h1 className="text-xl font-semibold">{name}</h1>

      <div className="flex items-center space-x-4">
        {/* Timer */}
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1 animate-spin text-blue-500" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
          <span>Time Left {minutes}:{seconds}</span>
        </span>

        {/* Instructions */}
        <button
          onClick={() => dispatch(openInstructions())}
          className="text-blue-600 hover:underline flex items-center"
        >
          <i className="ri-information-line mr-1" /> Instructions
        </button>

        {/* End Test */}
        <button
          onClick={() => setConfirmOpen(true)}
          className="px-3 py-1 cursor-pointer bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded"
        >
          End Test
        </button>
      </div>

      {/* Instructions Modal */}
      <Dialog open={showInstructions} onOpenChange={() => dispatch(openInstructions())}>
        <DialogContent>
          <DialogTitle>Instructions</DialogTitle>
          <div className="mt-4 text-gray-800 whitespace-pre-line">
            {instructions}
          </div>
          <DialogClose className="mt-6 bg-gradient-to-r from-blue-400 to-teal-400 text-white px-4 py-2 rounded">
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* End Test Confirmation Dialog */}
      <EndTestConfirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          dispatch(endTest())
          navigate('/results')
        }}
      />
    </header>
  )
}
