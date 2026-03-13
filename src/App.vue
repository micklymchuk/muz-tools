<script setup>
import AppHeader from './components/AppHeader.vue'
import YoutubeToWav from './components/YoutubeToWav.vue'
</script>

<template>
  <main class="min-h-screen bg-black text-white">
    <section class="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <AppHeader />
      <YoutubeToWav />
    </section>
  </main>
</template>
