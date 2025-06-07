import { useState } from 'react'
import {
  Box,
  Slider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material'

export default function SearchOptions({ onChange }) {
  const [numPapers, setNumPapers] = useState(10)
  const [yearFrom, setYearFrom] = useState(2020)
  const [yearTo, setYearTo] = useState(2025)
  const [engine, setEngine] = useState('semantic')

  const notify = (updates = {}) => {
    onChange({ numPapers, yearFrom, yearTo, engine, ...updates })
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography gutterBottom>検索数: {numPapers}</Typography>
      <Slider
        value={numPapers}
        min={1}
        max={50}
        onChange={(_, v) => { setNumPapers(v); notify({ numPapers: v }) }}
      />
      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <TextField
          label="開始年"
          type="number"
          value={yearFrom}
          onChange={(e) => { const v = Number(e.target.value); setYearFrom(v); notify({ yearFrom: v }) }}
        />
        <TextField
          label="終了年"
          type="number"
          value={yearTo}
          onChange={(e) => { const v = Number(e.target.value); setYearTo(v); notify({ yearTo: v }) }}
        />
      </Box>
      <RadioGroup
        row
        value={engine}
        onChange={(e) => { const val = e.target.value; setEngine(val); notify({ engine: val }) }}
      >
        <FormControlLabel value="semantic" control={<Radio />} label="semantic scholar" />
        <FormControlLabel value="google" control={<Radio />} label="Google Scholar" />
      </RadioGroup>
    </Box>
  )
}
