import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search exams..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}
