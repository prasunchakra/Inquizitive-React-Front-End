import React from 'react'
import { useSelector } from 'react-redux'

export default function ResultPage() {
  const { questions, answers, quizInfo } = useSelector(s => s.quiz)
  const total = questions.length
  const answered = Object.values(answers).filter(a => a.answer != null).length
  const left = total - answered

  const correct = 0
  const incorrect = answered - correct

  const timeTaken = `02:59:59`

  const bySubj = questions.reduce((acc, q) => {
    if (!acc[q.subject]) acc[q.subject] = []
    acc[q.subject].push(q)
    return acc
  }, {})

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{quizInfo.name}</h1>
          {/* <Link to="/exam" className="text-blue-600 underline text-sm">Re-Attempt Test</Link> */}
        </div>
        <div className="text-right">
          <p>Total Time: {quizInfo.duration}</p>
          <p>Total Marks: {quizInfo.totalMarks}</p>
        </div>
      </header>

      {/* Summary Stats */}
      <section className="border rounded-lg p-4 space-y-4">
        <div className="flex justify-between text-center">
          <div>
            <p className="text-4xl font-bold">{correct}</p>
            <p className="text-gray-600">Correct</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{incorrect}</p>
            <p className="text-gray-600">Incorrect</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{left}</p>
            <p className="text-gray-600">Left</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{total}</p>
            <p className="text-gray-600">Total</p>
          </div>
        </div>
        <p className="text-right text-sm text-gray-500">Time Taken: {timeTaken}</p>
      </section>

      {/* Subject Breakdown */}
      <section className="space-y-4">
        {Object.entries(bySubj).map(([subj, qs]) => {
          const subTotal = qs.length
          const subAnswered = qs.filter(q => answers[q.id]?.answer != null).length
          const subLeft = subTotal - subAnswered
          // placeholders for per-subject correct/inc
          const subCorrect = 0
          const subIncorrect = subAnswered - subCorrect

          return (
            <div key={subj} className="border rounded-lg p-4">
              <h2 className="font-semibold">{subj}</h2>
              <div className="flex justify-between mt-2">
                <div>{subCorrect} Correct</div>
                <div>{subIncorrect} Incorrect</div>
                <div>{subLeft} Left</div>
                <div>{subTotal} Total</div>
              </div>
            </div>
          )
        })}
      </section>

      {/* View Answers Tab */}
      <section>
        <nav className="flex space-x-4 border-b">
          <button className="py-2 px-4 bg-blue-200 rounded-t">Your Performance</button>
          <button className="py-2 px-4">Your Answers</button>
        </nav>
        {/* content would switch here */}
      </section>
    </div>
  )
}
