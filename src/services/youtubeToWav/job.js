export const POLL_INTERVAL_MS = 1500

export function extractJobId(payload) {
  return payload?.jobId || payload?.id || payload?.data?.jobId || payload?.data?.id || null
}

export function extractStatus(payload) {
  return String(payload?.status || payload?.state || payload?.data?.status || '').toLowerCase()
}

export function isCompletedStatus(status) {
  return ['completed', 'complete', 'done', 'success', 'ready'].includes(status)
}

export function isFailedStatus(status) {
  return ['failed', 'error', 'cancelled'].includes(status)
}
