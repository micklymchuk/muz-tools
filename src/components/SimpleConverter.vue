<script setup>
import BaseButton from './ui/BaseButton.vue'
import BaseInput from './ui/BaseInput.vue'

defineProps({
  url: {
    type: String,
    required: true,
  },
  isYoutubeUrl: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  actionLabel: {
    type: String,
    required: true,
  },
  statusText: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  isSubmitDisabled: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:url', 'submit'])
</script>

<template>
  <p class="text-sm sticker uppercase inline-block mb-6">YouTube to WAV converter</p>
  <section class="w-full border border-white/15 p-4 sm:p-6">
    <div class="mx-auto max-w-3xl">
      <p class="text-sm text-white/70 uppercase">
        Paste a YouTube link and download the audio as a WAV file.
      </p>

      <form class="mt-6 flex flex-col gap-4 sm:flex-row" @submit.prevent="emit('submit')">
        <BaseInput
          :model-value="url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          @update:model-value="emit('update:url', $event)"
        />

        <BaseButton
          type="submit"
          :disabled="isSubmitDisabled"
          class="uppercase"
        >
          {{ actionLabel }}
        </BaseButton>
      </form>

      <p v-if="statusText" class="mt-4 text-xs uppercase tracking-[0.3em] text-white/35">
        {{ statusText }}
      </p>
      <p v-if="errorMessage" class="mt-4 text-sm text-red-300">
        {{ errorMessage }}
      </p>
    </div>
  </section>
</template>
