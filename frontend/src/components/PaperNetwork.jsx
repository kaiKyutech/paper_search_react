import CytoscapeComponent from 'react-cytoscapejs'
import { useMemo } from 'react'

export default function PaperNetwork({ papers }) {
  const elements = useMemo(() => {
    const els = []
    els.push({ data: { id: 'center', label: 'search' }, position: { x: 0, y: 0 } })
    const radius = 200
    const angleStep = (2 * Math.PI) / (papers?.length || 1)
    papers?.forEach((p, i) => {
      const id = `p${i}`
      const angle = i * angleStep
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      els.push({
        data: { id, label: p.title },
        position: { x, y }
      })
      els.push({ data: { id: `e${i}`, source: 'center', target: id } })
    })
    return els
  }, [papers])

  return (
    <div className="paper-network">
      <CytoscapeComponent elements={elements} style={{ width: '800px', height: '600px' }} layout={{ name: 'preset' }} />
    </div>
  )
}
