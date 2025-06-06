import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Paper Search</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="query" />
      <button onClick={search}>Search</button>
      {loading && <p>loading...</p>}
      <ul>
        {results.map(paper => (
          <li key={paper.paperId}>
            <a href={paper.url} target="_blank" rel="noreferrer">{paper.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
