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
    class="sticker inline-flex items-center justify-center transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
  >
    <slot />
  </button>
</template>
