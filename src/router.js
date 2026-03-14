import { createRouter, createWebHistory } from 'vue-router'

import BeatAnalyser from './components/BeatAnalyser.vue'
import YoutubeToWav from './components/YoutubeToWav.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/youtube-to-wav',
    },
    {
      path: '/youtube-to-wav',
      name: 'youtube-to-wav',
      component: YoutubeToWav,
    },
    {
      path: '/beat-analyser',
      name: 'beat-analyser',
      component: BeatAnalyser,
    },
  ],
})

export default router
