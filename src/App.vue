<script setup>
import AppHeader from './components/AppHeader.vue'
import Footer from './components/Footer.vue'
import PageDefaultLayout from './components/PageDefaultLayout.vue'
</script>

<template>
  <main class="h-[100svh] overflow-hidden bg-black text-white">
    <AppHeader />
    <PageDefaultLayout>
      <RouterView />
    </PageDefaultLayout>
    <Footer />
  </main>
</template>
