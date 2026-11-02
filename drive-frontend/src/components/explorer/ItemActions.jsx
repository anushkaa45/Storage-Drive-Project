export default function ItemActions({ item, onDownload, onDelete, busy }) {
  return <div className="row-actions">
    {item.kind === 'FILE' && <button type="button" title="Download file" aria-label={`Download ${item.name}`} disabled={busy} onClick={() => onDownload(item)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v12m0 0 4.5-4.5M12 15.5 7.5 11M5 17v3h14v-3" /></svg></button>}
    <button type="button" title="Delete item" aria-label={`Delete ${item.name}`} disabled={busy} onClick={() => onDelete(item)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7h15M9 7V4.5h6V7m-8.5 0 .8 13h9.4l.8-13M10 10.5v6m4-6v6" /></svg></button>
  </div>
}
