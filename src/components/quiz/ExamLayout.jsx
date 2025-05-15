import React from 'react'
import Header from './Header'
import SubjectTabs from './SubjectTabs'
import QuestionDisplay from './QuestionDisplay'
import QuestionActions from './QuestionActions'
import QuestionNavigator from './QuestionNavigator'
import QuestionPalette from './QuestionPalette'

export default function ExamLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <SubjectTabs />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto">
          <QuestionDisplay />
          <QuestionActions />
          <QuestionNavigator />
        </main>
        <aside className="w-64 border-l p-4 overflow-auto">
          <QuestionPalette />
        </aside>
      </div>
    </div>
  )
}
