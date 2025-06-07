import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import SearchOptions from './components/SearchOptions.jsx'
import PaperList from './components/PaperList.jsx'
import ChatPanel from './components/ChatPanel.jsx'
import PaperNetwork from './components/PaperNetwork.jsx'

function App() {
  const [options, setOptions] = useState({})
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState(null)

  const handleSearch = async ({ query }) => {
    setLoading(true)
    setSelectedPaper(null)
    try {
      const params = new URLSearchParams({
        query,
        year_from: options.yearFrom || 2020,
        year_to: options.yearTo || 2025,
        limit: options.numPapers || 10,
      })
      const res = await fetch(`/api/search?${params}`)
      const data = await res.json()
      setPapers(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <h1>論文検索</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchOptions onChange={setOptions} />
      {loading && <p>検索中...</p>}
      <PaperNetwork papers={papers} />
      <PaperList papers={papers} onSelect={setSelectedPaper} />
      <ChatPanel paper={selectedPaper} />
      </div>
  )
}

export default App
