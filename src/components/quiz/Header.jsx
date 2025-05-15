import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openInstructions, closeInstructions } from '../../store/quizSlice'
import { Dialog, DialogContent, DialogTitle, DialogClose } from '../ui/dialog'

export default function Header() {
  const dispatch = useDispatch()
  const { remaining, totalSeconds, running } = useSelector(s => s.quiz.timer)
  const showInstructions = useSelector(s => s.quiz.showInstructions)

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0')
  const seconds = String(remaining % 60).padStart(2, '0')

  return (
    <header className="flex items-center justify-between bg-blue-100 px-6 py-3">
      <h1 className="text-xl font-semibold">
      Civil Services (Preliminary) Mock Examination 
      </h1>
      <div className="flex items-center space-x-4">
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-1 animate-spin text-blue-500" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
          <span>Time Left {minutes}:{seconds}</span>
        </span>
        <button
          onClick={() => dispatch(openInstructions())}
          className="text-blue-600 cursor-pointer hover:underline flex items-center"
        >
          <i className="ri-information-line mr-1"></i> Instructions
        </button>
      </div>

      {/* Instructions Modal */}
      <Dialog 
        open={showInstructions} 
        onOpenChange={(open) => dispatch(open ? openInstructions() : closeInstructions())}
      >
        <DialogContent>
          <DialogTitle>Instructions</DialogTitle>
          <p className="mt-4 text-gray-800">
            1. There is no time limit…<br/>
            2. Questions can be single/multiple choice, short text or numeric.<br/>
            3. Type of the question will be mentioned along with the question.<br/>
            4. One question can be attempted only once.<br/>
            5. You will find the answers/solutions along with the question upon submitting your answer.<br/>
          </p>
          <DialogClose 
            onClick={() => dispatch(closeInstructions())}
            className="mt-6 btn cursor-pointer btn-primary bg-gradient-to-r from-blue-400 to-teal-400 text-white rounded"
          >
            Close
          </DialogClose>
        </DialogContent>
      </Dialog>
    </header>
  )
}
