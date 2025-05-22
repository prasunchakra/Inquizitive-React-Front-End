import React, { useState, useEffect } from 'react'
import Header from '../components/home/Header'
import SearchBar from '../components/home/SearchBar'
import QuizList from '../components/home/QuizList'
import { fetchQuizzes } from '../services/quizListService'

export default function HomePage() {
  const [quizzes, setQuizzes] = useState([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchQuizzes()
      .then(setQuizzes)
      .catch(err => setError(err.message))
  }, [])

  const filtered = quizzes.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8 space-y-8">
        <section className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Welcome to InQuizitive</h1>
          <p className="text-gray-600 text-lg">
            The ultimate exam ground for every exam that matters.
          </p>
        </section>

        <SearchBar value={search} onChange={setSearch} />

        {error && (
          <p className="text-red-500 text-center">Error: {error}</p>
        )}

        <QuizList quizzes={filtered} />
      </main>
    </div>
  )
}
