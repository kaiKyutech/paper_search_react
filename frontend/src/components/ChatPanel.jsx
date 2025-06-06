import { useState } from 'react'

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

  if (!paper) return <p>論文を選択してください</p>

  return (
    <div className="chat-panel">
      <h2>{paper.title}</h2>
      <div className="chat-history">
        {history.map((msg, idx) => (
          <div key={idx} className={msg.role}>{msg.content}</div>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} />
      <button onClick={send}>送信</button>
    </div>
  )
}
