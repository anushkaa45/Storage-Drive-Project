import { useRef, useState } from 'react'
import { downloadFile } from '../../services/driveApi.js'
import Button from '../ui/Button.jsx'
import EmptyState from './EmptyState.jsx'
import ErrorState from './ErrorState.jsx'
import FileGrid from './FileGrid.jsx'
import FileTable from './FileTable.jsx'
import LoadingState from './LoadingState.jsx'

export default function ExplorerLayout({ items, folderStack, currentFolder, onNavigate, onNavigateToBreadcrumb, onCreateFolder, onUpload, onDelete, onRefresh, loading, error }) {
  const inputRef = useRef(null)
  const mutationLock = useRef(false)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState('')
  const [folderDialog, setFolderDialog] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [view, setView] = useState('list')
  const notice = actionError || error

  async function runAction(action) {
    if (mutationLock.current) return
    mutationLock.current = true
    setBusy(true)
    setActionError('')
    try { await action() } catch (e) { setActionError(e.message) } finally { mutationLock.current = false; setBusy(false) }
  }

  async function uploadSelected(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) await runAction(() => onUpload(file))
  }

  async function submitFolder(event) {
    event.preventDefault()
    const name = folderName.trim()
    if (!name) return
    await runAction(async () => {
      await onCreateFolder(name)
      setFolderDialog(false)
      setFolderName('')
    })
  }

  async function removeItem(item) {
    if (!window.confirm(`Delete “${item.name}”?`)) return
    await runAction(() => onDelete(item))
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => onNavigate(null)} aria-label="Go to My Drive">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span className="brand-name">
  Drive<strong>Sphere</strong>
</span>
        </button>
       <div className="header-center-label">
  Your files. Your space. Anywhere.
</div>
      </header>

      <aside className="sidebar">
        <Button className="new-button" onClick={() => { setFolderName(''); setFolderDialog(true) }} disabled={busy}>
          <span className="new-plus" aria-hidden="true">＋</span> New folder
        </Button>
        <nav className="side-nav" aria-label="Main navigation">
          <button className={`nav-item ${currentFolder ? '' : 'active'}`} onClick={() => onNavigate(null)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 10 8.5-7 8.5 7v10a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" /><path d="M9 21v-7h6v7" /></svg>
            My Drive
          </button>
          {currentFolder && <div className="folder-context"><span className="folder-context-icon">▰</span><span title={currentFolder.name}>{currentFolder.name}</span></div>}
        </nav>
        <div className="sidebar-footer">
  <span className="sidebar-footer-icon">◇</span>
  <span>DriveSphere</span>
</div>
      </aside>

      <main className="main-content">
        <div className="breadcrumbs-row">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <button onClick={() => onNavigate(null)}>My Drive</button>
            {folderStack.map((folder, index) => <span className="breadcrumb-segment" key={folder.id}><span aria-hidden="true">›</span><button className={`crumb-button ${index === folderStack.length - 1 ? 'current-crumb' : ''}`} onClick={() => onNavigateToBreadcrumb(index)}>{folder.name}</button></span>)}
          </nav>
        </div>

        <div className="main-toolbar">
          <h1>{currentFolder?.name || 'My Drive'}</h1>
          <div className="toolbar-actions">
            <span className="toolbar-separator" />
            <div className="view-switch" role="group" aria-label="File layout">
              <button className={view === 'list' ? 'selected' : ''} aria-label="List view" aria-pressed={view === 'list'} onClick={() => setView('list')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12"/><path d="M3.5 6h.1M3.5 12h.1M3.5 18h.1"/></svg></button>
              <button className={view === 'grid' ? 'selected' : ''} aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/></svg></button>
            </div>
            <Button variant="secondary" onClick={() => inputRef.current?.click()} disabled={busy}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v5.5h14V14" /></svg> Upload
            </Button>
            <input ref={inputRef} className="visually-hidden" type="file" onChange={uploadSelected} />
          </div>
        </div>

        <section className="content-card" aria-label="Files and folders">
          <div className="content-meta"><span>{items.length} {items.length === 1 ? 'item' : 'items'}</span><span className="sort-label">Name · A–Z</span></div>
          {notice && <ErrorState message={notice} onRetry={() => { setActionError(''); onRefresh() }} />}
          {loading ? <LoadingState /> : !notice && items.length === 0 ? <EmptyState /> : !notice && (
            view === 'grid'
              ? <FileGrid items={items} onOpenFolder={onNavigate} onDownload={(item) => runAction(() => downloadFile(item))} onDelete={removeItem} busy={busy} />
              : <FileTable items={items} onOpenFolder={onNavigate} onDownload={(item) => runAction(() => downloadFile(item))} onDelete={removeItem} busy={busy} />
          )}
          {busy && <div className="busy-caption" role="status">Waiting for Drive-Service…</div>}
        </section>
        <footer className="page-footer">
  <span>DriveSphere</span>
  <span>Your personal cloud storage</span>
</footer>
      </main>

      {folderDialog && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setFolderDialog(false) }}>
        <form className="modal" role="dialog" aria-modal="true" aria-labelledby="folder-modal-title" onSubmit={submitFolder}>
          <div className="modal-icon"><span>＋</span></div><h2 id="folder-modal-title">New folder</h2><p>Create a folder in {currentFolder?.name || 'My Drive'}.</p>
          <label className="field-label" htmlFor="folder-name">Folder name</label>
          <input autoFocus id="folder-name" className="text-field" value={folderName} onChange={(event) => setFolderName(event.target.value)} maxLength={255} required />
          <div className="modal-actions"><Button type="button" variant="quiet" onClick={() => setFolderDialog(false)}>Cancel</Button><Button type="submit" disabled={!folderName.trim() || busy}>{busy ? 'Creating…' : 'Create'}</Button></div>
        </form>
      </div>}
    </div>
  )
}
