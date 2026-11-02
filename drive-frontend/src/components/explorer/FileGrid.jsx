import FileTypeIcon from './FileTypeIcon.jsx'
import ItemActions from './ItemActions.jsx'
import { formatBytes, formatDate } from '../../utils/format.js'

export default function FileGrid({ items, onOpenFolder, onDownload, onDelete, busy }) {
  return <div className="file-grid">{items.map((item) => {
    const folder = item.kind === 'FOLDER'
    return <article className="file-card" key={item.id}>
      <div className="file-card-top"><FileTypeIcon item={item} large /><ItemActions item={item} onDownload={onDownload} onDelete={onDelete} busy={busy} /></div>
      {folder ? <button className="file-card-name folder-link" onClick={() => onOpenFolder(item)} title={item.name}>{item.name}</button> : <div className="file-card-name" title={item.name}>{item.name}</div>}
      <div className="file-card-detail">{folder ? 'Folder' : formatBytes(item.size)} <span>·</span> {formatDate(item.createdAt)}</div>
    </article>
  })}</div>
}
