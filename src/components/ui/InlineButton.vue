<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
  rel: {
    type: String,
    default: 'noopener noreferrer',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
})

const tagName = computed(() => (props.href ? 'a' : 'button'))
const variantClass = computed(() =>
  props.variant === 'secondary' ? 'sticker-secondary' : 'sticker',
)
</script>

<template>
  <component
    :is="tagName"
    :type="href ? undefined : type"
    :href="href || undefined"
    :target="href ? target : undefined"
    :rel="href ? rel : undefined"
    :disabled="href ? undefined : disabled"
    :class="[
      variantClass,
      'disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35',
    ]"
  >
    <slot />
  </component>
</template>
