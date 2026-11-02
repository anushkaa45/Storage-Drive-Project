export default function FileTypeIcon({ item, large = false }) {
  const folder = item.kind === 'FOLDER'
  const type = item.mediaType || ''
  const kind = folder ? 'folder' : type.startsWith('image/') ? 'image' : type.includes('pdf') ? 'pdf' : type.startsWith('video/') ? 'video' : type.startsWith('audio/') ? 'audio' : type.includes('spreadsheet') || type.includes('excel') ? 'sheet' : type.includes('word') || type.includes('document') ? 'doc' : 'file'
  return <span className={`file-icon icon-${kind} ${large ? 'large' : ''}`} aria-hidden="true">
    {folder ? <svg viewBox="0 0 24 24"><path d="M3 7.3A2.3 2.3 0 0 1 5.3 5h4l2 2h7.4A2.3 2.3 0 0 1 21 9.3v8.4a2.3 2.3 0 0 1-2.3 2.3H5.3A2.3 2.3 0 0 1 3 17.7z"/><path d="M3.5 9h17"/></svg>
      : kind === 'image' ? <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m5 17 5-5 3 3 2-2 4 4"/></svg>
      : kind === 'pdf' ? <span className="icon-text">PDF</span>
      : kind === 'video' ? <svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/></svg>
      : kind === 'sheet' ? <span className="icon-text">XLS</span>
      : kind === 'doc' ? <span className="icon-text">DOC</span>
      : kind === 'audio' ? <svg viewBox="0 0 24 24"><path d="M10 18V5l10-2v13"/><circle cx="7" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>
      : <svg viewBox="0 0 24 24"><path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4M9 12h6M9 16h6"/></svg>}
  </span>
}
