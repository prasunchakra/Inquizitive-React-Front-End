import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startTimer, tick } from '../store/quizSlice'
import ExamLayout from '../components/quiz/ExamLayout'

export default function ExamPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startTimer())
    const interval = setInterval(() => dispatch(tick()), 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  return <ExamLayout />
}
