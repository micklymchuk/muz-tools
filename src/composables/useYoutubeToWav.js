import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import {
  POLL_INTERVAL_MS,
  createAsyncSource,
  createYoutubeToWavJob,
  downloadYoutubeToWavFile,
  extractJobId,
  extractStatus,
  fetchCapabilities,
  fetchYoutubeToWavJob,
  getDownloadFileName,
  isCompletedStatus,
  isFailedStatus,
  triggerDownload,
} from '../services/youtubeToWav'

export function useYoutubeToWav() {
  const url = ref('')
  const currentJobId = ref('')
  const currentStatus = ref('')
  const errorMessage = ref('')
  const capabilitiesReady = ref(false)

  let pollTimerId = null

  function setError(error) {
    errorMessage.value = error instanceof Error ? error.message : 'Request failed'
  }

  const capabilitiesSource = reactive(createAsyncSource(fetchCapabilities, setError))
  const createJobSource = reactive(createAsyncSource(createYoutubeToWavJob, setError))
  const jobSource = reactive(createAsyncSource(fetchYoutubeToWavJob, setError))
  const fileSource = reactive(createAsyncSource(downloadYoutubeToWavFile, setError))

  const isYoutubeUrl = computed(() => {
    if (!url.value.trim()) return false
    return /(?:youtube\.com|youtu\.be)/i.test(url.value)
  })

  const isLoading = computed(
    () =>
      capabilitiesSource.isLoading ||
      createJobSource.isLoading ||
      jobSource.isLoading ||
      fileSource.isLoading,
  )

  const supportsWav = computed(() => {
    const capabilities = capabilitiesSource.data

    if (!capabilitiesReady.value || !capabilities) {
      return true
    }

    const formats = capabilities.formats || capabilities.outputFormats || capabilities.supportedFormats

    if (!Array.isArray(formats) || formats.length === 0) {
      return true
    }

    return formats.some((format) => String(format).toLowerCase() === 'wav')
  })

  const isSubmitDisabled = computed(
    () => !isYoutubeUrl.value || isLoading.value || !supportsWav.value,
  )

  const actionLabel = computed(() => {
    if (fileSource.isLoading) return 'Downloading WAV...'
    if (jobSource.isLoading || createJobSource.isLoading) return 'Preparing WAV...'
    if (capabilitiesSource.isLoading) return 'Loading...'
    return isYoutubeUrl.value ? 'Download WAV' : 'Paste a YouTube link'
  })

  const statusText = computed(() => {
    if (errorMessage.value) return ''
    if (capabilitiesSource.isLoading) return 'Checking service capabilities...'
    if (!supportsWav.value) return 'This service does not currently report WAV support.'
    if (fileSource.isLoading) return 'Downloading file...'
    if (currentStatus.value) return `Job status: ${currentStatus.value}`
    return 'Format: WAV'
  })

  function stopPolling() {
    if (pollTimerId) {
      window.clearTimeout(pollTimerId)
      pollTimerId = null
    }
  }

  async function loadCapabilities() {
    errorMessage.value = ''
    await capabilitiesSource.updateImmediate()
    capabilitiesReady.value = true
  }

  async function downloadFile(jobId) {
    await fileSource.updateImmediate(jobId)

    if (fileSource.data instanceof Blob) {
      triggerDownload(fileSource.data, getDownloadFileName(jobId))
    }
  }

  async function pollJob(jobId) {
    await jobSource.updateImmediate(jobId)

    const status = extractStatus(jobSource.data)
    currentStatus.value = status || 'processing'

    if (isCompletedStatus(status)) {
      stopPolling()
      await downloadFile(jobId)
      currentStatus.value = 'completed'
      return
    }

    if (isFailedStatus(status)) {
      stopPolling()
      throw new Error('Conversion failed')
    }

    pollTimerId = window.setTimeout(() => {
      pollJob(jobId).catch(setError)
    }, POLL_INTERVAL_MS)
  }

  async function handleSubmit() {
    if (isSubmitDisabled.value) return

    errorMessage.value = ''
    currentStatus.value = ''
    stopPolling()

    try {
      await createJobSource.updateImmediate(url.value.trim())

      const jobId = extractJobId(createJobSource.data)

      if (!jobId) {
        throw new Error('Job ID was not returned by the API')
      }

      currentJobId.value = String(jobId)
      currentStatus.value = 'queued'
      await pollJob(currentJobId.value)
    } catch (error) {
      setError(error)
      currentStatus.value = 'failed'
    }
  }

  onMounted(() => {
    loadCapabilities().catch(setError)
  })

  onBeforeUnmount(() => {
    stopPolling()
  })

  return {
    url,
    isYoutubeUrl,
    isLoading,
    actionLabel,
    statusText,
    errorMessage,
    isSubmitDisabled,
    handleSubmit,
  }
}
