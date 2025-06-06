import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query) return
    setLoading(true)
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>Paper Search</h1>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search papers"
        />
        <button onClick={search}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((paper) => (
          <li key={paper.paperId}>
            <a href={paper.url} target="_blank" rel="noreferrer">
              {paper.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
