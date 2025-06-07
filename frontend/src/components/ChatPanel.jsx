import { useState } from 'react'
import { Box, Typography, TextField, Button, Paper } from '@mui/material'

export default function ChatPanel({ paper }) {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')

  const send = async () => {
    if (!input) return
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input, paper })
    })
    const data = await resp.json()
    setHistory([...history, { role: 'user', content: input }, { role: 'assistant', content: data.answer }])
    setInput('')
  }

  if (!paper) return <Typography>論文を選択してください</Typography>

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>{paper.title}</Typography>
      <Paper variant="outlined" sx={{ p: 1, mb: 1, maxHeight: 200, overflow: 'auto' }}>
        {history.map((msg, idx) => (
          <Typography key={idx} sx={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            {msg.content}
          </Typography>
        ))}
      </Paper>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button variant="contained" onClick={send}>送信</Button>
    </Box>
  )
}
