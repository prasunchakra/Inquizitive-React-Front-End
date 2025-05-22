export async function fetchQuestions() {
    const res = await fetch('http://127.0.0.1:8000/api/quizzes/30103691-4d0d-472f-88e8-edda0160b76f')
    if (!res.ok) {
      throw new Error(`Failed to load questions: ${res.statusText}`)
    }
    return res.json()
}