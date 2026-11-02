import { request } from '../api/client.js'

export async function listItems(parentId = null) {
  const query = parentId ? `?parentId=${encodeURIComponent(parentId)}` : ''
  return (await request(`/api/items${query}`)).json()
}

export async function createFolder(name, parentId = null) {
  return (await request('/api/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, parentId }),
  })).json()
}

export async function uploadFile(file, parentId = null) {
  const formData = new FormData()
  formData.append('file', file)
  const query = parentId ? `?parentId=${encodeURIComponent(parentId)}` : ''
  return (await request(`/api/files${query}`, { method: 'POST', body: formData })).json()
}

export async function downloadFile(item) {
  const response = await request(`/api/files/download/${encodeURIComponent(item.id)}`)
  const objectUrl = URL.createObjectURL(await response.blob())
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = filenameFromDisposition(response.headers.get('Content-Disposition')) || item.name || 'download'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
}

function filenameFromDisposition(header) {
  if (!header) return null
  const encoded = header.match(/filename\*=UTF-8''([^;]+)/i)
  if (encoded) {
    try { return decodeURIComponent(encoded[1].trim().replace(/^"|"$/g, '')) } catch { /* Fall through to filename=. */ }
  }
  const plain = header.match(/filename="?([^";]+)"?/i)
  return plain?.[1]?.trim() || null
}

export async function deleteItem(id) {
  await request(`/api/items/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
