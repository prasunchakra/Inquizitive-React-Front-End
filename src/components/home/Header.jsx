import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  // TODO: replace with real auth state
  const isLoggedIn = false

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
        {/* <img src="/logo192.png" alt="InQuizitive Logo" className="w-8 h-8"/> */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" />
            <path d="M12 18.01L12.01 17.9989" />
        </svg>
        <span className="text-2xl font-bold text-blue-600">InQuizitive</span>
        </Link>
        {isLoggedIn ? (
          <button className="text-blue-600 hover:underline">Logout</button>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
