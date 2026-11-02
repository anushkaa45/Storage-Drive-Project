import FileTypeIcon from './FileTypeIcon.jsx'
import ItemActions from './ItemActions.jsx'
import { formatBytes, formatDate } from '../../utils/format.js'

export default function FileTable({ items, onOpenFolder, onDownload, onDelete, busy }) {
  return <div className="table-wrap"><table className="file-table"><thead><tr><th className="name-column">Name</th><th>Kind</th><th>Size</th><th>Created</th><th><span className="visually-hidden">Actions</span></th></tr></thead><tbody>
    {items.map((item) => {
      const folder = item.kind === 'FOLDER'
      return <tr key={item.id}>
        <td><div className="name-cell"><FileTypeIcon item={item} />{folder ? <button className="name-button" onClick={() => onOpenFolder(item)}>{item.name}</button> : <span className="file-name" title={item.name}>{item.name}</span>}</div></td>
        <td><span className="type-label">{folder ? 'Folder' : item.mediaType?.split('/').pop()?.toUpperCase() || 'File'}</span></td>
        <td className="muted-cell">{folder ? '—' : formatBytes(item.size)}</td>
        <td className="muted-cell">{formatDate(item.createdAt)}</td>
        <td><ItemActions item={item} onDownload={onDownload} onDelete={onDelete} busy={busy} /></td>
      </tr>
    })}
  </tbody></table></div>
}
