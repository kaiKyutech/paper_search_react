import { List, ListItem, ListItemText, Paper } from '@mui/material'

export default function PaperList({ papers = [], onSelect }) {
  if (!papers.length) {
    return <p>結果がありません</p>
  }
  return (
    <List className="paper-list">
      {papers.map((p, i) => (
        <Paper key={i} sx={{ mb: 2 }}>
          <ListItem button onClick={() => onSelect && onSelect(p)} alignItems="flex-start">
            <ListItemText primary={p.title} secondary={p.abstract} />
          </ListItem>
        </Paper>
      ))}
    </List>
  )
}
