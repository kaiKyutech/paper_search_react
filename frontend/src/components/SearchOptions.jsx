import { useState } from 'react'

export default function SearchOptions({ onChange }) {
  const [numPapers, setNumPapers] = useState(10)
  const [yearFrom, setYearFrom] = useState(2020)
  const [yearTo, setYearTo] = useState(2025)
  const [engine, setEngine] = useState('semantic')

  const notify = () => {
    onChange({ numPapers, yearFrom, yearTo, engine })
  }

  return (
    <div className="search-options">
      <div>
        <label>検索数: {numPapers}
          <input
            type="range"
            min="1"
            max="50"
            value={numPapers}
            onChange={(e) => { setNumPapers(Number(e.target.value)); notify() }}
          />
        </label>
      </div>
      <div>
        <label>開始年: {yearFrom}
          <input
            type="number"
            value={yearFrom}
            min="1970"
            max="2025"
            onChange={(e) => { setYearFrom(Number(e.target.value)); notify() }}
          />
        </label>
        <label>終了年: {yearTo}
          <input
            type="number"
            value={yearTo}
            min="1970"
            max="2025"
            onChange={(e) => { setYearTo(Number(e.target.value)); notify() }}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="engine"
            value="semantic"
            checked={engine === 'semantic'}
            onChange={() => { setEngine('semantic'); notify() }}
          />
          semantic scholar
        </label>
        <label>
          <input
            type="radio"
            name="engine"
            value="google"
            checked={engine === 'google'}
            onChange={() => { setEngine('google'); notify() }}
          />
          Google Scholar
        </label>
      </div>
    </div>
  )
}
