export async function fetchQuizzes() {
    const res = await fetch('/data/quizzes.json')
    if (!res.ok) {
      throw new Error(`Failed to load quizzes: ${res.statusText}`)
    }
    return res.json()
  }