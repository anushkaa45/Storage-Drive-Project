const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8091'
export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '')

export async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, options)
  } catch {
    throw new Error(`Could not reach the Drive API at ${API_BASE_URL}. Check that the backend is running and CORS allows this frontend origin.`)
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      message = body.detail || body.message || body.title || message
    } catch { /* Some error responses have no JSON body. */ }
    throw new Error(message)
  }
  return response
}
