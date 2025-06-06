import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('keyword')

  const triggerSearch = () => {
    if (!query) return
    onSearch({ query, mode })
  }

  return (
    <div className="search-bar">
      <div>
        <label>
          <input
            type="radio"
            name="mode"
            value="keyword"
            checked={mode === 'keyword'}
            onChange={() => setMode('keyword')}
          />
          キーワード検索
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="ai1"
            checked={mode === 'ai1'}
            onChange={() => setMode('ai1')}
          />
          AI検索1
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="ai2"
            checked={mode === 'ai2'}
            onChange={() => setMode('ai2')}
          />
          AI検索2
        </label>
      </div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ここに入力..."
        rows={3}
      />
      <button onClick={triggerSearch}>検索</button>
    </div>
  )
}
