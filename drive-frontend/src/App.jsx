import { useCallback, useEffect, useRef, useState } from 'react'
import ExplorerLayout from './components/explorer/ExplorerLayout.jsx'
import { createFolder, deleteItem, listItems, uploadFile } from './services/driveApi.js'

export default function App() {
  const [items, setItems] = useState([])
  const [folderStack, setFolderStack] = useState([])
  const currentFolder = folderStack.at(-1) ?? null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const requestGeneration = useRef(0)

  const refresh = useCallback(async () => {
    const generation = ++requestGeneration.current
    setLoading(true)
    setError('')
    try {
      const nextItems = await listItems(currentFolder?.id ?? null)
      if (generation === requestGeneration.current) setItems(nextItems)
    } catch (requestError) {
      if (generation === requestGeneration.current) setError(requestError.message)
    } finally {
      if (generation === requestGeneration.current) setLoading(false)
    }
  }, [currentFolder])

  function navigateTo(folder) {
    if (!folder) {
      setFolderStack([])
      return
    }
    setFolderStack((stack) => [...stack, folder])
  }

  function navigateToBreadcrumb(index) {
    setFolderStack((stack) => stack.slice(0, index + 1))
  }

  useEffect(() => { refresh() }, [refresh])

  async function handleCreateFolder(name) {
    await createFolder(name, currentFolder?.id ?? null)
    return refresh()
  }

  async function handleUpload(file) {
    await uploadFile(file, currentFolder?.id ?? null)
    return refresh()
  }

  async function handleDelete(item) {
    await deleteItem(item.id)
    return refresh()
  }

  return (
    <ExplorerLayout
      items={items}
      currentFolder={currentFolder}
      folderStack={folderStack}
      onNavigate={navigateTo}
      onNavigateToBreadcrumb={navigateToBreadcrumb}
      onCreateFolder={handleCreateFolder}
      onUpload={handleUpload}
      onDelete={handleDelete}
      onRefresh={refresh}
      loading={loading}
      error={error}
    />
  )
}
