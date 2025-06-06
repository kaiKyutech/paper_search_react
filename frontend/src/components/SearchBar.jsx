import { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const triggerSearch = () => {
    if (!query.trim()) return
    onSearch(query)
  }

  return (
    <Stack direction="row" spacing={2} className="search-bar">
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="論文を検索..."
        size="small"
      />
      <Button variant="contained" onClick={triggerSearch}>検索</Button>
    </Stack>
  )
}
