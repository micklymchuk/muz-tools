<script setup>
import InlineButton from './ui/InlineButton.vue'

const donationUrl = import.meta.env.VITE_DONATION_URL || ''
</script>

<template>
  <footer
    class="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-end px-4 pb-4"
  >
    <InlineButton
      :href="donationUrl"
      :disabled="!donationUrl"
      :target="donationUrl ? '_blank' : '_self'"
      variant="secondary"
      aria-label="Support the project"
      class="pointer-events-auto text-sm uppercase"
    >
      Donate
    </InlineButton>
  </footer>
</template>
