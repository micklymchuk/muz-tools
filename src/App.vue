<script setup>
import { computed, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import SimpleConverter from './components/SimpleConverter.vue'

const url = ref('')
const isLoading = ref(false)

const isYoutubeUrl = computed(() => {
  if (!url.value.trim()) return false
  return /(?:youtube\.com|youtu\.be)/i.test(url.value)
})

const actionLabel = computed(() => {
  if (isLoading.value) return 'Preparing WAV...'
  return isYoutubeUrl.value ? 'Download WAV' : 'Paste a YouTube link'
})

function handleSubmit() {
  if (!isYoutubeUrl.value || isLoading.value) return
  isLoading.value = true

  window.setTimeout(() => {
    isLoading.value = false
  }, 1600)
}
</script>

<template>
  <main class="min-h-screen bg-black text-white">
    <section class="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <AppHeader />

      <div class="flex flex-1 items-center justify-center">
        <SimpleConverter
          v-model:url="url"
          :is-youtube-url="isYoutubeUrl"
          :is-loading="isLoading"
          :action-label="actionLabel"
          @submit="handleSubmit"
        />
      </div>
    </section>
  </main>
</template>
