import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import PaperList from './components/PaperList.jsx'
import { Container, Box } from '@mui/material'

function App() {
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    setSearched(true)
    try {
      const params = new URLSearchParams({ query })
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
    <Container maxWidth="md" className="App">
      <Box sx={{ mt: searched ? 2 : 20, mb: 4 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      {loading && <p>検索中...</p>}
      <PaperList papers={papers} />
    </Container>
  )
}

export default App
