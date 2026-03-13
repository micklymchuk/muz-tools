<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    class="min-w-0 flex-1 border border-white/15 bg-transparent px-4 py-4 text-base text-white outline-none transition placeholder:text-white/25"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
