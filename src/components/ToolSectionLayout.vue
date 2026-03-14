<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="w-full">
    <p class="mb-6 inline-block text-sm sticker-secondary uppercase">
      {{ title }}
    </p>
    <section class="w-full border border-white/15 p-4 sm:p-6">
      <slot />
    </section>
  </div>
</template>
