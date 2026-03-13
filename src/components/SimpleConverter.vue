<script setup>
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
})

const emit = defineEmits(['update:url', 'submit'])
</script>

<template>
  <section class="w-full border border-white/15 bg-white/5 p-6 sm:p-8">
    <div class="mx-auto max-w-3xl">
      <p class="text-sm text-white/70">
        Paste a YouTube link and download the audio as a WAV file.
      </p>

      <form class="mt-6 flex flex-col gap-4 sm:flex-row" @submit.prevent="emit('submit')">
        <input
          :value="url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          class="min-w-0 flex-1 border border-white/15 bg-black px-4 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-white"
          @input="emit('update:url', $event.target.value)"
        />

        <button
          type="submit"
          :disabled="!isYoutubeUrl || isLoading"
          class="inline-flex items-center justify-center whitespace-nowrap border border-white bg-white px-6 py-4 text-sm font-medium text-black transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-white/20 disabled:bg-white/10 disabled:text-white/35"
        >
          {{ actionLabel }}
        </button>
      </form>

      <p class="mt-4 text-xs uppercase tracking-[0.3em] text-white/35">Format: WAV</p>
    </div>
  </section>
</template>
