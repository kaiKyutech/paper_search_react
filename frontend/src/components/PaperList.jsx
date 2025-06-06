export default function PaperList({ papers, onSelect }) {
  if (!papers || papers.length === 0) {
    return <p>結果がありません</p>
  }
  return (
    <ul className="paper-list">
      {papers.map((p, i) => (
        <li key={i} onClick={() => onSelect(p)}>
          <strong>{p.title}</strong>
          <p>{p.abstract}</p>
        </li>
      ))}
    </ul>
  )
}
