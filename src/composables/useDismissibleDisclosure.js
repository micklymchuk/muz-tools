import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useDismissibleDisclosure(rootRef) {
  const route = useRoute()
  const isOpen = ref(false)

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const handlePointerDown = (event) => {
    if (!rootRef.value?.contains(event.target)) {
      close()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      close()
    }
  }

  watch(() => route.fullPath, close)

  onMounted(() => {
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', handlePointerDown)
    document.removeEventListener('keydown', handleKeyDown)
  })

  return {
    close,
    isOpen,
    toggle,
  }
}
