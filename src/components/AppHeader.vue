<script setup>
import { ref } from 'vue'
import AppToolNav from './AppToolNav.vue'
import InlineButton from './ui/InlineButton.vue'
import { toolNavItems } from '../constants/toolNavItems'
import { useDismissibleDisclosure } from '../composables/useDismissibleDisclosure'

const headerRef = ref(null)
const toolsMenuId = 'header-tools-menu'

const { isOpen: isToolsMenuOpen, toggle: toggleToolsMenu } = useDismissibleDisclosure(headerRef)
</script>

<template>
  <div
    ref="headerRef"
    class="fixed top-0 right-0 left-0 z-30 mx-4"
  >
    <header
      class="flex h-[var(--app-header-height)] items-center justify-between gap-3 border-b-[1px] border-gray-500 bg-black py-4"
    >
      <div>
        <h1 class="text-base font-semibold tracking-tight uppercase">
          Mik Music
        </h1>
      </div>

      <InlineButton
        type="button"
        variant="secondary"
        :aria-controls="toolsMenuId"
        :aria-expanded="isToolsMenuOpen"
        class="px-2 text-sm uppercase sm:hidden"
        @click="toggleToolsMenu"
      >
        Tools
      </InlineButton>

      <nav class="hidden sm:block" aria-label="Tools">
        <AppToolNav :items="toolNavItems" />
      </nav>
    </header>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-3 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="isToolsMenuOpen"
        :id="toolsMenuId"
        class="border-b-[1px] border-gray-500 bg-black pb-4 pt-3 sm:hidden"
        aria-label="Mobile tools"
      >
        <AppToolNav :items="toolNavItems" mobile />
      </nav>
    </Transition>
  </div>
</template>
