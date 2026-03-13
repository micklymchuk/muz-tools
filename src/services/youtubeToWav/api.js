const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080') +
  '/api/v1/tools/youtube-to-wav'

async function parseError(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const payload = await response.json().catch(() => null)
    const message = payload?.message || payload?.error || payload?.detail

    if (message) {
      throw new Error(message)
    }
  }

  const text = await response.text().catch(() => '')
  throw new Error(text || `Request failed with status ${response.status}`)
}

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    await parseError(response)
  }

  return response.json()
}

async function requestBlob(path) {
  const response = await fetch(`${API_BASE}${path}`)

  if (!response.ok) {
    await parseError(response)
  }

  return response.blob()
}

export function fetchCapabilities() {
  return requestJson('/capabilities')
}

export function createYoutubeToWavJob(youtubeUrl) {
  return requestJson('/jobs', {
    method: 'POST',
    body: JSON.stringify({ youtubeUrl }),
  })
}

export function fetchYoutubeToWavJob(jobId) {
  return requestJson(`/jobs/${jobId}`)
}

export function downloadYoutubeToWavFile(jobId) {
  return requestBlob(`/jobs/${jobId}/file`)
}
