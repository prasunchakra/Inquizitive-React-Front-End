export async function fetchQuestions() {
    const res = await fetch('/data/questions.json')
    console.log("RES",res)
    if (!res.ok) {
      throw new Error(`Failed to load questions: ${res.statusText}`)
    }
    return res.json()
  }