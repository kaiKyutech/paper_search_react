import { useState } from 'react'
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from '@mui/material'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('keyword')

  const triggerSearch = () => {
    if (!query) return
    onSearch({ query, mode })
  }

  return (
    <Box sx={{ mb: 2 }}>
      <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value)}>
        <FormControlLabel value="keyword" control={<Radio />} label="キーワード検索" />
        <FormControlLabel value="ai1" control={<Radio />} label="AI検索1" />
        <FormControlLabel value="ai2" control={<Radio />} label="AI検索2" />
      </RadioGroup>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ここに入力..."
        multiline
        rows={3}
        fullWidth
        sx={{ my: 1 }}
      />
      <Button variant="contained" onClick={triggerSearch}>
        検索
      </Button>
    </Box>
  )
}
