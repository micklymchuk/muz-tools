<script setup>
import SimpleConverter from './SimpleConverter.vue'
import { useYoutubeToWav } from '../composables/useYoutubeToWav'

const {
  url,
  isYoutubeUrl,
  isLoading,
  actionLabel,
  statusText,
  errorMessage,
  isSubmitDisabled,
  handleSubmit,
} = useYoutubeToWav()
</script>

<template>
  <div class="flex flex-1 flex-col items-start justify-center py-6">
    <SimpleConverter
      v-model:url="url"
      :is-youtube-url="isYoutubeUrl"
      :is-loading="isLoading"
      :action-label="actionLabel"
      :status-text="statusText"
      :error-message="errorMessage"
      :is-submit-disabled="isSubmitDisabled"
      @submit="handleSubmit"
    />
  </div>
</template>
