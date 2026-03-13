<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center whitespace-nowrap border border-white/80 bg-black px-6 py-4 text-sm font-medium text-white/80 transition hover:text-white/50 hover:border-white/50 disabled:cursor-not-allowed disabled:border-white/20 disabled:text-white/20"
  >
    <slot />
  </button>
</template>
