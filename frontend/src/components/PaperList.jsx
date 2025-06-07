import { List, ListItem, ListItemText } from '@mui/material'

export default function PaperList({ papers, onSelect }) {
  if (!papers || papers.length === 0) {
    return <p>結果がありません</p>
  }
  return (
    <List>
      {papers.map((p, i) => (
        <ListItem key={i} button onClick={() => onSelect(p)}>
          <ListItemText primary={p.title} secondary={p.abstract} />
        </ListItem>
      ))}
    </List>
  )
}
