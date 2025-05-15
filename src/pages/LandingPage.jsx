import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

export default function LandingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const title = searchParams.get('title') || 'Civil Services (Preliminary) Examination'

  const [countdown, setCountdown] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    let timer
    if (started && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (started && countdown === 0) {
      navigate('/exam')
    }
    return () => clearTimeout(timer)
  }, [started, countdown, navigate])

  const handleStart = () => {
    setStarted(true)
    setCountdown(5) 
  }

  const instructions = [
    "There is all time limit to attempt the questions in this assignment.",
    "Questions can be single/multiple choice, short text or numeric.",
    "Type of the question will be mentioned along with the question.",
    "One question can be attempted only once.",
    "You will find the answers/solutions along with the question upon submitting your answer."
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="mb-6 text-gray-700">Read the instructions carefully.</p>
      <ol className="list-decimal list-inside mb-8 space-y-2 text-gray-600">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <Button onClick={handleStart}
        disabled={started}
        className={`
          px-12 py-4 rounded-full text-white text-lg
          ${started
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-400 to-teal-400'}
        `}>
        START TEST
      </Button>
      {started && (
        <p className="mt-4 text-gray-800">
          Get ready! Starting test… in{' '}
          <span className="font-mono">{String(countdown).padStart(2, '0')}</span>
        </p>
      )}
    </div>
  )
}
