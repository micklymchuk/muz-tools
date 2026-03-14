<script setup>
import { RouterLink } from 'vue-router'
import InlineButton from './ui/InlineButton.vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  mobile: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    :class="
      mobile
        ? 'flex flex-wrap items-start gap-3'
        : 'flex items-center gap-3'
    "
  >
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      custom
      v-slot="{ href, navigate, isActive }"
    >
      <InlineButton
        :href="href"
        :variant="isActive ? 'primary' : 'secondary'"
        :class="
          mobile
            ? 'justify-start px-2 text-sm uppercase'
            : 'text-sm uppercase'
        "
        @click="navigate"
      >
        {{ item.label }}
      </InlineButton>
    </RouterLink>
  </div>
</template>
