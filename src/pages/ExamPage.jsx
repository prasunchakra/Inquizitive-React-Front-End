import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { startTimer, tick, loadQuestions } from '../store/quizSlice'
import ExamLayout from '../components/quiz/ExamLayout'

export default function ExamPage() {
  const dispatch = useDispatch()
  const timerRef = useRef(null)

  useEffect(() => {
    dispatch(loadQuestions())
      .unwrap()
      .then(() => {
        dispatch(startTimer())
        timerRef.current = setInterval(() => dispatch(tick()), 100)
      })
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [dispatch])

  return <ExamLayout />
}
